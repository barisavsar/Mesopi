const express = require('express');
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('./db');

require('./auth/auth.strategy');
require('./auth/jwt.strategy');

const app = express();

app.use(cors());

app.use(express.json());

app.get('/system',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      appName: process.env.npm_package_name,
      appVersion: process.env.npm_package_version
    });
  });

app.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    const token = jwt.sign({
      id: req.user.id,
      userId: req.user.userId,
      email: req.user.email,
    }, 'MesopiSecretKey123', { expiresIn: 24 * 60 * 60 }); // 1 day

    await db('User').update({ token }).where({ id: req.user.id });

    const [{ count }] = await db('Practitioner').count('id as count').where({ user_id: req.user.id });
    const role = count ? 'Practitioner' : 'Patient';

    res.status(200).send({
      id: req.user.id,
      userId: req.user.userId,
      email: req.user.email,
      role,
      token,
    });
  });

app.post('/signup', async (req, res) => {
  const user = {
    userId: req.body.userId,
    email: req.body.email,
    password: req.body.password,
  };

  const [{ count }] = await db('User')
    .count('id as count')
    .where({ userId: user.userId })
    .orWhere({ email: user.email });

  if (count) {
    return res.status(409).send();
  }

  const [ userId ] = await db('User').insert(user);

  let address = null;
  if (req.body.address) {
    address = {
      line: req.body.address.line,
      city: req.body.address.city,
      postalCode: req.body.address.postalCode,
      country: req.body.address.country,
    };
  }

  let addressId = null;
  if (address) {
    ([ addressId ] = await db('Address').insert(address));
  }

  if (req.body.patient) {
    const patient = {
      family: req.body.patient.family,
      given: req.body.patient.given,
      birthdate: req.body.patient.birthdate,
      phone: req.body.patient.phone,
      gender: req.body.patient.gender,
      language: req.body.patient.language,
      address_id: addressId,
      user_id: userId,
    };
  
    await db('Patient').insert(patient);
  }

  if (req.body.practitioner) {
    const practitioner = {
      family: req.body.practitioner.family,
      given: req.body.practitioner.given,
      birthdate: req.body.practitioner.birthdate,
      phone: req.body.practitioner.phone,
      gender: req.body.practitioner.gender,
      language: req.body.practitioner.language,
      address_id: addressId,
      user_id: userId,
      practitioner_role_id: req.body.practitioner.roleId,
    };
  
    await db('Practitioner').insert(practitioner);
  }

  return res.status(200).send();
});

app.get('/practitioner/all',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const practitioners = await db('Practitioner')
      .select('*')
      .leftJoin('PractitionerRole', 'practitioner_role_id', 'PractitionerRole.id');
    return res.status(200).send(practitioners);
  });

app.get('/practitioner',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const [{ id: patientId }] = await db('Patient').select('id').where({
      user_id: req.user.id
    });

    const practitioners = await db('Practitioner')
      .select('*')
      .leftJoin('PractitionerRole', 'practitioner_role_id', 'PractitionerRole.id')
      .rightJoin('Practitioner_Patient', 'Practitioner.id', 'Practitioner_Patient.practitioner_id')
      .where({ patient_id: patientId });
    return res.status(200).send(practitioners);
  });

app.get('/practitioner/roles',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const practitionerRoles = await db('PractitionerRole').select('*');
    return res.status(200).send(practitionerRoles);
  });

app.put('/practitioner',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const addressToUpdate = req.body.address;
    let practitionerToUpdate = req.body.practitioner;

    if (addressToUpdate) {
      const [{ address_id: addressId }] = await db('Practitioner').select('address_id').where({
        user_id: req.user.id
      });

      if (addressId) {
        await db('Address').update(addressToUpdate).where({
          id: addressId
        });
      } else {
        const [ addressId ] = await db('Address').insert(addressToUpdate);
        practitionerToUpdate = practitionerToUpdate || {};
        practitionerToUpdate.address_id = addressId;
      }
    }

    if (practitionerToUpdate) {
      await db('Practitioner').update(practitionerToUpdate).where({
        user_id: req.user.id
      });
    }
    
    return res.status(200).send();
  });

app.post('/practitioner/select',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const [{ id: practitionerId }] = await db('Practitioner').select('id').where({
      user_id: req.body.practitionerId
    });

    const [{ id: patientId }] = await db('Patient').select('id').where({
      user_id: req.user.id
    });

    await db('Practitioner_Patient').insert({
      practitioner_id: practitionerId,
      patient_id: patientId,
    });

    return res.status(200).send();
  });

app.post('/message',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const senderId = req.user.id;
    const receiverId = req.body.receiverId;
    const message = req.body.message;
    const document = req.body.document || null;

    await db('Message').insert({
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      document,
      date: new Date(),
    });

    return res.status(200).send();
  });

app.get('/message',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const messages = await db('Message').select('*')
      .where({
        sender_id: req.user.id
      })
      .orWhere({
        receiver_id: req.user.id
      })
      .orderBy('date');

    return res.status(200).send(messages);
  });

app.put('/patient',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const addressToUpdate = req.body.address;
    let patientToUpdate = req.body.patient;
    
    if (addressToUpdate) {
      const [{ address_id: addressId }] = await db('Patient').select('address_id').where({
        user_id: req.user.id
      });

      if (addressId) {
        await db('Address').update(addressToUpdate).where({
          id: addressId
        });
      } else {
        const [ addressId ] = await db('Address').insert(addressToUpdate);
        patientToUpdate = patientToUpdate || {};
        patientToUpdate.address_id = addressId;
      }
    }

    if (patientToUpdate) {
      await db('Patient').update(patientToUpdate).where({
        user_id: req.user.id
      });
    }

    return res.status(200).send();
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

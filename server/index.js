const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const db = require('./db');

require('./auth/auth.strategy');
require('./auth/jwt.strategy');

const app = express();

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

    res.status(200).send({
      id: req.user.id,
      userId: req.user.userId,
      email: req.user.email,
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

  const address = {
    line: req.body.addressLine,
    city: req.body.addressCity,
    postalCode: req.body.addressPostalCode,
    country: req.body.addressCountry,
  };

  const [ addressId ] = await db('Address').insert(address);

  const patient = {
    family: req.body.familyName,
    given: req.body.givenName,
    birthdate: req.body.birthDate,
    phone: req.body.phone,
    gender: req.body.gender,
    language: req.body.language,
    address_id: addressId,
    user_id: userId,
  };

  await db('Patient').insert(patient);

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
      .rightJoin('Practitioner_Patient', 'Practitioner.id', 'Practitioner_Patient.Practitioner_id')
      .where({ patient_id: patientId });
    return res.status(200).send(practitioners);
  });

app.put('/practitioner',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const [{ id: practitionerId }] = await db('Practitioner').select('id').where({
      user_id: req.body.practitionerId
    });

    const [{ id: patientId }] = await db('Patient').select('id').where({
      user_id: req.user.id
    });

    await db('Practitioner_Patient').insert({
      Practitioner_id: practitionerId,
      patient_id: patientId,
    });

    return res.status(200).send();
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

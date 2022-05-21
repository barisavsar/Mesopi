exports.seed = function(knex) {
    return new Promise(async resolve => {
        const practitionerRoles = [
            {
                specialty: 'Dermatology',
            },
            {
                specialty: 'General medicine',
            },
            {
                specialty: 'Gynecology',
            },
            {
                specialty: 'Urology',
            }
        ];

        for (const practitionerRole of practitionerRoles) {
            const [{ count }] = await knex('PractitionerRole').count('id as count').where({
                specialty: practitionerRole.specialty
            });
            if (count) {
                continue;
            }

            await knex('PractitionerRole').insert(practitionerRole);
        }

        resolve();
    });
};

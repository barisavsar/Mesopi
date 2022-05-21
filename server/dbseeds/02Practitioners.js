exports.seed = function(knex) {
    return new Promise(async resolve => {
        const user = {
            userId: 'practitioner1',
            email: 'practitioner1@mesopi.com',
            password: '123456',
        };
    
        const [{ count }] = await knex('User').count('id as count').where({ userId: user.userId });
        if (count) {
            return resolve();
        }

        await knex('User').insert(user);

        const [{ id: userId }] = await knex('User').select('id').where({ userId: user.userId });

        const practitioner = {
            family: 'PFamily1',
            given: 'PGiven1',
            user_id: userId,
            practitioner_role_id: 1,
        };

        await knex('Practitioner').insert(practitioner);

        resolve();
    });
};

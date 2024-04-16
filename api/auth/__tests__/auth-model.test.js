const db = require('../../../data/dbConfig');
const User = require('../auth-model');

describe('auth model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    })
    describe('add', () => {
        it('should insert a user into the database', async () => {
            //Arrange: create a user
            const user = {username: 'test', password: 'password'}
            //Act: add the user to the database 
            await User.add(user);
            //Assert: check that the user was added
            const users = await db('users');
            expect(users).toHaveLength(1);

        })
    })
})




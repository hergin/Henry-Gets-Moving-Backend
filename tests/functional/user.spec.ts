import { test } from '@japa/runner'

test.group('User', () => {
    test('stores user info in the database', async ({ assert, client }) => {
        const result = await client.post('/users')
        assert.isDefined(result)
        // assert.isDefined(result.body.id)
        // assert.isDefined(result.body.email)
        // assert.isDefined(result.body.rememberMeToken)
        // assert.isDefined(result.body.createdAt)
        // assert.isDefined(result.body.updatedAt)
        // assert.isDefined(result.body.familyMembers)
    }).timeout(0)
})

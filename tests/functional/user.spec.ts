import { test } from '@japa/runner'
import UserFactory from '../../database/factories/UserFactory'

test.group('User', () => {
    test('stores user info in the database', async ({ assert, client }) => {
        await UserFactory.query().create()
        const result = await client.post('/users')
        result.assertStatus(201)

        assert.isDefined(result.body.id)
        assert.isDefined(result.body.email)
        assert.isDefined(result.body.rememberMeToken)
        assert.isDefined(result.body.createdAt)
        assert.isDefined(result.body.updatedAt)
        assert.isDefined(result.body.familyMembers)
    }).timeout(0)
})

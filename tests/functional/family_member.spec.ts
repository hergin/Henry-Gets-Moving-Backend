import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Family member', () => {
    test("can't create family member without authentication", async ({ assert, client, route }) => {
        assert.plan(2)
        const result = await client.post(route('FamilyMembersController.store'))
        result.assertStatus(401)
        result.assertBodyContains({
            errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }],
        })
    })
    test('create family member with authentication', async ({ assert, client, route }) => {
        assert.plan(2)
        const user = await User.find(1)
        const result = await client
            .post(route('FamilyMembersController.store'))
            .loginAs(user!)
            .form({
                name: 'Test',
                user_id: 1,
            })
        result.assertStatus(200)
        result.assertBodyContains({
            name: 'Test',
            user_id: 1,
        })
    })
})

import { test } from '@japa/runner'
import User from 'App/Models/User'

test.group('Exercise log', () => {
    test("can't create exercise log without login", async ({ client, route }) => {
        const result = await client.post(route('ExerciseLogsController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'type' }],
        })
    })
    test('get exercise logs with login', async ({ assert, client, route }) => {
        assert.plan(2)
        const user = await User.find(1)
        const result = await client.get(route('ExerciseLogsController.index')).loginAs(user!)
        result.assertStatus(200)
        result.assertBodyContains([
            {
                date: '10/10/2020',
                duration: 20,
                family_member_id: 1,
                id: 1,
                intensity: 'Vigorous',
                name: 'Test child',
                type: 'Test exercise log 1',
                user_id: 1,
            },
        ])
    })
})

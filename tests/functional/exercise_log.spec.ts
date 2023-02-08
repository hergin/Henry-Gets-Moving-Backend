import { test } from '@japa/runner'

test.group('Exercise log', () => {
    test("can't create exercise log without login", async ({ assert, client, route }) => {
        const result = await client.post(route('ExerciseLogsController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'type' }],
        })
    })
})

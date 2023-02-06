import { test } from '@japa/runner'

test.group('Exercise', () => {
    test("can't create exercises without required fields", async ({ assert, client, route }) => {
        const result = await client.post(route('ExercisesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
})

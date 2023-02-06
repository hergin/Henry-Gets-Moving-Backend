import { test } from '@japa/runner'

test.group('Exercise', (group) => {
        group.each.setup(async () => {
            await Database.beginGlobalTransaction()
    
            return () => Database.rollbackGlobalTransaction()
        })
    test("can't create exercises without required fields", async ({ assert, client, route }) => {
        const result = await client.post(route('ExercisesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
})

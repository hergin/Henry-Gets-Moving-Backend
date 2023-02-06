import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Diagrams', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
    test("can't create diagram without required fields", async ({ assert, client, route }) => {
        const result = await client.post(route('DiagramsController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
})

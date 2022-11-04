import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('User store', (group) => {
    group.each.setup( async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
})

test.group('User', () => {
    test('can\'t create user without email', async ({ assert, client, route }) => {
        const result = await client.post(route('UsersController.store'))
        result.assertStatus(422)
        result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'email'}]})
    })
})

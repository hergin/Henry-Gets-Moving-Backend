import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'



test.group('User', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })

    test('can\'t create user without email', async ({ assert, client, route }) => {
        const result = await client.post(route('UsersController.store'))
        result.assertStatus(422)
        result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'email'}]})
    })

    test('create user that already exists', async ({ assert, client, route }) => {
        const result = await client.post(route('UsersController.store')).form({
            email: 'test@bsu.edu',
        })
        result.assertTextIncludes("User already exists")
    })
})

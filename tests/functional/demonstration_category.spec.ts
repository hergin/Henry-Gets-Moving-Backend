import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Demonstration category', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })
    test("can't create category without required fields", async ({ client, route }) => {
        const result = await client.post(route('DemonstrationCategoriesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })

    test('store demo category', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.post('/demoCategories').form({ name: 'Japa 101' })

        // 1st assertion
        response.assertStatus(200)

        // 2nd assertion
        response.assertBodyContains({
            name: 'Japa 101',
        })
    })
    test('get all demo categories', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.get('/demoCategories')

        // 1st assertion
        response.assertStatus(200)

        // 2nd assertion
        response.assertBodyContains([
            {
                name: 'Demo Category 1',
            },
            {
                name: 'Demo Category 2',
            },
        ])
    })
})

import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Recipe', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })

    test("can't create recipe without required fields", async ({ client, route }) => {
        const result = await client.post(route('RecipesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
    test('create recipe', async ({ client, route }) => {
        const recipeToCreate = {
            name: 'New Test Recipe',
            thumbnail: 'test.com',
            cook_time: '8 years',
            is_featured: 0,
            prep_time: '20 minutes',
            recipe_steps: 'step 1. cook',
            ingredients: 'banana',
        }
        const postResult = await client.post(route('RecipesController.store')).form(recipeToCreate)
        postResult.assertStatus(200)
    })

    test('show recipe', async ({ client, route }) => {
        const result = await client.get(route('RecipesController.show', { id: 1 }))
        result.assertBodyContains({ name: 'Test recipe' })
    })

    test('delete recipe', async ({ client, route }) => {
        const result = await client.delete(route('RecipesController.destroy', { id: 1 }))
        result.assertStatus(200)
    })

    test('update recipe', async ({ client, route }) => {
        const recipeToUpdate = {
            name: 'Updated Test Recipe',
            thumbnail: 'test.com',
            cook_time: '8 years',
            is_featured: false,
            prep_time: '20 minutes',
            recipe_steps: 'step 1. cook',
            ingredients: 'banana',
        }
        const result = await client
            .put(route('RecipesController.update', { id: 1 }))
            .form(recipeToUpdate)
        result.assertStatus(200)
        result.assertBodyContains(recipeToUpdate)
    })

    test('show all recipes', async ({ client }) => {
        const result = await client.get('/recipes')
        result.assertStatus(200)
        result.assertBodyContains([{ id: 1 }, { id: 2 }])
    })
})

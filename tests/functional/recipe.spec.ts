import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Recipe', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })

    test("can't create recipe without required fields", async ({ assert, client, route }) => {
        const result = await client.post(route('RecipesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
    test("create and show recipe", async ({client, route}) => {
        const recipeToCreate = {
            name: "Test Recipe",
            thumbnail: "test.com",
            cook_time: "8 years",
            is_featured: false,
            category_id: 1,
            prep_time: "20 minutes",
            recipe_steps: "step 1. cook",
            ingredients: "banana"
        }
        const postResult = await client.post(route('RecipesController.store')).form(recipeToCreate)
        postResult.assertStatus(200)
        const result = await client.get(route('RecipesController.show', {id: postResult.body().id}))
        result.assertBodyContains(recipeToCreate)
    })

    test('delete recipe',async({client, route})=>{
        const result = await client.delete(route('RecipesController.destroy', {id: 1}))
        result.assertStatus(200)
    })
})

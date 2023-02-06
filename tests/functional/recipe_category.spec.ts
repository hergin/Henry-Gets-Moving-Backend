import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Recipe Category', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
    test("can't create recipe category without required fields", async ({client,route}) => {
        const result = await client.post(route('RecipeCategoriesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
    test("create and show recipecategory", async ({client, route}) => {
        const categoryToCreate = {
            name: "Test Recipe Category",
        }
        const postResult = await client.post(route('RecipeCategoriesController.store')).form(categoryToCreate)
        postResult.assertStatus(200)
        const result = await client.get(route('RecipeCategoriesController.show', {id: postResult.body().id}))
        result.dump()
        result.assertBodyContains(categoryToCreate)
    })
})

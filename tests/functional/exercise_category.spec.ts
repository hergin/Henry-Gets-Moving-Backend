import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Exercise category', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
    test("can't create exercise category without required fields", async ({client,route}) => {
        const result = await client.post(route('ExerciseCategoriesController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
    test("create exercise category", async({client,route}) =>{
        const categoryToCreate = {name: "New Exercise Category"}
        const postResult = await client.post(route('ExerciseCategoriesController.store')).form(categoryToCreate)
        postResult.assertStatus(200)
    })
    test("show all exercise categories",async({client})=>{
        const result = await client.get('/exerciseCategories')
        result.assertStatus(200)
        result.assertBodyContains([{id:1},{id:2}])
    })
})

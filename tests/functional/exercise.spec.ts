import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

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

    test("create exercise", async ({client, route}) => {
        const exerciseToCreate = {
            name: "Test Exercise",
            thumbnail_link: "test.com",
            video_link: "youtube.whatever",
            is_featured: 0,
            category_id: 1
        }
        const postResult = await client.post(route('ExercisesController.store')).form(exerciseToCreate)
        postResult.assertStatus(200)
    })

    test('show exercise',async({client,route})=>{
        const result = await client.get(route('ExercisesController.show', {id: 1}))
        result.assertBodyContains({name: "Test exercise 1"})
    })

    test('delete exercise',async({client, route})=>{
        const result = await client.delete(route('ExercisesController.destroy', {id: 1}))
        result.assertStatus(200)
    })

    test('update exercise',async({client,route})=>{
        const exerciseToUpdate = {
            name: "Test Exercise",
            thumbnail_link: "test.com",
            video_link: "youtube.whatever",
            is_featured: false,
            category_id: 1
        }
        const result = await client.put(route('ExercisesController.update',{id:1})).form(exerciseToUpdate)
        result.assertStatus(200)
        result.assertBodyContains(exerciseToUpdate)
    })

    test('show all exercises',async({client})=>{
        const result = await client.get('/exercises')
        result.assertStatus(200)
        result.assertBodyContains([{id: 1},{id: 2}])
    })
})

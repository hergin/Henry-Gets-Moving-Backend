import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Featured', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })

    test("get featured exercise", async ({client, route}) => {
        const result = await client.get(route('FeaturedController.getFeaturedExercise'))
        result.assertStatus(200)
        result.assertBodyContains({name: "Test exercise 1"})
    })

    test('get featured recipe',async({client,route})=>{
        const result = await client.get(route('FeaturedController.getFeaturedRecipe'))
        result.assertStatus(200)
        result.assertBodyContains({name: "Test recipe"})
    })
})

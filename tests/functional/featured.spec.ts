import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Featured', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })

    test("get featured exercise", async ({client, route}) => {
        await client.post(route('FeaturedController.updateFeaturedExercise', {id: 14})).dump()
        await client.get(route('FeaturedController.getFeaturedExercise')).dump()
    })
})

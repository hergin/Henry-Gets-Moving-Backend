import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Featured', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })

    test('get featured exercise', async ({ client, route }) => {
        const result = await client.get(route('FeaturedController.getFeaturedExercise'))
        result.assertStatus(200)
        result.assertBodyContains({ name: 'Test exercise 1' })
    })

    test('get featured recipe', async ({ client, route }) => {
        const result = await client.get(route('FeaturedController.getFeaturedRecipe'))
        result.assertStatus(200)
        result.assertBodyContains({ name: 'Test recipe' })
    })

    test('update featured exercise', async ({ client, route }) => {
        const result = await client.post(
            route('FeaturedController.updateFeaturedExercise', { id: 2 })
        )
        result.assertStatus(200)
        result.assertBodyContains({ name: 'Test exercise 2' })
    })

    test('update featured recipe', async ({ client, route }) => {
        const result = await client.post(
            route('FeaturedController.updateFeaturedRecipe', { id: 2 })
        )
        result.assertStatus(200)
        result.assertBodyContains({ name: 'Test recipe 2' })
    })
})

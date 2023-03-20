import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'

test.group('Demonstration', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
    test("can't create demonstration without required fields", async ({ client, route }) => {
        const result = await client.post(route('DemonstrationsController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })

    test('store demo ', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.post('/demos').form({
            name: 'Japa 101',
            thumbnail_link: 'image.com/image.png',
            video_link: 'youtube.com',
        })

        // 1st assertion
        response.assertStatus(200)

        // 2nd assertion
        response.assertBodyContains({
            name: 'Japa 101',
            thumbnail_link: 'image.com/image.png',
            video_link: 'youtube.com',
        })
    })
    test('get all demos', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.get('/demos')

        response.assertStatus(200)

        response.assertBodyContains([
            {
                name: 'Test Demo',
                thumbnail_link: 'image.com/image.png',
                video_link: 'youtube.com/video',
            },
            {
                name: 'Test Demo 2',
                thumbnail_link: 'image.com',
                video_link: 'youtube.video',
            },
        ])
    })
    test('get single demos', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.get('/demos/1')

        response.assertStatus(200)

        response.assertBodyContains({
            name: 'Test Demo',
            thumbnail_link: 'image.com/image.png',
            video_link: 'youtube.com/video',
        })
    })
    test('update demo', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.put('/demos/1').form({
            name: 'Test Demo Updated',
            thumbnail_link: 'image.com/image.png',
            video_link: 'youtube.com',
        })

        response.assertStatus(200)

        response.assertBodyContains({
            name: 'Test Demo Updated',
            thumbnail_link: 'image.com/image.png',
            video_link: 'youtube.com',
        })
    })
    test('delete a demo', async ({ client, assert }) => {
        assert.plan(2)

        const response = await client.delete('/demos/1')

        response.assertStatus(200)

        response.assertBodyContains({
            name: 'Test Demo',
            thumbnail_link: 'image.com/image.png',
            video_link: 'youtube.com/video',
        })
    })
})

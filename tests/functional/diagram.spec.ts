import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Diagrams', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
    test("can't create diagram without required fields", async ({ assert, client, route }) => {
        const result = await client.post(route('DiagramsController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
    test("create diagram", async ({client, route}) => {
        const diagramToCreate = {
            name: "Test Diagram",
            thumbnail_link: "link.com.website"
        }
        const postResult = await client.post(route('DiagramsController.store')).form(diagramToCreate)
        postResult.assertStatus(200)
    })

    test('show diagram',async({client,route})=>{
        const result = await client.get(route('DiagramsController.show', {id: 1}))
        result.assertBodyContains({name: "Test diagram 1"})
    })

    test('delete diagram',async({client,route})=>{
        const result = await client.delete(route('DiagramsController.destroy',{id:1}))
        result.assertStatus(200)
    })
})

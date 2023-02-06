import { test } from '@japa/runner'

test.group('Demonstration', () => {
    test("can't create demonstration without required fields", async ({
        assert,
        client,
        route,
    }) => {
        const result = await client.post(route('DemonstrationsController.store'))
        result.assertStatus(422)
        result.assertBodyContains({
            errors: [{ message: 'required validation failed', rule: 'required', field: 'name' }],
        })
    })
})

import { test } from '@japa/runner'

test.group('Demonstration category', () => {
  test('can\'t create category without required fields', async ({ assert, client, route }) => {
      const result = await client.post(route('UsersController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'email'}]})
  })
})

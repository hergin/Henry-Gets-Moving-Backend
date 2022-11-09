import { test } from '@japa/runner'

test.group('Exercise', () => {
  test('exercise view', async ({ assert, client, route }) => {
      const result = await client.post(route('UsersController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'email'}]})
  })
})

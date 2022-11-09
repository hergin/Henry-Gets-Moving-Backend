import { test } from '@japa/runner'

test.group('Family member', () => {
  test('can\'t create family member without login', async ({ assert, client, route }) => {
      const result = await client.post(route('UsersController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'email'}]})
  })
})

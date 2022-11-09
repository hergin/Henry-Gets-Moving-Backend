import { test } from '@japa/runner'

test.group('Family member', () => {
  test('can\'t create family member without required attributes', async ({ assert, client, route }) => {
      const result = await client.post(route('FamilyMembersController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'name',field:'user_id'}]})
  })
})

import { test } from '@japa/runner'

test.group('Family member', () => {
  test('can\'t create family member without authentication', async ({ assert, client, route }) => {
      const result = await client.post(route('FamilyMembersController.store'))
      result.assertStatus(401)
      result.assertBodyContains({errors: [{message:'E_UNAUTHORIZED_ACCESS: Unauthorized access'}]})
  })
})

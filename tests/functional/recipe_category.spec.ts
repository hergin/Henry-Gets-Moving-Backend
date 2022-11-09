import { test } from '@japa/runner'

test.group('Recipe Category', () => {
  test('can\'t create recipe category without required fields', async ({ assert, client, route }) => {
      const result = await client.post(route('RecipeCategoriesController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'name'}]})
  })
})

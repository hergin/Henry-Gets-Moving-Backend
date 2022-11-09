import { test } from '@japa/runner'

test.group('Recipe', () => {
  test('can\'t create recipe without required fields', async ({ assert, client, route }) => {
      const result = await client.post(route('RecipesController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'name'}]})
  })
})

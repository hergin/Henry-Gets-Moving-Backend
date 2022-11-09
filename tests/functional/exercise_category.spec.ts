import { test } from '@japa/runner'

test.group('Exercise category', () => {
  test('can\'t create exercise category without required fields', async ({ assert, client, route }) => {
      const result = await client.post(route('ExerciseCategoriesController.store'))
      result.assertStatus(422)
      result.assertBodyContains({errors: [{message:'required validation failed',rule:'required',field:'name'}]})
  })
})

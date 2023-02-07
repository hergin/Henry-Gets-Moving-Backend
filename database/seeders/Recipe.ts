import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Recipe from 'App/Models/Recipe'

export default class extends BaseSeeder {
  public async run () {
    await Recipe.createMany([
      {
        name: "Test recipe",
        thumbnail: "test thumbnail",
        cook_time: "20 minutes",
        prep_time: "10 minutes",
        ingredients: "banana",
        recipe_steps: "1. cook",
        is_featured: true,
        category_id: 1
      },
      {
        name: "Test recipe 2",
        thumbnail: "test thumbnail",
        cook_time: "20 minutes",
        prep_time: "10 minutes",
        ingredients: "banana",
        recipe_steps: "1. cook",
        is_featured: false,
        category_id: 2
      }
    ])
  }
}

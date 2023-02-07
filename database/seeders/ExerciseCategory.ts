import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ExerciseCategory from 'App/Models/ExerciseCategory'

export default class extends BaseSeeder {
  public async run () {
    await ExerciseCategory.createMany([
      {name: "Test Exercise Category"}, {name: "Test Exercise category 2"}
    ])
  }
}

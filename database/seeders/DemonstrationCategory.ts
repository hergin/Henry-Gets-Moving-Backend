import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import DemonstrationCategory from 'App/Models/DemonstrationCategory'

export default class extends BaseSeeder {
  public async run () {
    await DemonstrationCategory.createMany([
      {
        name: "Demo Category 1"
      },
      {
        name: "Demo Category 2"
      }
    ])
  }
}

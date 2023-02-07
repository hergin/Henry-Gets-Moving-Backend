import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Exercise from 'App/Models/Exercise'

export default class extends BaseSeeder {
  public async run () {
    await Exercise.createMany([
      {
        name: "Test exercise 1",
        category_id: 1,
        thumbnail_link: "image",
        video_link: "video",
        is_featured: true
      },
      {
        name: "Test exercise 2",
        category_id: 2,
        thumbnail_link: "image2",
        video_link: "video 2",
        is_featured: false
      }
    ])
  }
}

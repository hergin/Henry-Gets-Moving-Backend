import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Demonstration from 'App/Models/Demonstration'

export default class extends BaseSeeder {
    public async run() {
        await Demonstration.createMany([
            {
                name: 'Test Demo',
                thumbnail_link: 'image.com/image.png',
                video_link: 'youtube.com/video',
                demonstration_category_id: 1,
            },
            {
                name: 'Test Demo 2',
                thumbnail_link: 'image.com',
                video_link: 'youtube.video',
                demonstration_category_id: 2,
            },
        ])
    }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Diagram from 'App/Models/Diagram'

export default class extends BaseSeeder {
    public async run() {
        await Diagram.createMany([
            {
                name: 'Test diagram 1',
                thumbnail_link: 'image.com',
            },
            {
                name: 'Test diagram 2',
                thumbnail_link: 'image_also.com',
            },
        ])
    }
}

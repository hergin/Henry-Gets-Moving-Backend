import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import FamilyMember from 'App/Models/FamilyMember'

export default class extends BaseSeeder {
    public async run() {
        await FamilyMember.createMany([
            {
                name: 'Test child',
                user_id: 1,
            },
            {
                name: 'test child 2',
                user_id: 2,
            },
        ])
    }
}

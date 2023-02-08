import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ExerciseLog from 'App/Models/ExerciseLog'

export default class extends BaseSeeder {
    public async run() {
        await ExerciseLog.createMany([
            {
                type: 'Test exercise log 1',
                intensity: 'Vigorous',
                duration: 20,
                name: 'Test child',
                date: '10/10/2020',
                family_member_id: 1,
                user_id: 1,
            },
            {
                type: 'Test exerciselog 2',
                intensity: 'Moderate',
                duration: 10,
                name: 'test child 2',
                date: '10/10/2020',
                family_member_id: 2,
                user_id: 2,
            },
        ])
    }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ExerciseLog from 'App/Models/ExerciseLog'

export default class extends BaseSeeder {
  public async run () {
    await ExerciseLog.createMany([
      {
        type: "Test exercise log 1",
        intensity: "Vigorous",
        duration: 20,
        name: "Test child",
        family_member_id: 1,
        user_id: 1
      },
      {
        type: "Test exerciselog 2",
        intensity: "Medium",
        duration: 10,
        name: "test child 2",
        family_member_id: 2,
        user_id: 2
      }
    ])
  }
}

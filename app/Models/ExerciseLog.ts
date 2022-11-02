import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ExerciseLog extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public type: string

    @column()
    public intensity: string

    @column()
    public duration: number

    @column()
    public familyMemberID: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}

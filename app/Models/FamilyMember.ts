import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import ExerciseLog from 'App/Models/ExerciseLog'

export default class FamilyMember extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public user_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @hasMany(() => ExerciseLog)
    public exerciseLog: HasMany<typeof ExerciseLog>
}

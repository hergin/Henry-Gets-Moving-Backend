import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FamilyMember from 'App/Models/FamilyMember'
import User from 'App/Models/User'

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
    public family_member_id: number

    @column()
    public user_id: number

    @column()
    public date: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => FamilyMember, {
        foreignKey: 'family_member_id',
    })
    public familyMember: BelongsTo<typeof FamilyMember>

    @belongsTo(() => User, {
        foreignKey: 'user_id',
    })
    public user: BelongsTo<typeof User>
}

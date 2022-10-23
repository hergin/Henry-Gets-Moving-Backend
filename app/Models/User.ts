import { DateTime } from 'luxon'
import {column, BaseModel, hasMany, HasMany} from "@ioc:Adonis/Lucid/Orm";
import FamilyMember from "App/Models/FamilyMember";

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public email: string

    @column()
    public rememberMeToken: string | null

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => FamilyMember)
    public familyMembers: HasMany<typeof FamilyMember>
}

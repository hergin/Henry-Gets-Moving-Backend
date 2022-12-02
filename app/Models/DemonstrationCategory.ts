import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Demonstration from 'App/Models/Demonstration'

export default class DemonstrationCategory extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @hasMany(() => Demonstration, {
        foreignKey: 'demonstration_category_id',
    })
    public demonstration: HasMany<typeof Demonstration>
}

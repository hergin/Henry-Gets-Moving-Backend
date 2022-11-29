import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import DemonstrationCategory from 'App/Models/DemonstrationCategory'

export default class Demonstration extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public thumbnailLink: string

    @column()
    public videoLink: string

    @column()
    public demonstration_category_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => DemonstrationCategory)
    public demonstrationCategory: BelongsTo<typeof DemonstrationCategory>
}
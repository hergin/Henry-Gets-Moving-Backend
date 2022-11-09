import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ExerciseCategory from 'App/Models/ExerciseCategory'

export default class Exercise extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public thumbnailLink: string | null

    @column()
    public videoLink: string | null

    @column()
    public isFeatured: boolean

    @column()
    public category_id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => ExerciseCategory, {
        foreignKey: 'category_id',
    })
    public exerciseCategory: BelongsTo<typeof ExerciseCategory>
}

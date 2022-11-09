import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import ExerciseCategory from 'App/Models/ExerciseCategory'

export default class Exercise extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public thumbnail_link: string

    @column()
    public video_link: string

    @column()
    public is_featured: boolean

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

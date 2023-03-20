import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
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

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => ExerciseCategory, {
        pivotTable: 'categories_exercises',
        localKey: 'id',
        pivotForeignKey: 'exercise_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'category_id',
    })
    public exerciseCategories: ManyToMany<typeof ExerciseCategory>
}

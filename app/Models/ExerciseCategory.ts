import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Exercise from 'App/Models/Exercise'

export default class ExerciseCategory extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => Exercise, {
        pivotTable: 'categories_exercises',
        localKey: 'id',
        pivotForeignKey: 'exercise_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'category_id',
    })
    public exercise: ManyToMany<typeof Exercise>
}

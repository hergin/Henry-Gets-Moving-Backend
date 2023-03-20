import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import DemonstrationCategory from 'App/Models/DemonstrationCategory'

export default class Demonstration extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public thumbnail_link: string

    @column()
    public video_link: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => DemonstrationCategory, {
        pivotTable: 'categories_demonstrations',
        localKey: 'id',
        pivotForeignKey: 'demo_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'category_id',
    })
    public demoCategories: ManyToMany<typeof DemonstrationCategory>
}

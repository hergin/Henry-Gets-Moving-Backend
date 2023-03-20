import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
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

    @manyToMany(() => Demonstration, {
        pivotTable: 'categories_demonstrations',
        localKey: 'id',
        pivotForeignKey: 'demo_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'category_id',
    })
    public demo: ManyToMany<typeof Demonstration>
}

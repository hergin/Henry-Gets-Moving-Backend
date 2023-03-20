import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'

export default class RecipeCategory extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => Recipe, {
        pivotTable: 'categories_recipes',
        localKey: 'id',
        pivotForeignKey: 'recipe_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'category_id',
    })
    public recipe: ManyToMany<typeof Recipe>
}

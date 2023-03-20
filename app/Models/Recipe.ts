import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import RecipeCategory from 'App/Models/RecipeCategory'

export default class Recipe extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public thumbnail: string

    @column()
    public cook_time: string

    @column()
    public ingredients: string

    @column()
    public recipe_steps: string

    @column()
    public is_featured: boolean

    @column()
    public prep_time: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @manyToMany(() => RecipeCategory, {
        pivotTable: 'categories_recipes',
        localKey: 'id',
        pivotForeignKey: 'recipe_id',
        relatedKey: 'id',
        pivotRelatedForeignKey: 'category_id',
    })
    public recipeCategories: ManyToMany<typeof RecipeCategory>
}

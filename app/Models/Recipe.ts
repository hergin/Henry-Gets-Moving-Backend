import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import RecipeCategory from 'App/Models/RecipeCategory'

export default class Recipe extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public thumbnail: string

    @column()
    public isFeatured: boolean

    @column()
    public categoryID: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => RecipeCategory)
    public recipeCategory: BelongsTo<typeof RecipeCategory>
}

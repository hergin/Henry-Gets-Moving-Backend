import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
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

    @hasMany(() => Recipe, {
        foreignKey: 'recipe_category_id',
    })
    public recipe: HasMany<typeof Recipe>
}

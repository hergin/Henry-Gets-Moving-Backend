import { DateTime } from 'luxon'
import { BaseModel, column, HasMany } from '@ioc:Adonis/Lucid/Orm'
import {ExerciseCategory} from 'App/Models/ExerciseCategory'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public videoLink: string | null

  @column()
  public isFeatured: boolean

  @column()
  public categoryID: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ExerciseCategory)
  public categories: HasMany<typeof ExerciseCategory>

}

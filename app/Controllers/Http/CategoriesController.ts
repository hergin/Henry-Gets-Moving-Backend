import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import Recipe from 'App/Models/Recipe'

export default class CategoriesController {
    public async setExerciseCategories({ params, request }: HttpContextContract) {
        const exercise = await Exercise.findOrFail(params.id)
        const categoriesIDS = request.body()
        await exercise.related('exerciseCategories').sync(categoriesIDS)
        return exercise.exerciseCategories
    }

    public async setRecipeCategories({ params, request }: HttpContextContract) {
        const recipe = await Recipe.findOrFail(params.id)
        const categoriesIDS = request.body()
        await recipe.related('recipeCategories').sync(categoriesIDS)
        return recipe.recipeCategories
    }
}

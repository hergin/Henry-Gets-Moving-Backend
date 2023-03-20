import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'

export default class CategoriesController {
    public async setExerciseCategories({ params, request }: HttpContextContract) {
        const exercise = await Exercise.findOrFail(params.id)
        const categoriesIDS = request.body()
        await exercise.related('exerciseCategories').sync(categoriesIDS)
    }
}

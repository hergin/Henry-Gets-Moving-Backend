import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ExerciseCategory from 'App/Models/ExerciseCategory'

export default class ExerciseCategoriesController {
    public async index({}: HttpContextContract) {
        return ExerciseCategory.query().orderBy('name')
    }

    public async store({ request }: HttpContextContract) {
        const exerciseCategorySchema = schema.create({
            name: schema.string(),
        })

        const exerciseCategoryPayload = await request.validate({ schema: exerciseCategorySchema })

        const exerciseCategory = new ExerciseCategory()
        exerciseCategory.name = exerciseCategoryPayload.name

        await exerciseCategory.save()
        return exerciseCategory
    }

    public async destroy({ params }: HttpContextContract) {
        let exerciseCategory = await ExerciseCategory.findOrFail(params.id)
        await exerciseCategory.delete()
        return exerciseCategory
    }
}

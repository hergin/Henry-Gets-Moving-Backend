import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ExerciseCategory from 'App/Models/ExerciseCategory'

export default class ExerciseCategoriesController {
    private getExerciseCategoriesSchema(){
        return schema.create({
            name: schema.string(),
        })
    }

    public async index({}: HttpContextContract) {
        return ExerciseCategory.query().orderBy('name')
    }

    public async store({ request }: HttpContextContract) {
        const exerciseCategorySchema = this.getExerciseCategoriesSchema()

        const exerciseCategoryPayload = await request.validate({ schema: exerciseCategorySchema })

        const exerciseCategory = new ExerciseCategory()
        exerciseCategory.name = exerciseCategoryPayload.name

        await exerciseCategory.save()
        return exerciseCategory
    }

    public async show({ params }: HttpContextContract) {
        return ExerciseCategory.query().where('id', params.id).preload('exercise')[0]
    }

    public async destroy({ params }: HttpContextContract) {
        let exerciseCategory = await ExerciseCategory.findOrFail(params.id)
        await exerciseCategory.delete()
        return exerciseCategory
    }
}

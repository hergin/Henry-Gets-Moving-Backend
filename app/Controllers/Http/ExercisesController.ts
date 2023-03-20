import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
    private getExerciseSchema() {
        return schema.create({
            name: schema.string({ trim: true }),
            thumbnail_link: schema.string({ trim: true }),
            video_link: schema.string({ trim: true }),
            is_featured: schema.boolean(),
        })
    }

    private async saveExercise(exercise, payload) {
        exercise.name = payload.name
        exercise.thumbnail_link = payload.thumbnail_link
        exercise.video_link = payload.video_link
        exercise.is_featured = payload.is_featured

        await exercise.save()
        return exercise
    }

    public async index({}: HttpContextContract) {
        return Exercise.query().preload('exerciseCategories').orderBy('created_at')
    }

    public async getPaginated({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 8
        return await Exercise.query()
            .preload('exerciseCategories')
            .orderBy('created_at')
            .paginate(page, limit)
    }

    public async store({ request, response }: HttpContextContract) {
        const exerciseSchema = this.getExerciseSchema()

        const requestBody = await request.validate({ schema: exerciseSchema })

        const name = requestBody.name

        if ((await Exercise.findBy('name', name)) !== null) {
            response.badRequest('Exercise already exists')
            return
        }

        const exercise = new Exercise()
        return this.saveExercise(exercise, requestBody)
    }

    public async show({ params }: HttpContextContract) {
        const exercise = await Exercise.query().where('id', params.id).preload('exerciseCategories')
        return exercise[0]
    }

    public async update({ params, request }: HttpContextContract) {
        const exerciseSchema = this.getExerciseSchema()

        const requestBody = await request.validate({ schema: exerciseSchema })

        const exercise = await Exercise.findOrFail(params.id)
        return this.saveExercise(exercise, requestBody)
    }

    public async destroy({ params }: HttpContextContract) {
        let exercise = await Exercise.findOrFail(params.id)
        await exercise.related('exerciseCategories').detach()
        await exercise.delete()
        return exercise
    }
}

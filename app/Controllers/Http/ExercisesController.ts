import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 9
        return Exercise.query()
            .preload('exerciseCategory')
            .orderBy('created_at')
            .paginate(page, limit)
    }

    public async getFeatured({}: HttpContextContract) {
        return Exercise.query().where('isFeatured', true).preload('exerciseCategory')
    }

    public async store({ request, response }: HttpContextContract) {
        const exerciseSchema = schema.create({
            name: schema.string({ trim: true }),
            videoLink: schema.string({ trim: true }),
            isFeatured: schema.boolean(),
            category_id: schema.number(),
        })

        const requestBody = await request.validate({ schema: exerciseSchema })

        const name = requestBody.name

        if ((await Exercise.findBy('name', name)) !== null) {
            response.badRequest('Exercise already exists')
            return
        }

        const exercise = new Exercise()
        exercise.name = name
        exercise.videoLink = requestBody.videoLink
        exercise.isFeatured = requestBody.isFeatured
        exercise.category_id = requestBody.category_id

        await exercise.save()
        return exercise
    }

    public async show({ params }: HttpContextContract) {
        return Exercise.query().where('id', params.id).preload('exerciseCategory')[0]
    }

    public async update({ params, request }: HttpContextContract) {
        const exerciseSchema = schema.create({
            name: schema.string({ trim: true }),
            videoLink: schema.string({ trim: true }),
            isFeatured: schema.boolean(),
            category_id: schema.number(),
        })

        const requestBody = await request.validate({ schema: exerciseSchema })

        const name = requestBody.name

        const exercise = await Exercise.findOrFail(params.id)
        exercise.name = name
        exercise.videoLink = requestBody.videoLink
        exercise.isFeatured = requestBody.isFeatured
        exercise.category_id = requestBody.category_id

        await exercise.save()
        return exercise
    }

    public async destroy({ params }: HttpContextContract) {
        let exercise = await Exercise.findOrFail(params.id)
        await exercise.delete()
        return exercise
    }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
    public async index({}: HttpContextContract) {
        return Exercise.query().orderBy('created_at')
    }

    public async getFeatured({}: HttpContextContract) {
        return Exercise.query().where('isFeatured', true).preload('exerciseCategory')
    }

    public async store({ request, response }: HttpContextContract) {
        const exerciseSchema = schema.create({
            name: schema.string({ trim: true }),
            thumbnail_link: schema.string({ trim: true }),
            video_link: schema.string({ trim: true }),
            is_featured: schema.boolean(),
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
        exercise.thumbnail_link = requestBody.thumbnail_link
        exercise.video_link = requestBody.video_link
        exercise.is_featured = requestBody.is_featured
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
            thumbnail_link: schema.string({ trim: true }),
            video_link: schema.string({ trim: true }),
            is_featured: schema.boolean(),
            category_id: schema.number(),
        })

        const requestBody = await request.validate({ schema: exerciseSchema })

        const name = requestBody.name

        const exercise = await Exercise.findOrFail(params.id)
        exercise.name = name
        exercise.thumbnail_link = requestBody.thumbnail_link
        exercise.video_link = requestBody.video_link
        exercise.is_featured = requestBody.is_featured
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

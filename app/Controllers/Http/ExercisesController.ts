import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ExercisesController {
    public async index({}: HttpContextContract) {}

    public async store({ request, response }: HttpContextContract) {
        const exerciseSchema = schema.create({
            name: schema.string({ trim: true }),
            videoLink: schema.string({ trim: true }),
            isFeatured: schema.boolean(),
            categoryID: schema.number(),
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
        exercise.categoryID = requestBody.categoryID

        await exercise.save()
        return exercise
    }
}

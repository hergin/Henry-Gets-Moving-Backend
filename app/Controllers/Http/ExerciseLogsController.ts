import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ExerciseLog from 'App/Models/ExerciseLog'

export default class ExerciseLogsController {
    public async store({ request, auth }: HttpContextContract) {
        const exerciseLogSchema = schema.create({
            type: schema.string(),
            intensity: schema.string(),
            duration: schema.number(),
            name: schema.string(),
            family_member_id: schema.number(),
        })

        const exerciseLogPayload = await request.validate({ schema: exerciseLogSchema })

        const exerciseLog = new ExerciseLog()

        exerciseLog.type = exerciseLogPayload.type
        exerciseLog.intensity = exerciseLogPayload.intensity
        exerciseLog.duration = exerciseLogPayload.duration
        exerciseLog.name = exerciseLogPayload.name
        exerciseLog.family_member_id = exerciseLogPayload.family_member_id
        await auth.use('api').authenticate()
        await exerciseLog.related('user').associate(auth.user!)

        await exerciseLog.save()
        return exerciseLog
    }
}

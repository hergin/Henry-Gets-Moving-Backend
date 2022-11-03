import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ExerciseLog from 'App/Models/ExerciseLog'

export default class ExerciseLogsController {
    public async store({ request }: HttpContextContract) {
        const exerciseLogSchema = schema.create({
            type: schema.string(),
            intensity: schema.string(),
            duration: schema.number(),
            familyMemberID: schema.number(),
        })

        const exerciseLogPayload = await request.validate({ schema: exerciseLogSchema })

        const exerciseLog = new ExerciseLog()

        exerciseLog.type = exerciseLogPayload.type
        exerciseLog.intensity = exerciseLogPayload.intensity
        exerciseLog.duration = exerciseLogPayload.duration
        exerciseLog.familyMemberID = exerciseLogPayload.familyMemberID

        await exerciseLog.save()
        return exerciseLog
    }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ExerciseLog from 'App/Models/ExerciseLog'
import FamilyMember from 'App/Models/FamilyMember'

export default class ExerciseLogsController {
    public async store({ request, auth }: HttpContextContract) {
        const exerciseLogSchema = schema.create({
            type: schema.string(),
            intensity: schema.string(),
            duration: schema.number(),
            name: schema.string(),
        })

        const exerciseLogPayload = await request.validate({ schema: exerciseLogSchema })

        const exerciseLog = new ExerciseLog()

        exerciseLog.type = exerciseLogPayload.type
        exerciseLog.intensity = exerciseLogPayload.intensity
        exerciseLog.duration = exerciseLogPayload.duration
        exerciseLog.name = exerciseLogPayload.name
        await auth.use('api').authenticate()
        await exerciseLog.related('user').associate(auth.user!)
        const familyMember = await FamilyMember.query()
            .where('user_id', '=', `${auth.user?.id}`)
            .where('name', '=', `${exerciseLogPayload.name}`)[0]
        await exerciseLog.related('familyMember').associate(familyMember)

        await exerciseLog.save()
        return exerciseLog
    }
}

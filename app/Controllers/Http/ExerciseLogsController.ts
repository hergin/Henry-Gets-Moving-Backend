import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import ExerciseLog from 'App/Models/ExerciseLog'
import FamilyMember from 'App/Models/FamilyMember'

export default class ExerciseLogsController {
    private getExerciseLogSchema() {
        return schema.create({
            type: schema.string(),
            intensity: schema.string(),
            duration: schema.number(),
            name: schema.string(),
            family_member_id: schema.number(),
            date: schema.string(),
        })
    }

    public async index({ auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        return ExerciseLog.query().where('user_id', '=', auth.user!.id)
    }

    public async store({ request, auth }: HttpContextContract) {
        const exerciseLogSchema = this.getExerciseLogSchema()

        const exerciseLogPayload = await request.validate({ schema: exerciseLogSchema })

        const exerciseLog = new ExerciseLog()

        exerciseLog.type = exerciseLogPayload.type
        exerciseLog.intensity = exerciseLogPayload.intensity
        exerciseLog.duration = exerciseLogPayload.duration
        exerciseLog.name = exerciseLogPayload.name
        exerciseLog.family_member_id = exerciseLogPayload.family_member_id
        exerciseLog.date = exerciseLogPayload.date
        await auth.use('api').authenticate()
        await exerciseLog.related('user').associate(auth.user!)

        await exerciseLog.save()
        return exerciseLog
    }

    public async show({ params, auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMember = await FamilyMember.findOrFail(params.id)
        return ExerciseLog.query().where('family_member_id', '=', familyMember.id)
    }
}

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
            family_member_id: schema.number(),
            date: schema.string(),
        })
    }

    private async authenticate({ auth }) {
        await auth.use('api').authenticate()
        return auth.user!
    }

    private async saveExerciseLog(exerciseLog, payload, user) {
        exerciseLog.type = payload.type
        exerciseLog.intensity = payload.intensity
        exerciseLog.duration = payload.duration
        exerciseLog.family_member_id = payload.family_member_id
        exerciseLog.date = payload.date
        await exerciseLog.related('user').associate(user)
        await exerciseLog.save()
        return exerciseLog
    }

    public async index({ auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        return ExerciseLog.query().where('user_id', '=', auth.user!.id)
    }

    public async store({ request, auth }: HttpContextContract) {
        const exerciseLogSchema = this.getExerciseLogSchema()

        const exerciseLogPayload = await request.validate({ schema: exerciseLogSchema })

        const exerciseLog = new ExerciseLog()
        const user = await this.authenticate({ auth })
        return this.saveExerciseLog(exerciseLog, exerciseLogPayload, user)
    }

    public async update({ request, auth, params }: HttpContextContract) {
        const exerciseLogSchema = this.getExerciseLogSchema()

        const exerciseLogPayload = await request.validate({ schema: exerciseLogSchema })

        const exerciseLog = await ExerciseLog.findOrFail(params.id)
        const user = await this.authenticate({ auth })
        return this.saveExerciseLog(exerciseLog, exerciseLogPayload, user)
    }

    public async show({ params, auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMember = await FamilyMember.findOrFail(params.id)
        return ExerciseLog.query().where('family_member_id', '=', familyMember.id)
    }

    public async destroy({ params }: HttpContextContract) {
        let log = await ExerciseLog.findOrFail(params.id)
        await log.delete()
        return log
    }
}

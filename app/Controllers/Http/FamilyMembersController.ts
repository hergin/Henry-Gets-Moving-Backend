// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import FamilyMember from 'App/Models/FamilyMember'

export default class FamilyMembersController {
    private getFamilyMemberSchema() {
        return schema.create({
            name: schema.string(),
            user_id: schema.number(),
        })
    }

    private getCheckFamilyMemberSchema() {
        return schema.create({
            name: schema.string(),
        })
    }

    public async index({ auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMembers = await FamilyMember.query()
            .where('user_id', '=', auth.use('api').user?.id!)
            .preload('exerciseLog')
        return familyMembers
    }

    public async store({ request }: HttpContextContract) {
        const familyMemberSchema = this.getFamilyMemberSchema()
        const familyMemberPayload = await request.validate({ schema: familyMemberSchema })
        const familyMember = new FamilyMember()
        familyMember.name = familyMemberPayload.name
        familyMember.user_id = familyMemberPayload.user_id
        await familyMember.load('user')

        await familyMember.save()

        return familyMember
    }

    public async show({ params, auth, bouncer }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMember = await FamilyMember.findOrFail(params.id)
        await familyMember.load('user')
        await bouncer.authorize('viewFamilyMember', familyMember)
        return familyMember
    }

    public async checkFamilyMember({ request, auth }: HttpContextContract) {
        const familyMemberSchema = this.getCheckFamilyMemberSchema()
        const familyMemberPayload = await request.validate({ schema: familyMemberSchema })
        await auth.use('api').authenticate()
        return await FamilyMember.firstOrCreate({
            name: familyMemberPayload.name,
            user_id: auth.use('api').user?.id,
        })
    }

    public async update({ params, auth, request }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMemberSchema = this.getFamilyMemberSchema()
        const familyMember = await FamilyMember.findOrFail(params.id)
        const requestBody = await request.validate({ schema: familyMemberSchema })
        familyMember.name = requestBody.name
        familyMember.user_id = requestBody.user_id
        await familyMember.load('user')
        await familyMember.save()
        return familyMember
    }

    public async destroy({ auth, params }: HttpContextContract) {
        await auth.use('api').authenticate()
        const member = await FamilyMember.findOrFail(params.id)
        await member.delete()
        return member
    }
}

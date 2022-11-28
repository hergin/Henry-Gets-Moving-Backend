// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import FamilyMember from 'App/Models/FamilyMember'

export default class FamilyMembersController {
    public async store({ request, auth }: HttpContextContract) {
        const familyMemberSchema = schema.create({
            name: schema.string(),
        })
        const familyMemberPayload = await request.validate({ schema: familyMemberSchema })
        const familyMember = new FamilyMember()
        familyMember.name = familyMemberPayload.name
        await familyMember.related('user').associate(auth.user!)

        await familyMember.save()

        return familyMember
    }

    public async show({ params, auth, bouncer }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMember = await FamilyMember.findOrFail(params.id)
        await familyMember.load('exerciseLog')
        await familyMember.load('user')
        await bouncer.authorize('viewFamilyMember', familyMember)
        return familyMember
    }
}

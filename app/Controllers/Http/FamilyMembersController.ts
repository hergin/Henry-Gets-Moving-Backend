// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import FamilyMember from 'App/Models/FamilyMember'

export default class FamilyMembersController {
    public async store({ request }: HttpContextContract) {
        const familyMemberSchema = schema.create({
            name: schema.string(),
            user_id: schema.number(),
        })
        const familyMemberPayload = await request.validate({ schema: familyMemberSchema })
        const user = await User.findOrFail(familyMemberPayload.user_id)
        const familyMember = new FamilyMember()
        familyMember.name = familyMemberPayload.name
        familyMember.user_id = user.id

        await familyMember.save()

        return familyMember
    }

    public async show({ params, auth, bouncer }: HttpContextContract) {
        await auth.use('api').authenticate()
        const familyMember = await FamilyMember.findOrFail(params.id)
        await familyMember.load('exerciseLog')
        console.log(familyMember)
        await bouncer.authorize('viewFamilyMember', familyMember)
        return familyMember
    }
}

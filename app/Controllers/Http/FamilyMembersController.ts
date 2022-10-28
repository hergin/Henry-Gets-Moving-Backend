// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import FamilyMember from 'App/Models/FamilyMember'

export default class FamilyMembersController {
    public async index({ params, auth }: HttpContextContract) {
        await auth.use('api').authenticate()
        const signedInUser = await User.findOrFail(params.id)
        return FamilyMember.query().where('userID', signedInUser.id)
    }

    public async store({ request }: HttpContextContract) {
        const familyMemberSchema = schema.create({
            name: schema.string(),
            userID: schema.number(),
        })
        const familyMemberPayload = await request.validate({ schema: familyMemberSchema })
        const user = await User.findOrFail(familyMemberPayload.userID)
        const familyMember = new FamilyMember()
        familyMember.name = familyMemberPayload.name
        familyMember.userID = user.id

        await familyMember.save()

        return familyMember
    }
}

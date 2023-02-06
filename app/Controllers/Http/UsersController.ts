import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UsersController {

    private getUserSchema(){
        return schema.create({
            email: schema.string({ trim: true }),
        })
    }

    public async index({}: HttpContextContract) {}

    public async store({ request, response }: HttpContextContract) {
        const userSchema = this.getUserSchema()
        const requestBody = await request.validate({ schema: userSchema })

        const email = requestBody.email

        const currentUser = await User.findBy('email', email)
        if (currentUser !== null) {
            response.badRequest('User already exists')
            return
        }

        const newUser = new User()
        newUser.email = email

        await newUser.save()

        return newUser
    }

    public async login({ request, auth, response }: HttpContextContract) {
        const loginSchema = this.getUserSchema()

        const userPayload = await request.validate({ schema: loginSchema })
        const user = await User.findBy('email', userPayload.email)
        if (user) {
            return await auth.use('api').generate(user)
        } else {
            response.badRequest('User does not exist')
            return
        }
    }

    public async show({ params, auth, bouncer }: HttpContextContract) {
        await auth.use('api').authenticate()
        const signedInUser = await User.findOrFail(params.id)
        await bouncer.authorize('viewFamilyMembers', signedInUser)
        return User.query().where('userID', signedInUser.id).preload('familyMembers')
    }

    public async update({}: HttpContextContract) {}

    public async destroy({}: HttpContextContract) {}
}

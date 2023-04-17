import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Env from '@ioc:Adonis/Core/Env'

export default class AdminsController {
    private getAdminSchema() {
        return schema.create({
            password: schema.string(),
        })
    }

    public async verifyAdmin({ request }: HttpContextContract) {
        const adminSchema = this.getAdminSchema()
        const adminPayload = await request.validate({ schema: adminSchema })
        return adminPayload.password === Env.get('ADMIN_PASS')
    }
}

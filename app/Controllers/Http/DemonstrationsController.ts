import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Demonstration from 'App/Models/Demonstration'

export default class DemonstrationsController {
    public async store({ request }: HttpContextContract) {
        const demonstrationSchema = schema.create({
            name: schema.string(),
            thumbnailLink: schema.string({ trim: true }),
            videoLink: schema.string({ trim: true }),
            demonstration_category_id: schema.number(),
        })

        const demoPayload = await request.validate({ schema: demonstrationSchema })

        const demo = new Demonstration()
        demo.name = demoPayload.name
        demo.thumbnailLink = demoPayload.thumbnailLink
        demo.videoLink = demoPayload.videoLink
        demo.demonstration_category_id = demoPayload.demonstration_category_id

        await demo.save()

        return demo
    }
}

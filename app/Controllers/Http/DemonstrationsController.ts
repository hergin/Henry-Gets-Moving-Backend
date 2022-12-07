import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Demonstration from 'App/Models/Demonstration'

export default class DemonstrationsController {
    public async index({}: HttpContextContract) {
        return Demonstration.query().orderBy('name').preload('demonstrationCategory')
    }
    public async getPaginated({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 8
        return Demonstration.query()
            .orderBy('name')
            .preload('demonstrationCategory')
            .paginate(page, limit)
    }

    public async store({ request }: HttpContextContract) {
        const demonstrationSchema = schema.create({
            name: schema.string(),
            thumbnail_link: schema.string({ trim: true }),
            video_link: schema.string({ trim: true }),
            demonstration_category_id: schema.number(),
        })

        const demoPayload = await request.validate({ schema: demonstrationSchema })

        const demo = new Demonstration()
        demo.name = demoPayload.name
        demo.thumbnail_link = demoPayload.thumbnail_link
        demo.video_link = demoPayload.video_link
        demo.demonstration_category_id = demoPayload.demonstration_category_id

        await demo.save()

        return demo
    }

    public async show({ params }: HttpContextContract) {
        const demo = await Demonstration.findOrFail(params.id)
        await demo.load('demonstrationCategory')
        return demo
    }

    public async update({ request, params }: HttpContextContract) {
        const demonstrationSchema = schema.create({
            name: schema.string(),
            thumbnail_link: schema.string({ trim: true }),
            video_link: schema.string({ trim: true }),
            demonstration_category_id: schema.number(),
        })

        const demoPayload = await request.validate({ schema: demonstrationSchema })
        const demo = await Demonstration.findOrFail(params.id)

        demo.name = demoPayload.name ?? demo.name
        demo.thumbnail_link = demoPayload.thumbnail_link ?? demo.thumbnail_link
        demo.video_link = demoPayload.video_link ?? demo.video_link
        demo.demonstration_category_id =
            demoPayload.demonstration_category_id ?? demo.demonstration_category_id

        await demo.save()
        return demo
    }

    public async destroy({ params }: HttpContextContract) {
        let demo = await Demonstration.findOrFail(params.id)
        await demo.delete()
        return demo
    }
}

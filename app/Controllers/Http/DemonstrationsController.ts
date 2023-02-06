import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Demonstration from 'App/Models/Demonstration'

export default class DemonstrationsController {
    private getDemonstrationSchema() {
        return schema.create({
            name: schema.string(),
            thumbnail_link: schema.string({ trim: true }),
            video_link: schema.string({ trim: true }),
            demonstration_category_id: schema.number(),
        })
    }

    private async saveDemonstration(demo, payload) {
        demo.name = payload.name
        demo.thumbnail_link = payload.thumbnail_link
        demo.video_link = payload.video_link
        demo.demonstration_category_id = payload.demonstration_category_id

        await demo.save()

        return demo
    }

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
        const demonstrationSchema = this.getDemonstrationSchema()

        const demoPayload = await request.validate({ schema: demonstrationSchema })

        const demo = new Demonstration()
        return this.saveDemonstration(demo, demoPayload)
    }

    public async show({ params }: HttpContextContract) {
        const demo = await Demonstration.findOrFail(params.id)
        await demo.load('demonstrationCategory')
        return demo
    }

    public async update({ request, params }: HttpContextContract) {
        const demonstrationSchema = this.getDemonstrationSchema()

        const demoPayload = await request.validate({ schema: demonstrationSchema })
        const demo = await Demonstration.findOrFail(params.id)

        return this.saveDemonstration(demo, demoPayload)
    }

    public async destroy({ params }: HttpContextContract) {
        let demo = await Demonstration.findOrFail(params.id)
        await demo.delete()
        return demo
    }
}

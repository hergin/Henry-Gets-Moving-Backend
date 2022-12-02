import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diagram from 'App/Models/Diagram'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DiagramsController {
    public async index({}: HttpContextContract) {
        return Diagram.query().orderBy('updated_at')
    }

    public async store({ request }: HttpContextContract) {
        const diagramSchema = schema.create({
            thumbnail_link: schema.string({ trim: true }),
        })

        const diagramPayload = await request.validate({ schema: diagramSchema })
        const diagram = new Diagram()

        diagram.thumbnail_link = diagramPayload.thumbnail_link

        await diagram.save()

        return diagram
    }

    public async update({ request, params }: HttpContextContract) {
        const diagramSchema = schema.create({
            thumbnail_link: schema.string({ trim: true }),
        })

        const diagramPayload = await request.validate({ schema: diagramSchema })
        const diagram = await Diagram.findOrFail(params.id)

        diagram.thumbnail_link = diagramPayload.thumbnail_link

        await diagram.save()

        return diagram
    }

    public async show({ params }: HttpContextContract) {
        return Diagram.findOrFail(params.id)
    }

    public async destroy({ params }: HttpContextContract) {
        const diagram = await Diagram.findOrFail(params.id)
        await diagram.delete()
        return diagram
    }
}

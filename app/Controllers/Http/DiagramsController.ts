import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diagram from 'App/Models/Diagram'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DiagramsController {
    private getDiagramsSchema() {
        return schema.create({
            name: schema.string(),
            thumbnail_link: schema.string({ trim: true }),
        })
    }

    private async saveDiagram(diagram, payload) {
        diagram.name = payload.name
        diagram.thumbnail_link = payload.thumbnail_link

        await diagram.save()

        return diagram
    }

    public async index({}: HttpContextContract) {
        return Diagram.query().orderBy('updated_at')
    }

    public async store({ request }: HttpContextContract) {
        const diagramSchema = this.getDiagramsSchema()

        const diagramPayload = await request.validate({ schema: diagramSchema })
        const diagram = new Diagram()
        return this.saveDiagram(diagram, diagramPayload)
    }

    public async update({ request, params }: HttpContextContract) {
        const diagramSchema = this.getDiagramsSchema()

        const diagramPayload = await request.validate({ schema: diagramSchema })
        const diagram = await Diagram.findOrFail(params.id)

        return this.saveDiagram(diagram, diagramPayload)
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

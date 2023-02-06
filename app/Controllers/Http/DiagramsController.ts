import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diagram from 'App/Models/Diagram'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DiagramsController {
    private getDiagramsSchema(){
        return schema.create({
            name: schema.string(),
            thumbnail_link: schema.string({ trim: true }),
        })
    }


    public async index({}: HttpContextContract) {
        return Diagram.query().orderBy('updated_at')
    }

    public async store({ request }: HttpContextContract) {
        const diagramSchema = this.getDiagramsSchema()

        const diagramPayload = await request.validate({ schema: diagramSchema })
        const diagram = new Diagram()

        diagram.name = diagramPayload.name
        diagram.thumbnail_link = diagramPayload.thumbnail_link

        await diagram.save()

        return diagram
    }

    public async update({ request, params }: HttpContextContract) {
        const diagramSchema = this.getDiagramsSchema()

        const diagramPayload = await request.validate({ schema: diagramSchema })
        const diagram = await Diagram.findOrFail(params.id)

        diagram.name = diagramPayload.name ?? diagram.name
        diagram.thumbnail_link = diagramPayload.thumbnail_link ?? diagram.thumbnail_link

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

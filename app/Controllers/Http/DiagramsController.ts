import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Diagram from 'App/Models/Diagram'

export default class DiagramsController {
    public async index({}: HttpContextContract) {
        return Diagram.query().orderBy('updated_at')
    }
}

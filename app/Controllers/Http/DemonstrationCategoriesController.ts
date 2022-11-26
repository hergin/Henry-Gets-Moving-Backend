import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DemonstrationCategory from 'App/Models/DemonstrationCategory'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DemonstrationCategoriesController {
    public async index({}: HttpContextContract) {
        return DemonstrationCategory.query().orderBy('name')
    }

    public async store({ request }: HttpContextContract) {
        const demonstrationCategorySchema = schema.create({
            name: schema.string(),
        })

        const demonstrationCategoryPayload = await request.validate({
            schema: demonstrationCategorySchema,
        })

        const demonstrationCategory = new DemonstrationCategory()
        demonstrationCategory.name = demonstrationCategoryPayload.name

        await demonstrationCategory.save()

        return demonstrationCategory
    }

    public async destroy({ params }: HttpContextContract) {
        let demoCategory = await DemonstrationCategory.findOrFail(params.id)
        await demoCategory.delete()
        return demoCategory
    }
}

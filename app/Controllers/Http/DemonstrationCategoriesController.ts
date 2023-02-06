import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DemonstrationCategory from 'App/Models/DemonstrationCategory'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class DemonstrationCategoriesController {
    private getDemonstrationCategorySchema() {
        return schema.create({
            name: schema.string(),
        })
    }

    private async saveDemonstrationCategory(demonstrationCategory, payload) {
        demonstrationCategory.name = payload.name

        await demonstrationCategory.save()

        return demonstrationCategory
    }

    public async index({}: HttpContextContract) {
        return DemonstrationCategory.query().orderBy('name')
    }

    public async store({ request }: HttpContextContract) {
        const demonstrationSchema = this.getDemonstrationCategorySchema()
        const demonstrationCategoryPayload = await request.validate({
            schema: demonstrationSchema,
        })
        const demonstrationCategory = new DemonstrationCategory()

        return this.saveDemonstrationCategory(demonstrationCategory, demonstrationCategoryPayload)
    }

    public async destroy({ params }: HttpContextContract) {
        let demoCategory = await DemonstrationCategory.findOrFail(params.id)
        await demoCategory.delete()
        return demoCategory
    }
}

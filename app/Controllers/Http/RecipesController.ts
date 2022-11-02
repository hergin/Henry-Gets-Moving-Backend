import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
    public async index({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 9
        return Recipe.query().preload('recipeCategory').orderBy('created_at').paginate(page, limit)
    }

    public async store({ request, response }: HttpContextContract) {
        const recipeSchema = schema.create({
            name: schema.string({ trim: true }),
            thumbnail: schema.string({ trim: true }),
            isFeatured: schema.boolean(),
            categoryID: schema.number(),
        })

        const requestBody = await request.validate({ schema: recipeSchema })
        const name = requestBody.name

        if ((await Recipe.findBy('name', name)) !== null) {
            response.badRequest('Recipe already exists')
            return
        }

        const recipe = new Recipe()
        recipe.name = name
        recipe.thumbnail = requestBody.thumbnail
        recipe.isFeatured = requestBody.isFeatured
        recipe.categoryID = requestBody.categoryID

        await recipe.save()
        return recipe
    }

    public async destroy({ params }: HttpContextContract) {
        let recipe = await Recipe.findOrFail(params.id)
        await recipe.delete()
        return recipe
    }
}

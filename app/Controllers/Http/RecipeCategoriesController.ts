import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import RecipeCategory from 'App/Models/RecipeCategory'

export default class RecipeCategoriesController {
    public async index({}: HttpContextContract) {
        return RecipeCategory.query().orderBy('name')
    }

    public async store({ request, response }: HttpContextContract) {
        const recipeCategorySchema = schema.create({
            name: schema.string(),
        })

        const requestBody = await request.validate({ schema: recipeCategorySchema })

        if ((await RecipeCategory.findBy('name', requestBody.name)) !== null) {
            response.badRequest('Recipe Category already exists')
            return
        }

        const recipeCategory = new RecipeCategory()
        recipeCategory.name = requestBody.name

        await recipeCategory.save()
        return recipeCategory
    }
}

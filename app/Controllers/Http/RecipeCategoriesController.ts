import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import RecipeCategory from 'App/Models/RecipeCategory'

export default class RecipeCategoriesController {
    private getRecipeCategorySchema() {
        return schema.create({
            name: schema.string(),
        })
    }

    public async index({}: HttpContextContract) {
        return RecipeCategory.query().orderBy('name')
    }

    public async store({ request, response }: HttpContextContract) {
        const recipeCategorySchema = this.getRecipeCategorySchema()

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

    public async show({ params }: HttpContextContract) {
        return RecipeCategory.query().where('id', params.id).preload('recipe')[0]
    }

    public async destroy({ params }: HttpContextContract) {
        let recipeCategory = await RecipeCategory.findOrFail(params.id)
        await recipeCategory.delete()
        return recipeCategory
    }
}

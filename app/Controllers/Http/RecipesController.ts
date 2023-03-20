import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
    private getRecipeSchema() {
        return schema.create({
            name: schema.string({ trim: true }),
            thumbnail: schema.string({ trim: true }),
            cook_time: schema.string({}, [rules.maxLength(65535)]),
            ingredients: schema.string({}, [rules.maxLength(65535)]),
            recipe_steps: schema.string({}, [rules.maxLength(65535)]),
            is_featured: schema.boolean(),
            prep_time: schema.string(),
        })
    }

    private async saveRecipe(recipe, payload) {
        recipe.name = payload.name
        recipe.thumbnail = payload.thumbnail
        recipe.is_featured = payload.is_featured
        recipe.cook_time = payload.cook_time
        recipe.recipe_steps = payload.recipe_steps
        recipe.ingredients = payload.ingredients
        recipe.prep_time = payload.prep_time

        await recipe.save()
        return recipe
    }

    public async index({}: HttpContextContract) {
        return Recipe.query().preload('recipeCategories').orderBy('name')
    }

    public async getPaginated({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 8
        return await Recipe.query()
            .preload('recipeCategories')
            .orderBy('created_at')
            .paginate(page, limit)
    }

    public async store({ request, response }: HttpContextContract) {
        const recipeSchema = this.getRecipeSchema()

        const requestBody = await request.validate({ schema: recipeSchema })
        const name = requestBody.name

        if ((await Recipe.findBy('name', name)) !== null) {
            response.badRequest('Recipe already exists')
            return
        }

        const recipe = new Recipe()
        return this.saveRecipe(recipe, requestBody)
    }

    public async update({ params, request }: HttpContextContract) {
        const recipeSchema = this.getRecipeSchema()

        const requestBody = await request.validate({ schema: recipeSchema })

        const recipe = await Recipe.findOrFail(params.id)
        return this.saveRecipe(recipe, requestBody)
    }

    public async show({ params }: HttpContextContract) {
        const recipe = await Recipe.query().where('id', params.id).preload('recipeCategories')
        return recipe[0]
    }

    public async destroy({ params }: HttpContextContract) {
        let recipe = await Recipe.findOrFail(params.id)
        await recipe.related('recipeCategories').detach()
        await recipe.delete()
        return recipe
    }
}

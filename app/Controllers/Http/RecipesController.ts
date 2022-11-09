import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {
    public async index({ }: HttpContextContract) {
        return Recipe.query().preload('recipeCategory').orderBy('name')
    }

    public async getFeatured({}: HttpContextContract) {
        return Recipe.query().where('isFeatured', true).preload('recipeCategory')
    }

    public async store({ request, response }: HttpContextContract) {
        const recipeSchema = schema.create({
            name: schema.string({ trim: true }),
            thumbnail: schema.string({ trim: true }),
            cook_time: schema.string(),
            ingredients: schema.string(),
            recipe_steps: schema.string(),
            isFeatured: schema.boolean(),
            category_id: schema.number(),
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
        recipe.cook_time = requestBody.cook_time
        recipe.recipe_steps = requestBody.recipe_steps
        recipe.ingredients = requestBody.ingredients
        recipe.category_id = requestBody.category_id

        await recipe.save()
        return recipe
    }

    public async update({ params, request }: HttpContextContract) {
        const recipeSchema = schema.create({
            name: schema.string({ trim: true }),
            thumbnail: schema.string({ trim: true }),
            cook_time: schema.string(),
            ingredients: schema.string(),
            recipe_steps: schema.string(),
            isFeatured: schema.boolean(),
            category_id: schema.number(),
        })

        const requestBody = await request.validate({ schema: recipeSchema })
        const name = requestBody.name

        const recipe = await Recipe.findOrFail(params.id)
        recipe.name = name
        recipe.thumbnail = requestBody.thumbnail
        recipe.isFeatured = requestBody.isFeatured
        recipe.cook_time = requestBody.cook_time
        recipe.recipe_steps = requestBody.recipe_steps
        recipe.ingredients = requestBody.ingredients
        recipe.category_id = requestBody.category_id

        await recipe.save()
        return recipe
    }

    public async show({ params }: HttpContextContract) {
        return Recipe.query().where('id', params.id).preload('recipeCategory')[0]
    }

    public async destroy({ params }: HttpContextContract) {
        let recipe = await Recipe.findOrFail(params.id)
        await recipe.delete()
        return recipe
    }
}

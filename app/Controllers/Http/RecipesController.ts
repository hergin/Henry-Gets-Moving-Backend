import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Recipe from 'App/Models/Recipe'

export default class RecipesController {

    private getRecipeSchema(){
        return schema.create({
            name: schema.string({ trim: true }),
            thumbnail: schema.string({ trim: true }),
            cook_time: schema.string({}, [rules.maxLength(65535)]),
            ingredients: schema.string({}, [rules.maxLength(65535)]),
            recipe_steps: schema.string({}, [rules.maxLength(65535)]),
            is_featured: schema.boolean(),
            category_id: schema.number(),
            prep_time: schema.string(),
        })
    }

    public async index({}: HttpContextContract) {
        return Recipe.query().preload('recipeCategory').orderBy('name')
    }

    public async getPaginated({ request }: HttpContextContract) {
        const page = request.input('page', 1)
        const limit = 8
        return await Recipe.query()
            .preload('recipeCategory')
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
        recipe.name = name
        recipe.thumbnail = requestBody.thumbnail
        recipe.is_featured = requestBody.is_featured
        recipe.cook_time = requestBody.cook_time
        recipe.recipe_steps = requestBody.recipe_steps
        recipe.ingredients = requestBody.ingredients
        recipe.category_id = requestBody.category_id
        recipe.prep_time = requestBody.prep_time

        await recipe.save()
        return recipe
    }

    public async update({ params, request }: HttpContextContract) {
        const recipeSchema = this.getRecipeSchema()

        const requestBody = await request.validate({ schema: recipeSchema })
        const name = requestBody.name

        const recipe = await Recipe.findOrFail(params.id)
        recipe.name = name
        recipe.thumbnail = requestBody.thumbnail
        recipe.is_featured = requestBody.is_featured
        recipe.cook_time = requestBody.cook_time
        recipe.recipe_steps = requestBody.recipe_steps
        recipe.ingredients = requestBody.ingredients
        recipe.category_id = requestBody.category_id
        recipe.prep_time = requestBody.prep_time

        await recipe.save()
        return recipe
    }

    public async show({ params }: HttpContextContract) {
        const recipe = await Recipe.query().where('id', params.id).preload('recipeCategory')
        return recipe[0]
    }

    public async destroy({ params }: HttpContextContract) {
        let recipe = await Recipe.findOrFail(params.id)
        await recipe.delete()
        return recipe
    }
}

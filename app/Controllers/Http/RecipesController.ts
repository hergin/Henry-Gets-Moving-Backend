import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import Recipe from 'App/Models/Recipe';

export default class RecipesController {

    public async index({}: HttpContextContract) {}

    public async store({ request, response }: HttpContextContract) {
        const recipeSchema = schema.create({
            name: schema.string({ trim: true }),
            thumbnail: schema.string({ trim: true }),
            isFeatured: schema.boolean(),
            categoryID: schema.number(),
        })

        const requestBody = await request.validate({schema: recipeSchema});
        const name = requestBody.name

        if ((await Recipe.findBy('name',name))!==null) {
            response.badRequest('Recipe already exists')
            return
        }

        const recipe = new Recipe()
        recipe.name = name
        recipe.thumbnail = requestBody.thumbnail
        recipe.isFeatured = requestBody.isFeatured
        recipe.categoryID = requestBody.categoryID
    }

}

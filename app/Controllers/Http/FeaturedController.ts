import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Exercise from 'App/Models/Exercise'
import Recipe from 'App/Models/Recipe'

export default class FeaturedController {
    public async getFeaturedExercise({}: HttpContextContract) {
        const featured = await Exercise.query()
            .where('is_featured', true)
            .preload('exerciseCategory')
        return featured[0]
    }

    public async getFeaturedRecipe({}: HttpContextContract) {
        const featured = await Recipe.query().where('is_featured', true).preload('recipeCategory')
        return featured[0]
    }

    public async updateFeaturedExercise({ params }: HttpContextContract) {
        const oldFeatured = await Exercise.query()
            .where('is_featured', true)
            .preload('exerciseCategory')[0]
        const newFeatured = await Exercise.findOrFail(params.id)
        if (newFeatured === oldFeatured) {
            return oldFeatured
        } else {
            oldFeatured.is_featured = false
            newFeatured.is_featured = true
            return newFeatured
        }
    }
    public async updateFeaturedRecipe({ params }: HttpContextContract) {
        const oldFeatured = await Recipe.query()
            .where('is_featured', true)
            .preload('recipeCategory')[0]
        const newFeatured = await Recipe.findOrFail(params.id)
        if (newFeatured === oldFeatured) {
            return oldFeatured
        } else {
            oldFeatured.is_featured = false
            newFeatured.is_featured = true
            return newFeatured
        }
    }
}

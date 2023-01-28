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
        const featuredArray = await Exercise.query().where('is_featured', true)
        const oldFeatured = featuredArray[0]
        const newFeatured = await Exercise.findOrFail(params.id)
        return this.swapFeatured(newFeatured, oldFeatured)
    }
    public async updateFeaturedRecipe({ params }: HttpContextContract) {
        const featuredArray = await Recipe.query()
            .where('is_featured', true)
            .preload('recipeCategory')
        const oldFeatured = featuredArray[0]
        const newFeatured = await Recipe.findOrFail(params.id)
        return this.swapFeatured(newFeatured, oldFeatured)
    }
    private async swapFeatured(newFeatured, oldFeatured) {
        if (newFeatured === oldFeatured || !oldFeatured) {
            newFeatured.is_featured = true
            await newFeatured.save()
            return newFeatured
        } else {
            oldFeatured.is_featured = false
            await oldFeatured.save()
            newFeatured.is_featured = true
            await newFeatured.save()
            return newFeatured
        }
    }
}

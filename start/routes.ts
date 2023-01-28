/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import UsersController from 'App/Controllers/Http/UsersController'

Route.resource('users', 'UsersController')
    .apiOnly()
    .except(['destroy', 'update', 'index'])
    .middleware({ show: 'auth' })
Route.resource('familyMembers', 'FamilyMembersController')
    .apiOnly()
    .middleware({ show: 'auth', store: 'auth' })
Route.resource('exerciseLogs', 'ExerciseLogsController').apiOnly()
Route.resource('exerciseCategories', 'ExerciseCategoriesController').apiOnly()
Route.resource('exercises', 'ExercisesController').apiOnly()
Route.resource('recipeCategories', 'RecipeCategoriesController').apiOnly()
Route.resource('recipes', 'RecipesController').apiOnly()
Route.resource('demos', 'DemonstrationsController').apiOnly()
Route.resource('demoCategories', 'DemonstrationCategoriesController').apiOnly()
Route.resource('diagrams', 'DiagramsController')

Route.post('/users/login', (ctx) => {
    return new UsersController().login(ctx)
})
Route.post('/checkFamilyMember', 'FamilyMembersController.checkFamilyMember')

Route.get('/featuredExercise', 'FeaturedController.getFeaturedExercise')
Route.get('/featuredRecipe', 'FeaturedController.getFeaturedRecipe')
Route.get('/paginatedRecipes', 'RecipesController.getPaginated')
Route.get('/paginatedExercises', 'ExercisesController.getPaginated')
Route.get('/paginatedDemos', 'DemonstrationsController.getPaginated')

Route.post('/changeFeaturedExercise/:id', 'FeaturedController.updateFeaturedExercise')
Route.post('/changeFeaturedRecipe/:id', 'FeaturedController.updateFeaturedRecipe')

Route.get('/', async () => {
    return { hello: 'world' }
})

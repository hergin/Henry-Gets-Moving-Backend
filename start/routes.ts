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
Route.resource('familyMembers', 'FamilyMembersController').apiOnly().middleware({ show: 'auth' })
Route.resource('exerciseLogs', 'ExerciseLogsController').apiOnly()
Route.resource('exerciseCategories', 'ExerciseCategoriesController').apiOnly()
Route.resource('exercises', 'ExercisesController').apiOnly()
Route.resource('recipeCategories', 'RecipeCategoriesController').apiOnly()
Route.resource('recipes', 'RecipesController').apiOnly()

Route.post('/users/login', (ctx) => {
    return new UsersController().login(ctx)
})

Route.get('/featuredExercise', 'ExercisesController.getFeatured')
Route.get('/featuredRecipe', 'RecipesController.getFeatured')

Route.get('/', async () => {
    return { hello: 'world' }
})

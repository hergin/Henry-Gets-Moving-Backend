import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RecipeCategory from 'App/Models/RecipeCategory'

export default class extends BaseSeeder {
    public async run() {
        await RecipeCategory.createMany([
            {
                name: 'Test recipecategory',
            },
            {
                name: 'Tets recipe Category 2',
            },
        ])
    }
}

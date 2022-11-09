import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'recipes'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string('name').notNullable()
            table.string('thumbnail').notNullable()
            table.string('cook_time')
            table.string('ingredients')
            table.string('recipe_steps')
            table.integer('category_id').notNullable().unsigned().references('recipe_categories.id')
            table.boolean('isFeatured').notNullable().defaultTo(false)

            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}

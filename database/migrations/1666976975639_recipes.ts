import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'recipes'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')

            table.string('name').notNullable()
            table.string('thumbnail').notNullable()
            table.string('cook_time')
            table.text('ingredients', 'text').notNullable()
            table.text('recipe_steps', 'text').notNullable()
            table.boolean('is_featured').notNullable().defaultTo(false)
            table.string('prep_time')

            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}

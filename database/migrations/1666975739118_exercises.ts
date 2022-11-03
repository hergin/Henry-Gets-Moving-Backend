import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'exercises'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name').notNullable()
            table.string('videoLink')
            table.boolean('isFeatured').notNullable().defaultTo(false)
            table
                .integer('category_id')
                .notNullable()
                .unsigned()
                .references('exercise_categories.id')

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
            table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}

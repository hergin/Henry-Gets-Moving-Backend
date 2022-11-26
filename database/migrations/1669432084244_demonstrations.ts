import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'demonstrations'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string('name')
            table.string('thumbnailLink')
            table.string('videoLink')
            table
                .integer('demonstration_category_id')
                .unsigned()
                .references('demonstration_categories.id')
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

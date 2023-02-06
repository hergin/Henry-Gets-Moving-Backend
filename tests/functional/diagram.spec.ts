import { test } from '@japa/runner'

test.group('Diagrams', () => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()

        return () => Database.rollbackGlobalTransaction()
    })
})

import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import FamilyMemberFactory from './FamilyMemberFactory'

export default Factory.define(User, ({ faker }) => {
    return {
        id: faker.datatype.number(),
        email: faker.internet.email(),
    }
}).build()

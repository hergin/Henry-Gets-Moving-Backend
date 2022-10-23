import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({faker})=>{
  return {
    id: faker.datatype.number(),
    email: faker.internet.email(),
    rememberMeToken: faker.datatype.string(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    familyMembers: faker.datatype.array(),
  };
}).build()

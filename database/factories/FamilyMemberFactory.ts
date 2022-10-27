import FamilyMember from 'App/Models/FamilyMember'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(FamilyMember, ({faker})=>{
  return {
    userId: faker.datatype.number(),
    name: faker.name.firstName(),
  };
}).build();

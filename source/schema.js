const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


// hardcoded data
let customers = [
    {id:"1", name:"John Doe", email:"jdoe@gmail.com", age:32},
    {id:"2", name:'Sarah Birindwa', email:'sarah@gmail.com', age:24},
    {id:"3", name:'Dada Mirindi', email:'rehema@gmail.com', age:35}
]



//  Customer type
const customerType = new GraphQLObjectType({
    name: 'Customer',
    fields:() => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},

    })
})

//root query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer:{
            type: customerType,
            args:{
                id: {type:GraphQLString}
            },
            resolver(parentValue, args){
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
            }
        },
        customers: {
            type: GraphQLList(customerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
    
});


module.exports = new GraphQLSchema({
    query: RootQuery 
});
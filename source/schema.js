const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const axios = require('axios');


// hardcoded data
/*
let customers = [
    {id:"1", name:"John Doe", email:"jdoe@gmail.com", age:32},
    {id:"2", name:'Sarah Birindwa', email:'sarah@gmail.com', age:24},
    {id:"3", name:'Dada Mirindi', email:'rehema@gmail.com', age:35}
]
*/


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
            resolve(parentValue, args){
                /*
                for(let i = 0; i < customers.length; i++){
                    if(customers[i].id == args.id){
                        return customers[i]
                    }
                }
                */
               return axios.get('http://localhost:3000/customers/'+args.id)
                            .then(res => res.data);

            }
        },
        customers: {
            type: GraphQLList(customerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers')
                        .then(res => res.data);
            }
        }
    }
    
});


const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addCustomer:{
            type: customerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},

            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers',{
                    name:args.name,
                    email:args.email,
                    age: args.age
                })
                .then(res => res.data);
            }

        },
        deleteCustomer:{
            type: customerType,
            args: {
                id:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/'+args.id)
                .then(res => res.data);
            }

        },
        editCustomer:{
            type: customerType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},

            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/customers/'+args.id,{
                    name:args.name,
                    email:args.email,
                    age: args.age
                })
                .then(res => res.data);
            }

        },

    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}))



const port = process.env.PORT || 4000;


app.listen(port, ()=> console.log(`server run on port ${port}...`))
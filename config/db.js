const mongo = require('mongoose');

const uri = "mongodb+srv://quangrc2001:quang010101@cluster0.qf2iso0.mongodb.net/api_huea?retryWrites=true&w=majority";

async function connect(){
    try{
        await mongo.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('Connected to database');
    } catch (error){
        console.log('Failed to connect');
    }
}

module.exports = {connect};
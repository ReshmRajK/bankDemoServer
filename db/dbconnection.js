// to implement mongoose for server and database connection
const mongoose=require('mongoose')
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log(`Mongodb is connected.......`);
}).catch(()=>{
    console.log(`mongodb is not connected`);
})
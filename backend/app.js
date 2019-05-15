const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');
const morgan=require('morgan');
const passport=require('passport');
const orders=require('./routes/orders.route');
const users=require('./routes/users.route');
const arts=require('./routes/arts.route');
const config=require('./config/database');

const app=express();


const port=9000;

mongoose.connect(config.database, {useNewUrlParser:true});
mongoose.connection.on('connected',()=>{
console.log('connected to database'+config.database);
});

mongoose.connection.on('error',(err)=>{
    console.log('error while connecting'+err);
    });
    
//to remove node collection depreciation warning
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//set static folder
app.use(express.static(path.join( __dirname,'public')));

//morgan middleware
app.use(morgan('dev'));
//cors middleware
app.use(cors());

//making the uploads folder publicly available
app.use('/uploads', express.static('uploads'));




//body parse middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use('/orders',orders);
app.use('/arts',arts);
app.use('/users',users);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/',(req,res)=>{

    res.send("welcome to home page")

});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})

app.listen(port,()=>{
    console.log("server has started...")
    
})

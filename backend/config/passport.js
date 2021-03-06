const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const config=require('../config/database');
const user_Controller=require('../controller/user.controller');


module.exports=function(passport){
    let opts={};

    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey=config.secret;

    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        
        user_Controller.getUserById(jwt_payload._id,(err,user)=>{
            if(err){
                return done(err,false)
            }
            if(user){
              return done(null,user)   
            }

            else{
                return done(null,false)
            }
        })

    }))
}
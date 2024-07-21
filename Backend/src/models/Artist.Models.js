import  Mongoose from "mongoose";
const ArtistSchema = new Mongoose.Schema({
    id:{
        type:String,
       required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,   
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true,
        
    },
    address:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
        required:true,
        
    },
    experience:{
        type:String,
        required:true,
        
    },
    skills:{
        type:String,
        required:true,
        
    },
    gender:{
        type:String,
        required:true,
        
    },
    avatar:{
        type:String,
        required:true,
        
    }
})
const Artist = Mongoose.model("Artist",ArtistSchema)
export default Artist

import Mongoose  from "mongoose";

const Feedbackschema= new Mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
query:{
    type:String,
    required:true
}

})


const Feedback = Mongoose.model("Feedback",Feedbackschema)
export default Feedback;
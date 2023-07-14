const mongoose=require('mongoose');

const userBlogCoverSchema= new mongoose.Schema({
    
    coverPic:{
       data:Buffer,
       contentType:String,
    },
    ext:{
        type:String,

    },
  
    date: {
        type: Date,
        default: Date.now
    }

})

const blogCoverModel = mongoose.model("coverPic", userBlogCoverSchema);

module.exports =blogCoverModel;
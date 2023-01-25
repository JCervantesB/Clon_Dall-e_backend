import mongoose from "mongoose";   

const Post = new mongoose.Schema({
    nombre: { type: String, required: true },
    instrucciones: { type: String, required: true },
    imagen: { type: String, required: true },
});

const PostModel = mongoose.model("Post", Post);

export default PostModel;
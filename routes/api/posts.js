const express = require("express");
const router = express.Router();

const Post = require("../../models/Post");

router.post("/create", async (req, res) => {
    const {title, model} = req.body;

    const is_exist = await Post.findOne({ title: title});
    if(is_exist) return res.status(422).json('Post already exist with same title');

    try {
        const newPost = new Post({ title: title, model: model });
        const result = await newPost.save();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(422).json("Data can't process!");
    }
    
});

router.get('/get', async (req, res) => {
    const posts = await Post.find();
    return res.status(200).json(posts);
});

router.get('/getById/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.findOne({_id: postId});
    return res.status(200).json(post);
});

router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await Post.deleteOne({ _id: postId});
    return res.status(200).json(post);
});

module.exports = router;
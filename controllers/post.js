const Post = require('../models/postModel');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');


const postController = {
    getPosts: async (req, res) => {
        const query = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
        const sort = req.query.sort == "dsc" ? {"createdAt": -1} : {'createdAt': 1};
        const getPosts = await Post.find(query).populate(
            {
                path: 'user',
                select: 'name photo',
            }
        ).sort(sort);
        successHandler(res, "所有貼文", getPosts);
    }, //end of getPosts()
    getPostById: async (req, res, next) => {
        const id = req.params.id;
        if(id){
            const post = await Post.findById(id).populate(
                {
                    path: 'user',
                    select: 'name photo',
                }
            );
            successHandler(res, '取得該貼文', post);
        }else{
            errorHandler(res);
        }
    }, // end of getPostById()
    createPost: async (req, res) => {
        try {
            const data = req.body;
            if(data.content){
                console.log(data.content);
                const newPost = await Post.create(data);
                console.log(newPost);

                // const posts = await Post.find({});
                const posts = await Post.find({}).populate(
                    {
                        path: 'user',
                        select: 'name photo',
                    }
                );
                successHandler(res, '新增一則貼文', posts);
            }else{
                errorHandler(res);
            }          
        } catch (error) {
            errorHandler(res, error);
        }
    }, // end of createPost()

};//end of postController

module.exports = postController;
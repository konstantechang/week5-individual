const Post = require('../models/postModel');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');


const postController = {
    getPosts: async (req, res) => {
        /* 
            #swagger.tags = ['Posts']
        */

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
        /* 
            #swagger.tags = ['Posts']
        */
        const id = req.params.id;
        if(id){
            const post = await Post.findById(id).populate(
                {
                    path: 'user',
                    select: 'name photo',
                }
            );
            // if(post.data){
                successHandler(res, '取得該貼文', post);

            // }else{
            //     return next(appError(400, "無此使用者ID", next));
            // }
        }else{
            //errorHandler(res);
            //改寫為統一處理    自定義錯誤
            return next(appError(400, "無此使用者ID", next));
        }
    }, // end of getPostById()
    createPost: async (req, res, next) => {
        /* 
            #swagger.tags = ['Posts']
        */
        
            const data = req.body;
            if(data.content){
                //console.log(data.content);
                //const newPost = await Post.create(data);
                //console.log(newPost);

                // const posts = await Post.find({});
                // const posts = await Post.find({}).populate(
                //     {
                //         path: 'user',
                //         select: 'name photo',
                //     }
                // );

                const posts = await Post.create(data);

                successHandler(res, '新增一則貼文', posts);
            }else{
                //errorHandler(res);
                //改為自定義的Error
                return next(appError(400, "您未填寫 content 資料", next));

            }
            
            
        
    }, // end of createPost()

};//end of postController

module.exports = postController;
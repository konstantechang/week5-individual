const Post = require('../models/postModel');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');
const appError = require('../service/appError');
const handleErrorAsync = require('../service/handleErrorAsync');


const postController = {
    getPosts: async (req, res) => {
        /* 
            #swagger.tags = ['Posts']
            #swagger.description = '取得<b>全部</b>貼文 API'
            #swagger.responses[200] = {
                description: '貼文資訊',
                schema: {
                    "status": true,
                    "message": "取得該貼文",
                    "data": {
                    "_id": "627140f3b29cc8686c006aee",
                    "user": {
                        "_id": "62713a3072d92f8a2b5ffaa0",
                        "name": "Malenia",
                        "photo": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fassets2.rockpapershotgun.com%2Fmalenia-head-elden-ring.jpg%2FBROK%2Fthumbnail%2F1600x900%2Fformat%2Fjpg%2Fquality%2F80%2Fmalenia-head-elden-ring.jpg&imgrefurl=https%3A%2F%2Fwww.rockpapershotgun.com%2Felden-ring-malenia-walkthrough&tbnid=zZ40_6GiUtELEM&vet=12ahUKEwix99SyxMP3AhVLAaYKHbzPCPgQMygBegUIARC-AQ..i&docid=h9yFaa_cpbkJ0M&w=1600&h=900&q=malenia&ved=2ahUKEwix99SyxMP3AhVLAaYKHbzPCPgQMygBegUIARC-AQ"
                    },
                    "tags": [
                        "Game",
                        "ring and souls"
                    ],
                    "type": "3D",
                    "image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fresidentevil%2Fimages%2F9%2F9b%2F79ed0989808efad34231eab1f16cdc9a.jpg%2Frevision%2Flatest%3Fcb%3D20150308235202&imgrefurl=https%3A%2F%2Fresidentevil.fandom.com%2Fwiki%2FHUNK&tbnid=_hYsiZPQbWstJM&vet=12ahUKEwiomOKoycP3AhW6zIsBHen8AzwQMygCegQIARAi..i&docid=jUVBewmXl_xTVM&w=484&h=1300&q=hank%20the%20grim%20reaper%20bio%20hazard&ved=2ahUKEwiomOKoycP3AhW6zIsBHen8AzwQMygCegQIARAi",
                    "content": "Hank, the Grim Reaper",
                    "likes": 7777,
                    "comments": 77777,
                    "createdAt": "2022-05-03T14:49:23.849Z"
                    }
                }
            }
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
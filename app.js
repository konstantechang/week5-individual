const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path:'./.env' });

require('./connections/mongodb');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const { receiveMessageOnPort } = require('worker_threads');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);





//404 錯誤處理
app.use( function(req, res, next){
    res.status(404).json({
        status: 'error',
        message: '無此路由資訊',
    });
} );

//express 錯誤處理
//自己設定的err錯誤  Production環境
const resErrorProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            message: err.message,
        });
    }else{
        //log 記錄
        console.log('出現重大錯誤', err);

        //送出預設訊息
        res.status(500).json({
            status: 'error',
            message: '系統錯誤  請洽系統管理員'
        });
    }
};

//自己設定err錯誤 Dev環境
const resErrorDev = (err, res) => {
    res.status(err.statusCode).json( {
        message: err.message,
        error: err,
        stack: err.stack
    });
};

//錯誤處理
app.use( function(err, req, res, next){
    // res.status(err.httpStatus ? err.httpStatus : 500).send({
    //     "error": err.message,
    // });

    err.statusCode = err.statusCode || 500;
    if(process.env.NODE_ENV === 'dev'){
        return resErrorDev(err, res);
    }

    //production
    // 使用者資料沒有填寫正確    由mongoose觸發
    if(err.name === 'ValidationError'){
        err.message = '資料欄位未填寫正確  請重新輸入!';
        err.isOperational = true;
        return resErrorProd(err, res);

    }

    resErrorProd(err, res);


} );

//未補捉到的promise catch
process.on('unhandledRejection', (err, promise) => {
    console.log('未補捉到的 rejection: ', promise, '原因: ', err );
} );

//參數沒有req, res
process.on('uncaughtException', err => {
    console.error('Uncaughted Exception');
    console.error(err);
    process.exit(1);
});


module.exports = app;

const mongoose = require('mongoose');


const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const DB = process.env.DATABASE.replace("<password>", DATABASE_PASSWORD);

mongoose.connect(DB).then( () => {
    console.log('連線資料庫成功');
} ).catch(error => {
    console.log(error);
});

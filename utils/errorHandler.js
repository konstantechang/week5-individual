const errorHandler = (res, error) => {
    res.status(400).send(

        {
            status: false,
            message: "請確認填寫是否正確",
            error: error,
        }
    );
}

module.exports = errorHandler;
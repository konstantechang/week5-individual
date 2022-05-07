const successHandler = (res, message, data = []) => {
    res.status(200).send(
        {
            status: true,
            message: message,
            data,
        }
    );
}

module.exports = successHandler;
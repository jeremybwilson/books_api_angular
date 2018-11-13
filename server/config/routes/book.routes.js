const BookController = require('../../controllers/book.controller');
const router = require('express').Router();

module.exports = router 
    //routes and controllers
    router.get('/', BookController.index)

    // create book route
    router.post('/', BookController.create)

    // show all books route
    router.get('/:_id', BookController.show)

    // update individual book route
    router.put('/:_id', BookController.update)

    // delete book route
    router.delete('/:_id', BookController.delete)

    // catch 404 and forward to error handler
    // router.use((request, response, next) => {
    //     const err = new Error('Not Found');
    //     err.status = 404;
    //     next(err);
    // })
    
    // error handler
    // router.use((err, request, response, next) => {
    //     // set locals, only providing error in development
    //     response.locals.message = err.message;
    //     response.locals.error = request.router.get('env') === 'development' ? err : {};
    //     response.status(err.status || 500);
    //     // render the error page
    //     response.render('error', {title: 'Error page'});
    // })
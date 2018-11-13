const AuthorController = require('../../controllers/author.controller');
const router = require('express').Router();

module.exports = router 
    //routes and controllers
    router.get('/', AuthorController.index)

    // create author route
    router.post('/', AuthorController.create)

    // show all authors route
    router.get('/:_id', AuthorController.show)

    // update individual author route
    router.put('/:_id', AuthorController.update)

    // delete author route
    router.delete('/:_id', AuthorController.delete)

    // catch 404 and forward to error handler
    // router.use((request, response, next) => {
    //     const err = new Error('Not Found');
    //     err.status = 404;
    //     next(err);
    // })
    
    // // error handler
    // router.use((err, request, response, next) => {
    //     // set locals, only providing error in development
    //     response.locals.message = err.message;
    //     response.locals.error = request.router.get('env') === 'development' ? err : {};
    //     response.status(err.status || 500);
    //     // render the error page
    //     response.render('error', {title: 'Error page'});
    // })
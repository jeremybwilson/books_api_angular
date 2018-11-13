const Book = require('mongoose').model('Book');
const Author = require('mongoose').model('Author');

module.exports = {
    index(request, response) { 
        Book.find({})
            .populate('author')
            .then(books => response.json(books))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the index route`);
            });
    },
    create(request, response) { 
        console.log('inside the book create controller', request.body);
        Book.create(request.body)
            .then(book => {
                console.log('created book', book);
                return Author.findById(book.author)
                    .then(author => {
                        console.log('author found', author);
                        author.books.push(book._id);
                        return author.save()   // doing multiple returns to use same catch
                            .then(response.json(book))  
            })
        })  
        // this catch is only good for validation errors, so if expecting other kind of errors, 
        // simply console log while we learn how to handle others
        .catch(error => {
            console.log('got an error', error);
            // collect the errors into an errors array
            const errors = Object.keys(error.errors)
                // map every field that failed to a message
                .map(key => error.errors[key].message);
                console.log(errors);
                // change the response status to unprocessable entity. if we don't change status, 
                // it will go out ot client as having no errors
                response.status(402).json(errors);
        });    
    },
    show(request, response) { 
        Book.findById(request.params.book_id)
            .populate('author')
            .then(book => response.json(book))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with show request`);
            });
    },
    update(request, response) {
        console.log('controller got a request to update', request.params._id, request.body);
        Book.findByIdAndUpdate(request.params._id, request.body, { new: true })
            .then(book => response.json(book))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the update`);
            });
    },
    delete(request, response) { 
        console.log('received a request to delete a book id', request.params._id)
        Book.findByIdAndDelete(request.params._id)
        // Book.findByIdAndRemove(request.params._id)
            .then(book => response.json(book))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the delete request`);
            });
    }
};
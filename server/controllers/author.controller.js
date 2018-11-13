const Author = require('mongoose').model('Author');
const Book = require('mongoose').model('Book');

module.exports = {
    index(request,response) { 
        Author.find({})
            .populate('books')
            .then(authors => response.json(authors))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the index route`);
            });
    },
    create(request,response) {
        Author.create(request.body)
          .then(author => response.json(author))
          .catch(error => {
              const errors = Object.keys(error.errors).map(key => error.errors[key].message);
              response.status(402).json(errors);
          });
    },
    show(request,response) {
        Author.findById(request.params._id)
            .populate('books')
            .then(author => response.json(author))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with show request`);
            });
    },
    update(request,response) {
        console.log('controller got the request to update author', request.params._id, request.body)
        Author.findByIdAndUpdate(request.params._id, request.body, { new: true })
            .then(author => response.json(author))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the update ${error}`);
            });
    },
    delete(request,response) {
        console.log('controller got a request to delete author id', request.params._id);
        Author.findByIdAndDelete(request.params._id)
        // Author.findByIdAndRemove(request.params._id)
            .then(author => response.json(author))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the delete request`);
            });
    }
};
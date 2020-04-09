const URI = 
    (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 
    'http://localhost:8000' 
    : 'https://tapi.herokuapp.com';

module.exports = {
    URI
}
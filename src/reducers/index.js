"use strict"
import {
    combineReducers
} from 'redux';

//import reducers
import {
    booksReducers
} from './booksReducers';
import {
    cartReducers
} from './cartReducers';

//combine all reducers

export default combineReducers({
    books: booksReducers,
    cart: cartReducers
})
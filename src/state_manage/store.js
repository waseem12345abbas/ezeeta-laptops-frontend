import {configureStore} from '@reduxjs/toolkit'
import cartSlice  from './features/cart/Cart';
import productsSlice from './features/products/productsSlice';
import usersSlice from './features/users/users';
import userSession from './features/users/userSession'

export const store=configureStore({
    reducer:{
        cart:cartSlice,
        products:productsSlice,
        users:usersSlice,
        userSession: userSession
    },
})
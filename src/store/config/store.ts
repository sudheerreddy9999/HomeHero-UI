import {configureStore} from '@reduxjs/toolkit';

import auth from "../reducers/auth"
import user from "../reducers/user"
import cart from "../reducers/cart"
import chatBot from "../reducers/chat-bot";
import services from "../reducers/services"

const store = configureStore({
    reducer:{
        auth: auth,
        user: user,
        cart: cart,
        chatBot: chatBot,
        services:services
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
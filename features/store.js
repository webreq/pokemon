import {configureStore} from '@reduxjs/toolkit'
import getPoekmonReducer from './getPokemonSlice'
const store = configureStore({
    reducer:{
        pokemon:getPoekmonReducer
    }
})
export default store
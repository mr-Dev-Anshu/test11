import { configureStore } from "@reduxjs/toolkit";

import productsSlice from './features/product/productSlice'
const store = configureStore({
     reducer:{
         products:productsSlice
     }
})  
export default store ; 
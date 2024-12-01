import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./productThunk";
const initialState = {
      products:[
        {
            "id": 1,
            "title": "Product 1",
            "variants": [
              { "id": 101, "product_id": 1, "title": "Variant A", "price": "$10" },
              { "id": 102, "product_id": 1, "title": "Variant B", "price": "$15" }
            ]
          },
          {
            "id": 2,
            "title": "Product 2",
            "variants": [
              { "id": 103, "product_id": 2, "title": "Variant A", "price": "$20" },
              { "id": 104, "product_id": 2, "title": "Variant B", "price": "$25" }
            ]
          },
          {
            "id": 3,
            "title": "Product 3",
            "variants": [
              { "id": 105, "product_id": 3, "title": "Variant A", "price": "$30" },
              { "id": 106, "product_id": 3, "title": "Variant B", "price": "$35" }
            ]
          },
          {
            "id": 4,
            "title": "Product 4",
            "variants": [
              { "id": 107, "product_id": 4, "title": "Variant A", "price": "$40" },
              { "id": 108, "product_id": 4, "title": "Variant B", "price": "$45" }
            ]
          },
          {
            "id": 5,
            "title": "Product 5",
            "variants": [
              { "id": 109, "product_id": 5, "title": "Variant A", "price": "$50" },
              { "id": 110, "product_id": 5, "title": "Variant B", "price": "$55" }
            ]
          },
          {
            "id": 6,
            "title": "Product 6",
            "variants": [
              { "id": 111, "product_id": 6, "title": "Variant A", "price": "$60" },
              { "id": 112, "product_id": 6, "title": "Variant B", "price": "$65" }
            ]
          },
          {
            "id": 7,
            "title": "Product 7",
            "variants": [
              { "id": 113, "product_id": 7, "title": "Variant A", "price": "$70" },
              { "id": 114, "product_id": 7, "title": "Variant B", "price": "$75" }
            ]
          },
          {
            "id": 8,
            "title": "Product 8",
            "variants": [
              { "id": 115, "product_id": 8, "title": "Variant A", "price": "$80" },
              { "id": 116, "product_id": 8, "title": "Variant B", "price": "$85" }
            ]
          },
          {
            "id": 9,
            "title": "Product 9",
            "variants": [
              { "id": 117, "product_id": 9, "title": "Variant A", "price": "$90" },
              { "id": 118, "product_id": 9, "title": "Variant B", "price": "$95" }
            ]
          },
          {
            "id": 10,
            "title": "Product 10",
            "variants": [
              { "id": 119, "product_id": 10, "title": "Variant A", "price": "$100" },
              { "id": 120, "product_id": 10, "title": "Variant B", "price": "$105" }
            ]
          },
          {
            "id": 11,
            "title": "Product 11",
            "variants": [
              { "id": 121, "product_id": 11, "title": "Variant A", "price": "$110" },
              { "id": 122, "product_id": 11, "title": "Variant B", "price": "$115" }
            ]
          },
          {
            "id": 12,
            "title": "Product 12",
            "variants": [
              { "id": 123, "product_id": 12, "title": "Variant A", "price": "$120" },
              { "id": 124, "product_id": 12, "title": "Variant B", "price": "$125" }
            ]
          },
          {
            "id": 13,
            "title": "Product 13",
            "variants": [
              { "id": 125, "product_id": 13, "title": "Variant A", "price": "$130" },
              { "id": 126, "product_id": 13, "title": "Variant B", "price": "$135" }
            ]
          },
          {
            "id": 14,
            "title": "Product 14",
            "variants": [
              { "id": 127, "product_id": 14, "title": "Variant A", "price": "$140" },
              { "id": 128, "product_id": 14, "title": "Variant B", "price": "$145" }
            ]
          },
          {
            "id": 15,
            "title": "Product 15",
            "variants": [
              { "id": 129, "product_id": 15, "title": "Variant A", "price": "$150" },
              { "id": 130, "product_id": 15, "title": "Variant B", "price": "$155" }
            ]
          },
          {
            "id": 16,
            "title": "Product 16",
            "variants": [
              { "id": 131, "product_id": 16, "title": "Variant A", "price": "$160" },
              { "id": 132, "product_id": 16, "title": "Variant B", "price": "$165" }
            ]
          },
          {
            "id": 17,
            "title": "Product 17",
            "variants": [
              { "id": 133, "product_id": 17, "title": "Variant A", "price": "$170" },
              { "id": 134, "product_id": 17, "title": "Variant B", "price": "$175" }
            ]
          },
          {
            "id": 18,
            "title": "Product 18",
            "variants": [
              { "id": 135, "product_id": 18, "title": "Variant A", "price": "$180" },
              { "id": 136, "product_id": 18, "title": "Variant B", "price": "$185" }
            ]
          },
          {
            "id": 19,
            "title": "Product 19",
            "variants": [
              { "id": 137, "product_id": 19, "title": "Variant A", "price": "$190" },
              { "id": 138, "product_id": 19, "title": "Variant B", "price": "$195" }
            ]
          },
          {
            "id": 20,
            "title": "Product 20",
            "variants": [
              { "id": 139, "product_id": 20, "title": "Variant A", "price": "$200" },
              { "id": 140, "product_id": 20, "title": "Variant B", "price": "$205" }
            ]
          }
      ] , 
      selectedProducts:{}, 
      afterSave:{"":[1,2]}, 
      loading:false , 
      error:null 
}


const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleVariants: (state, action) => {
      const { productId, variantId } = action.payload;
      const productVariants = state.selectedProducts[productId] || [];
      if (productVariants.includes(variantId)) {
        state.selectedProducts[productId] = productVariants.filter(
          (id) => id !== variantId
        );
      } else {
        state.selectedProducts[productId] = [...productVariants, variantId];
      }
      if (state.selectedProducts[productId].length === 0) {
        delete state.selectedProducts[productId];
      }
    },
    toggleProduct: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;
      const variantsId = product.variants.map((v) => v.id);
      if (
        state.selectedProducts[productId]?.length === product.variants.length
      ) {
        delete state.selectedProducts[productId];
      } else {
        state.selectedProducts[productId] = variantsId;
      }
    },
    save: (state) => {
      const selectedProductsCount = Object.keys(state.selectedProducts).length;
  
      if (selectedProductsCount > 4) {
        alert('Cannot save. More than 4 products selected.')
        console.log('Cannot save. More than 4 products selected.');
        return; 
      }
          console.log(JSON.stringify(state.selectedProducts));
      state.afterSave = { ...state.selectedProducts };
    },
    restore: (state, action) => {
      state.selectedProducts = { ...action.payload };
    },
  },
  extraReducers:(builder)=> {
     builder.addCase(getProducts.pending , (state)=> {
        state.loading = true 
     })
     .addCase(getProducts.fulfilled , (state , action)=> {
         state.loading = false  ; 
         state.products = action.payload || [] ; 
     })
     .addCase(getProducts.rejected , (state , action )=> {
          state.loading= false 
          state.error = action.payload; 
     })
  }
});

export const { toggleVariants, toggleProduct, save, restore } =
  productSlice.actions;
export default productSlice.reducer;
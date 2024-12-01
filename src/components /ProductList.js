import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleProduct, toggleVariants, save } from "../features/product/productSlice";
import {
  Box,
  Typography,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Button,
  Drawer,
  TextField,
} from "@mui/material";
import { MdEdit } from "react-icons/md";
import { getProducts } from "../features/product/productThunk";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, selectedProducts, afterSave } = useSelector((state) => state.products);
  const [searchQuery , setSearchQuery ] = useState() ; 
  const [debouncedSearchQuery , setDebouncedSearchQuery ] = useState() ; 


  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const btnRef = useRef();

  const handleVariantToggle = (productId, variantId) => {
    dispatch(toggleVariants({ productId, variantId }));
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleSave = () => {
    dispatch({ type: "products/save" });
    setDrawerOpen(false); 
  };

  const handleCancel = () => {
    dispatch({ type: "products/restore", payload: afterSave });
    setDrawerOpen(false); 
  };

  const handleProductCheck = (product) => {
    dispatch(toggleProduct(product.id));
  };

   const handleSearchChange = (e)=> {
        setSearchQuery (e.target.value) ; 
   }

   useEffect(()=> {
       if(debouncedSearchQuery){
          dispatch(getProducts({query:debouncedSearchQuery}))
       }
   } , [debouncedSearchQuery , dispatch])



   useEffect(()=> {
      const timer = setTimeout(()=> {
          setDebouncedSearchQuery(searchQuery) ; 
      } , 100)
       return ()=> clearTimeout(timer)
   } , [searchQuery]) 

    

  return (
    <>
      <Button
        ref={btnRef}
        onClick={handleDrawerToggle}
        startIcon={<MdEdit />}
      >
        add
      </Button>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: "800px", display: "flex", flexDirection: "column" },
        }}
      >
        <Box sx={{ padding: 2, flexGrow: 1, overflowY: "auto" }}>
         

          <Typography variant="h6" sx={{ mb: 2 }}>
            Select Products
          </Typography>
          
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
          
          {products.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No products available.
            </Typography>
          ) : (
            products.map((product) => (
              <Box key={product.id} border={1} borderRadius={2} p={2} mb={2}>
                <div>
                  <span>
                    <Checkbox
                      onChange={() => handleProductCheck(product)}
                      checked={
                        selectedProducts[product.id]?.length ===
                        product.variants.length
                      }
                    />
                  </span>
                  <span>{product.title}</span>
                </div>
                <List>
                  {product.variants.map((variant) => (
                    <ListItem key={variant.id} disableGutters>
                      <Checkbox
                        checked={
                          selectedProducts[product.id]?.includes(variant.id) ||
                          false
                        }
                        onChange={() =>
                          handleVariantToggle(product.id, variant.id)
                        }
                      />
                      <ListItemText
                        primary={variant.title}
                        secondary={`Price: ${variant.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))
          )}
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default ProductList;

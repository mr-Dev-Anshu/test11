import React, { useEffect, useState } from 'react';
import SelectedProducts from './components /SelectedProducts';
import ProductList from './components /ProductList';
import { getProducts } from './features/product/productThunk';
import { useDispatch } from 'react-redux';


const App = () => {
  const [toggleProducts, setToggleProducts] = useState(false);
   const dispatch = useDispatch() ; 
    useEffect(()=> {
      dispatch(getProducts({ query: '' }));
    } , [])
  return (
    <div className="p-8">
      <ProductList />
      <SelectedProducts />
    </div>
  );
};
export default App;
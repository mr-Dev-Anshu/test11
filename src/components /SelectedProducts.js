import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ImCross } from "react-icons/im";
import { RiGridFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import { useDispatch } from "react-redux";
import { toggleVariants , save  } from "../features/product/productSlice";
import Discount from "./Discount";

const  SelectedProducts = () => {
  const { products, afterSave   } = useSelector((state) => state.products);


  const [productOrder, setProductOrder] = useState([]);
  const [variantVisibility, setVariantVisibility] = useState({}); 

  const dispatch = useDispatch();

  useEffect(() => {
    const initialProductOrder = Object.entries(afterSave);
    console.log("this is data --->" , initialProductOrder)
    setProductOrder(initialProductOrder);
    const initialVisibility = {}; 
    initialProductOrder.forEach(([productId]) => {
      initialVisibility[productId] = true; 
    });
    setVariantVisibility(initialVisibility);
  }, [afterSave]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const reorderedProducts = Array.from(productOrder);
    const [movedItem] = reorderedProducts.splice(source.index, 1);
    reorderedProducts.splice(destination.index, 0, movedItem);
    setProductOrder(reorderedProducts);
  };

  const handleDeleteVariants = (productId, variantId) => {
    dispatch(toggleVariants({ productId, variantId }));
    dispatch(save()) ; 
  };

  const handleAddProduct = () => {
    const newProduct = [`new-${Date.now()}`, []]; 
    setProductOrder([...productOrder, newProduct]);
  };

  const toggleVariantsVisibility = (productId) => {
    setVariantVisibility((prev) => ({
      ...prev,
      [productId]: !prev[productId], 
    }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="afterSave" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="">
            {productOrder.map(([productId, variantIds], index) => {
              const product = products.find((p) => p.id === parseInt(productId)) || {
                id: 0,
                title: "Add More Product",
                variants: [],
              };
              const selectedVariants = product.variants.filter((variant) =>
                variantIds.includes(variant.id)
              );

              return (
                <Draggable key={product.id} draggableId={`product-${product.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 mb-4 rounded bg-white  flex flex-col justify-center items-center"
                    >
                      <div className="w-[50%] ">
                        <div className="flex items-center gap-3">
                          <span>{index + 1}</span>
                          <span className="text-xl mx-2 flex items-center">
                            <RiGridFill />
                          </span>
                          <h3 className="p-3 bg-white border rounded-l-md flex justify-between items-center pr-32 border-gray-300 focus:outline-none w-full">
                            <span>{product.title}</span>
                            <span>
                              <ProductList />
                            </span>
                          </h3>
                           <div>
                              <Discount/>
                           </div>
                        </div>
                        {
                           selectedVariants.length>0 ? <div className="flex justify-end">
                           <button
                             onClick={() => toggleVariantsVisibility(product.id)}
                             className="text-blue-500 underline"
                           >
                             {variantVisibility[product.id] ? "Hide Variants" : "Show Variants"}
                           </button>
                         </div>:null
                        }
                        {variantVisibility[product.id] &&
                          selectedVariants.map((variant, index) => (
                            <div
                              key={index}
                              className="justify-end flex my-3 items-center gap-4"
                            >
                              <span className="border w-[70%] border-gray-400 rounded-lg px-4 py-2">
                                {variant.title} {variant.price}
                              </span>
                              <span className="cursor-pointer hover:text-red-500">
                                <ImCross
                                  onClick={() =>
                                    handleDeleteVariants(product.id, variant.id)
                                  }
                                  size={20}
                                />
                              </span>
                            </div>
                          ))}
                      </div>
                      <div className="flex justify-end w-[50%] ">
                         {
                           index === productOrder.length-1 ?  <button
                           disabled={productOrder.length===4}  // This ensures the button is disabled
                           onClick={handleAddProduct}
                           className="text-white  disabled:bg-gray-300 flex justify-end rounded-md mt-1 bg-blue-600 py-2 px-4 "
                         >
                           Add More
                         </button>:null
                         }
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default SelectedProducts;

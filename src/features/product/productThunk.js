import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk('product/get', async ({ query }, { rejectWithValue }) => {
    try {
        const encodedQuery = encodeURIComponent(query); // Ensures the query is correctly formatted for the URL
        const response = await axios.get(`https://stageapi.monkcommerce.app/task/products/search?search=${encodedQuery}`, {
            headers: {
                "x-api-key": '72njgfa948d9aS7gs5'
            }
        });

        console.log(response.data);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.message || "Something went wrong while getting the products";
        return rejectWithValue(message);
    }
});

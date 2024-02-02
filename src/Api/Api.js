import axios from "axios"

export const fetchProductList = () => {
    return axios.get("https://dummyjson.com/products")
}

export const fetchProductSpecificDetails = (productId) => {
    return axios.get(`https://dummyjson.com/products/${productId}`)
}
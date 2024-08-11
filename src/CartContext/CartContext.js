import axios from "axios";
import { createContext, useContext } from "react";
import baseURl from "../Shared/baseURL";
import React, { useEffect, useState } from 'react'
import jwtDecode from "jwt-decode";

export let CartContext = createContext();

// let headers = {
//     token: localStorage.getItem('userToken')
// }

// Display Items In Cart

async function getLoggedUserCart() {
    return axios.get(baseURl + `cart`, { headers: { token: localStorage.getItem('userToken') } })
        .then((respone) => respone)
        .catch((err) => err);
}

// Update Quantity Of item

async function ubdate(productId, count) {
    let { data } = await axios.put(baseURl + `cart/${productId}`, { count }, { headers: { token: localStorage.getItem('userToken') } });
    return data;
}



export default function CartContextProvider(props) {

    const [numberInCart, setNumberInCart] = useState(0);

    async function getCartID() {
        let respone = await getLoggedUserCart().catch((err) => console.log(err))
        return respone.data.data._id
    }


    async function numOfCartWhenLogOut() {
        // setNumberInCart(0)
        localStorage.removeItem('inCart');
        let respone = await getLoggedUserCart().catch((err) => console.log(err))
        console.log(respone.data.numOfCartItems);
        // if (respone.data.numOfCartItems == 0) {
        //     setNumberInCart(0);
        //     localStorage.setItem('inCart', 0);
        // }
        // else {
        setNumberInCart(respone.data.numOfCartItems);
        localStorage.setItem('inCart', respone.data.numOfCartItems);
        // }
    }
    // Remove Item From Cart
    async function removeSpecificItem(productId) {
        let { data } = await axios.delete(baseURl + `cart/${productId}`, { headers: { token: localStorage.getItem('userToken') } })
        setNumberInCart(data.numOfCartItems);
        localStorage.setItem('inCart', data.numOfCartItems)
    }

    // Clear All Items In Cart
    async function clearUserCart() {
        setNumberInCart(0);
        localStorage.setItem('inCart', 0);
        return axios.delete(baseURl + `cart`, { headers: { token: localStorage.getItem('userToken') } })
            .then((respone) => console.log(respone))
            .catch((err) => console.log(err))
    }

    // Add To Cart

    async function addToCart(productId) {
        let respone = await axios.post(baseURl + `cart`, { productId }, { headers: { token: localStorage.getItem('userToken') } }).catch((err) => { return err });
        setNumberInCart(respone.data.numOfCartItems)
        localStorage.setItem('inCart', respone.data.numOfCartItems)

    }

    // Pay Online
    // 651d556f437d6deb7d65d294
    async function checkoutSession(cartId, val, url) {

        return axios.post(baseURl + `orders/checkout-session/${cartId}?url=http://${url}`,
            {
                shippingAddress: val

            }
            , { headers: { token: localStorage.getItem('userToken') } })
            .then((respone) => respone)
            .catch((err) => { console.log(err); })
    }

    function increase() {
        return numberInCart;
    }

    // get All orders

    async function getUserOrders(userID) {
        return axios.get(baseURl + `orders/user/${userID}`)
            .then((respone) => respone)
            .catch((err) => { console.log(err); })
    }

    // add to wishList
    async function addToWishList(productId) {
        return await axios.post(baseURl + `wishlist`, { productId }, { headers: { token: localStorage.getItem('userToken') } })
            .then((respone) => respone)
            .catch((err) => err)
    }
    async function getAllWishList() {
        return axios.get(baseURl + `wishlist`, { headers: { token: localStorage.getItem('userToken') } })
            .then((respone) => respone)
            .catch((err) => err)
    }
    async function removeItemFromWishList(id) {
        return axios.delete(baseURl + `wishlist/${id}`,{ headers: { token: localStorage.getItem('userToken') } })
            .then((respone) => respone)
            .catch((err) => err)
    }
    useEffect(() => {
        increase()
    },
        [numberInCart])

    return <CartContext.Provider value={{ addToCart, addToWishList, removeItemFromWishList, getLoggedUserCart, getAllWishList, ubdate, getCartID, removeSpecificItem, clearUserCart, increase, numOfCartWhenLogOut, numberInCart, setNumberInCart, checkoutSession, getUserOrders }} >
        {props.children}
    </CartContext.Provider>
}
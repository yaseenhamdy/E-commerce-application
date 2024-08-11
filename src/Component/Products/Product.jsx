import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from '../../CartContext/CartContext';
export default function Product(props) {
    let { imageCover, title, category, price, ratingsAverage, _id } = props.prod;
    let { addToCart, addToWishList } = useContext(CartContext);
    async function Cart(id) {
        await addToCart(id);
        toast.success("Prouduct Added Successfully");
    }
    async function addProductToWishList(id) {
        let respoone = await addToWishList(id)
        toast.success(respoone.data.message)
    }


    return (
        <>
            <div className="col-md-2">
                <div className="all-pro my-3 product position-relative">
                    <Link className='nav-link' to={"/details/" + _id}>
                        <img src={imageCover} className='w-100' />
                        <h6 className='fw-bolder mt-2 text-main'>{category.name}</h6>
                        <p className='fw-bolder'>{title.split(" ").slice(0, 2).join(" ")}</p>
                        <div className='d-flex justify-content-between'>
                            <div className="pro-price">
                                <span>{price} EGP</span>
                            </div>
                            <div className="pro-rate">
                                <span>{ratingsAverage}</span>
                                <i className="fa-solid fa-star rating-color"></i>
                            </div>
                        </div>
                    </Link>
                    <button onClick={() => { Cart(_id); }} className='btn mt-3 bg-main text-white w-100' >Add To Card
                        <i className="fa-solid fa-cart-shopping px-2"></i>
                    </button>
                    
                    <button onClick={() => { addProductToWishList(_id) }} className='btn mt-2 bg-danger text-white w-100' >Add To Favourite
                        <i className="fa-regular fa-heart px-2"></i>
                    </button>

                </div>
            </div >


        </>
    )
}

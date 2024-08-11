import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import baseURl from '../../Shared/baseURL';
import Loading from '../../Shared/Loading/Loading';
import noProduct from '../../imgs/no-product.png'
import { CartContext } from '../../CartContext/CartContext';
import { toast } from 'react-toastify';


export default function SubCategory() {
    let { id } = useParams();
    let { addToCart, addToWishList } = useContext(CartContext)
    const [products, setproducts] = useState([])
    const [loading, setloading] = useState(false)
    async function getProductsOfSpecificCategory() {
        setloading(true)
        let { data } = await axios.get(baseURl + `products?category=${id}`)
        setproducts(data.data)
        setloading(false)
    }
    async function toCart(id) {
        setloading(true)
        await addToCart(id);
        setloading(false)
        toast.success("Prouduct Added Successfully");
    }
    async function addProductToWishList(id) {
        setloading(true)
        let respoone = await addToWishList(id)
        setloading(false)
        toast.success(respoone.data.message)
    }
    useEffect(() => {
        getProductsOfSpecificCategory()
    }, [])
    return (
        <>
            {loading ? <Loading /> : <div>
                <div className="container">
                    <div className="row ">
                        {
                            products != '' ? products.map((elm) => <div className="col-md-2 m-auto mt-5">
                                <div className="product-info cursor-pointer text-center product">
                                    <Link className='nav-link' to={"/details/" + elm._id}>
                                        <img src={elm.imageCover} className='w-100' />
                                        <p className='fw-bolder text-main mt-3 text-start'>{elm.title.split(" ").slice(0, 2).join(" ")}</p>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <p>{elm.price} EGP</p>
                                            </div>
                                            <div className=''>
                                                <i className="fa-solid fa-star rating-color mx-1"></i>
                                                <span className='mx-1'>{elm.ratingsAverage}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    <button className='btn bg-main text-white text-center w-100 ' onClick={() => toCart(elm._id)}>Add to cart
                                        <i className="fa-solid fa-cart-shopping px-2"></i>
                                    </button>
                                    <button className='btn bg-danger mt-2 text-white text-center w-100 ' onClick={() => addProductToWishList(elm._id)}>Add to Favourite
                                        <i className="fa-regular fa-heart px-2"></i>
                                    </button>
                                </div>
                            </div>) : <div className='row '>
                                <div className="col-md-6 m-auto mt-5">
                                    <div className="noProduct ">
                                        <img src={noProduct} className='w-100' />
                                        <h6 className='h3 text-center fw-bolder'>This category Dos not have Products currently</h6>
                                    </div>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div >
            }

        </>
    )
}

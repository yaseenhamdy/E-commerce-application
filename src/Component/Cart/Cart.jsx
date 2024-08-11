import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import baseURl from '../../Shared/baseURL';
import { CartContext } from '../../CartContext/CartContext';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import emptyCart from '../../imgs/empty-cart-5521508-4610092.png'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

export default function Cart() {

    let headers = {
        token: localStorage.getItem('userToken')
    }

    let { getLoggedUserCart, ubdate, removeSpecificItem, clearUserCart } = useContext(CartContext)
    const [cartProducts, setCartProducts] = useState([])
    const [cartPrice, setCartPrice] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [removeItemLoading, setRemoveItemLoading] = useState(false)
    let emptyFlag = 1 //to know if cart is empty or not

    async function displayCartItem() {
        setIsLoading(true)
        let { data } = await getLoggedUserCart();
        console.log(data);
        if (data == undefined) {
            setIsLoading(false);
        }
        else {

            setIsLoading(false);
            setCartProducts(data.data.products);
            setCartPrice(data.data.totalCartPrice)
        }
        // }
        // else{


        //     setCartPrice(responeTotalPrice.data.data.totalCartPrice);
        //     setCartProducts(responeTotalPrice.data.data.products);
        //     setIsLoading(false)
        // }

    }

    useEffect(() => {
        displayCartItem();
    }, [])

    async function removeCartItem(id) {
        setRemoveItemLoading(true)
        let respone = await removeSpecificItem(id);
        //     let { data } = await axios.delete(baseURl + `cart/${id}`, { headers }).catch( (err)=>{console.loPg(err);} );
        //     console.log(data);
        //     setCartProducts(data.data.products);
        //     setCartPrice(data.data.totalCartPrice);
        //     // displayCartItem();
        //     let deletedItem = localStorage.getItem('numOfItemInCart');
        //     localStorage.setItem('numOfItemInCart', deletedItem - 1);
        //     setAy(localStorage.getItem('numOfItemInCart'))
        displayCartItem()
        setRemoveItemLoading(false)
        toast.success('Removed Successfully')
    }

    async function clearItems() {
        Swal.fire({
            title: 'Do you want to clear items?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setRemoveItemLoading(true)
                let respone = await clearUserCart();
                // if (respone.data.message === 'success') {
                setCartProducts([]);
                setRemoveItemLoading(false)
                displayCartItem()
                Swal.fire('Cleard Successfully', '', 'success')
                // }


            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    async function ubdateItems(id, count) {
        setIsLoading(true);
        if (count == 0) {
            await removeCartItem(id)
        }
        else {
            await ubdate(id, count);
            displayCartItem();
        }
    }

    //check if cart is empty or not
    if (cartProducts == null || cartProducts == '')
        emptyFlag = 0
    else
        emptyFlag = 1

    return (
        <>
            {isLoading || removeItemLoading ? <Loading /> : <>
                {emptyFlag ?
                    <div className="container">
                        <div className="row">
                            <div className="col-md-11 m-auto">
                                <div className="cart-info bg-main-light my-3 p-4">
                                    <h3 >Shop Cart :</h3>
                                    <span className='text-main fw-bolder'>Total Cart Price : {cartPrice} EGP</span>
                                    <br />
                                    <button onClick={clearItems} className=' my-3 btn btn-danger'>Clear Cart</button>
                                    {cartProducts?.map((elm) =>
                                        <div className="row border-bottom " key={elm.product._id}>
                                            <div className="col-md-1 my-3">
                                                <div className="cart-img">
                                                    <img src={elm.product.imageCover} className='w-100' />
                                                </div>
                                            </div>
                                            <div className="col-md-11 my-3">
                                                <div className="cart-title d-flex justify-content-between">
                                                    <div >
                                                        <h3 className='h5'>{elm.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                                        <p className='text-main fw-bolder'>Price : {elm.price}</p>
                                                        <button onClick={() => removeCartItem(elm.product._id)} className='btn p-0 text-danger' ><i className="fa-solid fa-trash-can text-danger"></i> Remove</button>
                                                    </div>
                                                    <div>
                                                        <span onClick={() => ubdateItems(elm.product._id, elm.count + 1)} className='increase-cart p-2 rounded-3 cursor-pointer'>+</span>
                                                        <span className='mx-3'>{elm.count}</span>
                                                        <span onClick={() => ubdateItems(elm.product._id, elm.count - 1)} className='increase-cart p-2 rounded-3 cursor-pointer'>-</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className='mt-4 text-center'>

                                        <Link to='/payOnlineForm' className='btn btn-warning text-white mx-2'>Online Payment</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : <>
                        <div className="row w-100">
                            <div className="col-md-5  m-auto">
                                <div className="empty-cart pt-3">
                                    <img className='w-100' src={emptyCart}></img>
                                    <h3 className='text-center fw-bolder '>Your Cart Is Empty....</h3>

                                </div>
                            </div>
                        </div>

                    </>}

            </>}
        </>
    )
}

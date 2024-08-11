import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../CartContext/CartContext'
import jwtDecode from 'jwt-decode';
import Loading from '../../Shared/Loading/Loading';

export default function AllOrders() {
    let { getUserOrders } = useContext(CartContext);
    let [orderItems, setorderItems] = useState([])
    const [loading, setloading] = useState(false)
    async function getUserID() {
        setloading(true)
        let x = jwtDecode(localStorage.getItem('userToken'));
        let respone = await getUserOrders(x.id)
        setorderItems(respone.data)
        console.log(respone.data);
        setloading(false)
    }
    useEffect(() => {
        getUserID()
    }, [])
    return (
        <>
            {loading ? <Loading /> :
                <div className="container">
                    <div className="row">
                        <div className="col-md-11 m-auto">
                            <div className=' bg-main-light my-3 p-4'>
                                {
                                    orderItems.map((elm) => elm.cartItems.map((el) =>
                                        <div className="row border-bottom" key={el._id}>
                                            <div className="col-md-2 my-3">
                                                <img src={el.product.imageCover} className='w-100' />
                                            </div>
                                            <div className='col-md-10 my-3'>
                                                <p>Payment Method : <span className='text-main fw-bolder'> {elm.paymentMethodType}</span></p>
                                                <p>Quantity : <span className='text-main fw-bolder'> {el.count}</span> </p>
                                                <p>Paid At : <span className='text-main fw-bolder'>{elm.paidAt}</span></p>
                                                <p>Phone Number : <span className='text-main fw-bolder'>{elm.shippingAddress.phone}</span></p>
                                                <p>City : <span className='text-main fw-bolder'>{elm.shippingAddress.city}</span></p>
                                                <p>Price : <span className='text-main fw-bolder'>{elm.totalOrderPrice}</span></p>

                                            </div>
                                        </div>)

                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

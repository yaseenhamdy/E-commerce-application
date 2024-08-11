import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../CartContext/CartContext'
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import empty from '../../imgs/upvote-concept-illustration_114360-501.jpg'
export default function WishList() {
    let { getAllWishList, removeItemFromWishList, addToCart } = useContext(CartContext);
    const [list, setlist] = useState([])
    const [loading, setloading] = useState(false)
    let emptyWishListFlag;
    async function getWishList() {
        setloading(true)
        let respone = await getAllWishList();
        setlist(respone.data.data)
        setloading(false)
    }
    async function removeItem(id) {
        setloading(true);
        let respone = await removeItemFromWishList(id);
        await getWishList()
        toast.success(respone.data.message)
    }
    async function addToCartFromWishList(id) {
        setloading(true)
        await addToCart(id);
        let respone = await removeItemFromWishList(id);
        await getWishList()
        setloading(false)
        toast.success("Prouduct Added Successfully");
    }
    useEffect(() => {
        getWishList()
    }, [])

    if (list == null || list == '')
        emptyWishListFlag = 0
    else
        emptyWishListFlag = 1
    return (
        <>
            {loading ? <Loading />
                : emptyWishListFlag ?
                    <div className="container">
                        <div className="row">
                            <div className="col-md-11 m-auto">
                                <div className='cart-info bg-main-light my-3 p-4'>
                                    <h3>Wish List :</h3>
                                    {
                                        list.map((elm) =>
                                            <div className="row border-bottom d-flex align-items-center" key={elm._id}>
                                                <div className="col-md-1 my-3">
                                                    <div className="list-img">
                                                        <img src={elm.imageCover} className='w-100' />
                                                    </div>
                                                </div>
                                                <div className="col-md-11 m-auto">
                                                    <div className="list-title d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <h3 className='h5'>{elm.title.split(' ').slice(0, 3).join(' ')}</h3>
                                                            <p className='fw-bolder text-main'>Price : {elm.price}</p>
                                                            <button className='btn p-0 text-danger mb-3' onClick={() => removeItem(elm._id)}><i className="fa-solid fa-trash-can text-danger"></i> Remove</button>

                                                        </div>
                                                        <div>
                                                            <button className='btn bg-main text-white' onClick={() => addToCartFromWishList(elm._id)}>+ Add to Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className='container'>
                        <div className="row">
                            <div className="col-md-5 m-auto">
                                <div className="img-empty">
                                    <img src={empty} className='w-100' />
                                    <h3 className='text-center fw-bolder mt-3'>Your Wish list is empty</h3>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

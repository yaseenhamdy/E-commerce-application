import React, { useContext, useState } from 'react'
import navbarName from '../../imgs/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../CartContext/CartContext'
import axios from 'axios'
import baseURl from '../../Shared/baseURL'
export default function Navbar() {
    let { userToken, setUserToken } = useContext(UserContext);
    let { clearUserCart, increase, numOfCartWhenLogOut } = useContext(CartContext)
    let naavigate = useNavigate();
    async function logOut() {
        setUserToken(null);
        localStorage.removeItem('userToken')
        // await clearUserCart()
        await axios.delete(baseURl + `cart`, { headers: { token: localStorage.getItem('userToken') } })
            .then((respone) => console.log(respone))
            .catch((err) => console.log(err))
        //  numOfCartWhenLogOut()
        naavigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 bg-info">
                <div className="container">
                    <Link className="navbar-brand" to="/home">
                        <img src={navbarName} alt="logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userToken ? <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/cart">Cart</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/products">Products</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/categories">Categories</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/brand">Brands</NavLink>
                                </li>


                            </ul>
                        </> : ''}

                        {userToken ? <>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item px-2">
                                    <Link type="button" className="nav-link  position-relative" to='/cart'>
                                        <div>
                                            <i className="fa-solid fa-cart-shopping fs-5 mt-1 text-main"></i>
                                            <span className="position-absolute top-0 start-25 translate-middle badge rounded-pill bg-main">
                                                {increase()}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link type="button" className="nav-link" to='/wishList'  >
                                        <i className="fa-solid fa-heart fs-5 mx-2 text-danger"></i>
                                    </Link>
                                </li>
                                <li className="nav-item px-2">
                                    <Link type="button" className="nav-link" to='/profile'>
                                        <div className=''>
                                            <i className="fs-5 fa-solid fa-user text-info"></i>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <span onClick={logOut} className="nav-link cursor-pointer ms-2" >Logout</span>
                                </li>
                            </ul>
                        </>
                            : ''}


                        {/* <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li> */}
                        {/* <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                                </li> */}





                    </div>
                </div>
            </nav>

        </>
    )
}

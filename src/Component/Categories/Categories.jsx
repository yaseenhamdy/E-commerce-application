import axios from 'axios'
import React, { useEffect, useState } from 'react'
import baseURl from '../../Shared/baseURL'
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

export default function Categories() {
    const [categories, setcategories] = useState([])
    const [loading, setloading] = useState(false)
    async function getAllCategories() {
        setloading(true)
        let { data } = await axios.get(baseURl + `categories`);
        setcategories(data.data)
        setloading(false)

    }
    useEffect(() => {
        getAllCategories()
    }, [])
    return (
        <>
            {loading ? <Loading /> : <div className="container">
                <div className='text-center'>
                    <h3 className='mt-5 text-main fw-bolder '>Our Category</h3>
                    <p>You can see our categories and each category includes the products in it</p>
                </div>
                <div className="row mt-4">
                    {
                        categories.map((category) => <div className="col-md-3 my-3 " key={category._id}>
                            <div className="category-info m-auto">
                                <Link className='nav-link' to={'/SubCategory/' + category._id}>
                                    <div className="card" >
                                        <img src={category.image} className="card-img-top w-100" height={300} />
                                        <div className="card-body">
                                            <p className="card-text text-center fw-bolder">{category.name}</p>
                                        </div>
                                    </div>

                                </Link>
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>}
        </>
    )
}

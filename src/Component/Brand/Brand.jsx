import React, { useEffect, useState } from 'react';
import baseURl from '../../Shared/baseURL';
import axios from 'axios';
import SubBrand from './SubBrand';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

export default function Brand() {
    const [brands, setbrands] = useState([])
    const [loading, setloading] = useState(false)
    let navigate = useNavigate()
    async function getAllBrands() {
        setloading(true)
        let { data } = await axios.get(baseURl + `brands`);
        setloading(false)
        setbrands(data.data);
    }
    useEffect(() => {
        getAllBrands()
    }, [])

    function goToSubBrand(brrandID) {
        navigate('/subBrand/' +brrandID)
    }

    return (
        <>
            {loading ? <Loading /> : <div className='container mt-5'>
                <div className="row">
                    {
                        brands.map((brand) =>
                            <div className="col-md-3 " key={brand._id} >
                                <div className='position-relative brand-card'>
                                    <div className="brand-layer position-absolute w-100 rounded-4 h-100 d-flex align-items-center justify-content-center">
                                        <button className='btn bg-main text-white ' onClick={()=>goToSubBrand(brand._id)}>Products of this brand</button>

                                    </div>
                                    {/* <Link className='nav-link' to={'/subBrand/' + brand._id}> */}
                                        <div className="brands  my-3 shadow py-2 rounded-4" >
                                            <img src={brand.image} alt={brand.name + ` Brand`} className='w-100' />
                                            <p className='text-center'>{brand.name}</p>
                                        </div>
                                    {/* </Link> */}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>}

        </>
    )
}

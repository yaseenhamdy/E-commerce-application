import axios from 'axios';
import React, { useEffect, useState } from 'react'
import baseURl from '../../Shared/baseURL';
import Slider from "react-slick";
import Loading from '../../Shared/Loading/Loading';
export default function CategoriesSlider() {
    let [category, setCategory] = useState([]);
    let [loading, setLoading] = useState(true);
    async function getCategories() {
        let { data } = await axios.get(baseURl + 'categories');
        setCategory(data.data);
        setLoading(false);
    }
    useEffect(() => {
        getCategories()
    }, [])

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (
        <>
            <div className="container">
                <div className='mt-5'>
                    <h2 className='pb-3  '>Shop Popular Categories</h2>
                    {loading ? <Loading /> : ''}
                    <Slider {...settings} >
                        {
                            category.map((elm) => {
                                return <div key={elm._id}>
                                    <img src={elm.image} className='w-100' height={200} />
                                </div>
                            })
                        }

                    </Slider >
                </div>
            </div>
        </>
    )
}

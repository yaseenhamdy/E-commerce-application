import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import baseURl from '../../Shared/baseURL';
import Loading from '../../Shared/Loading/Loading';
import Slider from "react-slick";
import { CartContext } from '../../CartContext/CartContext';
import { toast } from 'react-toastify';

export default function ProductDetails() {
  let [pro, setPro] = useState({});
  let [loading, setLoading] = useState(false);
  let [imgSlider, setImgSlider] = useState([])
  let [proName, setProName] = useState(null)
  let { id } = useParams();

  async function getSpecificProduct() {
    setLoading(true);
    let { data } = await axios.get(baseURl + `products/${id}`);
    setPro(data.data);
    setImgSlider(data.data.images)
    setProName(data.data.category.name)
    setLoading(false);

  }

  useEffect(() => {
    getSpecificProduct();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };

  let { addToCart } = useContext(CartContext);

  async function toCart(id) {
    setLoading(true);
    await addToCart(id);
    setLoading(false);
    toast.success("Prouduct Added Successfully");

  }
  return (
    <>
      {loading ? <Loading /> : <>
        <div className="container">
          <div className="row d-flex  align-items-center">
            <div className="col-md-4">
              <div className="pro-img-name mt-4">
                <Slider {...settings}>
                  {
                    imgSlider.map((elm, index) => <img src={elm} key={index} className='w-100' />)
                  }

                </Slider>
              </div>
            </div>
            <div className="col-md-8">
              <div className="pro-desc">
                <h6 className='fw-bolder'>{pro.title}</h6>
                <p>{pro.description}</p>
                <p>{proName}</p>
                <div className='d-flex justify-content-between mb-3'>
                  <div >
                    <span>{pro.price} EGP</span>
                  </div>
                  <div>
                    <span>{pro.ratingsAverage}</span>
                    <i className="fa-solid fa-star rating-color"></i>
                  </div>
                </div>
                <button onClick={() => toCart(pro._id)} className='w-100 btn bg-main text-white'><span>+ </span>add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </>}

    </>
  )
}

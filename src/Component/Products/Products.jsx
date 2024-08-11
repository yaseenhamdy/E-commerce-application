import React, { useEffect, useState } from 'react'
import axios from 'axios'
import baseURl from '../../Shared/baseURL';
import Product from './Product';
import Loading from '../../Shared/Loading/Loading';
export default function Products() {

  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [loadingInChild, setLoadingInChild] = useState(false);

  async function getAllProducts() {
    let { data } = await axios.get(baseURl + 'products');
    setProducts(data.data);
    setLoading(false);
  }
  useEffect(() => {
    getAllProducts();
  }, [])
  return (
    <>
      <div className="container mt-5">
        {loading ? <Loading /> : ''}
        <div className="row">
          {
            products.map((elm) => <Product prod={elm} key={elm._id} />
            )
          }
        </div>
      </div>
    </>
  )
}

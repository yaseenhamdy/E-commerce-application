import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from 'yup'
import { CartContext } from '../../CartContext/CartContext'
import Loading from '../../Shared/Loading/Loading'
import paymentImg from '../../imgs/payment.jpg'

export default function () {
    let { checkoutSession, getCartID, numOfCartWhenLogOut } = useContext(CartContext)
    const [loading, setloading] = useState(false)
    let initialValues = {
        details: '',
        phone: '',
        city: ''
    }
    let phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/
    let validationSchema = Yup.object({
        details: Yup.string().required('Address is requrierd'),
        phone: Yup.string().matches(phoneRegex, 'Invalid phone number').required('Phone number requiered'),
        city: Yup.string().required('City is requiered')
    })
    async function paymentsubmit(val) {
        setloading(true)
        let cartID = await getCartID()
        let respone = await checkoutSession(cartID, val, 'localhost:3000')
        console.log(respone.data.session.url);
        numOfCartWhenLogOut()
        localStorage.setItem('inCart', 0)
        window.location.href = respone.data.session.url;
        setloading(false)
    }
    let paymentFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: paymentsubmit
    })



    {/* <div className=' mt-5 m-auto  p-3 rounded-3   '>
                <h3 className='mb-2'>Add a new address</h3>
                <form onSubmit={paymentFormik.handleSubmit}>
                    <label htmlFor="details" className='mb-2'>Your address</label>
                    <input type="text" name='details' value={paymentFormik.values.details} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} id='details' className='form-control' />
                    {paymentFormik.errors.details && paymentFormik.touched.details ? <div className='alert alert-danger p-2 mt-3'>{paymentFormik.errors.details}</div> : ''}

                    <label htmlFor="phone" className='mb-2'>Your phone number</label>
                    <input type="tel" name='phone' value={paymentFormik.values.phone} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} id='phone' className='form-control' />
                    {paymentFormik.errors.phone && paymentFormik.touched.phone ? <div className='alert alert-danger p-2 mt-3'>{paymentFormik.errors.phone}</div> : ''}

                    <label htmlFor="city" className='mb-2'>Your city</label>
                    <input type="text" name='city' value={paymentFormik.values.city} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} id='city' className='form-control' />
                    {paymentFormik.errors.city && paymentFormik.touched.city ? <div className='alert alert-danger p-2 mt-3'>{paymentFormik.errors.city}</div> : ''}

                    <button className='btn bg-main w-100 mt-3 text-white' type='submit'>Pay Now</button>
                </form>
            </div> */}
    return (
        <>
            {loading ? <Loading /> : <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="payment-img">
                            <img src={paymentImg} className='w-100' />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='profile-inputs mt-5 m-auto  p-3 rounded-3   '>
                            <h3 className='mb-2'>Add a new address</h3>
                            <form onSubmit={paymentFormik.handleSubmit}>
                                <label htmlFor="details" className='mb-2'>Your address</label>
                                <input type="text" name='details' value={paymentFormik.values.details} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} id='details' className='form-control' />
                                {paymentFormik.errors.details && paymentFormik.touched.details ? <div className='alert alert-danger p-2 mt-3'>{paymentFormik.errors.details}</div> : ''}

                                <label htmlFor="phone" className='mb-2'>Your phone number</label>
                                <input type="tel" name='phone' value={paymentFormik.values.phone} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} id='phone' className='form-control' />
                                {paymentFormik.errors.phone && paymentFormik.touched.phone ? <div className='alert alert-danger p-2 mt-3'>{paymentFormik.errors.phone}</div> : ''}

                                <label htmlFor="city" className='mb-2'>Your city</label>
                                <input type="text" name='city' value={paymentFormik.values.city} onChange={paymentFormik.handleChange} onBlur={paymentFormik.handleBlur} id='city' className='form-control' />
                                {paymentFormik.errors.city && paymentFormik.touched.city ? <div className='alert alert-danger p-2 mt-3'>{paymentFormik.errors.city}</div> : ''}

                                <button className='btn bg-main w-100 mt-3 text-white' type='submit'>Pay Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}

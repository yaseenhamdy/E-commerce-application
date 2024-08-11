import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import baseURl from '../../Shared/baseURL'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
    let [loading, setLoading] = useState(false);
    let [error,setError] = useState('')
    let navigate = useNavigate()
    let initialValues = {
        email: ''
    }
    let validationSchema = Yup.object({
        email: Yup.string().email('Enter Valid Email').required('Email Is Requiered')
    })
    async function submitEmail(val) {
        setLoading(true)
        let { data } = await axios.post(baseURl + `auth/forgotPasswords`, val)
        .catch( (err)=>{
            setError(err.response.data.message)
             setLoading(false);
        } );
        setLoading(false);
        toast.success(data.message)
        navigate('/recetPassword')
    }
    let emailFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: submitEmail
    })
    return (
        <>
            <div className=' w-75 m-auto mt-5'>
            {error ?<> <div className='alert alert-danger p-2 mt-3 text-center'>{error}</div></> : ''}
                <h3>Find your account</h3>
                <form onSubmit={emailFormik.handleSubmit}>
                    <label htmlFor="email">Please enter your email to search for your account.</label>
                    <input type="email" name='email' id='email' onChange={emailFormik.handleChange} onBlur={emailFormik.handleBlur} className='form-control mt-2' />
                    {emailFormik.errors.email && emailFormik.touched.email ? <div className='alert alert-danger p-2 mt-3'>{emailFormik.errors.email}</div> : ''}
                    {loading ? <button type='submit' className='btn bg-main text-white mt-3 w-100'><i className="fa-solid fa-spinner fa-spin"></i></button>
                        : <button type='submit' className='btn bg-main text-white mt-3 w-100'>Send</button>
                    }

                </form>
                <div className='text-center'>
                <div className='mt-3'>
                    <Link to='/register' className='text-decoration-none'>Create an account</Link>
                    <hr />
                    <Link to='/login' className='text-decoration-none text-dark'>Back to login</Link>
                </div>
                </div>
            </div>
        </>
    )
}

import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import baseURl from '../../Shared/baseURL';
import { toast } from 'react-toastify';

export default function ResetPasswordCode() {
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    let codeRegex = /^[0-9]+$/
    let navigate = useNavigate()
    let validationSchema = Yup.object({
        resetCode: Yup.string().matches(codeRegex, 'Code is not match').required('Enter the code')
    })
    async function submitCode(val) {
        setLoading(true);
        let { data } = await axios.post(baseURl + `auth/verifyResetCode`, val)
            .catch((err) => {
                setError(err.response.data.message)
                setLoading(false);

            })
        setLoading(false);
        if (data.status == 'Success') {
            navigate('/resetNewPassword')
        }

    }
    let initialValues = {
        resetCode: ''
    }
    let codeFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: submitCode
    })
    return (
        <>

            <div className=' w-75 m-auto mt-5'>
                {error ? <> <div className='alert alert-danger p-2 mt-3 text-center'>{error}</div></> : ''}
                <h3>Your recent code</h3>
                <form onSubmit={codeFormik.handleSubmit}>
                    <label htmlFor="resetCode">Please enter your code.</label>
                    <input type="text" name='resetCode' id='resetCode' onChange={codeFormik.handleChange} onBlur={codeFormik.handleBlur} className='form-control mt-2' />
                    {codeFormik.errors.resetCode && codeFormik.touched.resetCode ? <div className='alert alert-danger p-2 mt-3'>{codeFormik.errors.resetCode}</div> : ''}
                    {loading ? <button type='submit' className='btn bg-main text-white mt-3 w-100'><i className="fa-solid fa-spinner fa-spin"></i></button>
                        : <button type='submit' className='btn bg-main text-white mt-3 w-100'>Send</button>
                    }
                </form>
                <div className='mt-3 text-center'>
                    <Link to='/login' className='text-decoration-none fw-bolder'>Back to login</Link>
                </div>
            </div>
        </>
    )
}

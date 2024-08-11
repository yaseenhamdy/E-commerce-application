import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import baseURl from '../../Shared/baseURL'
import { toast } from 'react-toastify';

export default function () {
    let navigate = useNavigate()
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState('');
    let toastFlag = 1;
    let initialValues = {
        email: '',
        newPassword: '',
    }
    let passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    let validationSchema = Yup.object({
        email: Yup.string().email().required('Email is Requiered'),
        newPassword: Yup.string().matches(passwordRegex, 'Invalid password').required('New password is Requiered'),

    })
    async function changePasswordSubmit(val) {
        setLoading(true)
        console.log();
        let { data } = await axios.put(baseURl + `auth/resetPassword`, val)
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            })
      
        if (data.token) {
            setLoading(false);
            toast.success('Password Changed Successfully');
            navigate('/login');
        }
        else {
            setLoading(false)
            toast.error('There is no user with this email address ')
        }

    }
    let changePasswordFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: changePasswordSubmit
    })
    return (
        <>
            <div className=' w-75 m-auto mt-5'>
                <h3>Change Password</h3>
                <form onSubmit={changePasswordFormik.handleSubmit}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name='email' onChange={changePasswordFormik.handleChange} onBlur={changePasswordFormik.handleBlur} id='email' className='form-control mt-2' />
                    {changePasswordFormik.errors.email && changePasswordFormik.touched.email ? <div className='alert alert-danger p-2 mt-3'>{changePasswordFormik.errors.email}</div> : ''}

                    <label htmlFor="newPassword" className='mt-3'>New Password</label>
                    <input type="password" name='newPassword' onChange={changePasswordFormik.handleChange} onBlur={changePasswordFormik.handleBlur} id='newPassword' className='form-control mt-2' />
                    {changePasswordFormik.errors.newPassword && changePasswordFormik.touched.newPassword ? <div className='alert alert-danger p-2 mt-3'>{changePasswordFormik.errors.newPassword}</div> : ''}

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

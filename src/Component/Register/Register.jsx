import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useState } from 'react'
import * as Yup from 'yup'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let initial = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    }
    async function registerSubmit(values) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
            })
        if (data.message === 'success') {
            setLoading(false);
            navigate('/login')
        }
    }

    // function validate(val) {
    //     let errors = {}
    //     let valEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    //     let valPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    //     let valPhone = /^01[0-2,5]{1}[0-9]{8}$/
    //     // validation of name
    //     if (!val.name)
    //         errors.name = 'Name Requiered!'
    //     else if (val.name.length < 3)
    //         errors.name = 'Min Name is 3'
    //     else if (val.name.length > 10)
    //         errors.name = "Max Name is 10"

    //     // validation of email
    //     if (!val.email)
    //         errors.email = 'Email Required'
    //     else if (!valEmail.test(val.email))
    //         errors.email = 'Enter Valid Email'

    //     // validation of password
    //     if (!val.password)
    //         errors.password = 'Password Required'
    //     else if (!valPassword.test(val.password))
    //         errors.password = 'Invalid Password'

    //     // validation of Repassword    
    //     if (val.password != val.rePassword && !val.password)
    //         errors.rePassword = 'Password Does not Match'

    //     // validation of Phone
    //     if (!val.phone)
    //         errors.phone = 'Phone Number Required'
    //     else if (!valPhone.test(val.phone))
    //         errors.phone = 'Invalid Phone Number'

    //     return errors
    // }
    let passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    let phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/

    let validationSchema = Yup.object({
        name: Yup.string().min(3, 'Min Length Is 3').max('10', 'Max Length Is 10').required('Name Is Required'),
        email: Yup.string().email('Invalid Email').required('Email Is Requiered'),
        password: Yup.string().matches(passwordRegex, 'Invalid  Password').required('Password Is Required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password Does not Match').required('Password Is Required'),
        phone: Yup.string().matches(phoneRegex, 'Invalid Phone Number').required('Phone Number Is Requiered')
    })
    let formik = useFormik({
        initialValues: initial,
        validationSchema,
        onSubmit: registerSubmit
    })
    return (
        <>
            <div className="register w-75 m-auto mt-5">
                {error ? <div className='alert alert-danger p-2 mt-3 text-center'>{error}</div> : ''}
                <h3>Register Now :</h3>
                <form onSubmit={formik.handleSubmit} >

                    <label htmlFor='userName'>Name:</label>
                    <input id='userName' onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control' name='name' />

                    {/* to show alert  */}
                    {formik.errors.name && formik.touched.name ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.name}</div> : null}

                    <label htmlFor='userEmail'>email:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' name='email' id='userEmail' />

                    {/* to show alert  */}
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.email}</div> : ''}

                    <label htmlFor='userPassword'>Password:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' name='password' id='userPassword' />

                    {/* to show alert */}
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.password}</div> : ''}

                    <label htmlFor='userRepassword'>Repassword:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' name='rePassword' id='userRepassword' />

                    {/* to show alert */}
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.rePassword}</div> : ''}

                    <label htmlFor='userPhone'>Phone:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" className='form-control' name='phone' id='userPhone' />

                    {/* to show alert */}
                    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.phone}</div> : ''}
                    <div className='d-flex align-items-center  justify-content-between '>
                        <div className='d-flex'>
                            <span>I Have Accont </span> <Link className="nav-link text-info ms-2" to="/login"> Sign In</Link>
                        </div>
                        <div className="btn1 d-flex justify-content-end">
                            {loading ? <button className='btn bg-main  mt-2' type='buttton'>
                                <BallTriangle
                                    height={40}
                                    width={40}
                                    radius={5}
                                    color="#fff"
                                    ariaLabel="ball-triangle-loading"
                                    wrapperClass={{}}
                                    wrapperStyle=""
                                    visible={true}
                                /></button> : <button disabled={!(formik.dirty && formik.isValid)} className='btn bg-main text-white mt-3' type='submit'>Register</button>}
                        </div>
                    </div>

                </form>
            </div>

        </>
    )
}

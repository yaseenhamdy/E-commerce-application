import axios from 'axios'
import { useFormik } from 'formik'
import jwtDecode from 'jwt-decode'
import * as Yup from 'yup'
import baseURl from "../../Shared/baseURL";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../Shared/Loading/Loading';
import { useState } from 'react';
import profileImg from '../../imgs/20943568.jpg'

export default function Profile() {
    let navigate = useNavigate()
    const [loading, setloading] = useState(false)
    function getUserName() {
        return jwtDecode(localStorage.getItem('userToken')).name
    }
    let initialValues = {
        currentPassword: '',
        password: '',
        rePassword: ''
    }
    let passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    let validationSchema = Yup.object({
        currentPassword: Yup.string().matches(passwordRegex, 'Invalid  Password').required('Password Is Required'),
        password: Yup.string().matches(passwordRegex, 'Invalid  Password').required('Password Is Required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password Does not Match').required('Password Is Required'),
    })
    let headers = {
        token: localStorage.getItem('userToken')
    }
    async function changPasswordSubmit(val) {
        setloading(true)
        let respone = await axios.put(baseURl + `users/changeMyPassword`, val, { headers })
            .catch((err) => { return err.response });
        setloading(false)
        console.log(respone);
        if (respone.data.message == "success") {
            toast.success('Your password is changed....You have to Login');
            navigate('/login')
        } else {
            toast.error(respone.data.errors.msg);

        }


    }
    let profileFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: changPasswordSubmit
    })
    return (
        <>
            {loading ? <Loading /> : <div className='w-100'>
                <div className="text-center mt-4 ">
                    <h2 className='fw-bold h1'>Hello <span className='text-info'> {getUserName()}</span></h2>
                </div>
                <div className="container mt-5">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="profile-img">
                                <img src={profileImg} className='w-100' />
                            </div>
                        </div>
                        <div className="col-md-6 p-4  m-auto">
                            <div className="profile-inputs ">
                                <h3 className='text-info fw-bolder '>Change your password</h3>
                                <form className='mt-5 ' onSubmit={profileFormik.handleSubmit}>
                                    <label htmlFor="currentPassword" className='mb-2 fs-5'>Current password</label>
                                    <input type="password" name='currentPassword' onChange={profileFormik.handleChange} onBlur={profileFormik.handleBlur} id='currentPassword' className='form-control mb-4 w-75' />
                                    {profileFormik.errors.currentPassword && profileFormik.touched.currentPassword ? <div className='alert alert-danger p-2 mt-3 w-50'>{profileFormik.errors.currentPassword}</div> : null}

                                    <label htmlFor="password" className='mb-2 fs-5'>New password</label>
                                    <input type="password" name='password' onChange={profileFormik.handleChange} onBlur={profileFormik.handleBlur} id='password' className='form-control w-75 mb-4' />
                                    {profileFormik.errors.password && profileFormik.touched.password ? <div className='alert alert-danger p-2 mt-3 w-50'>{profileFormik.errors.password}</div> : null}

                                    <label htmlFor="rePassword" className='mb-2 fs-5'>Repassword</label>
                                    <input type="password" name='rePassword' onChange={profileFormik.handleChange} onBlur={profileFormik.handleBlur} id='rePassword' className='form-control w-75' />
                                    {profileFormik.errors.rePassword && profileFormik.touched.rePassword ? <div className='alert alert-danger p-2 mt-3 w-50'>{profileFormik.errors.rePassword}</div> : null}

                                    <button className='btn bg-info w-75 text-white mt-4' type='submit'>Save Changes</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            }
        </>
    )
}

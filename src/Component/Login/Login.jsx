import axios from 'axios'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as Yup from 'yup'
import { BallTriangle } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import baseURl from '../../Shared/baseURL'
import { UserContext } from '../../Context/UserContext'
import { toast } from 'react-toastify';
import { CartContext } from '../../CartContext/CartContext'

export default function Login() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    let {numOfCartWhenLogOut} = useContext(CartContext)
    let { setUserToken } = useContext(UserContext);
    let initial = {
        email: '',
        password: '',
    }
    async function registerSubmit(values) {
        setLoading(true);
        let { data } = await axios.post(baseURl + `auth/signin`, values)
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
            })
        if (data.message === 'success') {
            setLoading(false);
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token)
            navigate('/')
            await numOfCartWhenLogOut()
        }
    }

    let passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ 

    let validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email').required('Email Is Requiered'),
        password: Yup.string().matches(passwordRegex, 'Invalid  Password').required('Password Is Required'),
    })
    let formik = useFormik({
        initialValues: initial,
        validationSchema,
        onSubmit: registerSubmit
    })
    return (
        <>

            <div className="register w-75 m-auto mt-5">
                {/* {showNavigateMsg ?  <div className='alert alert-danger p-2 mt-3 text-center'>You Must Login</div>:''} */}
                {error ? <> <div className='alert alert-danger p-2 mt-3 text-center'>{error}</div></> : ''}
                <h3>Login Now :</h3>
                <form onSubmit={formik.handleSubmit} >

                    <label htmlFor='userEmail'>email:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className='form-control' name='email' id='userEmail' />

                    {/* to show alert  */}
                    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.email}</div> : ''}

                    <label htmlFor='userPassword'>Password:</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className='form-control' name='password' id='userPassword' />

                    {/* to show alert */}
                    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger p-2 mt-3'>{formik.errors.password}</div> : ''}


                    <div className=' text-center'>
                        <div className="btn1">
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
                                /></button> : <button disabled={!(formik.dirty && formik.isValid)} className='btn bg-main text-white mt-4' type='submit'>Login</button>}
                        </div>
                        <div>
                            <div className='pt-2'>
                                <Link className='text-danger text-decoration-none' to='/forgetPassword' >Forgot your password?</Link>
                            </div>
                            <hr />
                            <div>
                                <span className='w-100'>I Do not Have Accont </span> <Link className="nav-link text-info ms-2 d-inline-block" to="/register"> Create Account</Link>
                            </div>
                        </div>

                    </div>


                </form>
            </div>

        </>
    )
}

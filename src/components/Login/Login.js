import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import Profile from '../Profile/Profile';
import { createUserWithEmailAndPassword, googleSingIn, initializeLoginFramework, signInWithEmailAndPassword, handleSignOut, facebookSingIn, } from './LoginManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faGoogle
} from "@fortawesome/free-brands-svg-icons";
import './Login.css';

const Login = () => {
    document.title = 'Login';
    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [option, setOption] = useState('signUp');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({});
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfrimPassword] = useState('')

    const onChangeHandler = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
            setPassword(e.target.value)
        }
        if (e.target.name === 'confirmPassword') {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
            setConfrimPassword(e.target.value)
        }
        if (isFieldValid) {
            const key = e.target.name
            setFormData({ ...formData, [key]: e.target.value })
            setError('')
        }
        else {
            setError('Please check your Email format or Password (password should have more then six character and a number in it)')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (option === 'signUp') {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(formData.name, formData.email, formData.password).then(res => {
                    handleResponse(res, true)
                }).catch(error => { setError(error) })
                setError('')
            }
            else {
                setError('Your passwords didnot matched')
            }
        }
        if (option === 'login') {
            signInWithEmailAndPassword(formData.email, formData.password).then(res => {
                handleResponse(res, true)
            }).catch(error => { setError(error) })
        }
    }

    const signOut = (e) => {
        handleSignOut().then(res => {
            handleResponse(res, false)
        }).catch(error => { setError(error) })
    }

    const handleGoogleSingIn = () => {
        googleSingIn().then(res => {
            handleResponse(res, true)
        }).catch(error => { setError(error) })
    }
    const handleFacebookSingIn = () => {
        facebookSingIn().then(res => {
            handleResponse(res, true)
        }).catch(error => { setError(error) })
    }

    const handleResponse = (res, redirect) => {
        setLoggedInUser(res)
        redirect && history.replace(from);
    }

    return (
        <>  {
            loggedInUser.email ?
                <Profile signOut={signOut} />
                :
                <>
                    <div className="col-md-5 mt-5 container bg-none b-2 p-3">
                        <form onSubmit={handleSubmit} className="form my-4">
                            {
                                option === 'signUp' ? <h2 className='text-lime-green text-center my-3'>Create an account</h2> : <h2 className='text-lime-green text-center my-3'>Login</h2>
                            }
                            {
                                option === 'signUp' && <div className="mb-3">
                                    <input name="name" type="text" onChange={(e) => onChangeHandler(e)} placeholder="Name" className="form-control" required />
                                </div>
                            }
                            <div className="mb-3">
                                <input name="email" onChange={(e) => onChangeHandler(e)} type="email" placeholder="Email" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <input name="password" onChange={(e) => onChangeHandler(e)} type="password" placeholder="Password" className="form-control" required />
                            </div>
                            {
                                option === 'signUp' && <div className="mb-3">
                                    <input name="confirmPassword" onChange={(e) => onChangeHandler(e)} type="password" placeholder="Confirm Password" className="form-control" required />
                                </div>
                            }
                            <p className='text-danger'>{error}</p>
                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" />
                                <label className="form-check-label">Remember me</label>
                            </div>
                            <div className="mb-3 d-grid">
                                {
                                    option === 'signUp' ?
                                        <button type="submit" className="btn btn-success text-white w-100">Create an account</button>
                                        :
                                        <button type="submit" className="btn btn-success text-white w-100">Login</button>
                                }
                            </div>
                            {
                                option === 'signUp' ? <> <p>Already have an account? <span className='text-danger' onClick={() => setOption('login')}>Login</span></p></> :
                                    <> <p>Don't have an account? <span className='text-danger' onClick={() => setOption('signUp')}>Create an account</span></p></>
                            }
                        </form>
                        {/* <h3 className='text-danger text-center'>Or</h3> */}
                        <div className="or-seperator"><b>Or</b></div>
                        <div className="social-btn text-center">
                            <button className="btn btn-primary btn-lg" onClick={handleFacebookSingIn}><FontAwesomeIcon icon={faFacebook} /> Facebook</button>
                            <button className="btn btn-danger btn-lg" onClick={handleGoogleSingIn}><FontAwesomeIcon icon={faGoogle} /> Google</button>
                        </div>

                    </div>
                </>
        } </>
    );
};

export default Login;
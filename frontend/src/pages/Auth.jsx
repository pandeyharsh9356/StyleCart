import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import Logo from "../assets/logo.png";
import google from '../assets/google.png';
import { RiUser6Line, RiMailLine, RiLockPasswordLine, RiArrowLeftLine } from "react-icons/ri";
import './Auth.css';

function Auth() {
    const [isActive, setIsActive] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form States
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

    const { serverUrl } = useContext(authDataContext);
    const { getCurrentUser } = useContext(userDataContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Handlers
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${serverUrl}/api/auth/login`, loginData, { withCredentials: true });
            setLoading(false);
            getCurrentUser();
            toast.success("Login Successful");
            navigate(location.state?.from || "/");
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Login Failed");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${serverUrl}/api/auth/registration`, signupData, { withCredentials: true });
            setLoading(false);
            getCurrentUser();
            toast.success("Account Created Successfully");
            navigate(location.state?.from || "/");
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error(error.response?.data?.message || "Registration Failed");
        }
    };

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const { displayName: name, email } = response.user;
            await axios.post(`${serverUrl}/api/auth/google-login`, { name, email }, { withCredentials: true });
            getCurrentUser();
            toast.success("Google Login Successful");
            navigate(location.state?.from || "/");
        } catch (error) {
            console.error(error);
            toast.error("Google Login Failed");
        }
    };

    return (
        <div className="auth-body">
            {/* Top Logo Section */}
            <div className='absolute top-12 left-12 flex items-center gap-4 cursor-pointer group z-50' onClick={() => navigate("/")}>
                <div className='w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#0ef] transition-all transform group-hover:rotate-[360deg] duration-1000'>
                    <img className='w-8 grayscale brightness-200' src={Logo} alt="Logo" />
                </div>
                <div className='hidden sm:block'>
                    <h1 className='text-xl font-black text-white uppercase tracking-widest'>StyleCart</h1>
                    <p className='text-[8px] text-[#0ef] font-black uppercase tracking-[4px]'>Style Authority</p>
                </div>
            </div>

            <div className={`auth-container ${isActive ? 'active' : ''}`} id="container">
                {/* Sign Up Form */}
                <div className="auth-form-container auth-sign-up">
                    <form onSubmit={handleSignup}>
                        <p className="subtitle">Welcome to StyleCart</p>
                        <h1>Create <br/> Account</h1>
                        
                        <button type="button" className="social-login" onClick={handleGoogleAuth}>
                            <img src={google} alt="Google" />
                            <span>Sync with Google</span>
                        </button>

                        <div className="auth-input-box">
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="name"
                                value={signupData.name}
                                onChange={handleSignupChange}
                                required
                            />
                            <i><RiUser6Line /></i>
                        </div>
                        <div className="auth-input-box">
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={signupData.email}
                                onChange={handleSignupChange}
                                required
                            />
                            <i><RiMailLine /></i>
                        </div>
                        <div className="auth-input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={signupData.password}
                                onChange={handleSignupChange}
                                required
                            />
                            <i><RiLockPasswordLine /></i>
                        </div>

                        <button type="submit" className="glow-btn w-full mt-8 py-5 rounded-2xl text-[10px]" disabled={loading}>
                            {loading ? <Loading color="black" /> : "CREATE ACCOUNT"}
                        </button>

                        <p>Already have an account? <a onClick={() => setIsActive(false)}>Login</a></p>
                    </form>
                </div>

                {/* Login Form */}
                <div className="auth-form-container auth-login">
                    <form onSubmit={handleLogin}>
                        <p className="subtitle">Welcome Back</p>
                        <h1>Login</h1>

                        <button type="button" className="social-login" onClick={handleGoogleAuth}>
                            <img src={google} alt="Google" />
                            <span>Sign in with Google</span>
                        </button>

                        <div className="auth-input-box">
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <i><RiMailLine /></i>
                        </div>
                        <div className="auth-input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <i><RiLockPasswordLine /></i>
                        </div>

                        <button type="submit" className="glow-btn w-full mt-8 py-5 rounded-2xl text-[10px]" disabled={loading}>
                            {loading ? <Loading color="black" /> : "LOGIN"}
                        </button>

                        <p>New here? <a onClick={() => setIsActive(true)}>Sign Up</a></p>
                    </form>
                </div>

                {/* Toggle Panels */}
                <div className="auth-toggle-container">
                    <div className="auth-toggle">
                        <div className="auth-toggle-panel auth-toggle-left">
                            <p className='text-[#0ef] text-[10px] font-black tracking-[8px] uppercase mb-4'>Already have an account?</p>
                            <h1>WELCOME BACK</h1>
                            <p>Login to access your orders and account details.</p>
                            <button className="px-10 py-4 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all" onClick={() => setIsActive(false)}>Login</button>
                        </div>
                        <div className="auth-toggle-panel auth-toggle-right">
                            <p className='text-[#0ef] text-[10px] font-black tracking-[8px] uppercase mb-4'>New here?</p>
                            <h1>HELLO THERE</h1>
                            <p>Create your StyleCart account today and start shopping.</p>
                            <button className="px-10 py-4 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all" onClick={() => setIsActive(true)}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;

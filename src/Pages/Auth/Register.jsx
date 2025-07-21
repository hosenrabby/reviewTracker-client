import Lottie from 'lottie-react';
import React, { use } from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaGoogle, FaGithub } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import registerLottie from '../../../public/assets/RegisterLottie.json'
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
    const { setUser, signUpWithEmailPassword, updateUserProfile, signInWithGoogle, explocation } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    // console.log(user)
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const photo = e.target.photo.value
        // const formData = { name, email, password, photo }
        // console.log(formData)

        signUpWithEmailPassword(email, password).then(res => {
            const user = res.user;
            updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
                setUser({ ...user, displayName: name, photoURL: photo })
                axiosInstanceIntercept.post('/add-userInfo', { userName: name, userEMail: email, userPhoto: photo }).then(() => {
                    navigate(explocation || '/')
                    Swal.fire({
                        title: "Welcome!!!",
                        text: "You are successfully In.",
                        icon: "success"
                    });
                }).catch(err => {
                    console.log(err.data)
                })
            }).catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Cradintial"
                });
            })
            setUser(res.user)
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password"
            });
        })
    };

    const signUpWithGoogle = () => {
        signInWithGoogle().then((res) => {
            // console.log(res.user)
            axiosInstanceIntercept.post('/add-userInfo', { userName: res.user.displayName, userEMail: res.user.email, userPhoto: res.user.photoURL }).then(() => {
                navigate(explocation || '/')
                Swal.fire({
                    title: "Welcome!!!",
                    text: "You are successfully In.",
                    icon: "success"
                });
            }).catch(err => {
                console.log(err.data)
            })
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Sarver Did Not response."
            });
        })
    }
    return (
        <>
            <title>Take Task | Sign Up</title>
            <div className='flex justify-center items-center bg-[#101828] rounded-2xl'>
                <div className="flex flex-col md:flex-row justify-center items-center min-h-[calc(100vh-200px)] px-4 py-8">

                    <div className='w-full md:w-[40%]'>
                        <Lottie animationData={registerLottie}></Lottie>
                    </div>


                    <div className="bg-base-100 rounded-2xl p-8 shadow-lg w-full max-w-md">
                        <h1 className="text-3xl text-base-content font-bold text-center mb-1">Register</h1>
                        <p className="text-center mb-6 text-gray-500">Register your account to connect with us.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Full Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Full Name" className="input input-bordered w-full" required />
                            </div>
                            {/* Email */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Email</span>
                                </label>
                                <label className="input validator w-full">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </g>
                                    </svg>
                                    <input type="email" name='email' placeholder="mail@site.com" required />
                                </label>
                                <div className="validator-hint hidden">Enter valid email address</div>

                            </div>
                            {/* Password */}
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Password</span>
                                </label>
                                <label className="input validator w-full">
                                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" ></path>
                                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </g>
                                    </svg>
                                    <input type={showPassword ? 'text' : 'password'} name='password' required placeholder="Password" minlength="8"
                                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                                    />
                                    <span className="absolute right-3 top-3 cursor-pointer text-lg text-gray-500" onClick={() => setShowPassword(!showPassword)} >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </label>
                                <p className="validator-hint hidden">Must be more than 8 characters, including <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter.</p>
                            </div>
                            <div>
                                <label className="label">
                                    <span className="label-text text-base-content font-medium">Photo Url</span>
                                </label>
                                <input type="text" name='photo' placeholder="Photo Url" className="input input-bordered w-full" required />
                            </div>
                            {/* Terms */}
                            <div className="flex items-start gap-2">
                                <input type="checkbox" name='terms' className="checkbox checkbox-primary" required />
                                <p className="text-sm text-base-content">You accept our <a href="#" className="link link-primary">Terms and Conditions</a> and <a href="#" className="link link-primary">Privacy Policy</a></p>
                            </div>
                            <div>
                                <p className='text-sm text-base-content'>Allready Have an Account <Link to={'/login'} className='link link-primary'>Sign in</Link> </p>
                            </div>
                            {/* Submit */}
                            <button className={`py-2 px-4 flex justify-center items-center transition rounded-md w-full font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                                Register Now<GoArrowUpRight />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="divider my-6">or</div>

                        {/* Social Sign In */}
                        <div className="flex flex-col gap-3">
                            <button onClick={signUpWithGoogle} className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Sign Up with Google
                            </button>

                            <button className="btn bg-black text-white border-black">
                                <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
                                Sign Up with GitHub
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Register;
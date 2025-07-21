import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import BlurText from "../../../ReactBits/BlurText/BlurText";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddService = () => {
    const { user, loading } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [category, setCategory] = useState([])

    useEffect(() => {
        axiosInstanceIntercept.get('/all-category').then(res => { setCategory(res.data) })
    }, [])
    // console.log(category)
    const successNotify = () =>
        toast.success('Your are successfully added a service.', {
            theme: "colored",
        });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        const userEmail = user.email
        const userName = user.displayName
        const userPhoto = user.photoURL
        const addedDate = new Date()
        const serviceData = {...formData ,userName, userPhoto, userEmail, addedDate}

        // console.log(serviceData);

        axiosInstanceIntercept.post('/add-service' , serviceData).then(res =>{
            if (res.data.insertedId) {
                successNotify();
                navigate('/services')
            }
        }).catch(err => {
            console.log(err)
        })
        
        // navigate("/"); 
    };
    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <title>ReviewTracker | Add Service</title>
            <BlurText
                text="Add Your Own Service"
                delay={400}
                animateBy="words"
                direction="top"
                className="text-5xl md:text-6xl font-bold mb-8 justify-center mt-6"
            />

            <div className="bg-gray-500/10 w-9/12 mx-auto p-10 pb-10 review-bg rounded-3xl">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-10/12 mx-auto mt-14 mb-24"
                >
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 rounded-lg shadow-2xl space-y-6 border border-gray-500 bg-base-100"
                    >
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl font-bold mb-4 text-base-content"
                        >
                            Create a New Service
                        </motion.h2>

                        {/* Service Image + Title */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div>
                                <label className="label"><span className="label-text">Service Image URL</span></label>
                                <input type="url" name="serviceImage" required className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Service Title</span></label>
                                <input type="text" name="serviceTitle" required className="input input-bordered w-full" />
                            </div>
                        </motion.div>

                        {/* Company Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div>
                                <label className="label"><span className="label-text">Company Name</span></label>
                                <input type="text" name="companyName" className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Company Website</span></label>
                                <input type="url" name="website" className="input input-bordered w-full" />
                            </div>
                        </motion.div>
                        {/* Title + Category */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <div>
                                <label className="label"><span className="label-text">Price</span></label>
                                <input type="text" name="price" required className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Category</span></label>
                                <select name="category" required className="select select-bordered w-full">
                                    <option disabled selected value="">Select category</option>
                                    {category.map((cat) => (
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea
                                name="description"
                                rows="4"
                                required
                                className="textarea textarea-bordered w-full"
                                placeholder="Briefly describe your service..."
                            ></textarea>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="w-8/12 mx-auto"
                        >
                            <button
                                type="submit"
                                className="py-2 px-4 flex justify-center items-center transition rounded-md w-full font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]"
                            >
                                Create Service
                            </button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </>
    );
};

export default AddService;

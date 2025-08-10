import React, { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import BlurText from '../../../ReactBits/BlurText/BlurText';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';


const MyServices = () => {
    const { user, loading } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [serviceData, setServiceData] = useState([])
    const [open, setOpen] = useState(false)
    const [modalId, setModalId] = useState('')
    const [category, setCategory] = useState([])
    // console.log(user.accessToken)
    useEffect(() => {
        axiosInstanceIntercept.get('/all-category').then(res => { setCategory(res.data) })
        serviceFetch()
    }, [])
    // console.log(serviceData)
    const serviceFetch = () => {
        axiosInstanceIntercept.get(`/my-services?email=${user.email}`).then(res => { setServiceData(res.data) })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstanceIntercept.delete(`/service-del/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        const reminService = serviceData.filter(service => service._id !== id)
                        setServiceData(reminService)
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    }
                }).catch(err => () => {
                    console.log(err)
                })
            }
        });
    }

    const successNotify = () =>
        toast.success('Your are successfully Update The Service.', {
            theme: "colored",
        });

    const handleOpenModal = (id) => {
        document.getElementById(id).showModal()
        setModalId(id)
        setOpen(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());
        // console.log(formData, modalId)
        axiosInstanceIntercept.put(`/update-service/${modalId}`, formData).then(res => {
            if (res.data.modifiedCount) {
                successNotify();
                e.target.reset()
                serviceFetch()
            }
        }).catch(err => {
            console.log(err)
        })

    };

    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <title>ReviewTracker | My Services</title>
            <main className='min-h-[calc(100vh-352px)]'>
                <BlurText
                    text="My Posted Services"
                    delay={400}
                    animateBy="words"
                    direction="top"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 justify-center mt-6"
                />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    <div className='w-10/12 mx-auto'>
                        {
                            serviceData.length > 0
                                ?
                                <div className="overflow-x-auto w-10/12 mx-auto px-10 my-10">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Service Image</th>
                                                <th>Service Title</th>
                                                <th>Published Date</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                serviceData.map(service =>
                                                    <tr key={service._id}>
                                                        <td>
                                                            <div className="flex items-center gap-3">
                                                                <div className="avatar">
                                                                    <div className="mask mask-squircle h-12 w-12">
                                                                        <img src={service.serviceImage} alt="Category image" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold">{service.companyName}</div>
                                                                    <Link to={service.website} className="text-sm opacity-50 underline" target='blank'>Company Website</Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{service.serviceTitle}</td>
                                                        <td>{new Date(service.addedDate).toDateString()}</td>
                                                        <td>{service.price}$</td>
                                                        <th className='space-x-2'>
                                                            <button onClick={() => handleOpenModal(service._id)} className="cursor-pointer px-3 py-2 text-info hover:text-sky-600 transition"
                                                                data-tooltip-id="tooltip-info"
                                                                data-tooltip-content="Edit"
                                                                data-tooltip-variant="info">
                                                                <FaRegEdit size={20} />
                                                            </button>
                                                            <Tooltip id="tooltip-info" />
                                                            {/*============================= Update Modal=================== */}
                                                            <dialog id={service._id} className="modal">
                                                                <div className="modal-box w-5/12 max-w-5xl">
                                                                    <form method="dialog">
                                                                        {/* if there is a button in form, it will close the modal */}
                                                                        <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>
                                                                    </form>
                                                                    <h2 className='text-2xl font-bold mb-4 text-base-content'>Update Your Service</h2>
                                                                    <form onSubmit={handleSubmit} className="p-6 space-y-6 border-t border-gray-500 bg-base-100">
                                                                        {/* Service Image + Title */}
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <label className="label"><span className="label-text">Service Image URL</span></label>
                                                                                <input type="url" name="serviceImage" defaultValue={service.serviceImage} required className="input input-bordered w-full text-md font-normal" />
                                                                            </div>
                                                                            <div>
                                                                                <label className="label"><span className="label-text">Service Title</span></label>
                                                                                <input type="text" name="serviceTitle" defaultValue={service.serviceTitle} required className="input input-bordered w-full text-md font-normal" />
                                                                            </div>
                                                                        </div>

                                                                        {/* Company Info */}
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <label className="label"><span className="label-text">Company Name</span></label>
                                                                                <input type="text" name="companyName" defaultValue={service.companyName} className="input input-bordered w-full text-md font-normal" />
                                                                            </div>
                                                                            <div>
                                                                                <label className="label"><span className="label-text">Company Website</span></label>
                                                                                <input type="url" name="website" defaultValue={service.website} className="input input-bordered w-full text-md font-normal" />
                                                                            </div>
                                                                        </div>
                                                                        {/* Title + Category */}
                                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                            <div>
                                                                                <label className="label"><span className="label-text">Price</span></label>
                                                                                <input type="text" name="price" defaultValue={service.price} required className="input input-bordered w-full text-md font-normal" />
                                                                            </div>
                                                                            <div>
                                                                                <label className="label"><span className="label-text">Category</span></label>
                                                                                <select name="category" required className="select select-bordered w-full text-md font-normal">
                                                                                    <option disabled selected defaultValue={service.category}>{service.category}</option>
                                                                                    {category.map((cat) => (
                                                                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        {/* Description */}
                                                                        <div>
                                                                            <label className="label"><span className="label-text">Description</span></label>
                                                                            <textarea
                                                                                defaultValue={service.description}
                                                                                name="description"
                                                                                rows="4"
                                                                                required
                                                                                className="textarea textarea-bordered w-full text-md font-normal"
                                                                                placeholder="Briefly describe your service..."
                                                                            ></textarea>
                                                                        </div>

                                                                        <div className="w-8/12 mx-auto">
                                                                            <button type="submit" className="py-2 px-4 flex justify-center items-center transition rounded-md w-full font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]">
                                                                                Update Service
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </dialog>
                                                            <button onClick={() => handleDelete(service._id)} className="cursor-pointer px-3 py-2 text-error hover:text-red-600 transition"
                                                                data-tooltip-id="tooltip-error"
                                                                data-tooltip-content="Delete"
                                                                data-tooltip-variant="error">
                                                                <FaTrashAlt size={20} />
                                                            </button>
                                                            <Tooltip id="tooltip-error" />
                                                        </th>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>


                                : <motion.section
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="text-center py-12 my-6 bg-base-100 border border-gray-300 shadow-md rounded-2xl"
                                >
                                    <h2 className="text-3xl font-bold text-base-content mb-2">
                                        You don’t Have any Posted Services
                                    </h2>
                                    <p className="text-base text-gray-500 mb-6">
                                        To view and manage your posted Reviews, you must post a service.
                                    </p>
                                    <Link to="/add-service">
                                        <button type="submit" className="py-2 px-4 w-60 mx-auto flex justify-center items-center transition rounded-md font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]">
                                            Add Service
                                        </button>
                                    </Link>
                                </motion.section>
                        }
                    </div>
                </motion.div>
            </main >
        </>
    );
};

export default MyServices;
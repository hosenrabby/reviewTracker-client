import React, { use, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router';
import { Rating } from 'react-simple-star-rating'
import { MdLocationOn } from 'react-icons/md';
import { BsBoxArrowUpRight } from "react-icons/bs";
import { IoArrowUndoSharp } from "react-icons/io5";
import PagiantePage from '../../Components/PagiantePage';
import { CiEdit } from 'react-icons/ci';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Spinner from '../../Components/Spinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ServiceDetail = () => {
    const { service, reviews } = useLoaderData()
    const { user, loading } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [currentPage, setCurrentPage] = useState(1);
    const [allReview, setAllReview] = useState(reviews);
    const [ratingValue, setRatingValue] = useState(0)
    const itemsPerPage = 8;
    const navigate = useNavigate();

    // console.log(allReview)
    const successNotify = () =>
        toast.success('Thank you for feedback.', {
            theme: "colored",
        });
    const sumOfRating = allReview.reduce((sum, rating) => sum + (rating.reviewRating || 0), 0);
    const avgRating = parseFloat((sumOfRating / allReview.length).toFixed(1))
    // console.log(service, reviews)
    // console.log(avgRating)

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const finalData = allReview.slice(firstIndex, lastIndex);

    // console.log(user)
    const handleRating = (rate) => {
        setRatingValue(rate)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const reviewDescription = e.target.description.value
        const reviewRating = ratingValue
        const reviewDate = new Date()
        const userName = user.displayName
        const userEmail = user.email
        const userPhoto = user.photoURL
        const service_id = service._id

        const reviewData = { reviewDescription, reviewRating, reviewDate, userName, userEmail, userPhoto, service_id }
        // console.log(reviewData)
        axiosInstanceIntercept.post('/add-review', reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    successNotify();
                    setAllReview([...allReview, reviewData])
                    e.target.reset()
                }
            }).catch((err) => {
                console.log(err)
            })
    }

    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <title>ReviewTracker | Service Details</title>
            <div className='w-11/12 md:w-9/12 mx-auto grid lg:grid-cols-[2fr_1fr] gap-6 mt-16 min-h-screen'>
                <div>
                    <div className='mb-5 flex gap-5'>
                        <img className='rounded-2xl w-24 h-22 mb-6' src={service.serviceImage} alt="" />
                        <div className='space-y-3 md:w-full'>
                            <div className=''>
                                <h1 className='text-2xl font-bold'>{service.serviceTitle}</h1>
                                <span className=" text-gray-500">Our Mission to make working life simple</span>
                            </div>
                            <div className='flex flex-col md:flex-row items-center md:gap-22'>
                                <span className='italic underline font-semibold flex items-center gap-4'>Reviews - {(reviews.length).toLocaleString()}</span>
                                <span className='font-semibold flex items-center gap-4'>Average Rating
                                    <Rating
                                        initialValue={avgRating}
                                        allowFraction
                                        readonly
                                        size={24}
                                        fillColorArray={[
                                            '#f14f45',
                                            '#f16c45',
                                            '#f18845',
                                            '#f1b345',
                                            '#f1d045'
                                        ]}
                                    />
                                    {isNaN(avgRating) ? '0 Rating' : avgRating.toFixed(1)}
                                </span>

                            </div>
                            <div className='w-full flex flex-col md:flex-row gap-4'>
                                <button onClick={() => document.getElementById('review_form').showModal()} className="py-2 px-4 flex justify-center items-center gap-2 transition rounded-md w-full font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]"><CiEdit size={18} /> Write Review</button>
                                <Link to={service.website} target='blank' className="py-2 px-4 flex justify-center items-center gap-2 transition rounded-md w-full font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]">
                                    Company Website <BsBoxArrowUpRight size={18} />
                                </Link>
                                <button onClick={() => navigate(-1)} className="py-2 px-4 flex justify-center items-center gap-2 transition rounded-md w-full font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]"><IoArrowUndoSharp size={18} /> Go Back</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full faded-divider'></div>

                    {/* Modal form */}
                    <dialog id="review_form" className="modal">
                        <div className="modal-box w-4/12 max-w-5xl">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h2 className='text-2xl font-bold mb-4 text-base-content'>Give your review</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label className="label"><span className="label-text">Description</span></label>
                                    <textarea
                                        name="description"
                                        rows="4"
                                        required
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Briefly describe your thought..."
                                    ></textarea>
                                </div>
                                <div className='mt-6 flex justify-start items-center gap-3'>
                                    <label className="label"><span className="label-text">Rating based on stars</span></label>
                                    <Rating
                                        onClick={handleRating}
                                        allowFraction
                                        transition
                                        size={24}
                                        fillColorArray={[
                                            '#f14f45',
                                            '#f16c45',
                                            '#f18845',
                                            '#f1b345',
                                            '#f1d045'
                                        ]}
                                    />
                                </div>
                                <button type="submit" className="w-full mt-6 py-2 px-4 transition rounded-md font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]">Give Review</button>
                            </form>
                        </div>
                    </dialog>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-8'>
                        {
                            finalData.map(review =>
                                <div key={review._id} className="bg-linear-to-br from-[#727274] to-[#040b68] text-neutral-content rounded-xl p-6 shadow-lg w-full">
                                    {/* Review Text */}
                                    <p className="text-xl mb-6 leading-relaxed italic">
                                        "{review.reviewDescription}"
                                    </p>
                                    {/* Reviewer Info */}
                                    <div className='flex justify-between items-center mt-8 md:mt-14'>
                                        <div className="flex items-center gap-3">
                                            <img src={review.userPhoto} alt="userName" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                                            <div>
                                                <h4 className="font-semibold">{review.userName}</h4>
                                                <Rating
                                                    initialValue={review.reviewRating}
                                                    allowFraction
                                                    readonly
                                                    size={20}
                                                    fillColorArray={[
                                                        '#f14f45',
                                                        '#f16c45',
                                                        '#f18845',
                                                        '#f1b345',
                                                        '#f1d045'
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <p className='font-bold'>Review Date</p>
                                            <p>{new Date(review.reviewDate).toDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className='flex justify-center text-base-content mt-10 mb-10'>
                        <PagiantePage
                            className={'text-base-content'}
                            data={reviews.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        ></PagiantePage>
                    </div>
                </div>

                {/* right aside */}
                < div className='w-full border border-base-300 rounded-2xl p-8 space-y-4 sticky top-26 h-fit'>
                    <div className='border-b border-base-300'>
                        <h1 className='text-xl font-bold'>{service.companyName}</h1>
                        <span className='flex items-center gap-2 text-gray-400'><MdLocationOn /> Company location</span>
                    </div>

                    <div className='pb-5 border-b border-base-300'>
                        <img src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/05/google-maps-icon-on-map.jpg" alt="" />
                    </div>

                    <div className='border-b border-base-300 space-y-6 pb-5'>
                        <div className='space-y-3'>
                            <h1 className='text-lg font-bold'>Reviews</h1>
                            <span className='text-4xl md:text-7xl'>{avgRating}</span>
                            <p className='text-lg font-semibold'>Excellent</p>
                            <Rating
                                initialValue={avgRating}
                                allowFraction
                                readonly
                                size={24}
                            />
                            {isNaN(avgRating) ? '0 Rating' : avgRating.toFixed(1)}
                            <span className='italic underline font-semibold flex items-center gap-4'>Reviews - {(reviews.length).toLocaleString()} </span>
                        </div>
                    </div>
                </div >
            </div>
        </>
    );
};

export default ServiceDetail;
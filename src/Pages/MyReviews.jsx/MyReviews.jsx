import React, { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';
import { Tooltip } from 'react-tooltip';
import BlurText from '../../../ReactBits/BlurText/BlurText';
import { AuthContext } from '../../Context/AuthContext';
import Spinner from '../../Components/Spinner';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';



const MyReviews = () => {
    const { user, loading } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [ratingValue, setRatingValue] = useState(0)
    const [modalId, setModalId] = useState('')
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        reviewFetch()
    }, [])
    const reviewFetch = () => {
        axiosInstanceIntercept.get(`/my-reviews?email=${user.email}`).then(res => { setReviewData(res.data) })
    }
    // console.log(user.email)
    // console.log(reviewData)
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
                axiosInstanceIntercept.delete(`/review-del/${id}`).then(res => {
                    if (res.data.deletedCount) {
                        const reminReiews = reviewData.filter(review => review._id !== id)
                        setReviewData(reminReiews)
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
        toast.success('Your are successfully Update The review.', {
            theme: "colored",
        });

    const handleOpenModal = (id, reviewRating) => {
        document.getElementById(id).showModal()
        setModalId(id)
        setRatingValue(reviewRating)
    }

    const handleRating = (rate) => {
        setRatingValue(rate)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(ratingValue, modalId)
        axiosInstanceIntercept.put(`/update-review/${modalId}`, { reviewRating: ratingValue }).then(res => {
            if (res.data.modifiedCount) {
                successNotify();
                e.target.reset()
                reviewFetch()
                // console.log('hello')
            }
        }).catch(err => {
            console.log(err)
        })

    };
    // console.log(reviewData)
    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <title>ReviewTracker | My Reviews</title>
            <main className="min-h-[calc(100vh-352px)] px-4 md:px-6 lg:px-10">
                <BlurText
                    text="My Posted Reviews"
                    delay={400}
                    animateBy="words"
                    direction="top"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 mt-6 justify-center"
                />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-6xl mx-auto">
                        {reviewData.length > 0 ? (
                            <div className="space-y-6 my-10">
                                {reviewData.map((review) => (
                                    <div
                                        key={review._id}
                                        className="bg-gradient-to-br from-[#727274] to-[#040b68] text-white rounded-xl p-5 sm:p-6 shadow-lg"
                                    >
                                        {/* Header Section */}
                                        <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={review?.serviceDetails?.serviceImage} alt="Service" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{review?.serviceDetails?.serviceTitle}</div>
                                                <Link
                                                    to={review?.serviceDetails?.website}
                                                    className="text-sm opacity-70 underline"
                                                    target="_blank"
                                                >
                                                    Service Owner Website
                                                </Link>
                                            </div>
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-base sm:text-lg leading-relaxed italic mt-4 mb-6">
                                            "{review.reviewDescription}"
                                        </p>

                                        {/* Footer */}
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
                                            {/* Reviewer Info */}
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={review.userPhoto}
                                                    alt={review.userName}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{review.userName}</h4>
                                                    <Rating
                                                        initialValue={review.reviewRating}
                                                        allowFraction
                                                        size={24}
                                                        fillColorArray={[
                                                            '#f14f45',
                                                            '#f16c45',
                                                            '#f18845',
                                                            '#f1b345',
                                                            '#f1d045',
                                                        ]}
                                                    />
                                                </div>
                                            </div>

                                            {/* Review Date */}
                                            <div>
                                                <p className="font-bold">Review Date</p>
                                                <p>{new Date(review.reviewDate).toDateString()}</p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 items-center">
                                                {/* Edit */}
                                                <button
                                                    onClick={() => handleOpenModal(review._id, review.reviewRating)}
                                                    className="text-info hover:text-sky-400 transition"
                                                    data-tooltip-id="tooltip-info"
                                                    data-tooltip-content="Edit"
                                                >
                                                    <FaRegEdit size={20} />
                                                </button>
                                                <Tooltip id="tooltip-info" />

                                                {/* Modal */}
                                                <dialog id={review._id} className="modal">
                                                    <div className="modal-box w-full max-w-lg">
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-error absolute right-2 top-2">
                                                                ✕
                                                            </button>
                                                        </form>
                                                        <h2 className="text-xl font-bold mb-4 text-base-content">
                                                            Update your review
                                                        </h2>
                                                        <form onSubmit={handleSubmit}>
                                                            <label className="label">
                                                                <span className="label-text text-base-content">Description</span>
                                                            </label>
                                                            <textarea
                                                                readOnly
                                                                defaultValue={review.reviewDescription}
                                                                name="reviewDescription"
                                                                rows="4"
                                                                required
                                                                className="textarea textarea-bordered w-full text-gray-800"
                                                            ></textarea>

                                                            <div className="mt-4 flex items-center gap-3">
                                                                <label className="label">
                                                                    <span className="label-text text-base-content">Rating</span>
                                                                </label>
                                                                <Rating
                                                                    onClick={handleRating}
                                                                    initialValue={review.reviewRating}
                                                                    allowFraction
                                                                    transition
                                                                    size={24}
                                                                    fillColorArray={[
                                                                        '#f14f45',
                                                                        '#f16c45',
                                                                        '#f18845',
                                                                        '#f1b345',
                                                                        '#f1d045',
                                                                    ]}
                                                                />
                                                            </div>

                                                            <button
                                                                type="submit"
                                                                className="w-full mt-6 py-2 px-4 rounded-md font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]"
                                                            >
                                                                Submit Review
                                                            </button>
                                                        </form>
                                                    </div>
                                                </dialog>

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(review._id)}
                                                    className="text-error hover:text-red-500 transition"
                                                    data-tooltip-id="tooltip-error"
                                                    data-tooltip-content="Delete"
                                                >
                                                    <FaTrashAlt size={20} />
                                                </button>
                                                <Tooltip id="tooltip-error" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <motion.section
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-center py-12 my-6 bg-base-100 border border-gray-300 shadow-md rounded-2xl"
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold text-base-content mb-2">
                                    You don’t have any posted reviews
                                </h2>
                                <p className="text-base text-gray-500 mb-6 max-w-md mx-auto">
                                    To view and manage your posted reviews, please add a review to a service first.
                                </p>
                                <Link to="/services">
                                    <button
                                        type="button"
                                        className="py-2 px-4 w-52 mx-auto transition rounded-md font-semibold text-black border border-[#211C2A] hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]"
                                    >
                                        Browse Services
                                    </button>
                                </Link>
                            </motion.section>
                        )}
                    </div>
                </motion.div>
            </main>


        </>
    );
};

export default MyReviews;
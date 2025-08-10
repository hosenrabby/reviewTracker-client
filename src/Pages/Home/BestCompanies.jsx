import React, { useState } from 'react';
import BlurText from "../../../ReactBits/BlurText/BlurText";
import { MdOutlineViewCozy, MdOutlineViewDay } from "react-icons/md";
import { Link } from 'react-router';

const BestCompanies = ({ serviceData }) => {
    const [toggle, setToggle] = useState(true)
    // console.log(serviceData)
    return (
        <>
            <BlurText
                text="Fetured Services Company"
                delay={400}
                animateBy="words"
                direction="top"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 justify-center"
            />
            <div className='w-11/12 md:w-9/12 mx-auto'>
                <div className='w-full faded-divider'></div>
                <div className='w-full py-4 px-2 mt-2 shadow-xl rounded-lg flex gap-2 items-center'>
                    <span className='text-xl px-3 border-r border-gray-400'>View Mode</span>
                    <div className='flex gap-3'>
                        <MdOutlineViewCozy className='cursor-pointer' size={25} onClick={() => setToggle(true)} />
                        <MdOutlineViewDay className='cursor-pointer' size={25} onClick={() => setToggle(false)} />
                    </div>
                </div>

                {

                    toggle ?
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                            {serviceData.map(service =>
                                <div key={service._id} className="my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
                                    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                        <img src={service.serviceImage} />
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                                            POPULAR
                                        </div>
                                        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                            {service.serviceTitle}
                                        </h6>
                                        <p className="text-slate-600 leading-normal font-light">{service.description}</p>
                                        <div className='flex justify-items-start items-center gap-6 mb-4'>
                                            <span className='text-lg font-semibold text-base-content'>Price</span>
                                            <div className="rounded-full bg-[#2ba01b8f] py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm text-center">{service.price}$</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4">
                                        <div className="flex items-center">
                                            <img
                                                alt="user photo"
                                                src={service.userPhoto}
                                                className="relative inline-block h-8 w-8 rounded-full"
                                            />
                                            <div className="flex flex-col ml-3 text-sm">
                                                <span className="text-slate-800 font-semibold">{service.userName}</span>
                                                <span className="text-slate-600">
                                                    {new Date(service.addedDate).toDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="card-actions">
                                            <Link to={`/service-details/${service._id}`}>
                                                <button className={`py-2 px-4 transition rounded-full font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                                                    Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        :
                        <div>
                            {serviceData.map(service =>
                                <div key={service._id} className="card card-side bg-base-100 shadow-md my-6">
                                    <figure className='relative h-60 m-2.5 overflow-hidden text-white rounded-md p-4'>
                                        <img className='rounded-xl'
                                            src={service.serviceImage} />
                                    </figure>
                                    <div className="card-body">
                                        <div className="p-4">
                                            <div className="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
                                                POPULAR
                                            </div>
                                            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                                {service.serviceTitle}
                                            </h6>
                                            <p className="text-slate-600 leading-normal font-light">{service.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    alt="user photo"
                                                    src={service.userPhoto}
                                                    className="relative inline-block h-8 w-8 rounded-full"
                                                />
                                                <div className="flex flex-col ml-3 text-sm">
                                                    <span className="text-slate-800 font-semibold">{service.userName}</span>
                                                    <span className="text-slate-600">
                                                        {new Date(service.addedDate).toDateString()}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="card-actions">
                                                <Link to={`/service-details/${service._id}`}>
                                                    <button className={`py-2 px-4 transition rounded-full font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                                                        See Details
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                }
            </div>

        </>
    );
};

export default BestCompanies;
import React from 'react';
import CardSwap, { Card } from '../../../ReactBits/CardSwap/CardSwap'
import Particles from '../../../ReactBits/Particles/Particles';
import { PiCursorClick } from "react-icons/pi";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import { MdManageSearch, MdOutlineRateReview } from 'react-icons/md';
const HowItWorks = () => {
    return (
        <>
            <div className='w-11/12 md:w-9/12 mx-auto flex flex-col md:flex-row items-center overflow-hidden min-h-[600px] relative rounded-xl'>
                <div className="absolute inset-0 z-0">
                    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                        <Particles
                            particleColors={['#0C0950', '#161179', '#161179']}
                            particleCount={500}
                            particleSpread={10}
                            speed={0.1}
                            particleBaseSize={100}
                            moveParticlesOnHover={true}
                            alphaParticles={false}
                            disableRotation={false} />
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-center md:text-start text-4xl md:text-5xl mt-30 flex items-center'>How <img className='w-12 h-12 mt-3' src={'/assets/reviewLogo.png'} alt="" /><span className='font-semibold'>reviewTracker</span> &nbsp;works</h1>
                    <p className='text-xl font-semibold text-gray-600 flex items-center gap-2'>reviewTracker allows users to write, edit, and manage reviews, <br /> helping others make better decisions through honest feedback <br /> and transparent service experiences. <PiCursorClick />
                    </p>
                </div>

                <CardSwap
                    width={700}
                    height={500}
                    cardDistance={60}
                    verticalDistance={70}
                    delay={5000}
                    pauseOnHover={true}
                    easing="linear"
                    
                >
                    <Card>
                        <div className='bg-linear-to-t from-[#2e223f] to-[#000000b7] border-b border-white rounded-t-xl'>
                            <h3 className='py-2 px-3 text-white flex items-center gap-2'><SiAmazonsimpleemailservice />Services</h3>
                        </div>
                        <div className="card bg-base-100 image-full m-4 w-[95%] shadow-sm">
                            <figure>
                                <img src={'/assets/takeServices.jpg'}/>
                            </figure>
                            <div className="card-body">
                                <h1 className='text-3xl md:text-4xl font-semibold'>Check Your Favourite <br /> Service Provider</h1>
                            <p className='mt-3'>Quickly find and review your favourite service providers, track their performance, and stay updated with their latest offerings and ratings.</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className='bg-linear-to-t from-[#2e223f] to-[#000000b7] border-b border-white rounded-t-xl'>
                            <h3 className='py-2 px-3 text-white flex items-center gap-2'><MdOutlineRateReview />Reviews</h3>
                        </div>
                        <div className="card bg-base-100 image-full m-4 w-[95%] shadow-sm">
                            <figure>
                                <img src={'/assets/reviewsTake.jpg'}/>
                            </figure>
                            <div className="card-body">
                                <h1 className='text-3xl md:text-4xl font-semibold'>Review Your Favourite <br /> Service Provider</h1>
                            <p className='mt-3'>Share honest feedback, rate your favorite service provider, and help others make informed decisions based on your personal experience and satisfaction.</p>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className='bg-linear-to-t from-[#2e223f] to-[#000000b7] border-b border-white rounded-t-xl'>
                            <h3 className='py-2 px-3 text-white flex items-center gap-2'><MdManageSearch />Manage Reviews</h3>
                        </div>
                        <div className="card bg-base-100 image-full m-4 w-[95%] shadow-sm">
                            <figure>
                                <img src={'/assets/takeServices.jpg'}/>
                            </figure>
                            <div className="card-body">
                                <h1 className='text-3xl md:text-4xl font-semibold'>Manage Your Own<br /> Reviews</h1>
                            <p className='mt-3'>Take control of your experience—manage, edit, and organize your own reviews to ensure your voice is clear, trusted, and updated.</p>
                            </div>
                        </div>
                    </Card>
                </CardSwap>
            </div>
        </>
    );
};

export default HowItWorks;
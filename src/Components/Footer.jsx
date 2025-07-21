import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" text-gray-300 pt-10">
            <div className='w-full faded-divider'></div>
            <div className="mt-6 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {/* Logo Section */}
                <div className="md:col-span-1">
                    <div className='flex items-center gap-2'>
                        <img className='w-1/6 rounded-lg' src="/assets/reviewLogo.png" alt="" />
                        <h2 className="mt-4 text-2xl font-bold text-base-content mb-4">reviewTracker</h2>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <FaFacebookF className="text-xl md:text-2xl text-primary hover:text-base-content cursor-pointer" />
                        <FaTwitter className="text-xl md:text-2xl text-sky-500 hover:text-base-content cursor-pointer" />
                        <FaGooglePlusG className="text-xl md:text-2xl text-amber-400 hover:text-base-content cursor-pointer" />
                        <FaLinkedinIn className="text-xl md:text-2xl text-blue-600 hover:text-base-content cursor-pointer" />
                    </div>
                </div>

                {/* For Candidates */}
                <div>
                    <h3 className="text-base-content font-semibold mb-2">For Candidates</h3>
                    <ul className="space-y-1">
                        <li><Link to="/browse-tasks" className="text-base-content hover:underline">Browse Tasks</Link></li>
                        <li><Link to="/add-task" className="text-base-content hover:underline">Add Task</Link></li>
                        <li><Link to="/my-posted-tasks" className="text-base-content hover:underline">My Tasks</Link></li>
                    </ul>
                </div>

                {/* For Employers */}
                <div>
                    <h3 className="text-base-content font-semibold mb-2">For Employers</h3>
                    <ul className="space-y-1">
                        <li><Link to="/candidates" className="text-base-content hover:underline">Browse Frelancers</Link></li>
                        <li><Link to="/post-job" className="text-base-content hover:underline">Post a Tasks</Link></li>
                        <li><Link to="/pricing" className="text-base-content hover:underline">Plans & Pricing</Link></li>
                    </ul>
                </div>

                {/* Helpful Links */}
                <div>
                    <h3 className="text-base-content font-semibold mb-2">Helpful Links</h3>
                    <ul className="space-y-1">
                        <li><Link to="/contact-us" className="text-base-content hover:underline">Contact</Link></li>
                        <li><Link to="/privacy" className="text-base-content hover:underline">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="text-base-content hover:underline">Terms of Use</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-base-content font-semibold mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 6.94a1.5 1.5 0 012.12 0l4.95 4.95 4.95-4.95a1.5 1.5 0 112.12 2.12l-6.01 6.01a1.5 1.5 0 01-2.12 0L2.94 9.06a1.5 1.5 0 010-2.12z" /></svg>
                        Sign Up For a Newsletter
                    </h3>
                    <p className="text-base-content text-sm mb-4">Weekly breaking news, analysis and job advice.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="input input-bordered w-full bg-base-content text-white border-gray-700"
                        />
                        <button className="btn btn-primary ml-2">
                            <FaArrowUp />
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-10 py-4 text-start text-sm text-gray-500">
                © 2020 <span className="text-base-content font-semibold">reviewTracker</span>. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;

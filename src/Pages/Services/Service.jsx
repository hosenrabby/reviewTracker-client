import React, { use, useEffect, useState } from 'react';
import BlurText from '../../../ReactBits/BlurText/BlurText';
import { MdOutlineViewCozy, MdOutlineViewDay } from 'react-icons/md';
import PagiantePage from '../../Components/PagiantePage';
import { Link } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Spinner from '../../Components/Spinner';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Service = () => {
    const { loading } = use(AuthContext)
    const axiosInstanceIntercept = useAxiosSecure()
    const [data, setData] = useState([])
    const [toggle, setToggle] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        axiosInstanceIntercept.get('/all-services').then(res => { setData(res.data) })
        axiosInstanceIntercept.get('/all-category').then(res => { setCategory(res.data) })
    }, [])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const filteredData = data.filter(service => {
        const matchesSearch =
            service.serviceTitle.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm) ||
            service.category.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });
    const finalData = filteredData.slice(firstIndex, lastIndex);

    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <>
            <title>ReviewTracker | All Services</title>
            <BlurText
                text="Chose your services and give review"
                delay={400}
                animateBy="words"
                direction="top"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 justify-center mt-6"
            />

            <div className="w-10/12 mx-auto pt-10 rounded-3xl">
                <div className='w-full faded-divider'></div>
                <div className='w-full py-4 px-2 mt-2 shadow-xl rounded-lg flex flex-col md:flex-row justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <span className='text-xl px-3 border-r border-gray-400'>View Mode</span>
                        <div className='flex gap-3'>
                            <MdOutlineViewCozy className='cursor-pointer' size={25} onClick={() => setToggle(true)} />
                            <MdOutlineViewDay className='cursor-pointer' size={25} onClick={() => setToggle(false)} />
                        </div>
                    </div>

                    <div className='me-6 flex flex-col md:flex-row gap-4'>
                        <label className="input border border-gray-600 w-[100%]">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor" >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" onChange={handleSearchChange} value={searchTerm} placeholder="Search Services" className='' />
                        </label>

                        <label className=" w-[100%]">
                            <select onChange={handleCategoryChange} value={selectedCategory} name="category" className="select select-bordered w-full">
                                <option selected value="All">Filter By Category</option>
                                {category.map((cat) => (
                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                {
                    toggle ?
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-14'>
                            {finalData.map(service =>
                                <div key={service._id} className="my-6 bg-white shadow-sm border border-slate-200 rounded-lg">
                                    <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                                        <img src={service.serviceImage} />
                                    </div>
                                    <div className="p-4">
                                        <div className='flex justify-items-start items-center gap-6 mb-2'>
                                            <span className='text-lg font-semibold text-base-content'>Category</span>
                                            <div className="rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm text-center">{service.category}</div>
                                        </div>
                                        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                            {service.serviceTitle}
                                        </h6>
                                        <p className="text-slate-600 leading-normal font-light mb-4">{service.description}</p>
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
                        <div className='mb-14'>
                            {finalData.map(service =>
                                <div key={service._id} className="card card-side bg-base-100 shadow-md my-6">
                                    <figure className='relative h-60 m-2.5 overflow-hidden text-white rounded-md p-4'>
                                        <img className='rounded-xl'
                                            src={service.serviceImage} />
                                    </figure>
                                    <div className="card-body">
                                        <div className="p-4">
                                            <div className='flex justify-items-start items-center gap-6 mb-2'>
                                                <span className='text-lg font-semibold text-base-content'>Category</span>
                                                <div className="rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm text-center">{service.category}</div>
                                            </div>
                                            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                                                {service.serviceTitle}
                                            </h6>
                                            <p class="text-slate-600 leading-normal font-light mb-4">{service.description}</p>
                                            <div className='flex justify-items-start items-center gap-6 mb-4'>
                                                <span className='text-lg font-semibold text-base-content'>Price</span>
                                                <div className="rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm text-center">{service.price}$</div>
                                            </div>
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
                <div className='flex justify-center text-base-content mb-10'>
                    <PagiantePage
                        className={'text-base-content'}
                        data={data.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    ></PagiantePage>
                </div>
            </div>
        </>
    );
};

export default Service;
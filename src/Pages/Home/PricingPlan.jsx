import React, { useState } from 'react';
import { motion } from "framer-motion";

const basePlans = [
    {
        name: "Basic Plan",
        price: 19,
        listings: "1 Listing",
        visibility: "30 Days Visibility",
        highlight: "Highlighted in Search Results",
    },
    {
        name: "Standard Plan",
        price: 49,
        listings: "5 Listings",
        visibility: "60 Days Visibility",
        highlight: "Highlighted in Search Results",
        recommended: true,
    },
    {
        name: "Extended Plan",
        price: 99,
        listings: "Unlimited Listings",
        visibility: "90 Days Visibility",
        highlight: "Highlighted in Search Results",
    },
];
const PricingPans = () => {
    const [billing, setBilling] = useState("monthly");

    // Adjust pricing
    const getPrice = (base) => {
        if (billing === "yearly") {
            const yearlyPrice = base * 12 * 0.9; // 10% discount
            return `$${yearlyPrice.toFixed(0)} / yearly`;
        }
        return `$${base} / monthly`;
    };
    return (
        <>
            <div className='bg-gray-500/10 pt-6 pb-16 mt-8 review-bg'>
                <div className=" py-12 px-4 max-w-7xl mx-auto">
                    <motion.h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} >Take effective Reviews for Your Conmpanies</motion.h2>

                    <div className="text-center mt-4 mb-10 space-x-4">
                        <label>
                            <input type="radio" name="billing" value="monthly" checked={billing === "monthly"} onChange={() => setBilling("monthly")} className="mr-1" />Billed Monthly
                        </label>
                        <label>
                            <input type="radio" name="billing" value="yearly" checked={billing === "yearly"} onChange={() => setBilling("yearly")} className="mr-1" />Billed Yearly
                        </label>
                        <span className="ml-2 px-2 py-1 text-green-700 bg-green-100 text-xs rounded">Save 10%</span>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {basePlans.map((plan, idx) => (
                            <motion.div key={idx} className={`rounded-lg shadow-md p-6 border bg-base-100 relative ${plan.recommended ? "border-gray-400 shadow-gray-100" : "border-gray-200"
                                }`} whileHover={{ scale: 1.03 }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} >
                                {plan.recommended && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gray-700 text-white text-sm rounded">
                                        Recommended
                                    </div>
                                )}
                                <h3 className="text-lg text-base-content font-semibold mb-2">{plan.name}</h3>
                                <p className="text-sm text-base-content mb-4">
                                    One time fee for one listing or task highlighted in search results.
                                </p>

                                <div className={`text-3xl font-bold py-3 px-6 mb-4 rounded text-center ${plan.recommended ? "bg-gray-500 text-base-content" : "bg-base-100 text-base-content"}`}>
                                    {getPrice(plan.price)}
                                </div>

                                <div className="text-left text-sm mb-6">
                                    <p className="font-semibold mb-2">Features of {plan.name}</p>
                                    <ul className="space-y-1 text-base-content">
                                        <li>{plan.listings}</li>
                                        <li>{plan.visibility}</li>
                                        <li>{plan.highlight}</li>
                                    </ul>
                                </div>

                                <button className={`py-2 px-4 w-full mx-auto transition rounded-md font-semibold text-black border border-[#211C2A] cursor-pointer hover:shadow-[0_0_0_1px_#211C2A,0_5px_0_0_#211C2A]`}>
                                    Buy Plan
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricingPans;
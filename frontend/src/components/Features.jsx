import React from "react";
import { FaShippingFast } from "react-icons/fa";

import { MdCurrencyExchange } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { TbPackageImport } from "react-icons/tb"; 

const Features = () => {
    return (
        <section className="max-padd-container bg-primary mt-16 xl:mt-18 py-8 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"> 
                <div className="flex items-center gap-x-4"> 
                    <FaShippingFast className="text-4xl" />
                    <div>
                        <h5>Fast Shipping</h5>
                        <p>Get your orders quickly</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <MdCurrencyExchange className="text-4xl" />
                    <div>
                        <h5>Easy Exchange</h5>
                        <p>Hassle-free returns & exchanges</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <BiSupport className="text-4xl" />
                    <div>
                        <h5>24/7 Support</h5>
                        <p>We're here to help</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <TbPackageImport className="text-4xl" />
                    <div>
                        <h5>Secure Packaging</h5>
                        <p>Safe delivery guaranteed</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;

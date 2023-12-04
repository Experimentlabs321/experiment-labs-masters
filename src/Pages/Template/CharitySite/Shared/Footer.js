import { Link } from "react-router-dom";
import React from 'react';

const Footer = () => {
    return (
        <div className="pt-[70px] px-[56px]">
            <div className="text-[#0E286C] flex justify-between items-center ">
                <div className="">
                    <h1 className="text-lg font-semibold">Get our updates</h1>
                    <p className="text-base font-normal">Stay informed with our latest news and updates</p>
                </div>
                <div >
                    <div className="flex  gap-3"  >
                        <div
                            className="h-[42px] flex  items-center w-[235px] p-3"
                            style={{
                                border: "0.889px solid #000",
                                background: "var(--White, #FFF)",
                            }}>
                                <input className="text-base font-normal text-[#000]" placeholder="placeholder"/>
                           
                        </div>
                        <div
                            className="h-[42px] flex justify-center items-center w-[105px]  py-3 px-5"
                            style={{
                                border: "0.889px solid #000",
                                background: "var(--White, #FFF)",
                            }}>
                            <button className="text-base font-normal hover:text-[#0E286C] ">Confirm</button>
                        </div>

                    </div>

                    <p className="text-[#0E286C] text-xs font-normal mt-[12px]">By subscribing, you agree to our Privacy Policy <span>Privacy Policy</span></p>



                </div>

            </div>
            <p
                className="bg-[#0E286C] w-full h-[1px] my-[70px]"
            ></p>

            <div className="flex justify-between">
                <div>
                    <h1 className="mb-[20px] text-[#0E286C] text-base font-semibold">About</h1>
                    <div className="flex flex-col text-[#0E286C]">
                        <Link className="text-sm font-normal"> Home</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Services</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Contact Us</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Blog</Link>
                        <Link className="text-sm font-normal mt-[10px]"> FAQ</Link>
                    </div>

                </div>
                <div>
                    <h1 className="mb-[20px] text-[#0E286C] text-base font-semibold">Support</h1>
                    <div className="flex flex-col text-[#0E286C]">
                        <Link className="text-sm font-normal"> Terms</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Privacy</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Sitemap</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Career</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Partners</Link>
                    </div>

                </div>
                <div>
                    <h1 className="mb-[20px] text-[#0E286C] text-base font-semibold">Investors</h1>
                    <div className="flex flex-col text-[#0E286C]">
                        <Link className="text-sm font-normal"> News</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Events</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Resources</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Support</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Help</Link>
                    </div>

                </div>
                <div>
                    <h1 className="mb-[20px] text-[#0E286C] text-base font-semibold">Community</h1>
                    <div className="flex flex-col text-[#0E286C]">
                        <Link className="text-sm font-normal"> Forum</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Gallery</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Charities</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Students</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Adults</Link>
                    </div>

                </div>
                <div>
                    <h1 className="mb-[20px] text-[#0E286C] text-base font-semibold">Videos</h1>
                    <div className="flex flex-col text-[#0E286C]">
                        <Link className="text-sm font-normal"> Get Involved Today</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Make a Difference</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Join Our Community</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Support a Cause</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Inspire Charge Today</Link>
                    </div>

                </div>
                <div>
                    <h1 className="mb-[20px] text-[#0E286C] text-base font-semibold">Follow Us</h1>
                    <div className="flex flex-col text-[#0E286C]">
                        <Link className="text-sm font-normal"> Facebook</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Twitter</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Instagram</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Linkedin</Link>
                        <Link className="text-sm font-normal mt-[10px]"> Subscribe</Link>
                    </div>

                </div>
            </div>
            <p
                className="bg-[#0E286C] w-full h-[1px] mt-[70px]"
            ></p>
            <p className="text-end py-[20px] text-[#0E286C] text-sm font-normal">© 2023 Relume. All rights reserved.</p>
        </div>
    );
};

export default Footer;
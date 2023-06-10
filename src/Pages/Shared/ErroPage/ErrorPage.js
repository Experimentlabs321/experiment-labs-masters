import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ErrorPage = () => {
    return (
        <div>
            <section className="flex items-center h-full p-16 text-gray-800">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl text-gray-400">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold lg:text-3xl">Sorry, we couldn't find this page.</p>
                        <p className="mt-4 mb-8 text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                        <Link to={'/'}><button className='py-4 px-5 bg-cyan cursor-pointer text-white font-bold z-50 w-[200px] rounded hover:transition-colors hover:delay-300 hover:ease-in-out hover:bg-custom-blue'>Back to Homepage</button>
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    );
};

export default ErrorPage;
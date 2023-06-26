import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import qs from 'qs';
import MyHelmet from '../../../Components/MyHelmet/MyHelpmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../../contexts/AuthProvider';
import CryptoJS from 'crypto-js';

const Login = () => {
    const [createUserEmail, setCreateUserEmail] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



     

    const { signIn, providerLogin } = useContext(AuthContext);

    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();


    //getting old location
    const from = location.state?.from?.pathname || "/";



    // login with email and password
    const handleSubmit = event => {
        // event.preventDefault();
        // const form = event.target;
        // const email = form.email.value;
        // const password = form.password.value;

        // console.log(email, password);

        // signIn(email, password)
        //     .then(result => {
        //         const user = result.user;
        //         console.log(user);
        //         form.reset();
        //         setError('');

        //         const currentUser = {
        //             email: user?.email
        //         }

        //         //get token
        //         fetch(`https://dentist-fantastic-server.vercel.app/jwt`, {
        //             method: 'POST',
        //             headers: {
        //                 'content-type': 'application/json'
        //             },
        //             body: JSON.stringify(currentUser)
        //         })
        //             .then(res => res.json())
        //             .then(data => {
        //                 console.log(data);
        //                 localStorage.setItem('token', data.token);
        //                 // navigate to old page
        //                 navigate(from, { replace: true });
        //             })
        //             .catch(err => console.error(err));


        //     })
        //     .catch(error => {
        //         console.error(error);
        //         setError(error.message)
        //     })
    }

    const graphyLogin = async (email, displayName) => {
        try {
            const payload = {
                name: displayName,
                email: email,
                exp: Math.floor(Date.now() / 1000) + 60 * 60, // Set the token expiration time
            };

            // Convert the payload to a Base64Url encoded string
            const payloadBase64 = btoa(JSON.stringify(payload))
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_");

            // Construct the header
            const header = {
                alg: "HS256",
                typ: "JWT",
            };

            // Convert the header to a Base64Url encoded string
            const headerBase64 = btoa(JSON.stringify(header))
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_");

            // Your API token obtained from Graphy
            const apiToken = process.env.REACT_APP_key;

            // Construct the signature
            const signature = CryptoJS.HmacSHA256(
                `${headerBase64}.${payloadBase64}`,
                apiToken
            );

            // Convert the signature to a Base64Url encoded string
            const signatureBase64 = CryptoJS.enc.Base64.stringify(signature)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_");

            // Construct the SSO URL with the JWT token
            const ssoUrl = `https://www.experimentlabs.in/t/u/activeCourses?ssoToken=${headerBase64}.${payloadBase64}.${signatureBase64}`;

            // Redirect the user to the SSO URL
            window.location.href = ssoUrl;
        } catch (error) {
            console.error(error);
        }
    };



    // const graphyLogin = async (email, displayName) => {
    //     // event.preventDefault();

    //     // const postData = {
    //     //     mid: 'namanjain4098',
    //     //     key: '2eb5be47-6526-4578-821b-400a74e63d9b',
    //     //     email: 'john@xyz.com',
    //     //     name: 'john'
    //     // }

    //     // fetch('https://api.ongraphy.com/public/v1/learners', {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'content-type': '<string>'
    //     //     },
    //     //     body: JSON.stringify(postData)
    //     // })
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         console.log(data);
    //     //     })
    //     //     .catch(error => console.error(error))



    //     const data = qs.stringify({
    //         mid: process.env.REACT_APP_mid,
    //         key: process.env.REACT_APP_key,
    //         email: email,
    //         name: displayName
    //     });

    //     const config = {
    //         method: 'post',
    //         url: 'https://api.ongraphy.com/public/v1/learners',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //         },
    //         data: data
    //     };

    //     axios(config)
    //         .then(response => {
    //             console.log(JSON.stringify(response.data?.status));
    //             const payload = {
    //                 name: 'Muhammed Rakibul Hasan',
    //                 email: 'rakibulhasan50415714@gmail.com',
    //                 exp: 1616239022,
    //             };

    //             // Convert the payload to a Base64Url encoded string
    //             const payloadBase64 = btoa(JSON.stringify(payload))
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');

    //             // console.log(payloadBase64);

    //             // Construct the header
    //             const header = {
    //                 alg: "HS256",
    //                 typ: "JWT"
    //             };

    //             // Convert the header to a Base64Url encoded string
    //             const headerBase64 = btoa(JSON.stringify(header))
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');


    //             //console.log(headerBase64);



    //             // Your API token obtained from Graphy
    //             const apiToken = process.env.REACT_APP_key;

    //             // Construct the signature
    //             const signature = CryptoJS.HmacSHA256(headerBase64 + "." + payloadBase64, apiToken);

    //             // Convert the signature to a Base64Url encoded string
    //             const signatureBase64 = CryptoJS.enc.Base64.stringify(signature)
    //                 .replace(/=/g, '')
    //                 .replace(/\+/g, '-')
    //                 .replace(/\//g, '_');

    //             console.log(signatureBase64);

    //             // // Construct the JWT token
    //             // const jwtToken = `${headerBase64}.${payloadBase64}.${signatureBase64}`;

    //             // Construct the SSO URL with the JWT token
    //             const ssoUrl = `?ssoToken=${signatureBase64}`;

    //             // // Redirect the user to the SSO URL
    //             // //window.location.href = ssoUrl;
    //             navigate(ssoUrl);
    //             // console.log("SSO URL --->",ssoUrl);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });



    // }



    //Login with google provider
    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        providerLogin(googleProvider)
            .then(result => {
                const email = result?.user?.email;
                const displayName = result?.user?.displayName;
                saveUser(email);
                console.log(email, displayName);
                if (email) {
                    graphyLogin(email, displayName);
                }
                setError('');

            })
            .catch(error => {
                console.error(error);
                setError(error.message)
            });
    }

    const saveUser = (email) => {
        const users = {email};
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(users)

        })
            .then(res => res.json())
            .then(data => {


                // console.log(data)
                if (data.acknowledged) {
                    // setTreatment(null)
                    setCreateUserEmail(email)


                    alert('create successfull')


                }
                else {
                    alert(`${data.message}`)
                }

            })
    }




    return (
        <div className='bg-[#121212] text-white'>
            <MyHelmet>Login</MyHelmet>
            <div className='pt-[9rem] pb-[1rem]'>
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#424242] text-white mx-auto shadow-xl mt-4 my-8 border-2 border-cyan">
                    <h1 className="text-2xl font-bold text-cyan mb-6">Login</h1>
                    <form onSubmit={handleSubmit} noValidate="" action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-3 text-sm">
                            <label htmlFor="username" className="block">Email</label>
                            <input type="email" name="email" id="username" placeholder="Email" className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600" required />
                        </div>
                        <div className="space-y-3 text-sm">
                            <label htmlFor="password" className="block">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600" required />

                        </div>
                        <input type='submit' value='Login' className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out" />
                        <p className='text-center text-error'><small>{error}</small></p>
                    </form>
                    <div className="flex items-center space-x-1">
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        <p className="px-3 text-sm">Or</p>
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl font-bold hover:bg-[#585858] hover:transition-all hover:delay-200 hover:ease-out">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current text-blue-500">
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6">Don't have an account?
                        <Link rel="noopener noreferrer" to='/register' className="underline text-error"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
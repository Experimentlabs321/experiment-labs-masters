//AffiliateSignUp



import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    GoogleAuthProvider,
    getAuth,
    sendPasswordResetEmail,
} from "firebase/auth";
import toast from "react-hot-toast";

import iconGoogle from '../../../../assets/LoginPage/iconGoogle.png';
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";


import { Dialog, useMediaQuery, useTheme } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { AuthContext } from "../../../../contexts/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";
import app from "../../../../firebase/firebase.config";

const AffiliateSignUp = () => {
    const { id } = useParams();
    const { signIn, providerLogin, logOut, createUser } = useContext(AuthContext);
    const loginPageOrgLogo = localStorage.getItem("loginPageOrgLogo");
    const loginSidebarImage = localStorage.getItem("loginSidebarImage");
    const navigate = useNavigate();
    const [orgData, setOrgData] = useState({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(false);
    const dateCreated = new Date();
    const [isLoading, setIsLoading] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const auth = getAuth(app);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success("A Password Reset Link has been sent to your email.");
                e.target.reset();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${id}`)
            .then((response) => {
                setOrgData(response?.data);
            })
            .catch((error) => console.error(error));
    }, [id]);

    console.log(orgData?._id);
    const handleLogout = () => {
        Loading();
        logOut()
            .then()
            .catch((error) => console.error(error));
        Loading().close();
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        Loading();
        const form = e?.target;
        const name = form.name.value;
        const email = form.email.value?.toLowerCase();
        const password = form.password.value;
        const userAgent = window.navigator.userAgent;

        const data = {
            name,
            phone,
            email,
            password,
            organizationId: id,
            organizationName: orgData?.organizationName,
            role: "user",
            dateCreated,
        };

        console.log(data);

        try {
            const result = await createUser(email, password);
            if (result.user.uid) {
                const res = await axios.post(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/users`,
                    data
                );
                console.log("Response ================>", res);
                const userDevice = await axios.put(
                    `${process.env.REACT_APP_SERVER_API}/api/v1/users/addDevice/${email}`,
                    {
                        device: userAgent,
                    }
                );
                if (res.data.acknowledged) {
                    await handleLogout();
                    toast.success("Registered Successfully");
                    const sendMail = await axios.post(
                        `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
                        {
                            to: email,
                            templateType: "emailAction",
                            templateName: "learnerSignUp",
                            organizationId: id,
                            learner_name: name,
                        }
                    );
                    navigate(`/login/${id}`);
                } else {
                    handleLogout();
                    toast.success("Registered Failed");
                }
                // handleLogout();
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
        Loading().close();
    };

    const handleGoogleRegister = async () => {
        Loading();
        const googleProvider = new GoogleAuthProvider();

        if (phone.length > 3) {
            providerLogin(googleProvider)
                .then(async (result) => {
                    const email = result?.user?.email;
                    const newName = result?.user?.displayName;
                    const userDetails = await axios.get(
                        `${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${email}`
                    );
                    if (userDetails?.data?.isUser === false) {
                        const res = await axios.post(
                            `${process.env.REACT_APP_SERVER_API}/api/v1/users`,
                            {
                                email,
                                name: newName,
                                phone,
                                organizationId: id,
                                organizationName: orgData?.organizationName,
                                role: "user",
                                dateCreated,
                            }
                        );
                        if (res.data.acknowledged) {
                            await handleLogout();
                            toast.success("Registered Successfully");
                            const sendMail = await axios.post(
                                `${process.env.REACT_APP_SERVER_API}/api/v1/sendMail`,
                                {
                                    to: email,
                                    templateType: "emailAction",
                                    templateName: "learnerSignUp",
                                    organizationId: id,
                                    learner_name: newName,
                                }
                            );
                            navigate(`/login/${id}`);
                        } else {
                            handleLogout();
                            toast.success("Registered Failed");
                        }
                        // handleLogout();
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setError(true);
        }
        Loading().close();
    };

    return (
        <div>
            <div className="flex min-h-screen">
                {/* <!-- Container --> */}
                <div className="flex flex-row w-full">

                    {/* <!-- Login --> */}
                    <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
                        <div className="flex lg:hidden justify-center items-center w-full py-4">
                            <div className="flex items-center justify-center space-x-3">
                                <img
                                    className="w-[100px]"
                                    src={orgData?.org_logo}
                                    alt="brand"
                                />
                            </div>
                        </div>
                        {/* <!-- Login box --> */}
                        <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md ">
                            <div className="flex flex-col space-y-2 text-center">
                                <h2 className="text-2xl md:text-4xl font-bold">
                                    Register your account
                                </h2>
                                <p className="text-basic md:text-lg">
                                    Please enter Relevant Information continue
                                </p>
                            </div>
                            <div className="flex flex-col max-w-md space-y-5">
                                <form
                                    onSubmit={handleRegister}
                                    noValidate=""
                                    action=""
                                    className="space-y-4 ng-untouched ng-pristine ng-valid"
                                >
                                    <div className="space-y-3 text-sm">
                                        <label htmlFor="username" className="block">
                                            Name
                                        </label>
                                        <input
                                            type="name"
                                            name="name"
                                            id="name"
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter Name"
                                            className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            required
                                        />
                                        {/* {error && <p className="text-red-600">Need Name to Register</p>} */}
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <label htmlFor="username" className="block">
                                            Phone Number
                                        </label>
                                        {/* <input
                                            type="phone"
                                            name="phone"
                                            id="phone"
                                            placeholder="Enter Phone"
                                            className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            required
                                        /> */}
                                        <PhoneInput
                                            international="true"
                                            className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            defaultCountry="IN"
                                            // className='w-full focus:outline-0'
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={setPhone}
                                        />
                                        {error && (
                                            <p className="text-red-600">
                                                Need Phone Number to Register
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <label htmlFor="username" className="block">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="username"
                                            placeholder="Email"
                                            className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3 text-sm">
                                        <label htmlFor="password" className="block">
                                            Password
                                        </label>
                                        {/*     <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="Password"
                                            className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            required
                                        /> */}
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-0 px-4 py-3"
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Register"
                                        className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 font-bold hover:transition-all hover:delay-200 hover:ease-out cursor-pointer"
                                    />
                                </form>
                                <p className="font-semibold text-lg text-center">Or</p>
                                <button
                                    onClick={handleGoogleRegister}
                                    aria-label="Login with Google"
                                    type="button"
                                    className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl hover:transition-all hover:delay-200 hover:ease-out hover:bg-slate-200 bg-[#9c9d9e4e] text-black mb-[25px]"
                                >
                                    <img className="w-[20px] h-[20px]" src={iconGoogle} alt="" />
                                    <p className="text-[20px]">Register with Google</p>
                                </button>
                                <div className="text-center">
                                    <button
                                        onClick={() => {
                                            handleClickOpen();
                                        }}
                                        className="text-blue hover:border-b mb-[1px] border-blue"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="flex justify-center">
                                    <p className="font-medium text-lg">
                                        Already have an account?{" "}
                                        <Link
                                            to={`/login/${id}`}
                                            className="text-blue cursor-pointer"
                                        >
                                            Login
                                        </Link>
                                    </p>
                                </div>
                                <p className="text-center text-error">
                                    {/* <small>error</small> */}
                                </p>


                            </div>
                        </div>
                        {/* Forgotten password */}
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            // onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                            sx={{ width: "100%", borderRadius: "22px" }}
                        >
                            <div className="w-[400px] h-full text-white flex items-center  ">
                                <div className="w-full">
                                    <span
                                        onClick={handleClose}
                                        className=" cursor-pointer absolute top-3 right-5 text-[30px] text-[#000]"
                                    >
                                        x
                                    </span>
                                    <h1 className="text-blue text-[27px] font-semibold p-8 ">
                                        Forgot Password?
                                    </h1>
                                    <p className="border-b"></p>
                                    {/* <p className="text-blue text-[16px] mb-[45px] border-b">

                    Please enter your email address.
                  </p> */}
                                    <form
                                        onSubmit={(e) => handleResetPassword(e)}
                                        className="flex flex-col gap-2 w-full p-8 "
                                    >
                                        <label
                                            className="text-[18px] mb-[9px] text-[#000]"
                                            htmlFor="email"
                                        >
                                            Enter Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            //   onChange={handleOnChange}
                                            className=" w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                                            placeholder="Enter your email"
                                        />

                                        <button
                                            onClick={() => {
                                                //  handleClose();
                                                //    handleClickOpen1();
                                            }}
                                            className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 cursor-pointer font-bold hover:transition-all hover:delay-200 hover:ease-out mt-5"
                                        >
                                            Reset
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </Dialog>

                        {/* <!-- Footer --> */}
                        <div className="flex justify-center flex-col m-auto mb-5 text-center text-lg ">
                            <p className="font-bold mb-1">
                                Built by{" "}
                                <a href="https://experimentlabs.in/" className="underline">
                                    Experiment Labs
                                </a>
                            </p>
                        </div>
                    </div>
                    {/* <!-- Sidebar --> */}
                    <div className="hidden lg:flex flex-col justify-center bg-[#f7fafc] lg:px-8 xl:px-12 py-2 basis-2/5">
                        <div
                            style={{
                                color: orgData?.titlesColor ? orgData?.titlesColor : "black",
                            }}
                            className="space-y-5 text-center"
                        >
                            <h1 className="lg:text-2xl xl:text-3xl xl:leading-snug font-extrabold">
                                {/* {orgData?.loginTitle} */}
                                Register
                            </h1>
                            <p className="">
                                {/* {orgData?.loginSubTitle} */}
                                Register With Us Now
                            </p>
                            <img
                                className="mx-auto"
                                src={
                                    loginSidebarImage
                                        ? loginSidebarImage
                                        : orgData?.loginSidebarImage
                                }
                                alt="showCase"
                            />
                        </div>
                        {/* <p className="font-medium mt-3">© 2023 Experiment Labs</p> */}
                        <img
                            className="w-[100px] mx-auto mt-4"
                            src={
                                loginPageOrgLogo ? loginPageOrgLogo : orgData?.loginPageOrgLogo
                            }
                            alt="brand"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateSignUp;







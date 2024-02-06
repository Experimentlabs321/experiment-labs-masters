import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import GoogleLogo from "../../../assets/icons/googleIcon.png";
import Swal from "sweetalert2";

const LoginWithOrganization = () => {
  const { id } = useParams();
  const { signIn, providerLogin, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState({});
  // const orgLogo = localStorage.getItem("organizationLogo")
  const loginPageOrgLogo = localStorage.getItem("loginPageOrgLogo")
  const loginSidebarImage = localStorage.getItem("loginSidebarImage")
  const loginSubTitle = localStorage.getItem("loginSubTitle")
  const loginTitle = localStorage.getItem("loginTitle")
  const orgRootUrl = localStorage.getItem("orgRootUrl")
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${id}`)
      .then((response) => {
        setOrgData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userAgent = window.navigator.userAgent;
    console.log("shihab   ", window.navigator)
    const platform = window.navigator.platform;
    const randomString = Math.random().toString(20).substring(2, 14) + Math.random().toString(20).substring(2, 14);

    // const deviceID = `${userAgent}-${platform}-${randomString}`;
    // console.log("device id",deviceID)
    // console.log("platform",platform)
    console.log("platform ", userAgent)

    const form = e?.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const userDevice = await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/addDevice/${email}`,
        {
          device: userAgent,
        }
      );

      console.log(userDevice.status);

      // Assuming your server returns a specific status code for device limit reached
      if (userDevice.status === 200) {
        await signIn(email, password).then(() => {
          saveUser(email);
        });
      }
    } catch (error) {
      // Handle any other errors that may occur during the Axios request
      console.error('Error during Axios request:', error);

      // Optionally show a generic error message to the user
      Swal.fire({
        icon: 'error',
        title: '3 Device limit reached.',
        text: 'Please logout from one of your devices and try again.',
      });
    }


  };

  const saveUser = async (email) => {
    fetch(`${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("role", data?.role);
        if (data?.role === "admin") navigate("/adminDashboardHome");
        else navigate("/dashboard");
      });
  };

  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };


  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    providerLogin(googleProvider)
      .then(async (result) => {
        const email = result?.user?.email;
        const userDetails = await axios.get(
          `${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${email}`
        );
        if (userDetails?.data?.isUser === false) {
          toast.error("Your Are Not Registered User");
          return handleLogout();
        } else {
          saveUser(email);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <div className="flex min-h-screen">
        {/* <!-- Container --> */}
        <div className="flex flex-row w-full">
          {/* <!-- Sidebar --> */}
          <div className="hidden lg:flex flex-col justify-center bg-[#f7fafc] lg:px-8 xl:px-12 py-2 basis-2/5">
            <div
              style={{
                color: orgData?.titlesColor ? orgData?.titlesColor : "black",
              }}
              className="space-y-5 text-center"
            >
              <h1 className="lg:text-2xl xl:text-3xl xl:leading-snug font-extrabold">
                {loginTitle ? loginTitle : orgData?.loginTitle}
              </h1>
              <p className="">{loginSubTitle ? loginSubTitle : orgData?.loginSubTitle}</p>
              <img
                className="mx-auto"
                src={loginSidebarImage ? loginSidebarImage : orgData?.loginSidebarImage}
                alt="showCase"
              />
            </div>
            {/* <p className="font-medium mt-3">© 2023 Experiment Labs</p> */}
            <Link to={`${orgRootUrl ? orgRootUrl : orgData?.orgRootUrl}`}>
            <img
              className="w-[100px] mx-auto mt-4"
              src={loginPageOrgLogo ? loginPageOrgLogo : orgData?.loginPageOrgLogo}
              alt="brand"
            />
            </Link>
          </div>
          {/* <!-- Login --> */}
          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            <div className="flex lg:hidden justify-center items-center w-full py-4">
              <div className="flex items-center justify-center space-x-3">
                <Link to={`${orgRootUrl ? orgRootUrl : orgData?.orgRootUrl}`}>
                  <img
                    className="w-[100px]"
                    src={loginPageOrgLogo ? loginPageOrgLogo : orgData?.loginPageOrgLogo}
                    alt="brand"
                  />
                </Link>
              </div>
            </div>
            {/* <!-- Login box --> */}
            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-2xl md:text-4xl font-bold">
                  Login to your account
                </h2>
                <p className="text-basic md:text-lg">
                  Please enter the email and your password to continue
                </p>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <form
                  onSubmit={handleLoginSubmit}
                  noValidate=""
                  action=""
                  className="space-y-6 ng-untouched ng-pristine ng-valid"
                >
                  <div className="space-y-3 text-sm">
                    <label htmlFor="email" className="block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      defaultValue=""
                      placeholder="Email"
                      className="w-full rounded-xl border px-4 py-3 border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                      required
                    />
                  </div>
                  <div className="space-y-3 text-sm">
                    <label htmlFor="password" className="block">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      defaultValue=""
                      placeholder="Password"
                      className="border w-full px-4 py-3 rounded-xl border-gray-300 bg-gray-50 text-gray-800 focus:border-red-600"
                      required
                    />
                  </div>
                  <input
                    type="submit"
                    value="Login"
                    className="block w-full p-3 text-center rounded-xl text-gray-50 bg-cyan hover:bg-opacity-70 cursor-pointer font-bold hover:transition-all hover:delay-200 hover:ease-out"
                  />
                  <p className="font-semibold text-lg text-center">Or</p>
                  <button
                    onClick={handleGoogleSignIn}
                    aria-label="Login with Google"
                    type="button"
                    className="flex items-center justify-center w-full p-3 space-x-4 border rounded-xl hover:transition-all hover:delay-200 hover:ease-out hover:bg-slate-200 bg-[#9c9d9e4e] text-black mb-[25px]"
                  >
                    <img
                      className="w-[20px] h-[20px]"
                      src={GoogleLogo}
                      alt=""
                    />
                    <p className="text-[20px]">Continue with Google</p>
                  </button>

                  <p className="text-center text-error">
                    {/* <small>error</small> */}
                  </p>
                </form>
                {/* <div
                  style={{ marginTop: 0 }}
                  className="flex justify-center items-center "
                >
                  <span className="w-full border border-black"></span>
                  <span className="px-4">Or</span>
                  <span className="w-full border border-black"></span>
                </div>
                <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative">
                  <span className="absolute left-4">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      //   xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <path
                        fill="#EA4335 "
                        d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                      />
                      <path
                        fill="#34A853"
                        d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                      />
                      <path
                        fill="#4A90E2"
                        d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                      />
                    </svg>
                  </span>
                  <span>Sign in with Google</span>
                </button> */}
              </div>
            </div>

            {/* <!-- Footer --> */}
            <div className="flex justify-center flex-col m-auto my-5 text-center text-lg ">
              <p className="font-bold mb-1">
                Built by{" "}
                <a href="https://experimentlabs.in/" className="underline">
                  Experiment Labs
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithOrganization;

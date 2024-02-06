import React, { useContext, useEffect, useState } from "react";
import CourseTham from "../../../assets/Dashboard/CourseTham.png";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import './style.css'
import Swal from "sweetalert2";
import DialogLayoutForFromControl from "../Shared/DialogLayoutForFromControl";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { userInfo, user, signIn, providerLogin, logOut, createUser } = useContext(AuthContext);
  const { id } = useParams();
  const [course, setCourse] = useState([]);
  const [batchesData, setBatchesData] = useState([]);
  const [organizationData, setOrganizationData] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState({});
  const [offers, setOffers] = useState([]);
  const [selectOffer, setSelectedOffer] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/courses/${id}`)
      .then((response) => {
        setCourse(response?.data);
      })
      .catch((error) => console.error(error));

    axios
      .get(`${process.env.REACT_APP_SERVER_API}/api/v1/batches/courseId/${id}`)
      .then((response) => {
        setBatchesData(response?.data);
      })
      .catch((error) => console.error(error));
  }, [id]);


  useEffect(() => {
    if (course?.organization?.organizationId)
      axios
        .get(`${process.env.REACT_APP_SERVER_API}/api/v1/organizations/${course?.organization?.organizationId}`)
        .then((response) => {
          setOrganizationData(response?.data);
        })
        .catch((error) => console.error(error));

  }, [course?.organization?.organizationId]);



  const fetchOffers = async (batchId) => {
    const offers = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/offers/batchId/${batchId}`);
    setOffers(offers?.data?.result);
    setCoupon("");
    setSelectedOffer("");
    setCouponDiscount(0);
  }


  useEffect(() => {
    fetchOffers(selectedBatch?._id);
    // console.log("Offers  ==============>", offers);
  }, [selectedBatch]);


  const date = new Date(course?.courseStartingDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };


  // console.log(selectedBatch);

  const handleApplyCoupon = () => {
    const filteredCoupon = offers.filter((offer) => (offer.code === coupon) && (offer.disabled !== true));
    if (filteredCoupon.length > 0) {
      // console.log(filteredCoupon[0]);
      setSelectedOffer(filteredCoupon[0]);
      let { discountPercent, maxDiscountValue } = filteredCoupon[0];
      let discountAmount = (+selectedBatch?.price * +discountPercent) / 100;
      // console.log("Discount Amount", discountAmount);
      if (discountAmount > +maxDiscountValue)
        discountAmount = +maxDiscountValue;
      // console.log("Discount Amount", discountAmount);
      setCouponDiscount(discountAmount);
    }
    else {
      Swal.fire({
        title: "Coupon Doesn't Exist",
        icon: "error",
      });
    }

  }

  // console.log(organizationData);


  const handleEnroll = async (data) => {
    console.log("Data =============>", data);
    const { data: { order } } = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/v1/users/unpaidUsers/checkout`, {
      price: ((+selectedBatch.price) - (+couponDiscount)),
      paymentInstance: {
        key_id: organizationData?.paymentInstance?.key_id,
        key_secret: organizationData?.paymentInstance?.key_secret
      }
    });

    // console.log("Order =======>", order);


    const options = {
      key: organizationData?.paymentInstance?.key_id,
      amount: order?.amount,
      key_secret: organizationData?.paymentInstance?.key_secret,
      currency: "INR",
      name: organizationData?.organizationName,
      description: `Purchase ${course?.courseName}`,
      image: organizationData?.org_logo,
      order_id: order.id,
      // callback_url: `http://localhost:5000/api/v1/users/unpaidUsers/verifyPayment`,
      // callback_url: `${process.env.REACT_APP_SERVER_API}/api/v1/users/unpaidUsers/verifyPayment`,
      prefill: {
        name: data?.name,
        email: data?.email,
        contact: data?.phone
      },
      notes: {
        address: "Delhi, India"
      },
      theme: {
        color: organizationData?.titlesColor
      },
      handler: async function (response) {
        response.razorpay_key_secret = organizationData?.paymentInstance?.key_secret;
        response.courseId = course?._id;
        response.batchId = selectedBatch?._id;
        response.email = data?.email;
        response.userId = data?._id;
        response.paidAmount = (+order?.amount / 100);
        response.originalPrice = +selectedBatch?.price;
        response.discountAmount = +couponDiscount || "";
        response.couponId = selectOffer._id || "";
        response.coupon = coupon || "";
        response.organizationId = organizationData?._id;
        response.organizationName = organizationData?.organizationName;
        console.log("Response ========>", response);
        console.log(selectOffer._id);
        const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/v1/users/unpaidUsers/verifyPayment`, response);
        if (res.data.success) {
          Swal.fire({
            title: "Course Added Successfully",
            icon: "success",
          });
          navigate('/courseAccess')
        }
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }


  const saveUser = async (email) => {
    fetch(`${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("role", data?.role);
        handleEnroll(data);
      })
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    const userAgent = window.navigator.userAgent;
    try {
      const userDevice = await axios.put(
        `${process.env.REACT_APP_SERVER_API}/api/v1/users/addDevice/${email}`,
        {
          device: userAgent,
        }
      );

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
  }


  const handleLogout = () => {
    logOut()
      .then((res) => {
        console.log(res);
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
          Swal.fire({
            icon: 'error',
            title: 'Not A Registered User',
            text: 'Please Register before Login',
          });
          handleLogout();
        } else {
          saveUser(email);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
      email,
      password,
      organizationId: organizationData?._id,
      organizationName: organizationData?.organizationName,
      role: "user"
    }

    // console.log(data);

    try {
      const result = await createUser(email, password);
      if (result.user.uid) {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/v1/users`, data);
        // console.log(res);
        if (res.data.acknowledged) {
          // console.log(email);
          saveUser(email);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleGoogleRegister = async () => {
    const googleProvider = new GoogleAuthProvider();

    if (phone.length > 3) {
      providerLogin(googleProvider)
        .then(async (result) => {
          const googleMail = result?.user?.email;
          const newName = result?.user?.displayName;
          const userDetails = await axios.get(`${process.env.REACT_APP_SERVER_API}/api/v1/users?email=${email}`);
          if (userDetails?.data?.isUser === false) {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_API}/api/v1/users`, {
              email: googleMail,
              name: newName,
              phone,
              organizationId: organizationData?._id,
              organizationName: organizationData?.organizationName,
              role: "user"
            });
            if (res.data.acknowledged) {
              saveUser(googleMail)
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else {
      setError(true);
    }
  }


  return (
    <div className="bg-[#f6f7ff91] min-h-[100vh]">
      <Navbar organizationData={organizationData}/>
      <div className="container mx-auto px-4 py-28">
        <div className="flex flex-col md:flex-row md:justify-center gap-20">
          <div>
            <div className="bg-[#F6F7FF] rounded-[20px] p-[20px] max-w-[340px] shadow-[4px_4px_4px_0px_#0000001a]">
              <div>
                <div className="card-content">
                  <div className="relative">
                    <img
                      className="w-full rounded-lg"
                      src={
                        course?.courseThumbnail
                          ? course?.courseThumbnail
                          : CourseTham
                      }
                      alt="CourseTham"
                    />
                  </div>
                  <h1 className="text-[#3E4DAC] text-[16px] font-[800] mt-[16px] mb-[12px]">
                    {course?.courseFullName}
                  </h1>
                  <p className="text-[#7A7A7A] text-[12px] font-[500] mb-[16px]">
                    {course?.courseDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="bg-[#E1D7FF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                      {course?.courseCategory}
                    </p>
                    <button className="bg-[#CEDBFF] px-[16px] py-[8px] rounded-[16px] text-[12px] font-[600] ">
                      {date?.toLocaleDateString("en-US", options)}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[350px] min-w-[350px]">
            <div className="mt-3">
              <h1 className=" text-black text-base font-[500] ">
                Select Batch
              </h1>
              <div className="flex flex-wrap">
                {!batchesData[0] && (
                  <div
                    className={`px-4 py-4 text-base border rounded-md font-semibold flex items-center justify-between gap-6 mr-1 text-[#949494]`}
                  >
                    No batch added yet!
                  </div>
                )}
                {batchesData[0] && (
                  <select
                    className="mt-1 p-2 border w-full rounded-md bg-white"
                    onChange={(e) =>
                      setSelectedBatch(batchesData[e.target.value])
                    }
                  >
                    <option className="hidden">Select Batch</option>
                    {batchesData?.map((item, index) => (
                      <option
                        key={index}
                        className={`px-3 py-3 text-base border rounded-md font-semibold flex items-center justify-between gap-6 m-1 ${selectedBatch?._id === item?._id
                          ? "text-[#0A98EA] border-t-2 border-t-[#0A98EA]"
                          : "text-[#949494]"
                          }`}
                        value={index}
                        // onClick={() => handleSelectCourse(item)}
                        onMouseDown={() => setSelectedBatch(item)}
                      >
                        {item?.batchName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {selectedBatch?._id && (
              <>
                <div className="mt-3">
                  <h1 className=" text-black text-base font-[500] ">
                    Apply Coupon
                  </h1>
                  <div className="flex mt-1 border w-full rounded-md bg-white">
                    <input
                      className=" bg-transparent w-full p-2 focus:outline-none"
                      type="text"
                      placeholder="Enter Coupon Code"
                      name="coupon"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon} className=" text-[#5e52ff] bg-[#5e52ff0c] p-2 rounded-sm">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <h1 className=" text-gray-400 mb-1 text-base font-[500] ">
                    Applicable Coupons
                  </h1>

                  <div className="flex gap-5 overflow-x-auto pb-3 scrollbar-container">
                    {
                      offers?.map((offer, index) =>
                      ((offer?.suggestDuringCheckout && !offer?.disabled) &&
                        <div key={index} onClick={() => setCoupon(offer?.code)} className="bg-gradient-to-b from-white to-[#ebf1ff] rounded-[7px] border border-blue px-[10px] py-[12px] min-w-[350px]">
                          <div className="flex items-center justify-between uppercase text-[1.25rem] font-bold">
                            <h3>{offer?.discountPercent}%</h3>
                            <h4 className=" text-blue">{offer?.code}</h4>
                          </div>
                          <p className=" flex items-center justify-between text-[14px]">
                            <span>UPTO ₹{offer?.maxDiscountValue}</span>
                            {/* <span>EXPIRES ON 31 Mar 2024</span> */}
                            <span>EXPIRES ON {new Date(offer?.validTill)?.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </p>
                          <p className="mt-[10px] font-[600] text-[1.07rem]">
                            Valid for first {offer?.maxUseCount} learners.{" "}
                          </p>
                        </div>))
                    }
                  </div>




                </div>
                <hr className="my-6" />
                <div className="mt-3">
                  <div className="p-3 border rounded-md shadow">
                    <label className=" text-[#2a2a2a80] py-2">
                      Price Details
                    </label>
                    <div className="table-responsive price-details">
                      <table className="table w-full">
                        <tbody>
                          <tr>
                            <td id="bundle-cost-name" className="py-2">
                              Total Price
                            </td>
                            <td id="bundle-cost" className="py-2">
                              ₹{selectedBatch?.price || "N/A"}
                            </td>
                          </tr>
                          <tr
                            style={{
                              display: "table-row",
                            }}
                            className="py-2"
                          >
                            <td>Coupon Discount</td>
                            <td className="py-2" id="coupon-discount">
                              ₹{couponDiscount >= 0 ? couponDiscount : "N/A"}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot className="border-t">
                          <tr>
                            <td className="py-2">Total</td>
                            <td className="py-2" id="total-to-be-paid">
                              ₹{selectedBatch?.price ? ((+selectedBatch?.price) - (+couponDiscount)) : "N/A"}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <hr className="mt-6" />
                <div className="mt-3">
                  <div className="flex justify-between mb-5">
                    <div className="sum-block-details">
                      <p className="m-0">Net Payable amount</p>
                      <h4 className="m-0 text-2xl">₹{selectedBatch?.price ? ((+selectedBatch?.price) - (+couponDiscount)) : "N/A"}</h4>
                    </div>
                    <div>
                      <button
                        onClick={user ? () => handleEnroll(userInfo) : () => setLoginOpen(true)}
                        id="enroll-now-btn"
                        className=" px-[18px] py-[9px] text-white font-bold bg-blue rounded-md"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <DialogLayoutForFromControl
        open={loginOpen}
        setOpen={setLoginOpen}
        title={
          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Login
          </p>
        }
        width={450}
        borderRadius="15px"
      >
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          registerOpen={registerOpen}
          setRegisterOpen={setRegisterOpen}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleGoogleSignIn={handleGoogleSignIn}
        />
      </DialogLayoutForFromControl>
      <DialogLayoutForFromControl
        open={registerOpen}
        setOpen={setRegisterOpen}
        title={
          <p className=" h-[90px] text-[22px] font-[700] flex items-center text-[#3E4DAC] px-[32px] py-5 border-b-2">
            Register
          </p>
        }
        width={450}
        borderRadius="15px"
      >
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleRegister={handleRegister}
          registerOpen={registerOpen}
          setRegisterOpen={setRegisterOpen}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          error={error}
          handleGoogleRegister={handleGoogleRegister}
        />
      </DialogLayoutForFromControl>
    </div>
  );
};

export default Payment;

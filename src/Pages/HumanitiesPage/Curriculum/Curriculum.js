import React, { useRef } from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import img1 from '../../../assets/Curriculum/pexels-anil-sharma-1.png'
import './style.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ArrowBackIos } from '@mui/icons-material';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import ReactGA from "react-ga4";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Curriculum = () => {

    const containerRef = useRef(null);

    function handleScrollLeft() {
        containerRef.current.scrollLeft -= 300; // scroll left by 100 pixels
    }

    function handleScrollRight() {
        containerRef.current.scrollLeft += 300; // scroll right by 100 pixels
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        ReactGA.event({
            category: "Click",
            action: "Submit Data Form Opened From Curriculum",
            label: "Submit",
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const form = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        ReactGA.event({
            category: "Click",
            action: "Submit Data From Curriculum",
            label: "Submit Data",
        });
        const form = event.target;
        const name = form.name.value;
        const number = form.number.value;
        const email = form.email.value;
        const option = form.option.value;
        const city = form.city.value;

        const data = {
            Name: name,
            Number: "+91" + number,
            Email: email,
            Option: option,
            City: city,
            Time: new Date(),
        };

        console.log(data);

        fetch(
            "https://sheet.best/api/sheets/5c4ca56d-67bb-4f49-a538-9fdde568c68d",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((data) => {
                // The response comes here
                console.log(data);
            })
            .catch((error) => {
                // Errors are reported there
                console.log(error);
            });

        const templateParams = {
            from_name: name,
            message: `
            Name: ${name},
            Number: ${"+91" + number},
            Email: ${email},
            ${option},
            City: ${city},
            Time: ${new Date()},
            `,
        };

        emailjs
            .send(
                "service_s3bklnu",
                "template_l0yacbb",
                templateParams,
                "U0g6Ht1DVmnBbENk0"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    // toast.success("Successfully Added Your Info");
                    event.target.reset();
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <div className='pt-40 flex flex-col justify-center pb-40 font'>
            <div className='px-10 lg:px-28'>
                <div className='flex flex-col lg:flex-row gap-1 justify-center items-end'>
                    <div>
                        <h2 className='text-3xl my-8'>Highly Individualized Curriculum</h2>
                        <p className='mb-8 text-[#7D7D7D]'>
                            The Creativity Lab by Experiment Labs is an extremely flexible programme that can be highly customized to meet the needs of each student’s career aspirations.
                        </p>
                        <div className='mb-8 grid grid-cols-1 lg:grid-cols-2 gap-2'>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Tailored Teaching Methods to Achieve Desired Results</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Explore 50+ Careers Hands on</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Detailed Evaluation of Technical skills Soft skills and Academic Learning </span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Hands on Practical Experience</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Get prepared to enter lvy League colleges</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Careers of the Future</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Get 1-1 Support and Live learning</span>
                            </div>
                            <div className='flex flex-row items-center gap-3'>
                                <span><PlayArrowRoundedIcon sx={{ color: 'white' }} /></span>
                                <span style={{ fontWeight: '500', fontSize: '15px' }}>Build Personality and confidence</span>
                            </div>
                        </div>

                    </div>
                    <div className='flex flex-col gap-3'>
                        <img className='rounded-2xl' src={img1} alt='' />

                        {/*  <iframe
                            className='rounded-2xl w-full h-[290px] lg:min-w-[500px]'
                           // style={{ borderRight: "5px solid rgb(57 , 127 , 235, 0.2)", borderBottom: "5px solid rgb(57 , 127 , 235, 0.2)" }}
                            src={`https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1177701-mBCKbnRAFv-high.mp4`}
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        /> */}
                    </div>
                </div>

                <div className=' flex justify-between mt-5'>
                    <h1 className='text-xl'>FAQs</h1>

                    <button onClick={handleClickOpen} className='px-5 py-1 bg-[#FF557A] rounded-3xl hover:bg-opacity-75'>More info</button>
                </div>

                <div className='mt-16 flex flex-col lg:flex-row'>

                    <div className='mb-10 flex justify-between items-start'>
                        <div>
                            {/* <h1 className='text-xl w-[200px] font-bold font'>Explore Course <span className='bg-gradient-to-t from-custom-blue to-transparent to-50%'>
                                Roster</span></h1> */}
                            {/* <button className='mt-5 px-6 py-2 bg-custom-blue rounded font-bold hover:bg-opacity-75'>See All</button> */}
                            <div className="carousel-button-group">
                                <div className='flex justify-start gap-5 mt-5'>
                                    {/* <button onClick={handleScrollLeft} className='hidden bg-[#94A4FF] rounded-full lg:block' type="button">
                                        <ArrowBackIos className='opacity-80'  sx={{ fontSize: '60px', color: 'black', ":hover": { color: "#397FEB" } }}/>
                                    </button> */}
                                    <button onClick={handleScrollLeft} className='hidden lg:block' type="button">
                                        <ArrowBackIosNewIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                                    </button>
                                    <div
                                        ref={containerRef}
                                        className='flex overflow-x-scroll scroll-smooth gap-5 mtm-container w-[80vw]'

                                    >
                                        <div className='border-2  rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>What is experiential learning?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>Experiential learning is a hands-on approach to education that involves learning
                                                    through direct experience and reflection. The well crafted pedagogy will help students
                                                    become more career aware and build leadership like a Muscle
                                                </p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>What are the benefits of Experiment Labs?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>Experiential learning has been shown to improve retention, increase engagement,
                                                    and develop practical skills that can be applied in real-world situations.</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>Who is eligible for the experiential learning
                                                    programme?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>The experiential learning programme is open to students in classes 9th to 12th.</p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>How long is the programme?
                                                </h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>The programme length is 12 weeks. In these 12 weeks we cover 130 hours of which
                                                    100 hours are practical Hands on journeys</p>
                                            </div>
                                        </div>
                                        {/* <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button> */}
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>How do I apply for the programme?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>Click on the apply now button on the top of the page.
                                                </p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'> Will I receive academic credit for participating in the
                                                    programme?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>The academic credit for the programme will be determined by your school or
                                                    educational institution. Please check with your teacher or school counsellor for more
                                                    information.
                                                </p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>How will the programme benefit my future career?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>The experiential learning programme provides opportunities for you to develop
                                                    practical skills and gain real-world experience, which can be valuable in your future
                                                    career. This will also help build
                                                </p>
                                            </div>
                                        </div>
                                        <div className='border-2 rounded-2xl border-gray-400 bg-[#7683CC] hover:shadow-xl hover:transition-all hover:duration-200 hover:ease-out hover:shadow-custom-blue min-w-[290px] max-w-[290px]'>
                                            <div className='border-gray-400 p-3'>
                                                <h1 className='text-2xl font-bold'>What if I have more questions?</h1>
                                            </div>
                                            <div className='p-4'>
                                                <p className='text-xs font-semibold text-justify'>Please reach out to your teacher or school counsellor for more information about the
                                                    experiential learning programme.
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                    <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowForwardIosIcon sx={{ fontSize: '28px', color: '#141414', borderRadius: '50%', ":hover": { color: "#397FEB" }, background: '#94A4FF', height: '40px', width: '40px', padding: '5px' }} />
                                    </button>
                                    {/* <button onClick={handleScrollRight} className='hidden lg:block' type="button">
                                        <ArrowCircleRightRoundedIcon className='opacity-80' sx={{ fontSize: '50px', color: '#397FEB', ":hover": { color: "#397FEB" } }} />
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <div className="bg-dark w-full min-w-[300px] sm:min-w-[350px] lg:w-[500px] p-5 cursor-pointer">
                    <div className="w-full">
                        <h4
                            onClick={handleClose}
                            className="text-xl text-white text-right hover:text-purple"
                        >
                            x
                        </h4>
                        <h1 className="text-2xl font-semibold text-pink text-center">
                            Learn More
                        </h1>
                    </div>
                    <form
                        ref={form}
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className="lg:px-10"
                    >
                        <div className="flex flex-col items-center mt-6 gap-1 text-white">
                            <label htmlFor="name">Enter Name</label>
                            <input
                                required
                                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                                placeholder="Enter your Name"
                                type="text"
                                name="name"
                                id="name"
                            />
                        </div>
                        <div className="flex flex-col items-center mt-6 gap-1 text-white">
                            <label htmlFor="number">Enter Number</label>
                            <input
                                required
                                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                                placeholder="Enter your number"
                                type="number"
                                name="number"
                                id="number"
                            />
                        </div>
                        <div className="flex flex-col items-center mt-6 gap-1 text-white">
                            <label htmlFor="email">Enter Email</label>
                            <input
                                required
                                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                                placeholder="Enter your email"
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="flex flex-col items-center mt-6 gap-1 text-white">
                            <label htmlFor="option">Select One</label>
                            <select
                                required
                                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                                name="option"
                                id="option"
                            >
                                <option value="Student">Student</option>
                                <option value="Parent">Parent</option>
                                <option value="Counselor">Counselor</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div className="flex flex-col items-center mt-6 gap-1 text-white">
                            <label htmlFor="city">Enter City</label>
                            <input
                                required
                                className="text-center w-full py-2 rounded-3xl text-black focus:outline-none"
                                placeholder="Enter your city"
                                type="text"
                                name="city"
                                id="city"
                            />
                        </div>
                        <div className="flex flex-col items-center mt-6 gap-1 text-white">
                            <input
                                className="text-white py-2 font-bold rounded-3xl bg-pink hover:bg-purple w-1/2 text-center"
                                type="submit"
                                value={"Submit"}
                            />
                        </div>
                    </form>
                </div>
            </Dialog>
        </div>
    );
};

export default Curriculum;
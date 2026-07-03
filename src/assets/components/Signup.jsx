import { useState, useEffect } from "react"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();
    const [form, setform] = useState({ admin_email: "", admin_password: "" })
    const [admin_password2, setadmin_password2] = useState("")
    const [all_admins, setall_admins] = useState([])

    useEffect(() => {
        // Define an async function inside the effect to fetch data
        const fetchAdmins = async () => {
            try {
                const response = await fetch('https://backend-of-password-manager-mu.vercel.app/api/GetAdmins');
                const data = await response.json();
                console.log("All Admins",data)
                setall_admins(data); // Add the fetched MongoDB array to your state
            } catch (error) {
                console.error("Error fetching passwords from MongoDB:", error);
            }
        };

        fetchAdmins();
    }, []);
    const handle_input = (e) => {
        if (e.target.name !== "admin_password2") {
            setform({ ...form, [e.target.name]: e.target.value })
        }
        else {
            setadmin_password2(e.target.value)
        }
    }



    const register_Admin = async () => {
        if (form.admin_password === admin_password2) {
            if (form.admin_password.length >= 3 && form.admin_email.length >= 3) {
                const CheckEmail = all_admins.some(all_admins => all_admins.admin_email === form.admin_email)
                if (!CheckEmail) {
                    try {
                        // 2. Send the data to your Node/Express MongoDB backend API using await
                        // Replace 'http://localhost:3000/' with your actual backend URL if different
                        const response = await fetch('https://backend-of-password-manager-mu.vercel.app/api/registeradmin', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(form), // Sending the password data as JSON string
                        });

                        // 3. Await the response data back from your server
                        const data = await response.json();
                        if (data) {
                            setform({ admin_email: "", admin_password: "" })
                            setadmin_password2("")
                            console.log(data)
                            toast('🦄 Admin Registered Successfully', {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "dark",
                            });
                            navigate('/');
                        }
                    }

                    catch {
                        toast('🦄 Error Admin Not Registered', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                } else {
                    toast('🦄 Email Already Registered', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            } else {
                toast('🦄 Email Or Password is too short', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
        else {
            toast('🦄 Password Mismatched', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }


    }
    return (
        <div className=" min-h-[88.7vh] inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


            <div className="text-white  mx-auto max-w-4xl rounded-2xl bg-slate-600 ">
                <h1 className='text-4xl text-center pt-5'>
                    <div className="logo font-bold ">
                        <span className='text-green-700'>&lt;</span>
                        Pass
                        <span className='text-green-700'>OP&gt;</span>
                    </div>
                </h1>
                <p className='text-green-600 text-lg text-center pb-3'>Your own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-y-8">
                    <input type="text" name="admin_email" value={form.admin_email} onChange={handle_input} placeholder='Enter your email ' className=' bg-slate-200 border border-green-500 rounded-2xl py-1 px-4 w-full' />
                    <div className="sep_inp flex gap-8 flex-wrap md:flex-nowrap">
                        <input type="text" name="admin_password" onChange={handle_input} value={form.admin_password} placeholder='Enter your password ' className=' bg-slate-200 border border-green-500 rounded-2xl py-1 px-4 w-full' />
                        <input type="text" name="admin_password2" onChange={handle_input} value={admin_password2} placeholder='Enter Re-enter password ' className=' bg-slate-200 border border-green-500 rounded-2xl py-1 px-4 w-full' />
                    </div></div>
                <div className="button mx-auto flex flex-col items-center gap-3.5 justify-center pb-6.5 pt-7.5">
                    <button onClick={register_Admin} className='flex gap-2.5 items-center border-2 border-green-950 hover:cursor-pointer hover:bg-green-400 bg-green-500 w-fit px-8 text-lg  py-2  rounded-3xl'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="loop"
                            delay="2000"
                        >
                        </lord-icon>
                        Register Admin</button>
                         <div>Don't have an account? <span className="text-blue-500" onClick={()=>{navigate('/Signup');}}>Signup</span></div>
                </div>
            </div>

        </div>

    )
}

export default Signup
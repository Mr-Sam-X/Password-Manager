import { useRef, useState,useEffect } from "react"
  import { ToastContainer, toast } from 'react-toastify';
  import { v4 as uuidv4 } from "uuid";
import React from 'react'
const Manager = () => {
    const ref = useRef()
    const hide_ref = useRef()
    const adminEmail = localStorage.getItem('admin_email');
    const [form, setform] = useState({website:"",username:"",password:"",adminEmail:adminEmail})
    const [PasswordArray, setPasswordArray] = useState([])
    const [UUid, setUUid] = useState("Empty")
    const [searchQuery, setSearchQuery] = useState("");
   useEffect(() => {
    // Define an async function inside the effect to fetch data
    const fetchPasswords = async () => {
        try {
            const response = await fetch(`https://backend-of-password-manager-mu.vercel.app/?adminEmail=${adminEmail}`);

            const data = await response.json();
            console.log("Admin_Email",adminEmail)
            console.log("fetch passwords",data)
            setPasswordArray(data); // Add the fetched MongoDB array to your state
        

        } catch (error) {
            console.error("Error fetching passwords from MongoDB:", error);
        }
    };

    fetchPasswords();
}, []);

    const filteredPasswords = PasswordArray.filter(item => 
    item.website?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.username?.toLowerCase().includes(searchQuery.toLowerCase()) // assuming 'Name' is your username field
);

    const showpass= () => {
        if(ref.current.src.includes("/eyecross.png")){
            ref.current.src="/eye.png"
            hide_ref.current.type="text"
        }else{
            ref.current.src="/eyecross.png"
            hide_ref.current.type="password"
        }
        
    }
    const copytext= (text) => {
        toast('🦄 Copied to Clipboard', {
position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
        navigator.clipboard.writeText(text)
    }
    const savepass= async() => { 
        if(form.website.length>=3&&form.username.length>=3&&form.password.length>=3){
       if (UUid === "Empty") {
    console.log(form);
    
    // 1. Create the new password object with a local ID for immediate UI state tracking
    const newPassword = { ...form, id: uuidv4() };

    try {
        // 2. Send the data to your Node/Express MongoDB backend API using await
        // Replace 'http://localhost:3000/' with your actual backend URL if different
        const response = await fetch('https://backend-of-password-manager-mu.vercel.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPassword), // Sending the password data as JSON string
        });

        // 3. Await the response data back from your server
        const data = await response.json();

        if (data.success) {
            // 4. Update the state and local storage backup only if the database save succeeds
            let Array = [...PasswordArray, newPassword];
            setPasswordArray(Array);
            localStorage.setItem("passwords", JSON.stringify(Array));
            console.log(Array);
            
            // 5. Clear the form inputs
            setform({ website: "", username: "", password: "",adminEmail:adminEmail });

            // 6. Trigger success notification
            toast('🦄 Saved Successfully to Database!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            // Server returned a structural error or database failure
            alert("Database Error: Failed to save password.");
        }

    } catch (error) {
        // 7. Gracefully catch network errors if the backend server is crashed or offline
        console.error("Failed to connect to backend server:", error);
        alert("Server Offline: Could not establish a connection to your backend.");
    }
}

else {
    console.log(UUid);
    const updatedData = { ...form, id: UUid };

    // 1. Send the updated data to the backend API
    await fetch('https://backend-of-password-manager-mu.vercel.app/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    // 2. Keep your exact same local state logic, just removing localStorage
    let updatedarray = PasswordArray.map(item => item.id === UUid ? updatedData : item);
    setPasswordArray(updatedarray);
    
    setform({ website: "", username: "", password: "",adminEmail:adminEmail});
    setUUid("Empty");

    toast('🦄 Edited Successfully', {
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
else{
     toast('🦄 Error Too short Information ', {
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
     const editPassword=(id)=>{
           setUUid(id);
           let itemtoedit=PasswordArray.find(item=> item.id===id)
           setform(itemtoedit)
     }
    const handle_input=(e) => { 
        setform({...form,[e.target.name]:e.target.value})
     }
const deletePassword = async (id) => {
    // Send the custom uuid to your backend API
    await fetch('https://backend-of-password-manager-mu.vercel.app/', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }) // Sends { id: "your-uuid" }
    });

    // Keep your exact same logic below, just removing localStorage
    let updatedArray = PasswordArray.filter(item => item.id !== id)
    console.log(updatedArray)
    setPasswordArray(updatedArray)

    toast('🦄 Deleted Successfully', {
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
            <div className="text-white  mx-auto max-w-4xl rounded-2xl bg-slate-600">
                <h1 className='text-4xl text-center'>
                    <div className="logo font-bold ">
                        <span className='text-green-700'>&lt;</span>
                        Pass
                        <span className='text-green-700'>OP&gt;</span>
                    </div>
                </h1>
                <p className='text-green-600 text-lg text-center'>Your own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-y-8">
                    <input type="text" name="website" onChange={handle_input} value={form.website} placeholder='Enter website URL ' className=' bg-slate-200 border border-green-500 rounded-2xl py-1 px-4 w-full' />
                    <div className="sep_inp flex gap-8 flex-wrap md:flex-nowrap">
                        <input type="text" name="username" onChange={handle_input} value={form.username} placeholder='Enter Username' className=' bg-slate-200 border border-green-500 rounded-2xl py-1 px-4 w-full' />
                        <div className="passeye w-full md:w-[30%] relative">
                        <input ref={hide_ref} type="password" name="password" onChange={handle_input} value={form.password} placeholder='Enter Password' className=' bg-slate-200 border border-green-500 rounded-2xl py-1 px-4 w-full' />
                        <span className='absolute  w-5 right-1.5 top-2' > <img ref={ref} src="\eyecross.png" alt="" onClick={showpass} /></span>
                    </div></div>
                    <div className="button mx-auto ">
                        <button onClick={savepass} className='flex gap-1.5 items-center border-2 border-green-950 hover:cursor-pointer hover:bg-green-400 bg-green-500 w-fit px-5 py-2  rounded-3xl'>
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="loop"
                                delay="2000"
                            >
                            </lord-icon>
                            Save Password</button>
                    </div>
                </div>
        
            </div>
            <div className="flex justify-between items-center mx-auto max-w-4xl my-4">
    <h2 className="text-xl font-bold text-white">Your Passwords</h2>
    
    {/* 🔍 Add this Search Input Box */}
    <input 
        type="text" 
        placeholder="🔎 Search website or username..." 
        className="rounded-full bg-slate-800 text-white px-4 py-2 border border-green-500 outline-none text-sm w-64"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
    />
</div>

            {PasswordArray.length===0 && <div className="mx-auto max-w-4xl text-white mt-10 flex justify-center"> No Password To Show</div>}
            {PasswordArray.length!==0 &&
         <div className="Display_Data mx-auto max-w-4xl rounded-lg bg-slate-600 mt-4">
            <table className="table-auto w-full overflow-hidden rounded-lg  ">
  <thead className="bg-green-700">
    <tr className="">
      <th className="py-2">Website</th>
      <th className="py-2">Name</th>
      <th className="py-2">Password</th>
      <th className="py-2">Action</th>
    </tr>
  </thead >
  <tbody className="">
    {filteredPasswords.map((item)=>{
       return <tr key={item.id} className="text-center">
      <td className="w-10 py-2 text-white border-b border-b-black "><a href={item.website} target="_blank">{item.website}</a>
      <span className="cursor-pointer" onClick={()=>{copytext(item.website)}}><lord-icon                                    
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "9px", "paddingLeft": "8px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon></span>
      
      </td>
      <td className="w-10 py-2 text-white border-b border-b-black">{item.username}
        <span className="cursor-pointer" onClick={()=>{copytext(item.username)}}><lord-icon                                    
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "9px", "paddingLeft": "8px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon></span>
      </td>
      <td className="w-10 py-2 text-white border-b border-b-black">{item.password}
        <span className="cursor-pointer" onClick={()=>{copytext(item.password)}}><lord-icon                                    
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "9px", "paddingLeft": "8px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon></span>
      </td>
      <td className='w-10 justify-center items-center border-b border-b-black pt-2'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "22px", "height": "22px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1 ' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "22px", "height": "22px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
    </tr>  
    })}
    
  </tbody>
</table>

         </div>}

        </div>
    )
}

export default Manager

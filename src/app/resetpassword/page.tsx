"use client";
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage(){
    const router = useRouter();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = React.useState(false);

    const onResetPassword = async () =>{
        if(password !== confirmpassword){
            console.log("Password not matched.");
            return;
        }
        try {
            setLoading(true)
            const response = await axios.post("api/users/resetpassword", {password, token});
            console.log("Password updated", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("reset password fail " + error.message);
        }finally{
            setLoading(false);
        }
    }
    
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[]);

    return(
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Reset Password"}</h1>
            <label htmlFor="password">New Password</label>
            <input
            className="text-black m-2"
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                />
            <label htmlFor="password">Confirm Password</label>
            <input
            className="text-black m-2"
                id="password" 
                type="password" 
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="password"
                />
            
            <button
            onClick={onResetPassword} 
            className="p-2 border border-gray-300
            rounded-lg mb-4 focus:outline-none 
            focus:border-gray-600 m-2">Set New Password</button>

        </div>
    )
}
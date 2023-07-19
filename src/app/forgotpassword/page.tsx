"use client";
import Link from "next/link";
import React,{ useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function ForgotPasswordPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = React.useState(false);

    const onForgotPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/forgotpassword", {email});
            console.log("Email Sent", response.data);
            router.push("/signup");
        } catch (error: any) {
            console.log("reset password fail " + error.message);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Forgot Password"}</h1>
            <label htmlFor="email">Email</label>
            <input
            className="text-black"
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                />
            <button
            onClick={onForgotPassword} 
            className="p-2 border border-gray-300
            rounded-lg mb-4 focus:outline-none 
            focus:border-gray-600 m-2">Submit</button>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}
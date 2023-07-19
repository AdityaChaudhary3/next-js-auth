import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {password,token } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({
            message: "Password Changed",
            success: true
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500});
    }
}
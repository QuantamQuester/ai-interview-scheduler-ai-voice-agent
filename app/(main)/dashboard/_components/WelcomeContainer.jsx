"use client"
import { useUser } from "@/app/provider"
import React from "react"
import Image from "next/image";

export default function WelcomeContainer(){
    const { user } = useUser();
    return (
        <div className="bg-white p-5 rounded-xl flex justify-between items-center mt-12 mr-12 ml-12">
            <div >
                <h2 className="text-lg font-bold"> Welcome Back, {user?.name}! </h2>
                <h2 className="text-gray-500">AI-Driven Interviews, Hassel-Free Hiring</h2>
                
            </div>
            {user && <Image src={user?.picture} alt="user avatar" width={40} height={40} className="rounded-full"/>}
        </div>
    )
}
"use client"
import React, { useState } from 'react'
import InterviewHeader from './components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

export default function InterviewLayout({children}) {

    const [interviewInfo, setInterviewInfo] =useState();
 
    return (
        <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
            <div className='bg-secondary'>
                <InterviewHeader/>
                {children}
            </div>
        </InterviewDataContext.Provider>
    )
}
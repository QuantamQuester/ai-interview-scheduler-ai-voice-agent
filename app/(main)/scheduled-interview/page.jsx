"use client"
import React from 'react'
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { useState,useEffect } from 'react';

export default function ScheduledInterview() {

    const {user} = useUser();
    const [interviewList,setInterviewList]=useState();
    useEffect(()=>{
    if (user) {
        GetInterviewList();
    }
},[user])

    const GetInterviewList = async  ()=>{
        const result = await supabase.from("Interviews")
        .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
        .eq('userEmail',user?.email)
        .order('id',{ascending : false});

        console.log(result);
        setInterviewList(result.data);
    }

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Interview list with Candidate Feedback</h2>
      {interviewList?.length==0 && 
            <div className="bg-white p-5 rounded-xl flex flex-col gap-3 items-center">
                <Video className='h-10 w-10 text-primary'></Video>
                <h2>You don't have any interview created!</h2>
                <Button>+ Create a New Interview</Button>
            </div>}
            {interviewList && 
              <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
                  {interviewList?.map((interview, index)=>(
                    <InterviewCard interview={interview} key={index}
                    viewDetail={true}/>
                  ))}
              </div>}
      </div>
  ) 
}

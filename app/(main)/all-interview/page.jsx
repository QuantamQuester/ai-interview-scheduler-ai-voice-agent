"use client"
import React, { useEffect, useState } from 'react'
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import InterviewCard from '../dashboard/_components/InterviewCard';

export default function AllInterview() {

    const [interviewList , setInterviewList] = useState([]);
    const {user} = useUser();

    useEffect(()=>{
      user && GetInterviewList(); 
    },[user])

    const GetInterviewList = async() =>{
      let { data: Interviews, error } = await supabase
          .from('Interviews')
          .select('*')
          .eq('userEmail',user?.email)
          .order('id',{ascending:false})

      console.log(Interviews); 
      setInterviewList(Interviews);
    }

  return (
    <div className='my-5'>
        <h2 className='my-3 font-bold text-2xl'>All Previously Created Interviews</h2>
        <div>
            {interviewList?.length==0 && 
            <div className="bg-white p-5 rounded-xl flex flex-col gap-3 items-center">
                <Video className='h-10 w-10 text-primary'></Video>
                <h2>You don't have any interview created!</h2>
                <Button>+ Create a New Interview</Button>
            </div>}
            {interviewList && 
              <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
                  {interviewList.map((interview, index)=>(
                    <InterviewCard interview={interview} key={index}/>
                  ))}
              </div>}
        </div>
    </div>
  )
}

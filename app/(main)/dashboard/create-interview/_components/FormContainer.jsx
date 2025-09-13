import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { InterviewType } from "@/services/Constants"
import { Button } from '@/components/ui/button'

export default function FormContainer({onHandleInputChange, GoToNext}) {

    const [interviewType , setInterviewType ] = useState([]);
    const AddInerviewType=(type)=>{
        const data = interviewType.includes(type);
        if(!data){
            setInterviewType(prev=>[...prev, type]);
        }else{
            const result = interviewType.filter(item=>item!=type);
            setInterviewType(result);
        }
    }

    useEffect(()=>{
        if(interviewType){
            onHandleInputChange("type",interviewType)
        }
    }, [interviewType])

  return (
    <div className='p-5 bg-white rounded-xl'>
        <div>
            <h2 className='text-sm font-medium'>Job Position</h2>
            <Input placeholder="full stack developer" className="mt-2"
            onChange={(event)=>onHandleInputChange("jobPosition", event.target.value)}/>
        </div>
        <div className='mt-5 font-medium'>
            <h2 className='text-sm'>Job Description</h2>
            <Textarea placeholder="Enter details job description" className="h-[200px] mt-2"
            onChange={(event)=>onHandleInputChange("jobDescription", event.target.value)}
            />
            
        </div>
        <div className='mt-5 font-medium'>
            <h2 className='text-sm'>Interview Duration</h2>
            <Select onValueChange={(value)=>onHandleInputChange("duration",value)}>
            <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent >
                <SelectItem value="30 sec">30 sec</SelectItem>
                <SelectItem value="1 min">1 Min</SelectItem>
                <SelectItem value="5 min">5 Min</SelectItem>
                <SelectItem value="15 min">15 Min</SelectItem>
                <SelectItem value="30 min">30 Min</SelectItem>
                <SelectItem value="45 min">45 Min</SelectItem>
                <SelectItem value="60 min">60 Min</SelectItem>
            </SelectContent>
        </Select>
        </div>
        <div className='mt-5 font-medium'>
            <h2 className='text-sm'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
                {InterviewType.map((type, index)=>(
                    <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border
                     border-gray-300 rounded-2xl hover:bg-secondary ${interviewType.includes(type.title) && 'bg-blue-100 text-primary' }`} onClick={()=>AddInerviewType(type.title)}>
                        <type.icon className='h-4 w-4 '/>
                        <span>{type.title}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
            <Button>Generate Question <ArrowRight></ArrowRight></Button>
        </div>
    </div>
  )
}

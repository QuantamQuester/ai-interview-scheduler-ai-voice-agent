"use client"

import { useParams } from 'next/navigation'
import React from 'react'
import { useUser } from "@/app/provider"; 
import { useState, useEffect } from "react"; 
import { supabase } from "@/services/supabaseClient";
import InterviewDetailContainer from '../_components/InterviewDetailContainer';
import CandidateList from '../_components/CandidatList';
import CandidatList from '../_components/CandidatList';

function InterviewDetail() {
    const { interview_id } = useParams();
    const { user } = useUser();
    const [interviewDetail, setInterviewDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user) {
            GetInterviewDetail();
        }
    }, [user, interview_id]); // Added interview_id to dependency array

    const GetInterviewDetail = async () => {
        try {
            setLoading(true);
            const result = await supabase
                .from("Interviews")
                .select(`jobPosition, jobDescription, type, questionList, duration, interview_id, created_at,
                    interview-feedback(userEmail, userName, feedback, created_at)`)
                .eq('userEmail', user?.email)
                .eq("interview_id", interview_id) // Fixed the syntax error here
                .single(); // Use single() since we expect only one result
            
            if (result.error) {
                throw result.error;
            }
            
            setInterviewDetail(result.data);
        } catch (error) {
            console.error("Error fetching interview details:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className='mt-5'>
                <h2 className="font-bold text-2xl">Interview Details</h2>
                <div className="p-5 bg-white rounded-lg mt-5">
                    <p>Loading interview details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='mt-5'>
                <h2 className="font-bold text-2xl">Interview Details</h2>
                <div className="p-5 bg-white rounded-lg mt-5">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='mt-5'>
            <h2 className="font-bold text-2xl">Interview Details</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail} />
            <CandidatList candidateList={interviewDetail?.['interview-feedback']}/>
        </div>
    );
}

export default InterviewDetail;
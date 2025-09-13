"use client"
import React, { useEffect, useState } from 'react'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useContext } from 'react'
import { Network, Timer } from 'lucide-react';
import Image from 'next/image';
import { Mic , Phone} from 'lucide-react';
import Vapi from '@vapi-ai/web';
import AlertConfirmation from './_components/AlertConfirmation';
import { toast } from 'sonner';
import axios from 'axios';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const [vapi] = useState(() => new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY));
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState('');
  const [loading, setLoading] = useState(false);
  const { interview_id } = useParams();
  const router = useRouter();
  const [interviewDuration, setInterviewDuration] = useState(0);
  const interviewTimeInMinutes = interviewInfo?.duration;

  useEffect(() => {
    if (interviewInfo) {
      startCall();
    }
  }, [interviewInfo]);

  useEffect(() => {
    let timer;
    if (activeUser) {
      timer = setInterval(() => {
        setInterviewDuration(prevDuration => prevDuration + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeUser]);

  useEffect(() => {
    if (interviewDuration >= (interviewTimeInMinutes * 60)) {
      stopInterview();
      toast("Time's up! The interview has ended.");
    }
  }, [interviewDuration]);

  const startCall = async () => {
    try {
      let questionList = "";
      interviewInfo?.interviewData?.questionList.forEach((item, index) => {
        questionList += `${index + 1}. ${item?.question}\n`;
      });

      const assistantOptions = {
        name: "AI Recruiter",
        firstMessage: `Hi ${interviewInfo?.userName}, welcome to your interview! I'm excited to learn more about your experience with ${interviewInfo?.interviewData.jobPosition}. Let's get started!`,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Start with an easy question about ${interviewInfo?.interviewData.jobPosition}. 
Then continue one question at a time and wait for the candidate's response before proceeding.

Questions to ask:
${questionList}

**CRITICAL DIRECTIVE:** 
- Ask only one question at a time
- Wait for the candidate's complete response before moving to the next question
- Provide brief, encouraging feedback after each response
- If the candidate struggles, offer hints or rephrase the question without giving away the answer
- Keep the conversation calm and concise

Examples of encouraging feedback:
- "Nice! That's a solid answer."
- "Excellent! That makes sense."
- "Great perspective on that!"
- "Want to try again?" (if they seem unsure)

Examples of helpful hints:
- "Need help? Think about how React tracks component updates!"
- "Consider focusing on the business impact of that decision."
- "Maybe think about it from the user's perspective."

Use conversational, natural, and engaging language—use casual phrases like:
- "Alright, next up..."
- "Let's tackle a tricky one!"
- "Interesting! Now let's move to..."
- "Perfect! Moving right along..."

After asking all questions, wrap up the interview smoothly by summarizing their performance:
- "That was great! You handled some tough questions well."
- "Thanks for sharing your skills and experience!"
- "I appreciate your thoughtful responses today."

End on a positive note:
- "Thanks for chatting! Hope to see you crushing projects soon!"
- "Great conversation! Best of luck with the process."
- "Really enjoyed our discussion. Take care!"

Key Guidelines:
🟢 Be friendly, engaging, and professional  
🟢 Keep responses short and natural, like a real conversation  
🟢 Adapt based on the candidate's confidence level  
🟢 Maintain focus on ${interviewInfo?.interviewData.jobPosition} topics
🟢 Ensure the interview flows naturally and doesn't feel robotic
              `.trim(),
            }
          ]
        }
      }
      
      vapi.start(assistantOptions);
    } catch (error) {
      console.error("Error starting interview:", error);
      alert("Microphone access is required to start the interview. Please enable it in your browser settings.");
    }
  }

  const stopInterview = () => {
    vapi.stop();
  }

  useEffect(() => {
    const handleMessage = (message) => {
      console.log("Message", message);
      if (message?.conversation) {
        const convoString = JSON.stringify(message .conversation);
        console.log("Conversation string", convoString);
        setConversation(convoString);
      }
    };

    const handleCallStart = () => {
      console.log("Call has started.");
      toast("Call Connected...");
      setActiveUser(true);
    };

    const handleSpeechStart = () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    };

    const handleCallEnd = () => {
      console.log("Call has ended");
      toast("Interview Ended");
      GenerateFeedback();
    };

    // Register event listeners
    vapi.on("message", handleMessage);
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);

    // Cleanup function
    return () => {
      vapi.off("message", handleMessage);
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
    };
  }, [vapi]);

  const GenerateFeedback = async () => {
  try {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });

    console.log("API feedback response:", result.data);

    // If backend sent error
    if (result.data?.success === false) {
      console.error("Feedback API Error:", result.data.error);
      return;
    }

    // Backend already returns parsed JSON → just use it
    const feedback = result.data;

    
// Convert AI recommendation string → boolean
const isRecommended =
  feedback?.feedback?.recommendation?.toLowerCase() === "yes";

    const { data, error } = await supabase
      .from("interview-feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interview_id: interview_id,
          feedback: feedback, // no JSON.parse needed
          recommended: isRecommended,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Inserted feedback:", data);
      router.replace('/interview/'+interview_id+"/completed");
    }
  } catch (err) {
    console.error("GenerateFeedback failed:", err);
  }
};


  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  return (
    <div className='p-5 lg:px-20 xl:px-32'>
      <h2 className='font-bold text-xl flex justify-between items-center'>
        AI Interview Session
        <span className='flex gap-2 items-center text-lg'>
          <Timer className='w-5 h-5' />
          {formatTime(interviewDuration)}
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[300px] p-4 rounded-lg border flex items-center justify-center flex-col gap-3'>
          <div className='relative'>
            {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
            <Image 
              src={'/ai.png'} 
              alt='AI Recruiter'
              width={80} 
              height={80} 
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <h2 className='font-medium'>AI Recruiter</h2>
        </div>
        
        <div className='bg-white h-[300px] p-4 rounded-lg border flex items-center flex-col gap-3 justify-center'>
          <div className='relative'>
            {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'/>}
            <div className='text-2xl bg-primary text-white p-3 rounded-full w-16 h-16 flex items-center justify-center'>
              {interviewInfo?.userName?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
          <h2 className='font-medium'>{interviewInfo?.userName || 'Candidate'}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-7'>
        <div className={`p-3 rounded-full cursor-pointer ${activeUser ? 'bg-green-500' : 'bg-gray-500'}`}>
          <Mic className='h-6 w-6 text-white' />
        </div>
        
        <AlertConfirmation stopInterview={stopInterview}>
          <div className='p-3 bg-red-500 text-white rounded-full cursor-pointer'>
            <Phone className='h-6 w-6' />
          </div>
        </AlertConfirmation>
      </div>
      
      <h2 className='text-sm text-gray-400 text-center mt-5'>
        {activeUser ? 'Speak now...' : 'Interview in Progress...'}
      </h2>

      {/* Status indicator */}
      <div className='mt-4 text-center'>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
          activeUser ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          <Network className='w-4 h-4 mr-1' />
          {activeUser ? 'You are speaking' : 'AI is speaking'}
        </div>
      </div>
    </div>
  )
}
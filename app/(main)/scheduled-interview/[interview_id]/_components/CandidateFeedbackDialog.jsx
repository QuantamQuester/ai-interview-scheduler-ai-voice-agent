import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

function CandidateFeedbackDialog({ candidate }) {
    const feedback = candidate?.feedback?.feedback
    const rating = feedback?.rating || {}

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-primary">View Report</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-5'> 
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-5'>
                                    <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>
                                        {candidate?.userName?.[0] || candidate?.name?.[0] || 'U'}
                                    </h2>
                                    <div>
                                        <h2 className='font-bold'>{candidate?.userName || candidate?.name || 'Unknown User'}</h2>
                                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail || candidate?.email}</h2>
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <h2 className='text-primary text-2xl font-bold'>
                                        {rating.technicalSkills !== undefined ? 
                                            `${Math.round((
                                                (rating.technicalSkills || 0) +
                                                (rating.communication || 0) +
                                                (rating.problemSolving || 0) +
                                                (rating.experience || 0)
                                            ) / 4)}/10` : 
                                            'N/A'
                                        }
                                    </h2>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold'>Skills Assessment</h2>
                                <div className='mt-3 grid grid-cols-2 gap-10'>
                                    {/* Technical Skills */}
                                    <div>
                                        <h2 className='flex justify-between'>Technical Skills <span>{(rating.technicalSkills || 0)}/10</span></h2>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(rating.technicalSkills || 0) * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    {/* Communication Skills */}
                                    <div>
                                        <h2 className='flex justify-between'>Communication Skills <span>{(rating.communication || 0)}/10</span></h2>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(rating.communication || 0) * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    {/* Problem Solving */}
                                    <div>
                                        <h2 className='flex justify-between'>Problem Solving <span>{(rating.problemSolving || 0)}/10</span></h2>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(rating.problemSolving || 0) * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    {/* Experience */}
                                    <div>
                                        <h2 className='flex justify-between'>Experience <span>{(rating.experience || 0)}/10</span></h2>
                                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${(rating.experience || 0) * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-bold'>Performance Summary</h2>
                                <div className='p-5 bg-secondary my-3 rounded-md'>
                                    {feedback?.summary ? (
                                        Array.isArray(feedback.summary) ? (
                                            feedback.summary.map((summary, index) => (
                                                <p key={index}>{summary}</p>
                                            ))
                                        ) : (
                                            <p>{feedback.summary}</p>
                                        )
                                    ) : (
                                        <p>No summary available</p>
                                    )}
                                </div>
                            </div>

                            <div className={`p-5 mt-10 flex items-center justify-between rounded-md ${feedback?.recommendation === 'No' || feedback?.Recommendation === 'No' ? 'bg-red-100' : 'bg-green-100'}`}>
                                <div>
                                    <h2 className={`font-bold ${feedback?.recommendation === 'No' || feedback?.Recommendation === 'No' ? 'text-red-700' : 'text-green-700'}`}>Recommendation Msg:</h2>
                                    <p className={`${feedback?.recommendation === 'No' || feedback?.Recommendation === 'No' ? 'text-red-500' : 'text-green-500'}`}>
                                        {feedback?.recommendationMsg || feedback?.RecommendationMsg || 'No recommendation message'}
                                    </p>
                                </div>
                                <Button className={`${feedback?.recommendation === 'No' || feedback?.Recommendation === 'No' ? 'bg-red-700' : 'bg-green-700'}`}>
                                    Send Msg
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog
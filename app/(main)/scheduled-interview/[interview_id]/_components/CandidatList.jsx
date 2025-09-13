import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidatList({ candidateList }) {
  // Check if candidateList is undefined or null
  if (candidateList === undefined || candidateList === null) {
    return (
      <div className="">
        <h2 className='font-bold my-5'>Candidates (0)</h2>
        <p className="text-gray-500">Loading candidates...</p>
      </div>
    )
  }

  return (
    <div className="">
      <h2 className='font-bold my-5'>Candidates ({candidateList.length})</h2>
      {
        candidateList.length > 0 ? (
          candidateList.map((candidate, index) => (
            <div key={index} className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg mb-3">
              <div className='flex items-center gap-5'>
                <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName?.[0] || 'U'}</h2>
                <div>
                  <h2 className='font-bold'>{candidate?.userName || 'Unknown User'}</h2>
                  <h2 className='text-sm text-gray-500'>
                    Completed On: {candidate?.created_at ? moment(candidate.created_at).format("MMM DD, yyyy") : 'N/A'}
                  </h2>
                </div>
              </div>
              <div className='flex gap-3 items-center'>
                <h2 className='text-green-600'>
  {candidate?.feedback?.feedback?.rating ? 
    `${Math.round((
      candidate.feedback.feedback.rating.technicalSkills +
      candidate.feedback.feedback.rating.communication +
      candidate.feedback.feedback.rating.problemSolving +
      candidate.feedback.feedback.rating.experience
    ) / 4)}/10` : 
    'N/A'
  }
</h2>
                <CandidateFeedbackDialog candidate={candidate}/>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No candidates found</p>
        )
      }
    </div>
  )
}

export default CandidatList;    
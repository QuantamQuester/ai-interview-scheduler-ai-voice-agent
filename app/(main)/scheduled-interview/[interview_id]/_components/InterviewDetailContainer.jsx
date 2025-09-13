import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import moment from 'moment';

function InterviewDetailContainer({ interviewDetail }) {

  const getInterviewType = () => {
    if (!interviewDetail?.type) return "N/A";
    
    try {
      // If type is already an array/object, return the first item
      if (typeof interviewDetail.type !== 'string') {
        return Array.isArray(interviewDetail.type) 
          ? interviewDetail.type[0] || "N/A"
          : interviewDetail.type;
      }
      
      // If type is a string, try to parse it as JSON
      const parsed = JSON.parse(interviewDetail.type);
      return Array.isArray(parsed) ? parsed[0] || "N/A" : parsed;
    } catch (e) {
      console.error("Invalid type value:", interviewDetail.type);
      return "Invalid type";
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <h2 className="text-xl font-semibold">{interviewDetail?.jobPosition}</h2>

      <div className="mt-4 flex flex-wrap justify-between items-start lg:pr-52 gap-6">
        {/* Duration */}
        <div>
          <h3 className="text-sm text-gray-500">Duration</h3>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Clock className="h-4 w-4" />
            {interviewDetail?.duration}
          </div>
        </div>

        {/* Created On */}
        <div>
          <h3 className="text-sm text-gray-500">Created On</h3>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetail?.created_at).format('MMM DD, YYYY')}
          </div>
        </div>

        {/* Type */}
        <div>
          <h3 className="text-sm text-gray-500">Type</h3>
          <div className="flex items-center gap-2 text-sm font-bold">
            <Clock className="h-4 w-4" />
            {getInterviewType()}
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h3 className="font-bold text-md mb-1">Job Description</h3>
        <p className="text-sm whitespace-pre-line">{interviewDetail?.jobDescription}</p>
      </div>
      
      {/* Question List */}
      <div className='mt-5'>
        <h3 className="font-bold text-md mb-1">Interview Questions</h3>
        <div className="space-y-3">
          {interviewDetail?.questionList?.map((item,index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{index+1}.</span> {item?.question}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
"use client"
import React from 'react';
import { Home, ArrowRight, Check, Clock, ChevronUp } from 'lucide-react';
import { useRouter } from "next/navigation";

const InterviewComplete = () => {
  const router = useRouter();
  return (
    <div className="bg-midnight text-white font-sans antialiased flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-8 py-16 px-4">
        {/* White card container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 max-w-3xl w-full">
          {/* Success Icon */}
          <div className="rounded-full bg-green-500 p-5 flex items-center justify-center mx-auto w-20 h-20">
            <Check className="h-10 w-10 text-white" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mt-6 text-gray-800">
            Interview Complete!
          </h1>

          {/* Subheading */}
          <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
            Thank you for participating in the AI-driven interview with Alcruiter
          </p>

          {/* Interview Illustration */}
        <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-4xl">
          <div 
            className="w-full h-64 md:h-96 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://media.licdn.com/dms/image/v2/D4E12AQFugaXd6jdjWw/article-cover_image-shrink_720_1280/B4EZc3FtEiHkAI-/0/1748975932408?e=2147483647&v=beta&t=0jp2pNe2IK_pehZFsxf50ehgAVY72xvAzJyPrydV_VI',
            }}
          />
        </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-200"></div>

          {/* Next Steps */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              What's Next?
            </h2>
            
            <p className="text-gray-600 text-center">
              The recruiter will review your interview responses and will contact you soon regarding the next steps.
            </p>
            
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              <span>Response within 2-3 business days</span>
            </div>
          </div>

          {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
        {/* Return to Homepage */}
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-100 text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-lg py-3 px-6 flex items-center justify-center space-x-2 transition duration-300 ease-in-out"
        >
          <Home className="h-5 w-5" />
          <span>Return to Homepage</span>
        </button>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-6 flex items-center justify-center space-x-2 transition duration-300 ease-in-out">
              <span>View Other Opportunities</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-500 text-center py-6">
        <p className="text-sm">&copy; 2023 Alcruiter. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default InterviewComplete;
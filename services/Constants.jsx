import { LayoutDashboard, Calendar,List, CreditCard,Settings, Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, Component } from "lucide-react";

export const SideBarOptions=[
    {
        name : "Dashboard",
        icon : LayoutDashboard,
        path :"/dashboard"
    },
    {
        name : "Scheduled Interview",
        icon : Calendar,
        path : "/scheduled-interview"
    },
    {
        name : "All Interview",
        icon : List,
        path : "/all-interview"
    },
    {
        name : "Billing",
        icon : CreditCard,
        path : "/billing"
    },
    {
        name : "Settings",
        icon : Settings,
        path : "/settings"
    },

]

export const InterviewType = [
    {
        title : "Technical",
        icon : Code2Icon
    },
    {
        title : "Behavioral",
        icon : User2Icon
    },
    {
        title : "Experience",
        icon : BriefcaseBusinessIcon
    },
    {
        title : "Problem Solving",
        icon : Puzzle
    },
    {
        title : "Leadership",
        icon : Component
    },
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Besed on the following inputs , generate a well-structured list of high quality interview questions:
Job Title: {{jobTitle}}
Job Description : {{jobDescription}}
Interview Duration : {{duration}}
Interview Type : {{type}}

Your task:
Analyse the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.

Ensure the questions match the tone and structure of a real-life {{type}} interview.
Format your response in JSON format with array of list questions.
format : interviewQuestions=[
{
question :'',
type:'Technical/Behavioral/Experience/Problem Solving/ Leadership'
},{
...
}]
The goal is to create a structured,relevant and time-optimized interview plan for a {{jobTitle}} role.`

export const FEEDBACK_PROMPT = `
{{conversation}}
Based on this interview conversation between assistant and user,
give feedback for the candidate's interview.

Provide:
- Rating out of 10 for technicalSkills, communication, problemSolving, experience
- A summary in 3 lines about the interview
- A clear recommendation (Yes/No) with a short recommendationMsg

Respond ONLY in valid JSON format, like this:

{
  "feedback": {
    "rating": {
      "technicalSkills": <number>,
      "communication": <number>,
      "problemSolving": <number>,
      "experience": <number>
    },
    "summary": "<3 lines>",
    "recommendation": "<Yes|No>",
    "recommendationMsg": "<short message>"
  }
}
`;

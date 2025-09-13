import { Loader2Icon, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

export default function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);

    try {
      const result = await axios.post('/api/ai-model', {
        ...formData,
      });

      // ✅ Backend now always returns valid JSON
      setQuestionList(result.data?.interviewQuestions || []);
      setLoading(false);
    } catch (e) {
      console.error('Server error:', e);
      toast('⚠️ Server Error. Please try again.');
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();

    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select(); 
      // Update User Credits
      const userUpdate = await supabase
      .from('Users')
      .update({ credits: Number(user?.credits) - 1 })
      .eq('email', user?.email)
      .select();

      console.log(userUpdate);


    setSaveLoading(false);
    onCreateLink(interview_id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job position
            </p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && (
        <QuestionListContainer questionList={questionList} />
      )}

      <div className="flex justify-end mt-10">
        <Button onClick={onFinish} disabled={saveLoading}>
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

import InterviewForm from "../../components/InterviewForm";
import InterviewList from "../../components/InterviewList";
import { useState } from "react";

export default function Interview() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">My Interviews</h1>
      <InterviewForm onAdded={() => setRefresh(!refresh)} />
      <InterviewList refresh={refresh} />
    </div>
  );
}

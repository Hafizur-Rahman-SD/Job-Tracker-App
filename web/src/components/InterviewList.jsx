import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InterviewList({ refresh }) {
  const [interviews, setInterviews] = useState([]);

  const fetchAll = async () => {
    const { data } = await supabase
      .from("interviews")
      .select("*")
      .order("date", { ascending: true });
    setInterviews(data || []);
  };

  useEffect(() => {
    fetchAll();
  }, [refresh]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow mt-6">
      {interviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No interviews yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-3 text-left">Job ID</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Time</th>
                <th className="py-2 px-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((iv) => (
                <tr key={iv.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{iv.job_id}</td>
                  <td className="py-2 px-3">{iv.date}</td>
                  <td className="py-2 px-3">{iv.time || "—"}</td>
                  <td className="py-2 px-3">{iv.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

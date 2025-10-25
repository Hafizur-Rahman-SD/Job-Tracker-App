import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InterviewList({ refresh }) {
  const [interviews, setInterviews] = useState([]);

  const fetchAll = async () => {
    const { data, error } = await supabase
      .from("interviews")
      .select(`id, date, time, address, email, job_id, jobs(title, company)`)
      .order("date", { ascending: true });
    if (!error) setInterviews(data || []);
  };

  useEffect(() => {
    fetchAll();
  }, [refresh]);

  return (
    <div className="bg-white rounded-2xl p-4 shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Interviews</h2>
      {interviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No interviews scheduled yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">Job</th>
                <th className="py-2 px-3 text-left">Company</th>
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Time</th>
                <th className="py-2 px-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((iv, index) => (
                <tr key={iv.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-500">{index + 1}</td>
                  <td className="py-2 px-3">{iv.jobs?.title || "—"}</td>
                  <td className="py-2 px-3">{iv.jobs?.company || "—"}</td>
                  <td className="py-2 px-3">
                    {new Date(iv.date).toLocaleDateString("en-GB")}
                  </td>
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

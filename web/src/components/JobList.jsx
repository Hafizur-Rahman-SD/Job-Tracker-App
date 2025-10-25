import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function JobList({ refresh }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setJobs(data || []);
  };

  useEffect(() => {
    fetchJobs();
  }, [user, refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    await supabase.from("jobs").delete().eq("id", id);
    fetchJobs();
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow mt-6">
      {jobs.length === 0 ? (
        <p className="text-gray-500 text-sm">No jobs added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Company</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{job.title}</td>
                  <td className="py-2 px-3">{job.company}</td>
                  <td className="py-2 px-3">{job.status}</td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function JobList({ refresh }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchJobs = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, [user, refresh]);

  // Delete job
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchJobs();
  };

  // Start editing
  const startEdit = (job) => {
    setEditing(job.id);
    setEditForm({
      title: job.title,
      company: job.company,
      position: job.position,
      status: job.status,
      note: job.note,
    });
  };

  // Save edited job
  const saveEdit = async (id) => {
    const { error } = await supabase
      .from("jobs")
      .update({
        title: editForm.title,
        company: editForm.company,
        position: editForm.position,
        status: editForm.status,
        note: editForm.note,
      })
      .eq("id", id);

    if (error) alert(error.message);
    else {
      setEditing(null);
      fetchJobs();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-sm">No jobs added yet.</p>
      ) : (
        <ul className="space-y-2">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border rounded-lg p-3 hover:shadow transition flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              {editing === job.id ? (
                <div className="flex flex-col md:flex-row gap-2 w-full">
                  <input
                    className="input flex-1"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />
                  <input
                    className="input flex-1"
                    value={editForm.company}
                    onChange={(e) =>
                      setEditForm({ ...editForm, company: e.target.value })
                    }
                  />
                  <select
                    className="input"
                    value={editForm.status}
                    onChange={(e) =>
                      setEditForm({ ...editForm, status: e.target.value })
                    }
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                  </select>
                  <button
                    onClick={() => saveEdit(job.id)}
                    className="btn bg-green-600 text-white px-3 py-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="btn bg-gray-400 text-white px-3 py-1"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {job.title} – {job.company}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {job.position} | {job.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(job)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

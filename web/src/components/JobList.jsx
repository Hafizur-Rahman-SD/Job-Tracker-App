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

    if (!error) setJobs(data || []);
  };

  useEffect(() => {
    fetchJobs();
  }, [user, refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this job?")) return;
    await supabase.from("jobs").delete().eq("id", id);
    fetchJobs();
  };

  const startEdit = (job) => {
    setEditing(job.id);
    setEditForm({
      title: job.title,
      company: job.company,
      position: job.position,
      status: job.status,
      apply_link: job.apply_link,
      note: job.note,
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    const { error } = await supabase
      .from("jobs")
      .update({
        title: editForm.title,
        company: editForm.company,
        position: editForm.position,
        status: editForm.status,
        apply_link: editForm.apply_link,
        note: editForm.note,
      })
      .eq("id", id);

    if (!error) {
      setEditing(null);
      fetchJobs();
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">My Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-sm">No jobs added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="py-2 px-3 text-left">#</th>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Company</th>
                <th className="py-2 px-3 text-left">Position</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Apply Link</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3 text-gray-500">{index + 1}</td>

                  {/* Title */}
                  <td className="py-2 px-3">
                    {editing === job.id ? (
                      <input
                        className="input"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                    ) : (
                      job.title
                    )}
                  </td>

                  {/* Company */}
                  <td className="py-2 px-3">
                    {editing === job.id ? (
                      <input
                        className="input"
                        value={editForm.company}
                        onChange={(e) =>
                          setEditForm({ ...editForm, company: e.target.value })
                        }
                      />
                    ) : (
                      job.company
                    )}
                  </td>

                  {/* Position */}
                  <td className="py-2 px-3">
                    {editing === job.id ? (
                      <input
                        className="input"
                        value={editForm.position}
                        onChange={(e) =>
                          setEditForm({ ...editForm, position: e.target.value })
                        }
                      />
                    ) : (
                      job.position || "—"
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-2 px-3">
                    {editing === job.id ? (
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
                    ) : (
                      job.status
                    )}
                  </td>

                  {/* Apply Link */}
                  <td className="py-2 px-3">
                    {editing === job.id ? (
                      <input
                        className="input"
                        value={editForm.apply_link}
                        onChange={(e) =>
                          setEditForm({ ...editForm, apply_link: e.target.value })
                        }
                      />
                    ) : job.apply_link ? (
                      <a
                        href={job.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-3">
                    {editing === job.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(job.id)}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(job)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    )}
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

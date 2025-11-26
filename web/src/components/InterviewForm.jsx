


import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function InterviewForm({ onAdded }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    job_id: "",
    date: "",
    time: "",
    address: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchJobs();
  }, [user]);

  const fetchJobs = async () => {
    const { data } = await supabase
      .from("jobs")
      .select("id, title, company")
      .eq("user_id", user.id);
    setJobs(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("interviews").insert([form]);
    setLoading(false);
    if (error) alert(error.message);
    else {
      alert("Interview added!");
      setForm({ job_id: "", date: "", time: "", address: "", email: "" });
      onAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 shadow space-y-3"
    >
      <h2 className="text-lg font-semibold text-gray-800">Add Interview</h2>

      <select
        className="input"
        value={form.job_id}
        onChange={(e) => setForm({ ...form, job_id: e.target.value })}
        required
      >
        <option value="">Select Job</option>
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.title} — {job.company}
          </option>
        ))}
      </select>

      <input
        className="input"
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <input
        className="input"
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
      />
      <input
        className="input"
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        className="input"
        placeholder="Contact Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button
        disabled={loading}
        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
      >
        {loading ? "Saving..." : "Save Interview"}
      </button>
    </form>
  );
}

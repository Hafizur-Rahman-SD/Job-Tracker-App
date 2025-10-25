import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function InterviewForm({ onAdded }) {
  const [form, setForm] = useState({
    job_id: "",
    date: "",
    time: "",
    address: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("interviews").insert([form]);
    setLoading(false);
    if (error) alert(error.message);
    else {
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
      <input
        className="input"
        placeholder="Job ID"
        value={form.job_id}
        onChange={(e) => setForm({ ...form, job_id: e.target.value })}
        required
      />
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
        placeholder="Email"
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

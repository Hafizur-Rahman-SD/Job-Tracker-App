import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function JobForm({ onJobAdded }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    company: "",
    position: "",
    status: "Applied",
    date_applied: "",
    note: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first!");

    const { error } = await supabase.from("jobs").insert([
      {
        user_id: user.id,
        title: form.title,
        company: form.company,
        position: form.position,
        status: form.status,
        date_applied: form.date_applied,
        note: form.note,
      },
    ]);

    if (error) alert(error.message);
    else {
      alert("Job added successfully!");
      setForm({
        title: "",
        company: "",
        position: "",
        status: "Applied",
        date_applied: "",
        note: "",
      });
      if (onJobAdded) onJobAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 shadow space-y-3 mt-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Job</h2>

      <input
        className="input"
        placeholder="Job Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <input
        className="input"
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <input
        className="input"
        placeholder="Position"
        value={form.position}
        onChange={(e) => setForm({ ...form, position: e.target.value })}
      />
      <select
        className="input"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        className="input"
        type="date"
        value={form.date_applied}
        onChange={(e) => setForm({ ...form, date_applied: e.target.value })}
      />

      <textarea
        className="input"
        placeholder="Notes (optional)"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <button className="btn w-full bg-gray-900 text-white">Save Job</button>
    </form>
  );
}

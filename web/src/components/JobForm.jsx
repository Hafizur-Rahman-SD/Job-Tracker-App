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
    apply_link: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first");
    setLoading(true);

    const { error } = await supabase.from("jobs").insert([
      {
        user_id: user.id,
        title: form.title,
        company: form.company,
        position: form.position,
        status: form.status,
        apply_link: form.apply_link,
        note: form.note,
      },
    ]);

    setLoading(false);
    if (error) alert(error.message);
    else {
      setForm({
        title: "",
        company: "",
        position: "",
        status: "Applied",
        apply_link: "",
        note: "",
      });
      onJobAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 shadow space-y-3"
    >
      <h2 className="text-lg font-semibold text-gray-800">Add New Job</h2>
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
        required
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
        placeholder="Apply Link (optional)"
        value={form.apply_link}
        onChange={(e) => setForm({ ...form, apply_link: e.target.value })}
      />
      <textarea
        className="input"
        placeholder="Notes"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />
      <button
        disabled={loading}
        className="btn bg-blue-600 hover:bg-blue-700 text-white w-full"
      >
        {loading ? "Saving..." : "Save Job"}
      </button>
    </form>
  );
}

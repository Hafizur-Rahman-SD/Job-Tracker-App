import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, applied: 0, interview: 0, offer: 0, rejected: 0 });

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const fetchStats = async () => {
    const { data } = await supabase.from("jobs").select("status").eq("user_id", user.id);
    if (!data) return;
    const total = data.length;
    const applied = data.filter((j) => j.status === "Applied").length;
    const interview = data.filter((j) => j.status === "Interview").length;
    const offer = data.filter((j) => j.status === "Offer").length;
    const rejected = data.filter((j) => j.status === "Rejected").length;
    setStats({ total, applied, interview, offer, rejected });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card label="Total" value={stats.total} color="bg-gray-900" />
        <Card label="Applied" value={stats.applied} color="bg-blue-600" />
        <Card label="Interview" value={stats.interview} color="bg-yellow-500" />
        <Card label="Offer" value={stats.offer} color="bg-green-600" />
        <Card label="Rejected" value={stats.rejected} color="bg-red-600" />
      </div>
    </div>
  );
}

function Card({ label, value, color }) {
  return (
    <div className={`rounded-2xl p-4 text-center text-white font-bold shadow ${color}`}>
      <div className="text-3xl">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

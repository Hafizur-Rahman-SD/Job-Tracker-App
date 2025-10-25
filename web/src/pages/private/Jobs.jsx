import JobForm from "../../components/JobForm";
import JobList from "../../components/JobList";
import { useState } from "react";

export default function Jobs() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>
      <JobForm onJobAdded={() => setRefresh(!refresh)} />
      <JobList refresh={refresh} />
    </div>
  );
}

import Navbar from "../components/Navbar";
import JobForm from "../components/JobForm";
import JobList from "../components/JobList";
import { useState } from "react";

export default function Jobs() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <Navbar />
      <JobForm onJobAdded={() => setRefresh(!refresh)} />
      <JobList refresh={refresh} />
    </div>
  );
}

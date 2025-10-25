import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 md:p-16 bg-gray-50">
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Track your job applications easily 🚀
        </h1>
        <p className="text-gray-600 text-lg">
          For storing your data & tracking everything — please Login or Sign Up.
        </p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700">
            Get Started
          </Link>
          <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700">
            Login
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img src="https://illustrations.popsy.co/green/data-flow.svg" alt="Job Tracker" className="rounded-lg shadow-lg"/>
      </div>
    </div>
  );
}

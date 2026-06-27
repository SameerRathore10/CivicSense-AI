import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));

        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((report) => report.userEmail === auth.currentUser?.email);

        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      {" "}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-lg"
        >
          🏠 Home{" "}
        </button>{" "}
      </div>
      <h1 className="text-5xl font-bold text-white mb-8">My Reports</h1>
      <p className="text-slate-400 mb-8">
        Logged in as: {auth.currentUser?.email}
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
          >
            <img
              src={report.imageUrl}
              alt={report.issueType}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-white">
                {report.issueType}
              </h2>

              <p className="text-red-400 mt-2">{report.severity}</p>

              <p className="text-slate-300 mt-2">{report.department}</p>

              <p className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    report.status === "Resolved"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {report.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;

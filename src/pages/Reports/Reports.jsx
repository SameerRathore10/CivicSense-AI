import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reports"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-10">
      <h1 className="text-5xl font-bold text-white mb-8">Community Reports</h1>

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

              <p className="mt-2">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                  {report.status || "Pending"}
                </span>
              </p>

              <p className="text-slate-300 mt-2">{report.department}</p>
              <p className="text-slate-400 text-sm mt-2">
                Reported by: {report.userEmail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { logoutUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    highSeverity: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reports"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);

      setStats({
        total: data.length,
        pending: data.filter((report) => report.status !== "Resolved").length,
        resolved: data.filter((report) => report.status === "Resolved").length,
        highSeverity: data.filter(
          (report) => report.severity?.toLowerCase() === "high"
        ).length,
      });
    });

    return () => unsubscribe();
  }, []);

  const filteredReports = reports.filter((report) => {
    const query = search.toLowerCase();

    return (
      report.issueType?.toLowerCase().includes(query) ||
      report.department?.toLowerCase().includes(query) ||
      report.userEmail?.toLowerCase().includes(query)
    );
  });

  const handleLogout = async () => {
    try {
      await logoutUser();

      alert("✅ Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("❌ Logout failed");
    }
  };

  const markResolved = async (id) => {
    try {
      await updateDoc(doc(db, "reports", id), {
        status: "Resolved",
      });

      alert("✅ Report marked as resolved");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update status");
    }
  };

  const deleteReport = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this report?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "reports", id));

      alert("🗑️ Report deleted successfully");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete report");
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 pt-28 p-10">
      {" "}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-8">
        {" "}
        <h1 className="text-3xl md:text-5xl font-bold text-stone-100">
          Admin Dashboard{" "}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search by issue, department or reporter email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl bg-stone-900 border border-stone-800 text-stone-100 px-4 py-3 rounded-xl outline-none focus:border-green-500"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-stone-900 p-6 rounded-2xl">
          <h3 className="text-stone-400">Total Reports</h3>
          <p className="text-3xl font-bold text-stone-100">{stats.total}</p>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl">
          <h3 className="text-stone-400">Pending</h3>
          <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl">
          <h3 className="text-stone-400">Resolved</h3>
          <p className="text-3xl font-bold text-green-400">{stats.resolved}</p>
        </div>

        <div className="bg-stone-900 p-6 rounded-2xl">
          <h3 className="text-stone-400">High Severity</h3>
          <p className="text-3xl font-bold text-red-400">
            {stats.highSeverity}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            key={report.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-green-500 hover:shadow-lg transition duration-300"
          >
            <img
              src={report.imageUrl}
              alt={report.issueType}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-bold text-stone-100">
                {report.issueType}
              </h2>

              <p className="text-red-400 mt-2">{report.severity}</p>

              <p className="text-stone-300 mt-2">{report.department}</p>

              <p className="text-stone-400 text-sm mt-2">
                Reported by: {report.userEmail}
              </p>

              <p className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    report.status === "Resolved"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {report.status || "Pending"}
                </span>
              </p>

              <div className="mt-3 bg-stone-800/50 p-3 rounded-lg">
                <p className="text-stone-300 text-sm font-semibold mb-1">
                  Verifications:{" "}
                  <span className="text-green-400">
                    {report.verifiedBy?.length || 0}
                  </span>
                </p>
                {report.verifiedBy?.length > 0 && (
                  <ul className="text-stone-400 text-xs list-disc list-inside mt-1 max-h-20 overflow-y-auto">
                    {report.verifiedBy.map((email, i) => (
                      <li key={i}>{email}</li>
                    ))}
                  </ul>
                )}
              </div>

              {report.latitude && report.longitude && (
                <a
                  href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-3 mb-3 bg-blue-600 hover:bg-blue-700 text-center text-white py-2 rounded-lg"
                >
                  📍 View Location
                </a>
              )}

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => markResolved(report.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                >
                  Resolve
                </button>

                <button
                  onClick={() => deleteReport(report.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredReports.length === 0 && (
          <div className="col-span-full text-center text-stone-400 py-10">
            No matching reports found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

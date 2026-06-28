import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-stone-950 pt-28 p-10">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-stone-100 mb-8"
      >
        My Reports
      </motion.h1>
      <p className="text-stone-400 mb-8">
        Logged in as: {auth.currentUser?.email}
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;

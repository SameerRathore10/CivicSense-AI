import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-stone-950 pt-28 px-6 md:px-10 pb-10">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-bold text-stone-100 mb-8"
      >
        Community Reports
      </motion.h1>

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

              <p className="mt-2">
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                  {report.status || "Pending"}
                </span>
              </p>

              <p className="text-stone-300 mt-2">{report.department}</p>
              <p className="text-stone-400 text-sm mt-2">
                Reported by: {report.userEmail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reports;

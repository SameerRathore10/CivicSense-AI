import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { db, auth } from "../../firebase/firebase";
import { toast } from "sonner";

import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const [reports, setReports] = useState([]);

  const handleVerify = async (reportId) => {
    if (!auth.currentUser) {
      toast.error("Please login to verify issues.");
      return;
    }

    try {
      const reportRef = doc(db, "reports", reportId);
      await updateDoc(reportRef, {
        verifiedBy: arrayUnion(auth.currentUser.email),
      });

      // Update local state to reflect the new verification instantly
      setReports((prevReports) =>
        prevReports.map((report) => {
          if (report.id === reportId) {
            const verifiedBy = report.verifiedBy || [];
            if (!verifiedBy.includes(auth.currentUser.email)) {
              return {
                ...report,
                verifiedBy: [...verifiedBy, auth.currentUser.email],
              };
            }
          }
          return report;
        })
      );

      toast.success("Issue verified successfully!");
    } catch (error) {
      console.error("Error verifying issue:", error);
      toast.error("Failed to verify issue. Please try again.");
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reports"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const reportsWithLocation = data.filter(
          (report) => report.latitude && report.longitude
        );

        setReports(reportsWithLocation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 pt-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-stone-100 text-center mb-8 mt-10">
          🗺️ Civic Issues Map
        </h1>
        <MapContainer
          center={[26.9124, 75.7873]}
          zoom={12}
          style={{ height: "85vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {reports.map((report) => (
            <Marker
              key={report.id}
              position={[report.latitude, report.longitude]}
            >
              <Popup>
                <div style={{ minWidth: "200px" }}>
                  {report.imageUrl && (
                    <img
                      src={report.imageUrl}
                      alt={report.issueType}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginBottom: "8px",
                      }}
                    />
                  )}
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
                    <b>{report.issueType}</b>
                  </h3>

                  <p style={{ margin: "4px 0" }}>
                    <b>Severity:</b> {report.severity}
                  </p>

                  <p style={{ margin: "4px 0" }}>
                    <b>Department:</b> {report.department}
                  </p>

                  <p style={{ margin: "4px 0" }}>
                    <b>Status:</b> {report.status}
                  </p>

                  <p style={{ margin: "4px 0" }}>
                    <b>Reporter:</b> {report.userEmail}
                  </p>

                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#16a34a",
                      }}
                    >
                      {report.verifiedBy?.length || 0} Verifications
                    </span>

                    <button
                      onClick={() => handleVerify(report.id)}
                      disabled={report.verifiedBy?.includes(
                        auth.currentUser?.email
                      )}
                      style={{
                        backgroundColor: report.verifiedBy?.includes(
                          auth.currentUser?.email
                        )
                          ? "#ccc"
                          : "#16a34a",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: report.verifiedBy?.includes(
                          auth.currentUser?.email
                        )
                          ? "not-allowed"
                          : "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      {report.verifiedBy?.includes(auth.currentUser?.email)
                        ? "Verified"
                        : "Verify Issue"}
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default MapPage;

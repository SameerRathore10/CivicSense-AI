import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { db } from "../../firebase/firebase";

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
                <div>
                  <h3>
                    <b>{report.issueType}</b>
                  </h3>

                  <p>
                    <b>Severity:</b> {report.severity}
                  </p>

                  <p>
                    <b>Department:</b> {report.department}
                  </p>

                  <p>
                    <b>Status:</b> {report.status}
                  </p>

                  <p>
                    <b>Reporter:</b> {report.userEmail}
                  </p>
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

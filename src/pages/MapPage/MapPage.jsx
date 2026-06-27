import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reports"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const reportsWithLocation = data.filter(
          (report) => report.latitude && report.longitude,
        );

        setReports(reportsWithLocation);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {" "}
      <div className="fixed top-4 right-4 z-[1000]">
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl shadow-lg"
        >
          🏠 Home{" "}
        </button>{" "}
      </div>
      <h1 className="text-4xl font-bold text-white text-center py-6">
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
    </div>
  );
};

export default MapPage;

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const SubmitReport = ({ analysis, imageUrl, location }) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!analysis || !imageUrl || !location) {
      alert("Please upload an image first.");
      return;
    }

    try {
      console.log("🚀 Button clicked");
      console.log("🔥 Trying Firestore");

      const docRef = await addDoc(collection(db, "reports"), {
        userEmail: auth.currentUser?.email || "Unknown User",

        issueType: analysis.issueType,
        severity: analysis.severity,
        department: analysis.department,
        description: analysis.description,
        imageUrl,

        latitude: location.lat,
        longitude: location.lng,

        status: "Pending",
        createdAt: serverTimestamp(),
      });

      console.log("✅ Saved:", docRef.id);

      alert("✅ Report submitted successfully!");

      navigate("/");
    } catch (error) {
      console.error("❌ Firestore Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-bold py-4 rounded-xl"
    >
      🚀 Submit Report{" "}
    </button>
  );
};

export default SubmitReport;

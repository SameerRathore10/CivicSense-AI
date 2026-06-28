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
      className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 text-white font-bold py-4 rounded-xl text-lg"
    >
      🚀 Submit Report{" "}
    </button>
  );
};

export default SubmitReport;

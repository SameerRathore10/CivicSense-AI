import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import { uploadImageToCloudinary } from "../../services/cloudinary";
import { analyzeIssue } from "../../services/gemini";

const ImageUpload = ({ setAnalysis, setImageUrl }) => {
  const [preview, setPreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      const url = await uploadImageToCloudinary(file);

      setUploadedImageUrl(url);
      setImageUrl(url);

      console.log("Cloudinary URL:", url);

      const result = await analyzeIssue(file);

      console.log("Gemini Result:", result);

      if (!result) {
        alert("❌ AI analysis failed. Please try again.");
        return;
      }

      try {
        const cleaned = result
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(cleaned);

        setAnalysis(parsed);
      } catch (err) {
        console.error("JSON Parse Error:", err);
        alert("❌ Gemini returned invalid JSON.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("❌ Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      {" "}
      <h2 className="text-2xl font-bold text-white mb-6">
        Upload Issue Image{" "}
      </h2>
      ```
      <label className="border-2 border-dashed border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
        <FaCloudUploadAlt size={60} className="text-indigo-500 mb-4" />

        <p className="text-slate-300">Click to upload an image</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
        />
      </label>
      {uploading && (
        <p className="mt-4 text-indigo-400">Uploading & Analyzing...</p>
      )}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-6 rounded-xl w-full max-h-96 object-cover"
        />
      )}
      {uploadedImageUrl && (
        <div className="mt-4 p-3 rounded-lg bg-slate-800">
          <p className="text-green-400 text-sm">✅ Uploaded Successfully</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

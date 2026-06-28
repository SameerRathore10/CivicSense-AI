import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

import { uploadImageToCloudinary } from "../../services/cloudinary";
import { analyzeIssue } from "../../services/gemini";

const ImageUpload = ({ setAnalysis, setImageUrl }) => {
  const [preview, setPreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setIsModalOpen(false);

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
    <div className="bg-stone-900/50 backdrop-blur border border-green-900/50 rounded-2xl p-8 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-stone-100 mb-6">
        Upload Issue Image
      </h2>

      {/* Main Upload Trigger */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="flex-1 border-2 border-dashed border-stone-700 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition min-h-[200px]"
      >
        <FaCloudUploadAlt
          size={60}
          className="text-green-500 mb-4"
        />
        <p className="text-stone-300 font-medium text-lg">
          Upload Image
        </p>
        <p className="text-stone-500 text-sm mt-2">
          Click to choose from gallery or take a photo
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-green-900/50 rounded-2xl p-6 w-full max-w-sm relative shadow-2xl">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white transition"
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold text-stone-100 mb-6 text-center">Select Image Source</h3>
            
            <div className="flex flex-col gap-4">
              {/* Camera Upload */}
              <label className="bg-stone-800 border border-stone-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-stone-700 transition">
                <div className="bg-green-500/20 p-3 rounded-lg text-green-400 text-xl">
                  📷
                </div>
                <span className="text-stone-200 font-medium text-lg">Take Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>

              {/* Gallery Upload */}
              <label className="bg-stone-800 border border-stone-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-stone-700 transition">
                <div className="bg-green-500/20 p-3 rounded-lg text-green-400 text-xl">
                  🖼️
                </div>
                <span className="text-stone-200 font-medium text-lg">From Gallery</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {uploading && (
        <p className="mt-4 text-green-400">
          Uploading & Analyzing...
        </p>
      )}

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="mt-6 rounded-xl w-full max-h-96 object-cover"
        />
      )}

      {uploadedImageUrl && (
        <div className="mt-4 p-3 rounded-lg bg-stone-800 border border-green-900/50">
          <p className="text-green-400 text-sm">
            ✅ Uploaded Successfully
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
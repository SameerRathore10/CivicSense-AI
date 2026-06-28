import { useState } from "react";
import { motion } from "framer-motion";

import ImageUpload from "../../components/report/ImageUpload";
import AIResultCard from "../../components/report/AIResultCard";
import LocationPicker from "../../components/report/LocationPicker";
import SubmitReport from "../../components/report/SubmitReport";

const ReportIssue = () => {
  const [analysis, setAnalysis] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState(null);

  return (
    <div className="min-h-screen bg-stone-950 pt-28 pb-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-stone-100 mb-3">
          Report Community Issue
        </h1>

        <p className="text-stone-400 mb-10">
          Upload an image and let Gemini AI analyze the issue.
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          <ImageUpload setAnalysis={setAnalysis} setImageUrl={setImageUrl} />

          <div className="space-y-8">
            <AIResultCard analysis={analysis} />

            <LocationPicker setLocation={setLocation} />

            <SubmitReport
              analysis={analysis}
              imageUrl={imageUrl}
              location={location}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportIssue;

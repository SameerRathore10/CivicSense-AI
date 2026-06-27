import { useState } from "react";

import ImageUpload from "../../components/report/ImageUpload";
import AIResultCard from "../../components/report/AIResultCard";
import LocationPicker from "../../components/report/LocationPicker";
import SubmitReport from "../../components/report/SubmitReport";

const ReportIssue = () => {
  const [analysis, setAnalysis] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-3">
          Report Community Issue
        </h1>

        <p className="text-slate-400 mb-10">
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
      </div>
    </div>
  );
};

export default ReportIssue;

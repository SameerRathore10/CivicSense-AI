const AIResultCard = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">🤖 AI Analysis</h2>

        <p className="text-slate-400">
          Upload an image to generate AI analysis.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">🤖 AI Analysis</h2>

      <div className="space-y-4">
        <div>
          <p className="text-slate-400 text-sm">Issue Type</p>

          <h3 className="text-white font-semibold">{analysis.issueType}</h3>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Severity</p>

          <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
            {analysis.severity}
          </span>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Priority</p>

          <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
            {analysis.priority}
          </span>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Confidence</p>

          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
            {analysis.confidence}
          </span>
        </div>

        <div>
          <p className="text-slate-400 text-sm">Department</p>

          <h3 className="text-white">{analysis.department}</h3>
        </div>

        <div>
          <p className="text-slate-400 text-sm">AI Description</p>

          <p className="text-slate-300">{analysis.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AIResultCard;

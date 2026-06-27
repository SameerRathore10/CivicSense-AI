import {
  FaRobot,
  FaMapMarkedAlt,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={40} />,
    title: "AI Issue Detection",
    description:
      "Upload an image and let Gemini AI identify the problem, categorize it, and estimate its severity.",
  },
  {
    icon: <FaMapMarkedAlt size={40} />,
    title: "Smart Geo Location",
    description:
      "Pin the issue on an interactive map so nearby citizens and authorities can quickly locate it.",
  },
  {
    icon: <FaUsers size={40} />,
    title: "Community Verification",
    description:
      "Citizens can confirm reports, increasing transparency and reducing duplicate complaints.",
  },
  {
    icon: <FaChartLine size={40} />,
    title: "Live Analytics",
    description:
      "Track issue status, resolution time, and community impact through interactive dashboards.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-slate-900 py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Powerful Features
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            CivicSense AI combines Artificial Intelligence, Maps,
            and Community Collaboration to solve hyperlocal problems
            faster and more efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-8 hover:scale-105 transition duration-300"
            >
              <div className="text-indigo-400 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
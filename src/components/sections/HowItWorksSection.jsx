import { FaCamera, FaRobot, FaUsers, FaCheckCircle } from "react-icons/fa";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";

const steps = [
  {
    icon: <FaCamera size={35} />,
    title: "Upload Image",
    description: "Capture or upload a photo of the civic issue.",
  },
  {
    icon: <FaRobot size={35} />,
    title: "AI Analysis",
    description: "Gemini AI identifies the issue and estimates its severity.",
  },
  {
    icon: <FaUsers size={35} />,
    title: "Community Verification",
    description: "Nearby citizens verify the issue for transparency.",
  },
  {
    icon: <FaCheckCircle size={35} />,
    title: "Authority Action",
    description: "The complaint is forwarded for resolution and tracked.",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="bg-slate-950 py-24"
    >
      <Container>
        <SectionTitle
          title="How CivicSense AI Works"
          subtitle="A simple AI-powered workflow to report and resolve community issues."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-indigo-500 transition"
            >
              <div className="text-indigo-400 mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>

              <p className="text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
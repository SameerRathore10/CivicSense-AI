import { motion } from "framer-motion";
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
      className="bg-stone-950 py-24"
    >
      <Container>
        <SectionTitle
          title="How CivicSense AI Works"
          subtitle="A simple AI-powered workflow to report and resolve community issues."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="bg-stone-900 rounded-2xl p-8 border border-stone-800 hover:border-green-500 hover:shadow-lg hover:shadow-green-900/20 transition duration-300"
            >
              <div className="text-orange-500 mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold text-stone-100 mb-3">
                {step.title}
              </h3>

              <p className="text-stone-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
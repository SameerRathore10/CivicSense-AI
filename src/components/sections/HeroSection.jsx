import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase/firebase";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Container from "../ui/Container";

const HeroSection = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleReportIssue = () => {
    if (user) {
      navigate("/report");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center">
      <div className="absolute top-32 left-20 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <Container className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge>🚀 Google Developer Hackathon 2026</Badge>

          <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight text-white">
            Transform
            <br />
            Community Problems
            <span className="block text-indigo-500">
              Into AI Solutions
            </span>
          </h1>

          <p className="mt-8 text-lg text-slate-400 leading-8">
            Report potholes, garbage, water leaks, broken streetlights and
            public issues using AI-powered image analysis, smart categorization
            and community verification.
          </p>

          <div className="flex flex-wrap gap-5 mt-10">
            <Button onClick={handleReportIssue}>
              🚨 Report Issue
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/map")}
            >
              🗺️ Explore Map
            </Button>

            {user && (
              <Button
                variant="secondary"
                onClick={() => navigate("/my-reports")}
              >
                📋 My Reports
              </Button>
            )}
          </div>

          <div className="flex gap-12 mt-14 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold text-white">
                500+
              </h2>

              <p className="text-slate-400">
                Issues Reported
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                95%
              </h2>

              <p className="text-slate-400">
                AI Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                24/7
              </h2>

              <p className="text-slate-400">
                Community Support
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative hidden lg:flex justify-center"
        >
          <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 blur-3xl opacity-30"></div>

          <div className="relative bg-slate-900 border border-slate-700 rounded-3xl p-8 w-[380px] shadow-2xl">
            <div className="bg-slate-800 rounded-xl p-5 mb-5">
              <p className="text-sm text-slate-400">
                AI Detected
              </p>

              <h3 className="text-white font-bold mt-2">
                Road Damage
              </h3>

              <div className="mt-3 h-3 rounded-full bg-slate-700 overflow-hidden">
                <div className="bg-indigo-500 h-full w-[92%]"></div>
              </div>

              <p className="text-indigo-400 mt-2">
                Severity 92%
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <p className="text-sm text-slate-400">
                Location
              </p>

              <h3 className="text-white mt-2 flex items-center gap-2">
                <FaMapMarkerAlt />
                Jaipur, Rajasthan
              </h3>

              <p className="text-emerald-400 mt-3">
                ✔ Community Verified
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;
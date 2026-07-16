import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { CinematicText } from "./CinematicText";
import { Metrics } from "./Metrics";
import { Technology } from "./Technology";
import { Architecture } from "./Architecture";
import { Footer } from "./Footer";

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <Hero entranceComplete={entranceComplete} />
      <CinematicText />
      <Metrics />
      <Technology />
      <Architecture />
      <Footer />
    </div>
  );
}

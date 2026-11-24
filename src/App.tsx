import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Background } from "./components/layout/Background";
import { BootIntro } from "./components/layout/BootIntro";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { useSpotlight } from "./hooks/useSpotlight";

function App() {
  const [booted, setBooted] = useState(false);
  const finishBoot = useCallback(() => setBooted(true), []);

  useSpotlight();

  return (
    <MotionConfig reducedMotion="user">
      <Background />
      <Navbar />
      <HomePage ready={booted} />
      <Footer />
      <AnimatePresence>{!booted && <BootIntro onDone={finishBoot} />}</AnimatePresence>
    </MotionConfig>
  );
}

export default App;

import { Suspense, lazy } from "react";
import HouseSection from "./components/HouseSection";
import Loading from "./components/Loading";

// Lazy load all components
const Conclusion = lazy(() => import("./components/Conclusion"));
const Cover = lazy(() => import("./components/Cover"));
const DiabetesMellitus = lazy(() => import("./components/DiabetesMellitus"));
const DiseasesIntroduction = lazy(() =>
  import("./components/DiseasesIntroduction")
);
const DoencasCerebrovasculares = lazy(() =>
  import("./components/DoencasCerebroVasculares")
);
const DoencasIsquemicasDoCoracao = lazy(() =>
  import("./components/DoencasIsquemicasDoCoracao")
);
const Footer = lazy(() => import("./components/Footer"));
const MortalidadeMaterna = lazy(() =>
  import("./components/MortalidadeMaterna")
);
const ScrollyCards = lazy(() => import("./components/ScrollyCards"));
const Text = lazy(() => import("./components/Text"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Cover />
      <Text />
      <ScrollyCards />
      <HouseSection />
      <DiseasesIntroduction />
      <DiabetesMellitus />
      <DoencasCerebrovasculares />
      <DoencasIsquemicasDoCoracao />
      <MortalidadeMaterna />
      <Conclusion />
      <Footer />
    </Suspense>
  );
}

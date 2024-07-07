import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watch from "./pages/Watch";

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/watch" element={<Watch />} />
    </RouterRoutes>
  );
};

export default Routes;

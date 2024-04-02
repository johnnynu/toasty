import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
};

export default Routes;

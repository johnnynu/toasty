import AppRoutes from "./routes";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;

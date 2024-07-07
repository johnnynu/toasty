import AppRoutes from "./routes";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {" "}
        {/* Adjust pt-16 as needed */}
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;

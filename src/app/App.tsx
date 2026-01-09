import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { HomePage } from "./pages/home";
import { ConvertPage } from "./pages/convert";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/convert" element={<ConvertPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

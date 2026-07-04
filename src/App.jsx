import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { InvitePage } from "./pages/InvitePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invite/:code" element={<InvitePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

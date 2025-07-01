import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./layout/Header";
import { NotFound } from "./routes/NotFound";
import { Login } from "./routes/Login";
import { Signup } from "./routes/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route index element={<div>Temp</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

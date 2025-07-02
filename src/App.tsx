import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "@/layout/Header";
import { NotFound } from "@/routes/NotFound";
import { Login } from "@/routes/Login";
import { Signup } from "@/routes/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Products } from "@/routes/Products";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 mt-4">
            <Routes>
              <Route index element={<div>Temp</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/products" element={<Products />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

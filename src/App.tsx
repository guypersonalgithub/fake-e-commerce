import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "@/layout/Header";
import { NotFound } from "@/routes/NotFound";
import { Login } from "@/routes/Login";
import { Signup } from "@/routes/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Products } from "@/routes/Products/Products";
import { Home } from "./routes/Home";
import { Cart } from "./routes/Cart";
import { AuthGuard } from "./components/AuthGuard";
import { Purchases } from "./routes/Purchases";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 mt-4">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/products"
                element={
                  <AuthGuard>
                    <Products />
                  </AuthGuard>
                }
              />
              <Route
                path="/cart"
                element={
                  <AuthGuard>
                    <Cart />
                  </AuthGuard>
                }
              />
              <Route
                path="/purchases"
                element={
                  <AuthGuard>
                    <Purchases />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

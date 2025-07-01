import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<div>Temp</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


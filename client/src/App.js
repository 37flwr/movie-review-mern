import { Route, Routes } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import { publicRoutes } from "./routes/publicRoutes";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {publicRoutes.map(({ path, component: Component }) => (
          <Route path={path} element={Component} />
        ))}
      </Routes>
    </>
  );
}

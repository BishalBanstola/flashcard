import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./infrastructure/navigation/navigation";
import { Home } from "./pages/home/home.pages";
import { Progress } from "./pages/progress/progress.pages";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="progress" element={<Progress />} replace={true} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

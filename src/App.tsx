import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Goods from "./components/goods/Goods";
import Login from "./components/auth/Login";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/goods"
            element={
              <RequireAuth>
                <Goods />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

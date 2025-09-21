import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home                             from "./pages/home"
import Info                             from "./pages/info";
import Layout                           from "./components/layout";
import NoMatch                          from "./pages/404";
import Settings                         from "./pages/settings";
import { DBProvider }                   from "./context/dbContext";

function App() {
  return (
    <BrowserRouter>
      <DBProvider>
        <Layout>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/info"     element={<Info />} />
            <Route path="/settings" element={<Settings />} />

            <Route path="*"         element={<NoMatch />} />
          </Routes>
        </Layout>
      </DBProvider>
    </BrowserRouter>
  );
}

export default App

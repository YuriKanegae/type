import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home                             from "./pages/home"
import InfoPage                         from "./pages/info";
import Files                            from "./pages/files";
import Layout                           from "./components/layout";
import NoMatch                          from "./pages/404";
import { DBProvider }                   from "./context/dbContext";

function App() {
  return (
    <BrowserRouter>
      <DBProvider>
        <Layout>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/info"     element={<InfoPage />} />
            <Route path="/files"    element={<Files />} />

            <Route path="*"         element={<NoMatch />} />
          </Routes>
        </Layout>
      </DBProvider>
    </BrowserRouter>
  );
}

export default App

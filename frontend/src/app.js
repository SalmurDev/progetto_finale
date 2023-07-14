import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import CreateCard from "./pages/createCard";
import Cards from "./pages/cards";
import LoginRegister from "./pages/loginRegister";
import NoPage from "./pages/noPage";
import StagingArea from "./pages/stagingArea";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateCard />} />
          <Route path="cards" element={<Cards />} />
            <Route path="cards/humans" element={<Cards region={'humans'}/>} />
            <Route path="cards/elfs" element={<Cards region={'elfs'}/>} />
            <Route path="cards/dwarves" element={<Cards region={'dwarves'}/>} />
            <Route path="cards/deamons" element={<Cards region={'deamons'}/>} />
          <Route path="staging-area" element={<StagingArea />} />
          <Route path="login-register" element={<LoginRegister />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

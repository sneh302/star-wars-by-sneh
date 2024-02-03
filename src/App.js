import "./App.css";
import Home from "./Home";
import Person from "./Person";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/person/:id" element={<Person />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

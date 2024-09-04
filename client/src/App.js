import './App.css';
import Layout from './Components/Layout';
import Home from './Components/Home';
import Login from "./Components/Login";
import Dom from './Components/Dom';
import Climate from './Components/Climate';
import Garden from './Components/Garden';
import Security from './Components/Security';
import Missing from './Components/Missing';
import RequireAuth from "./Components/RequireAuth";

import {Routes, Route} from "react-router-dom";

function App() {
  return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />


                <Route element={<RequireAuth />}>
                    <Route path="dom" element={<Dom />} />
                    <Route path="climate" element={<Climate />} />
                    <Route path="garden" element={<Garden />} />
                    <Route path="security" element={<Security />} />
                    <Route path="*" element={<Missing />} />
                </Route>

            </Route>
        </Routes>
  );
}

export default App;

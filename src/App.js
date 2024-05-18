import { Routes, Route } from "react-router-dom";
import "./components/category-item/category-item.style.scss";
import "./categories.style.scss";
import Home from "./routes/home/home.component";
import Navigation from "./navigation/navigation.component";
import SignIn from './sign-in/sign-in.component'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* <Route path="shop" element={<Shop />} /> */}
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;

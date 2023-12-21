import { Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import Category from "./component/categoryItem/Category";
import Header from "./component/Header/Header";
import ProductDetail from "./component/product/Product";
import SepetSayfasi from "./component/sepet/SepetSayfasi";
import LoadingWeb from "./component/loading/Loading";

function App() {
  return (
    <div className="App">
   
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/:name/:id" element={<ProductDetail />} />
        <Route path="/sepet" element={<SepetSayfasi/>}/>
      </Routes>
    </div>
  );
}

export default App;
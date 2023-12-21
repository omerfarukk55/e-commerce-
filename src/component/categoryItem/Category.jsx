import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./categoryItem.css";
import { useDispatch, useSelector } from "react-redux";
import { setProductId } from "../../redux/ObserverComputer";
import SearchBox from "../search-box/Search-box";

const Category = () => {
  const [data, setData] = useState([]);
  const { id, name: categoryName } = useParams();
  const [selectedProduct, setSelectedProduct] = useState({ id: null, name: null, categoryName: null });
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`/api/category_details/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("products", JSON.stringify(data));
    }
  }, [data]);

  const storedProducts = JSON.parse(localStorage.getItem("products"));

  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.action.currentCategory);

  const handleAddToCart = (productId, productName, productCategory) => {
    const newItem = { id: productId, name: productName, categoryName: productCategory };
    setCart([...cart, newItem]);
  };

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="content">
      <SearchBox setSearchTerm={setSearchTerm} />

      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map((p) => (
          <Fragment key={p.id}>
            <Link
              style={{ textDecoration: "none", width: "30%", height: "30%" }}
              onClick={() => dispatch(setProductId(p.id))}
              to={`/${currentCategory}/${p.id}`}
            >
              <div className="cart-item-container" style={{ paddingBottom: "20px" }}>
                <img src={p.image_url} alt={p.name} />
                <div className="item-details">
                  <strong className="name">{p.name}</strong>
                  <div className="price">{p.price} tl</div>
                </div>
                <button className="button" onClick={() => handleAddToCart(p.id, p.name, currentCategory)}>
                  SEPETE EKLE
                </button>
              </div>
            </Link>
          </Fragment>
        ))
      ) : (
        <div>No data available</div>
      )}

      {Array.isArray(storedProducts) && storedProducts.length > 0 ? (
        storedProducts.map((p) => (
          <Fragment key={p.id}>
            <Link
              style={{ textDecoration: "none", width: "30%", height: "30%" }}
              onClick={() => dispatch(setProductId(p.id))}
              to={`/${currentCategory}/${p.id}`}
            >
              <div className="cart-item-container" style={{ paddingBottom: "20px" }}>
                <img src={p.image_url} alt={p.name} />
                <div className="item-details">
                  <strong className="name">{p.name}</strong>
                  <div className="price">{p.price} tl</div>
                </div>
                <button className="button" onClick={() => handleAddToCart(p.id, p.name, currentCategory)}>
                  SEPETE EKLE
                </button>
              </div>
            </Link>
          </Fragment>
        ))
      ) : (
        <div>No stored data available</div>
      )}
    </div>
  );
};

export default Category;
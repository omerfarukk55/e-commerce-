import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Product.css";
import { addProduct } from "../../redux/observeCart";
import AlertComponent from "./Alert";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const currentCategory = useSelector((state) => state.action.currentCategory);
  const productId = useSelector((state) => state.action.productId);
  const [productDetails, setProductDetails] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/api/product_details/${productId}`)
      .then((res) => res.json())
      .then((data) => setProductDetails(data))
      .catch((err) => console.log(err));

    fetch(`/api/${currentCategory}/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [currentCategory, productId]);

  const filterKeys = (keys) => {
    const filteredKeys = keys.slice(1, -1);
    return filteredKeys;
  };

  useEffect(() => {
    if (productDetails) {
      localStorage.setItem("productDetails", JSON.stringify(productDetails));
    }
    if (product) {
      localStorage.setItem("product", JSON.stringify(product));
    }
  }, [productDetails,product]);

  const storedProductDetails = JSON.parse(localStorage.getItem("productDetails"));
  const storedProduct = JSON.parse(localStorage.getItem("product"));

  return (
    <div>
      {productDetails ? (
        productDetails.map((p) => (
          <div className="cart-item-content" key={p.id}>
            <img src={p.image_url} alt={p.name} />
            <div className="selam">
              <div className="item-detail">
                <strong style={{ fontSize: "20px" }} className="namee">{p.name}</strong>
                <strong className="pricee">Fiyat {p.price} tl</strong>
                <button className="buttonn" onClick={() => dispatch(addProduct(p))}>SEPETE EKLE</button>
              </div>
              <div className="etribute">
                {product &&
                  product.map((item, index) => (
                    <div key={index} className="detail">
                      {filterKeys(Object.keys(item)).map((key) => (
                        <div key={key}>
                          <strong>{key} = </strong>
                          {item[key]}
                        </div>
                      ))}
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))
      ) : storedProductDetails ? (
        storedProductDetails.map((p)=>(
          <div className="cart-item-content" key={p.id}>
          <img src={p.image_url} alt={p.name} />
          <div className="selam">
          <div className="item-detail">
          <strong style={{ fontSize: "20px" }} className="namee">{p.name}</strong>
          <strong className="pricee">Fiyat {p.price} tl</strong>
          <button className="buttonn" onClick={() => dispatch(addProduct(p))}>SEPETE EKLE</button>
          </div>
          <div className="etribute">
          {storedProduct &&
            storedProduct.map((item, index) => (
              <div key={index} className="detail">
              {filterKeys(Object.keys(item)).map((key) => (
                <div key={key}>
                <strong>{key} = </strong>
                {item[key]}
                </div>
                ))}
                <hr />
                </div>
                ))}
                </div>
                </div>
                </div>
                ))
      ) : (
        <p>Ürün bulunamadı.</p>
      )}
      <AlertComponent />
    </div>
  );
};

export default ProductDetail;   

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sepet.style.css";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../redux/observeCart";
import AlertComponent from "../product/Alert";

const SepetSayfasi = () => {
  const cartSummary = useSelector((state) => state.cart.cartSummary);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (cartSummary && cartSummary.length > 0) {
      const totalPrice = cartSummary.reduce(
        (accumulator, currentItem) => accumulator + parseInt(currentItem.price),
        0
      );
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cartSummary]);

  
 
  useEffect(() => {
    if (cartSummary) {
      localStorage.setItem("productlar", JSON.stringify(cartSummary));
    }
  }, [cartSummary]);

  const storedProduct = JSON.parse(localStorage.getItem("productlar"));

  
  const handleContinueShopping = () => {
    navigate(-3);
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeProduct(itemId));
    const updatedStoredProduct = storedProduct.filter((item) => item.id !== itemId);
    localStorage.setItem("productDetails", JSON.stringify(storedProduct));
  };

  return (
    <div>
      {cartSummary && cartSummary.length > 0 ? (
        <div>
          <h2 className="baslık">Sepet İçeriği</h2>
          <div className="base">
            {cartSummary.map((item, index) => (
              <div key={index} className="urun">
                <img src={item.image_url} alt="" />
                <div className="item-name">{item.name}</div>
                <div style={{fontSize:"25px"}}>{parseInt(item.price)} TL</div>
                <span className="material-symbols-outlined" onClick={() => handleRemoveItem(item.id)}>
                  delete
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
        <h2 className="baslık">Sepet İçeriği</h2>
        <div className="base">
          {storedProduct.map((item, index) => (
            <div key={index} className="urun">
              <img src={item.image_url} alt="" />
              <div className="item-name">{item.name}</div>
              <div>{parseInt(item.price)} TL</div>
              <span className="material-symbols-outlined" onClick={() => handleRemoveItem(item.id)}>
                delete
              </span>
            </div>
          ))}
        </div>
      </div>
      )}
      <div className="tutar">
        <div className="price"> toplam tutar = {totalPrice} tl</div>
        <button className="back-btn" onClick={handleContinueShopping}>
          Alışverişe devam et
        </button>
      </div>
      <AlertComponent />
    </div>
  );
};

export default SepetSayfasi;
import logo from "./TEKNİK-BİLİŞİM.svg";
import lago from "./Shopping_Cart_clip_art_small.svg";
import "./Header.css" ;

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () =>{
    const sayac = useSelector((state) => state.cart.sayac);
    return (
        <div className="headerContex">
            <Link to="/">
                <img src={logo} className="img" alt="Logo" />
                
            </Link>
            <Link to="/sepet" style={{ textDecoration: 'none', color:"black"}}>
                <div className="sepet">
                    <h5 >Sepetiniz</h5>
                   
                    <img src={lago} height="110px" alt="Sepet" />
                    <div className="sayacı">{sayac}</div>
                </div>
            </Link>
        </div>
    );
}

export default Header;
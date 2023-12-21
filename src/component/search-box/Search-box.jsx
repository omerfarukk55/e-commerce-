import { useState } from "react";
import "./seach-box.css";

const SearchBox = ({ setSearchTerm }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setInputValue(searchTerm);
    setSearchTerm(searchTerm); // Ana bileşene arama terimini ilet
  };

  return (
   
    <div className="kayda">
    <input
    className="search-box"
    type="text"
    placeholder="Ürün İsmiyle Ara..."
    value={inputValue}
    onChange={handleChange}
    />
    </div>
   
    
  );
};

export default SearchBox;
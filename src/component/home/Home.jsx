
import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.style.css";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/ObserverComputer";

const Home = () => {
  const [categories, setCategories] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (categories) {
      localStorage.setItem("category", JSON.stringify(categories));
    }
  }, [categories]);

  const storedCategories = JSON.parse(localStorage.getItem("category"));

  return (
    <div>
      <div className="can">
        {categories ?
         ( categories.map((category) => (
            <div key={category.id} className="category-container">
              <img className="la" src={category.image_url} alt={category.description} />
              <div className="category-body-container">
                <Fragment>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => dispatch(setCategory(category.name))}
                    to={`/category/${category.id}`}
                  >
                    {category.description}
                  </Link>
                  <p style={{ textDecoration: "none" }}>İncele</p>
                </Fragment>
              </div>
            </div>
          )))
        
          :(storedCategories.map((category) => (
            <div key={category.id} className="category-container">
              <img className="la" src={category.image_url} alt={category.description} style={{ backgroundColor: "transparent" }} />
              <div className="category-body-container">
                <Fragment>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={() => dispatch(setCategory(category.name))}
                    to={`/category/${category.id}`}
                  >
                    {category.description}
                  </Link>
                  <p style={{ textDecoration: "none" }}>İncele</p>
                </Fragment>
              </div>
            </div>)))
          
        }
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
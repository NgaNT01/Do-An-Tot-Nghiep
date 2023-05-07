import { StyledCategoriesDesktop } from "./CategoryDesktop.styled";

import { useSelector } from "react-redux";

import CategoryDesktop from "./CategoryDesktop";
import {useEffect} from "react";

const CategoriesDesktop = ({ title, boldTitle }) => {
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    console.log(categories);
  }, [])

  return (
    <StyledCategoriesDesktop>
      <div className="categories-box">
        <h1>
          <span>{boldTitle}</span> {title}
        </h1>
        <div className="list">
          {categories.map((category, index) => {
            return <CategoryDesktop category={category} key={index} />;
          })}
        </div>
      </div>
    </StyledCategoriesDesktop>
  );
};

export default CategoriesDesktop;

import { StyledCategoriesDesktop } from "./CategoryDesktop.styled";

import {useDispatch, useSelector} from "react-redux";

import CategoryDesktop from "./CategoryDesktop";
import {useEffect} from "react";
import {getListCategories} from "../../../store/category";

const CategoriesDesktop = ({ title, boldTitle }) => {
  const {currentListCategories} = useSelector((state) => state.category);

  useEffect(() => {
  },[currentListCategories])

  return (
    <StyledCategoriesDesktop>
      <div className="categories-box">
        <h1>
          <span>{boldTitle}</span> {title}
        </h1>
        <div className="list">
          {currentListCategories.map((category, index) => {
            return <CategoryDesktop category={category} key={index} />;
          })}
        </div>
      </div>
    </StyledCategoriesDesktop>
  );
};

export default CategoriesDesktop;

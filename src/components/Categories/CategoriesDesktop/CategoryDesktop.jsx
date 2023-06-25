import { StyledCategoryDesktop } from "./CategoryDesktop.styled";

import { FaEllipsisV } from "react-icons/fa";
import {Link} from "react-router-dom";

const CategoryDesktop = ({ category }) => {
  let srcImage = "";
  if (category.name === "Games") srcImage = "images/categories/games.jpeg";
  else if (category.name === "Music") srcImage = "images/categories/music.jpeg";
  else if (category.name === "Sports") srcImage = "images/categories/sports.jpeg";
  else if (category.name === "Movie") srcImage = "images/categories/creative.jpeg";
  else if (category.name === "Dances") srcImage = "images/categories/dances.jpeg";
  else if (category.name === "Idols") srcImage = "images/categories/idols.jpeg";

  return (
    <StyledCategoryDesktop>
      <Link to={`/category/${category.name}`}>
        <div className="game-box">
          <div className="game-picture">
            <img style={{width: '280px',height: '186px'}} src={srcImage} alt="" />
          </div>
          <div className="game-name">
            <div className="name">{category.name}</div>
            {/*<div className="other-icon">*/}
            {/*  <FaEllipsisV />*/}
            {/*</div>*/}
          </div>
          {/*<div className="game-viewers">50 người xem</div>*/}
          {/*<div className="tags">*/}
          {/*  <div className="tag">Tiếng Việt</div>*/}
          {/*</div>*/}
        </div>
      </Link>
    </StyledCategoryDesktop>
  );
};

export default CategoryDesktop;

import { FC } from "react";
import { useNavigate } from "react-router-dom";

import {BackgroundImage, Body, DirectoryItemContainer} from "./directory-item.style"
import { DirectoryCategory } from "../directory/directory.component";

type DirectoryItemProp = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProp> = ({ category }) => {
  const { imageUrl, title, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route)

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage
        imageUrl={imageUrl}
      ></BackgroundImage>
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

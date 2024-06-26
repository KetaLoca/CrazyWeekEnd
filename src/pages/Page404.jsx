import React from "react";
import { Link } from "react-router-dom";

export function Page404() {
  return (
    <>
      <h1 className="titulo">La página web a la que quieres acceder no existe</h1>
      <img
        src="https://wallpapers-clan.com/wp-content/uploads/2024/03/nyan-cat-meme-gif-desktop-wallpaper-preview.gif"
        alt="NianCat volador para rellenar la pantalla"
      />
      <Link className="link" to="/home">Volver a la página de inicio</Link>
    </>
  );
}

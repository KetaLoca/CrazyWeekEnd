import "./Page404.css"
import React from "react";
import { Link } from "react-router-dom";

export function Page404() {
  return (
    <>
      <h1>La página no existe</h1>
      <img
        src="https://wallpapers-clan.com/wp-content/uploads/2024/03/nyan-cat-meme-gif-desktop-wallpaper-preview.gif"
        alt="NianCat volador para rellenar la pantalla"
      />
      <Link className="link" to="/auth">Ir a la página de inicio de sesión</Link>
    </>
  );
}

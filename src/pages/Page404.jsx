import React from "react";
import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 className="titulo">La ruta a la que quieres acceder no existe</h1>
      <img
        src="https://wallpapers-clan.com/wp-content/uploads/2024/03/nyan-cat-meme-gif-desktop-wallpaper-preview.gif"
        alt="NianCat volador para rellenar la pantalla"
      />
      <Link className="link" to="/home">Volver a la página de inicio</Link>
    </div>
  );
}

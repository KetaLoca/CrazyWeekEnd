import React from "react";
import { Auth } from "../components/Auth";
import  ImageCarousel  from "../components/ImageCarousel"

const imagenes = ["https://www.tuscasasrurales.com/img/605x/casas-rurales.jpg",
  "https://www.mapfretecuidamos.com/media/casa-rural-piedra.jpg",
  "https://www.escapadarural.com/blog/wp-content/uploads/2016/07/Castanar-de-Aracena-1-1024x684.jpg",
  "https://hips.hearstapps.com/elle-es/assets/17/16/1492586054-144620-el-castanar-de-aracena-1462370425-o.jpg"
]

export function AuthPage() {
  return (
    <>
      <Auth />
      <ImageCarousel images={imagenes} />
    </>
  );
}

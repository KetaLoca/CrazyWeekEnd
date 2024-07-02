import React from "react";
import { Alojamientos } from "../components/Alojamientos";
import { FiltrosAlojamientos } from "../components/FiltrosAlojamientos";

export function AlojamientosPage() {
  return (<div>
    <FiltrosAlojamientos />
    <Alojamientos />
  </div>)
}

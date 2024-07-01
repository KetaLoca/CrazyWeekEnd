import React from "react";
import { Auth } from "../components/Auth";
import { useFirestore } from "../hooks/useFirestore";

export function AuthPage() {
  const alojamientos = useFirestore();
  return (
    <>
      <Auth />
      {console.log(alojamientos)}
    </>
  );
}

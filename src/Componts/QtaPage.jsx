import React from "react";
import { useParams } from "react-router-dom";
import { sectors } from "./sectors";
import Qta from "./Qta";


export default function QtaPage() {
  const { section } = useParams();

  const sector = sectors.find((s) => s.id === section);

  if (!sector) {
    return <h2 style={{ textAlign: "center" }}>القطاع غير موجود</h2>;
  }

  return <Qta sector={sector} />;
}
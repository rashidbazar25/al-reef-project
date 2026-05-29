import { createBrowserRouter } from "react-router-dom";

import Home from "./Componts/Home";
import Layout from "./Componts/Layout";
import About from "./Componts/About";
import Programs from "./Componts/Programs";
import Wadi from "./Componts/Wadi";
import Anous from "./Componts/Anous";
import OurWorks from "./Componts/OurWorks";
import News from "./Componts/News";
import NewsDetail from "./Componts/NewsDetail";

import QtaPage from "./Componts/QtaPage";
import Reports from "./Componts/Reports";
import Gallery from "./Componts/Gallery";
import Videos from "./Componts/Videos"; // ✅ هذا الصحيح

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      { path: "about", element: <About /> },
      { path: "programs", element: <Programs /> },

      { path: "news", element: <News /> },
      { path: "news/:id", element: <NewsDetail /> },

      // media
      { path: "media/news", element: <News /> },
      { path: "media/reports", element: <Reports /> },
      { path: "media/gallery", element: <Gallery /> },
      { path: "media/videos", element: <Videos /> },

      // other pages
      { path: "wadi", element: <Wadi /> },
      { path: "anous", element: <Anous /> },
      { path: "ourwork", element: <OurWorks /> },

      // sectors
      { path: "qta/:section", element: <QtaPage /> },
    ],
  },
]);
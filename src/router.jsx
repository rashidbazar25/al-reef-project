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


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about" , element: <About /> },
      { path: "programs" , element: <Programs/> },
      { path: "news" , element: <News /> },
      { path: "wadi" , element: <Wadi /> },
      { path: "anous" , element: <Anous /> },
      { path: "ourwork" , element: <OurWorks /> },
      { path: "/news/:id" , element: <NewsDetail /> },
      
     
    ],
  },
]);
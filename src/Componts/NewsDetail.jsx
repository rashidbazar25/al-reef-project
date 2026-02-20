import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingDots from "./LoadingDots";

const NewsDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type"); // news / anous / wadi

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);

        let collectionName = "";
        if (type === "news") collectionName = "newsCollection";
        else if (type === "anous") collectionName = "anousCollection";
        else if (type === "wadi") collectionName = "wadiCollection";
        else collectionName = null;

        if (!collectionName) return;

        const query = `
        {
          ${collectionName}(where:{sys:{id:"${id}"}}) {
            items {
              sys { id }
              titel
              paragraf { json }
              date
              imges { url title description }
            }
          }
        }`;

        const response = await fetch(
          `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query }),
          }
        );

        const data = await response.json();
        setItem(data?.data?.[collectionName]?.items[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, type]);

  if (loading) return <LoadingDots />;
  if (!item) return <p>لم يتم العثور على تفاصيل الخبر.</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>{item.titel}</h1>
      <p>{new Date(item.date).toLocaleDateString()}</p>
      {item.imges?.url && (
        <img
          src={item.imges.url}
          alt={item.imges.title || item.titel}
          style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
        />
      )}
      <div>{documentToReactComponents(item.paragraf.json)}</div>
    </div>
  );
};

export default NewsDetails;
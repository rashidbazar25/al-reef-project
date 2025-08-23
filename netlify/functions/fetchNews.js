import fetch from "node-fetch";

export async function handler(event, context) {
  const SPACE_ID = process.env.VITE_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.VITE_CONTENTFUL_ACCESS_TOKEN;
  const ENVIRONMENT = process.env.VITE_CONTENTFUL_ENVIRONMENT;

  // يمكن تمرير query param ?id=xyz لجلب خبر واحد فقط
  const { id } = event.queryStringParameters || {};

  try {
    const query = id
      ? `{
          newsCollection(where: { sys: { id: "${id}" } }, limit: 1) {
            items {
              sys { id }
              titel
              paragraf { json }
              date
              imges { url title description }
            }
          }
        }`
      : `{
          newsCollection(limit: 5, order: date_DESC) {
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

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

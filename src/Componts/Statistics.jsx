import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography, Container } from "@mui/material";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Helmet } from "react-helmet";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [hasCounted, setHasCounted] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const SPACE_ID = import.meta.env.VITE_CONTENTFUL_STATS_SPACE_ID;
  const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_STATS_ACCESS_TOKEN;
  const ENVIRONMENT =
    import.meta.env.VITE_CONTENTFUL_STATS_ENVIRONMENT || "master";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              query: `
                {
                  statisticsCollection(limit: 1) {
                    items {
                      oman
                      baby
                      project
                      partner
                    }
                  }
                }
              `,
            }),
          }
        );

        const data = await response.json();

        console.log("GraphQL response:", data);

        const item = data?.data?.statisticsCollection?.items?.[0];

        if (!item) return;

        // تحويل البيانات إلى شكل مناسب للعرض
        const formattedStats = [
          { title: "شركاء النجاح", number: item.partner },
          { title: "المشاريع", number: item.project },
          { title: "طفل مستفيد", number: item.baby },
          { title: "امرأة مستفيدة", number: item.oman },
         
        ];

        setStats(formattedStats);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (inView) {
      setHasCounted(true);
    }
  }, [inView]);

  return (
    <>
      <Helmet>
        <title>مؤسسة بنت الريف</title>
        <meta
          name="description"
          content="تعرف على أرقام وإنجازات مؤسسة بنت الريف"
        />
      </Helmet>

      <Container sx={{ px: "20px !important" }}>
        <Box
          ref={ref}
          sx={{
            backgroundColor: "#f9f6f2",
            py: 8,
            px: 2,
            textAlign: "center",
          }}
        >
          <Grid
            container
            spacing={4}
            justifyContent="space-evenly"
            sx={{ flexDirection: { xs: "column", sm: "row-reverse" } }}
          >
            {stats.map((item, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    color: "#eeb60f",
                    textAlign: "center",
                    direction: "rtl",
                  }}
                >
                  {hasCounted ? (
                    <CountUp end={item.number} duration={2} />
                  ) : (
                    0
                  )}
                  +
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 1,
                    color: "#000",
                    fontWeight: "700",
                    textAlign: "center",
                    direction: "rtl",
                  }}
                >
                  {item.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ mt: 4, borderColor: "#d9d4c9" }} />
      </Container>
    </>
  );
};

export default Statistics;

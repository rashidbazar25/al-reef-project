import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_REPORTS_SPACE_ID;
const ENVIRONMENT = import.meta.env.VITE_CONTENTFUL_REPORTS_ENVIRONMENT;
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_REPORTS_ACCESS_TOKEN;

const Reports = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}/entries`,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );

        const data = await response.json();

        const item = data.items[0];

        const assetId = item.fields.report.sys.id;

        const asset = data.includes.Asset.find(
          (a) => a.sys.id === assetId
        );

        setReport({
          title: item.fields.titel,
          fileName: asset.fields.file.fileName,
          fileUrl: `https:${asset.fields.file.url}`,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        التقرير السنوي
      </Typography>

      {report && (
        <Card
          elevation={4}
          sx={{
            mt: 4,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <CardContent sx={{ py: 5 }}>
            <PictureAsPdfIcon
              sx={{
                fontSize: 90,
                color: "#d32f2f",
                mb: 2,
              }}
            />

            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              {report.title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              {report.fileName}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
             <Button
  variant="contained"
  startIcon={<VisibilityIcon />}
  href={report.fileUrl}
  target="_blank"
  sx={{
    gap: "8px",
  }}
>
  عرض التقرير
</Button>

         
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Reports;
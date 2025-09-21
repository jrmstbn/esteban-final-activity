import { Card, CardContent, Skeleton, Box } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Card
      elevation={4}
      sx={{
        width: 200,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton variant="rectangular" height={250} animation="wave" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" height={24} animation="wave" sx={{ mb: 1 }} />
        <Skeleton
          variant="text"
          width="60%"
          height={16}
          animation="wave"
          sx={{ mb: 0.5 }}
        />
        <Skeleton
          variant="text"
          width="45%"
          height={14}
          animation="wave"
          sx={{ mb: 1 }}
        />
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={80}
            height={24}
            animation="wave"
            sx={{ borderRadius: 12 }}
          />
          <Skeleton variant="text" width={40} height={16} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
}

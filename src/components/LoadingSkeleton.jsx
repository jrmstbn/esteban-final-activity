import { Card, CardContent, Skeleton } from "@mui/material";

export default function LoadingSkeleton() {
  return (
    <Card elevation={3}>
      <Skeleton variant="rectangular" height={250} animation="wave" />
      <CardContent>
        <Skeleton variant="text" height={30} animation="wave" />
        <Skeleton variant="text" width="60%" animation="wave" />
        <Skeleton
          variant="rectangular"
          height={20}
          width={100}
          animation="wave"
          sx={{ mt: 1 }}
        />
      </CardContent>
    </Card>
  );
}

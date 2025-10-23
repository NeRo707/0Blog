import { Card, CardContent, Typography } from "@mui/material";

interface StatsCardProps {
  label: string;
  value: string | number;
  trend?: string;
  icon?: string;
  gradient?: string;
}

export default function StatsCard({
  label,
  value,
  trend,
  icon,
}: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        {icon && (
          <Typography variant="h6" sx={{ mb: 1 }}>
            {icon}
          </Typography>
        )}
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
          {value}
        </Typography>
        {trend && (
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {trend}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

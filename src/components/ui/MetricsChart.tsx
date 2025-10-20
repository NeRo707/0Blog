import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';

interface MetricsChartProps {
  title: string;
  icon?: string;
  metrics: Array<{
    label: string;
    value: number;
    max?: number;
    color?: string;
  }>;
}

export default function MetricsChart({ title, icon, metrics }: MetricsChartProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          {icon && <span>{icon} </span>}
          {title}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {metrics.map((metric) => (
            <Box key={metric.label} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">{metric.label}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                  {metric.value}
                  {metric.max && `/${metric.max}`}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={metric.max ? (metric.value / metric.max) * 100 : metric.value}
                sx={{
                  backgroundColor: '#eee',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: metric.color || '#667eea',
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

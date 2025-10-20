import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material';
import { Link } from 'react-router';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export default function BlogCard({ id, title, excerpt, image, author, date, category, readTime }: BlogCardProps) {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
      }
    }}>
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 1, marginBottom: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={category} 
            size="small" 
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          />
          <Chip 
            label={readTime} 
            size="small" 
            variant="outlined"
          />
        </Box>
        
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {title}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {excerpt}
        </Typography>

        <Box sx={{ marginTop: 'auto' }}>
          <Typography variant="caption" color="textSecondary" sx={{ display: 'block', marginBottom: 1 }}>
            By {author} • {new Date(date).toLocaleDateString()}
          </Typography>
          <Button 
            component={Link}
            to={`/blogs/${id}`}
            variant="contained" 
            color="primary"
            sx={{ width: '100%' }}
          >
            Read More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

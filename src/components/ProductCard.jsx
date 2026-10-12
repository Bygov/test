import { Link } from 'react-router-dom';
import { Card, Rate, Space, Tag, Typography } from 'antd';
import FavoriteButton from './FavoriteButton.jsx';

export default function ProductCard({ product }) {
  return (
    <Card
      hoverable
      cover={
        <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: '100%', height: 200, objectFit: 'contain', background: '#fafafa' }}
          />
        </Link>
      }
      actions={[<FavoriteButton key="fav" product={product} />]}
    >
      <Card.Meta
        title={<Link to={`/product/${product.id}`}>{product.title}</Link>}
        description={
          <Space orientation="vertical" size={4}>
            {product.brand && <Tag>{product.brand}</Tag>}
            <Rate disabled allowHalf value={product.rating} style={{ fontSize: 14 }} />
            <Typography.Text strong>${product.price}</Typography.Text>
          </Space>
        }
      />
    </Card>
  );
}

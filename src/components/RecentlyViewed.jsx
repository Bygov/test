import { Link } from 'react-router-dom';
import { Button, Card, Space, Typography } from 'antd';
import { useRecentStore } from '../store/recentStore.js';

export default function RecentlyViewed() {
  const items = useRecentStore((s) => s.items);
  const clear = useRecentStore((s) => s.clear);
  if (!items.length) return null;

  return (
    <Card
      size="small"
      title="Недавно просмотренные"
      extra={<Button type="link" onClick={clear}>Очистить</Button>}
      style={{ marginTop: 32 }}
    >
      <Space size={16} style={{ overflowX: 'auto', width: '100%', paddingBottom: 4 }}>
        {items.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} style={{ width: 110, display: 'block' }}>
            <img src={p.thumbnail} alt={p.title} style={{ width: 110, height: 80, objectFit: 'contain' }} />
            <Typography.Text ellipsis style={{ display: 'block' }}>{p.title}</Typography.Text>
            <Typography.Text type="secondary">${p.price}</Typography.Text>
          </Link>
        ))}
      </Space>
    </Card>
  );
}

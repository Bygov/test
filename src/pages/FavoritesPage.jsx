import { Link } from 'react-router-dom';
import { Button, Space, Typography } from 'antd';
import ProductGrid from '../components/ProductGrid.jsx';
import { useFavoritesStore } from '../store/favoritesStore.js';

export default function FavoritesPage() {
  const items = useFavoritesStore((s) => s.items);
  const clear = useFavoritesStore((s) => s.clear);

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography.Title level={2} style={{ margin: 0 }}>Избранное</Typography.Title>
        {items.length > 0 && <Button onClick={clear}>Очистить</Button>}
      </Space>

      <ProductGrid
        products={items}
        emptyText={<>Здесь пока пусто. <Link to="/">Перейти в каталог</Link></>}
      />
    </Space>
  );
}

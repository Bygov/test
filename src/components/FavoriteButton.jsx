import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useFavoritesStore } from '../store/favoritesStore.js';

export default function FavoriteButton({ product, withText = false }) {
  const active = useFavoritesStore((s) => s.items.some((i) => i.id === product.id));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <Button
      type={active ? 'primary' : 'default'}
      danger={active}
      icon={active ? <HeartFilled /> : <HeartOutlined />}
      onClick={() => toggle(product)}
      aria-label={active ? 'Убрать из избранного' : 'В избранное'}
    >
      {withText && (active ? 'В избранном' : 'В избранное')}
    </Button>
  );
}

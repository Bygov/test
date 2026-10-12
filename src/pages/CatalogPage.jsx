import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Input, Pagination, Select, Space, Typography } from 'antd';
import { fetchProducts, PAGE_SIZE, SORT_FIELDS } from '../api/products.js';
import ProductGrid from '../components/ProductGrid.jsx';

export async function catalogLoader({ request }) {
  const sp = new URL(request.url).searchParams;
  const q = sp.get('q')?.trim() ?? '';
  const sortBy = SORT_FIELDS.includes(sp.get('sortBy')) ? sp.get('sortBy') : '';
  const order = sp.get('order') === 'desc' ? 'desc' : 'asc';
  const page = Math.max(1, Number(sp.get('page')) || 1);

  const data = await fetchProducts({ q, sortBy, order, page, signal: request.signal });
  return { ...data, q, sortBy, order, page };
}

const SORT_OPTIONS = [
  { value: '', label: 'Без сортировки' },
  { value: 'title:asc', label: 'Название: А → Я' },
  { value: 'title:desc', label: 'Название: Я → А' },
  { value: 'price:asc', label: 'Цена: по возрастанию' },
  { value: 'price:desc', label: 'Цена: по убыванию' },
  { value: 'rating:asc', label: 'Рейтинг: по возрастанию' },
  { value: 'rating:desc', label: 'Рейтинг: по убыванию' },
];

export default function CatalogPage() {
  const { products, total, q, sortBy, order, page } = useLoaderData();
  const [sp, setSp] = useSearchParams();

  const update = (patch) => {
    const next = new URLSearchParams(sp);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if (!('page' in patch)) next.delete('page');
    setSp(next);
  };

  return (
    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2} style={{ margin: 0 }}>Каталог</Typography.Title>

      <Space wrap>
        <Input.Search
          key={q}
          defaultValue={q}
          placeholder="Поиск товаров (например, phone)"
          allowClear
          enterButton="Найти"
          style={{ width: 320 }}
          onSearch={(value) => update({ q: value.trim() })}
        />
        <Select
          style={{ width: 230 }}
          value={sortBy ? `${sortBy}:${order}` : ''}
          options={SORT_OPTIONS}
          onChange={(v) => {
            const [by, ord] = v.split(':');
            update({ sortBy: by, order: ord });
          }}
        />
      </Space>

      <ProductGrid products={products} />

      {total > PAGE_SIZE && (
        <Pagination
          align="center"
          current={page}
          pageSize={PAGE_SIZE}
          total={total}
          showSizeChanger={false}
          onChange={(p) => update({ page: p > 1 ? String(p) : '' })}
        />
      )}
    </Space>
  );
}

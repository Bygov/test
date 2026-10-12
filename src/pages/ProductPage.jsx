import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Col, Descriptions, Image, Rate, Row, Space, Tag, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchProduct } from '../api/products.js';
import FavoriteButton from '../components/FavoriteButton.jsx';
import { useRecentStore } from '../store/recentStore.js';

export function productLoader({ params, request }) {
  return fetchProduct(params.id, request.signal);
}

export default function ProductPage() {
  const product = useLoaderData();
  const addRecent = useRecentStore((s) => s.add);
  const [active, setActive] = useState(0);

  useEffect(() => {
    addRecent(product);
    setActive(0);
  }, [product, addRecent]);

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
      <Link to="/"><ArrowLeftOutlined /> Назад в каталог</Link>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Image
            src={images[active]}
            alt={product.title}
            style={{ width: '100%', maxHeight: 420, objectFit: 'contain', background: '#fff' }}
          />
          <Space wrap style={{ marginTop: 12 }}>
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                onClick={() => setActive(i)}
                style={{
                  width: 64, height: 64, objectFit: 'contain', cursor: 'pointer', background: '#fff',
                  border: i === active ? '2px solid #1677ff' : '1px solid #d9d9d9',
                }}
              />
            ))}
          </Space>
        </Col>

        <Col xs={24} md={12}>
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            <Typography.Title level={2} style={{ margin: 0 }}>{product.title}</Typography.Title>
            <Space>
              <Rate disabled allowHalf value={product.rating} />
              <Typography.Text type="secondary">{product.rating}</Typography.Text>
            </Space>
            <Typography.Title level={3} style={{ margin: 0 }}>${product.price}</Typography.Title>
            <Typography.Paragraph>{product.description}</Typography.Paragraph>

            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Бренд">{product.brand ?? '—'}</Descriptions.Item>
              <Descriptions.Item label="Категория"><Tag>{product.category}</Tag></Descriptions.Item>
              <Descriptions.Item label="На складе">
                <Tag color={product.stock > 0 ? 'green' : 'red'}>
                  {product.stock > 0 ? `${product.stock} шт.` : 'Нет в наличии'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <FavoriteButton product={product} withText />
          </Space>
        </Col>
      </Row>
    </Space>
  );
}

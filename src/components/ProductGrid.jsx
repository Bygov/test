import { Col, Empty, Row } from 'antd';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, emptyText = 'Ничего не найдено' }) {
  if (!products.length) return <Empty description={emptyText} />;
  return (
    <Row gutter={[16, 16]}>
      {products.map((p) => (
        <Col key={p.id} xs={24} sm={12} lg={8}>
          <ProductCard product={p} />
        </Col>
      ))}
    </Row>
  );
}

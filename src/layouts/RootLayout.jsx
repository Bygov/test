import { Link, Outlet, useLocation } from 'react-router-dom';
import { Badge, Layout, Menu } from 'antd';
import GlobalLoader from '../components/GlobalLoader.jsx';
import RecentlyViewed from '../components/RecentlyViewed.jsx';
import { useFavoritesStore } from '../store/favoritesStore.js';

const { Header, Content } = Layout;

export default function RootLayout() {
  const { pathname } = useLocation();
  const favCount = useFavoritesStore((s) => s.items.length);

  const items = [
    { key: '/', label: <Link to="/">Каталог</Link> },
    {
      key: '/favorites',
      label: (
        <Link to="/favorites" style={{ color: '#fff' }}>
          <Badge count={favCount} size="small" offset={[10, -2]} style={{ color: 'inherit' }}>
            <span style={{ color: '#fff' }}>Избранное</span>
          </Badge>
        </Link>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <GlobalLoader />
      <Header style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Link to="/" style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>Магазин техники</Link>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname === '/favorites' ? '/favorites' : '/']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content className="container" style={{ width: '100%' }}>
        <Outlet />
        <RecentlyViewed />
      </Content>
    </Layout>
  );
}
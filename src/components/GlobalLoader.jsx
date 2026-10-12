import { useNavigation } from 'react-router-dom';
import { Spin } from 'antd';

export default function GlobalLoader() {
  const navigation = useNavigation();
  if (navigation.state === 'idle') return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.6)',
      }}
    >
      <Spin size="large" />
    </div>
  );
}

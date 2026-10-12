import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Button, Result } from 'antd';

export default function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Result
      status={notFound ? '404' : 'error'}
      title={notFound ? 'Товар не найден' : 'Что-то пошло не так'}
      subTitle={isRouteErrorResponse(error) ? error.data : error?.message}
      extra={<Link to="/"><Button type="primary">В каталог</Button></Link>}
    />
  );
}

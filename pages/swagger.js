import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Toko Digital - API Docs</h1>
      <SwaggerUI url="/api/docs" />
    </div>
  );
}

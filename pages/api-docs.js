// pages/api-docs.js
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Hanya load di client‐side
const SwaggerUI = dynamic(
  () => import('swagger-ui-react').then((mod) => mod.default),
  { ssr: false }
);

export default function ApiDocs() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/swagger-ui-dist@4/swagger-ui.css"
        />
        <title>Dokumentasi API</title>
      </Head>
      {/* SwaggerUI akan melakukan fetch ke /openapi.json */}
      <SwaggerUI url="/openapi.json" />
    </>
  );
}

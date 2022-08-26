import Link from 'next/link';
import Layout from '../components/layout-low';

function IndexPage() {
  return (
    <Layout title="Automator">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/Login">
          Login
        </Link>
      </p>
    </Layout>
  );
}

export default IndexPage;

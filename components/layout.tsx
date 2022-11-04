import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './navbar/navbar';

type Props = {
  children: ReactNode
  title: string
}

function Layout({ children, title }: Props) {
  return (
    <main>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <article className="container is-full-height">
        <section className="section">
          {children}
        </section>
      </article>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Copyright
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Layout;

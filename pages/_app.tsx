import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {

  return (
    <div className="container">
      <Head>
        <title>Ethereum Nodes</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <meta property="og:title" content="Ethereum Nodes" />
        <meta
          property="og:image"
          content="https://ethereumnodes.com/api/screenshot"
        />
        <meta
          property="og:description"
          content="List of free Ethereum JSON-RPC endpoints"
        />

        <meta name="twitter:title" content="Ethereum Nodes" />
        <meta
          name="twitter:description"
          content="List of free Ethereum JSON-RPC endpoints"
        />
        <meta
          name="twitter:image"
          content={`https://ethereumnodes.com/api/screenshot?${new Date().getDate()}`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-186QH0S5W3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());gtag('config', 'G-186QH0S5W3');`,
          }}
        />
      </Head>

      <PlausibleProvider domain="ethereumnodes.com">
        <ThemeProvider>
          <Component {...pageProps} />
          <footer />
        </ThemeProvider>
      </PlausibleProvider>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          background: var(--background);
          

        footer {
          width: 100%;
          height: auto;
          text-align: center;
          padding: 2rem 0;
        }

      `}</style>

      <style jsx global>{`
        :root {
          --background: radial-gradient(
            83.98% 83.98% at 50% 16.02%,
            #1c2823 0%,
            #000000 100%
          );
        }
        [data-theme="dark"] {
          --background: radial-gradient(
            83.98% 83.98% at 50% 16.02%,
            #f5fffa 0%,
            #ffffff 100%
          );
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "sofia-pro", sans-serif;
          background: #f9fafc;
          color: #091636;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: #091636;
          text-decoration: underline;
        }
        a:hover {
          color: #666666;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default App;

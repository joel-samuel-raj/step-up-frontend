import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"
import React from "react"

class MyDocument extends Document {
  static async getInitialProps ( ctx: DocumentContext ) {
    const initialProps = await Document.getInitialProps( ctx )
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="shortcut icon" href="/images/logo.png" />
          <title> GCT&apos;s Very Own Quiz App  </title>
          <meta property="og:title" content="Quiz App" />
          <meta property="og:description" content=" GCT's Very Own Quiz App" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="https://gct-quizapp.vercel.app/" />
          <meta property="og:image" content="https://gct-quizapp.vercel.app/images/logo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
      );
  }
}

              export default MyDocument;

//dist

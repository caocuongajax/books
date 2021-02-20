import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
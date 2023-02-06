import Document, { Html, Head, NextScript, Main } from 'next/document';


// nextjs does not have a function api for hooks
// next hides this, but we create this doc to add custom attributes
// and css
export default class MyDocument extends Document {
  render() {
    return(
      <Html lang="en-CA">
        <body>
          <Main />
          <NextScript />
        </body>
    </Html>
    )
  }
}
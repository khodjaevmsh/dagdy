import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>dagdy</title>
            </Head>
            <body className="has-background-white-ter">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

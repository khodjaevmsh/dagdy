import { Inter } from 'next/font/google'
import Head from 'next/head'
import Layout from '../components/Layout'
import QuizCover from '../components/QuizCover'
import '../i18n'
import BaseContextWrapper from '../components/common/BaseContext'
import { GlobalProvider } from '../contexts/GlobalContext'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
    return (
        <GlobalProvider>
            <BaseContextWrapper>
                <Layout>
                    <Head>
                        <title>Dagdy</title>
                        <meta charSet="utf-8" />
                    </Head>
                    <QuizCover />
                </Layout>
            </BaseContextWrapper>
        </GlobalProvider>
    )
}

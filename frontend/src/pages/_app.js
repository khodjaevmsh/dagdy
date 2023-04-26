import '../static/styles.css'
import 'bulma/css/bulma.css'
import { AnimatePresence } from 'framer-motion'

export default function App({ Component, pageProps }) {
    return (
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} />
        </AnimatePresence>
    )
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'react-feather'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import telegramIcon from '../static/telegram-icon.png'
import whatsAppIcon from '../static/whatsapp-icon.png'
import mailIcon from '../static/mail-icon.png'
import { LANGUAGES } from '../i18n'
import { GlobalContext } from '../contexts/GlobalContext'

export default function Layout({ children }) {
    const { setLang, lang } = useContext(GlobalContext)
    const [language, setLanguage] = useState()
    const { t, i18n } = useTranslation()
    const [mobile, setMobile] = useState(false)

    const handleTrans = (code, label) => {
        i18n.changeLanguage(code)
        setLanguage(label)
    }
    const router = useRouter()
    return (
        <>
            <nav className="container pt-5">
                <div className="navbar custom-nav px-5 py-2">
                    <div className="navbar-brand">
                        <Link href="/" className="navbar-item">
                            <h1 onClick={() => router.reload()} className="title is-4 has-text-blue">dagdy.kz</h1>
                        </Link>

                        <Link onClick={() => setMobile(!mobile)} href="#" role="button" className="navbar-burger nav-burger" aria-label="menu" aria-expanded="false"
                            data-target="navbarBasicExample">
                            <span aria-hidden="true" />
                            <span aria-hidden="true" className="sp-line" />
                            <span aria-hidden="true" />
                        </Link>
                    </div>

                    <div id="navbarBasicExample" className={mobile ? 'navbar-menu nav-menu is-active' : 'navbar-menu nav-menu'}>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <Link href="#" className="has-text-black px-3">{t('test')}</Link>
                            </div>
                            <div className="navbar-item">
                                <Link href="#" className="has-text-black px-3">{t('skills')}</Link>
                            </div>
                            <div className="navbar-item">
                                <Link href="#" className="has-text-black px-3">{t('contacts')}</Link>
                            </div>

                            <div className="navbar-item">
                                <div className={mobile ? 'dropdown is-hoverable' : 'dropdown is-right is-hoverable'}>
                                    <div className="dropdown-trigger">
                                        <button className="button lang-button has-text-weight-bold" aria-haspopup="true" aria-controls="dropdown-menu4">
                                            <span>{language}</span>
                                            <span className="icon is-small mt-1">
                                                <ChevronDown width={20} />
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                        <div className="dropdown-content">
                                            {LANGUAGES.map((lng, i) => {
                                                const { code, label } = lng
                                                return (
                                                    <div key={i} className="dropdown-item">
                                                        <a className={code === lang ? 'is-size-6 has-text-blue' : 'is-size-6 has-text-black'} onClick={() => {
                                                            handleTrans(code, label)
                                                            setLang(code)
                                                        }}>{label}
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                }}>
                {children}
            </motion.div>
            <footer className="footer has-background-black pb-6">
                <div className="container">
                    <div className="columns">
                        <div className="column is-4">
                            <h1 className="title is-5 has-text-white">{t('forAllQuestion')}</h1>
                            <div className="is-flex is-align-items-center my-5">
                                <figure className="image">
                                    <Image src={telegramIcon} width="32" alt="dagdy" />
                                </figure>
                                <Link href="#" className="has-text-white mx-3">@dagdy_kz</Link>
                            </div>

                            <div className="is-flex is-align-items-center my-5">
                                <figure className="image">
                                    <Image src={whatsAppIcon} width="32" alt="dagdy" />
                                </figure>
                                <Link href="#" className="has-text-white mx-3">+7 (777) 159-03-06</Link>
                            </div>

                            <div className="is-flex is-align-items-center my-5">
                                <figure className="image">
                                    <Image src={mailIcon} width="32" alt="dagdy" />
                                </figure>
                                <Link href="#" className="has-text-white mx-3">info@dagdy.kz</Link>
                            </div>
                        </div>

                        <div className="column is-4 is-flex is-flex-direction-column">
                            <h1 className="title is-5 has-text-white">{t('pageOf')}</h1>
                            <Link href="#" className="has-text-grey my-2">{t('mainWebSite')}</Link>
                            <Link href="#" className="has-text-grey my-2">Instagram</Link>
                            <Link href="#" className="has-text-grey my-2">Facebook</Link>
                            <Link href="#" className="has-text-grey my-2">Twitter</Link>
                            <Link href="#" className="has-text-grey my-2">+7 (727) 777-77-77</Link>
                        </div>

                        <div className="column is-4 is-flex is-flex-direction-column">
                            <h1 className="title is-5 has-text-white">{t('links')}</h1>
                            <Link href="#" className="has-text-grey my-2">{t('improveSkills')}</Link>
                            <Link href="#" className="has-text-grey my-2">
                                Узнать уровень критического мышления
                            </Link>
                            <Link href="#" className="has-text-grey my-2">{t('whyImproveSkills')}</Link>
                            <Link href="#" className="has-text-grey my-2">{t('temperament')}</Link>
                            <Link href="#" className="has-text-grey my-2">{t('topTenSkills')}</Link>
                        </div>
                    </div>

                    <div className="columns mt-6">
                        <div className="column is-4-desktop">
                            <Link href="#" className="has-text-grey has-text-left-mobile">dagdy.kz © 2023</Link>
                        </div>
                        <div className="column is-4-desktop is-hidden-mobile">
                            <div className="is-flex is-align-items-center">
                                <ChevronUp color="#fff" />
                                <Link href="#" className="has-text-grey mx-2 has-text-centered-mobile">
                                    {t('toTop')}
                                </Link>
                            </div>
                        </div>
                        <div className="column is-4-desktop">
                            <Link href="#" className="has-text-grey has-text-centered-left">{t('policy')}</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

// const styles = StyleSheet.create({})

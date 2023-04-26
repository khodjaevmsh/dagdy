import { FacebookShareButton, TelegramShareButton, WhatsappShareButton } from 'react-share'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import whatsappIcon from '../../static/whatsapp.png'
import telegramIcon from '../../static/telegram.png'
import facebookIcon from '../../static/facebook.png'

export default function QuizSocialShare() {
    const { t } = useTranslation()
    const url = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

    return (
        <>
            <h1 className="title is-5 has-text-centered">{t('share')}:</h1>
            <div className="is-flex is-justify-content-center">
                <WhatsappShareButton url={url} title={'Dummy text!'}>
                    <figure className="image is-56x66 mx-4">
                        <Image src={whatsappIcon} width={100} alt="dagdy" />
                    </figure>
                </WhatsappShareButton>

                <TelegramShareButton url={url} title={'Dummy text!'}>
                    <figure className="image is-56x66 mx-4">
                        <Image src={telegramIcon} width={100} alt="dagdy" />
                    </figure>
                </TelegramShareButton>

                <FacebookShareButton url={url} quote={'Dummy text!'} hashtags="#dagdy.kz">
                    <figure className="image is-56x66 mx-4">
                        <Image src={facebookIcon} width={100} alt="dagdy" />
                    </figure>
                </FacebookShareButton>
            </div>
        </>
    )
}

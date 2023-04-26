import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { languages } from './translate'

// Importing translation files

// Creating object with the variables of imported translation files

const resources = {
    en: {
        translation: languages.en,
    },
    ru: {
        translation: languages.ru,
    },
}

// i18N Initialization
i18n
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'ru',
        interpolation: { escapeValue: false },
        resources: {
            ru: {
                translation: {
                    test: 'Тесты',
                    skills: 'О гибких навыках',
                    contacts: 'Связаться',
                    forAllQuestion: 'По всем вопросам',
                    pageOf: 'Страницы МКТУ',
                    links: 'Полезные ссылки',
                    improveSkills: 'Как улучшить гибкие навыки',
                    whyImproveSkills: 'Зачем развивать гибкие навыки?',
                    temperament: 'Определить темперамент',
                    mainWebSite: 'Главный сайт',
                    topTenSkills: 'Топ-10 гибких навыков',
                    toTop: 'Наверх',
                    next: 'Следующий',
                    finish: 'Завершить тест',
                    downloadResult: 'Cкачать в формате Word',
                    yourResult: 'Ваш результат',
                    share: 'Поделиться результатом',
                    again: 'Пройти еще раз',
                    otherTest: 'Другие тесты',
                    send: 'Отправить',
                    sendResult: 'Отправить результат на почту',
                    policy: 'Политика конфиденциальности',
                    chooseCategory: 'Выбирите раздел',

                },
            },
            kz: {
                translation: {
                    test: 'Тесттер',
                    skills: 'Жұмсақ дағдылар туралы',
                    contacts: 'Байланыс',
                    forAllQuestion: 'Барлық сұрақтар бойынша',
                    pageOf: 'Nice классификациясының беттері',
                    links: 'Пайдалы сілтемелер',
                    improveSkills: 'Жұмсақ дағдыларды қалай жақсартуға болады',
                    whyImproveSkills: 'Неліктен жұмсақ дағдыларды дамыту керек?',
                    temperament: 'Темпераментті анықтау',
                    mainWebSite: 'Негізгі сайт',
                    topTenSkills: 'Ең жақсы 10 жұмсақ дағдылар',
                    toTop: 'Жоғарғы',
                    next: 'Келесі',
                    finish: 'Тестті аяқтау',
                    downloadResult: 'Word форматында жүктеп алыңыз',
                    yourResult: 'Сіздің ұпайыңыз',
                    share: 'Нәтижені бөлісу',
                    again: 'Тағы бір рет өтіңіз',
                    otherTest: 'Басқа сынақтар',
                    send: 'Жіберу',
                    sendResult: 'Нәтижені электрондық пошта арқылы жіберіңіз',
                    policy: 'Құпиялылық саясаты',
                    chooseCategory: 'Бөлімді таңдаңыз',
                },
            },
            en: {
                translation: {
                    test: 'Tests',
                    skills: 'About soft skills',
                    contacts: 'Contact',
                    forAllQuestion: 'For all questions',
                    pageOf: 'Pages of the Nice Classification',
                    links: 'Useful links',
                    improveSkills: 'How to Improve Soft Skills',
                    whyImproveSkills: 'Why develop soft skills?',
                    temperament: 'Determine temperament',
                    mainWebSite: 'Main site',
                    topTenSkills: 'Top 10 Soft Skills',
                    toTop: 'Top',
                    next: 'Next',
                    finish: 'Finish test',
                    downloadResult: 'Download in Word format',
                    yourResult: 'Your score',
                    share: 'Share result',
                    again: 'Pass one more time',
                    otherTest: 'Other tests',
                    send: 'Send',
                    sendResult: 'Send result by email',
                    policy: 'Privacy Policy',
                    chooseCategory: 'Choose a section',
                },
            },
        },
    })

export default i18n

export const LANGUAGES = [
    { code: 'kz', label: 'Kz' },
    { code: 'ru', label: 'Ру' },
    { code: 'en', label: 'Eng' },
]

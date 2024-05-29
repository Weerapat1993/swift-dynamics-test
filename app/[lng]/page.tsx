import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n'
import { Header } from './components/Header'
import Content from './components/Content';

type Params = {
  lng: 'en' | 'th'
}

type Props = {
  params: Params,
}

export default async function Page(props: Props) {
  let { lng } = props.params
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = await useTranslation(lng)

  return (
    <>
      <main>
        <Header heading={t('h1')} lng={lng} backBtn={t('backBtn')} />
        <Content params={props.params} />
      </main>
    </>
  )
}

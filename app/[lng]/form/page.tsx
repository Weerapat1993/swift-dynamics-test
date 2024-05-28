import { languages, fallbackLng } from '../../i18n/settings'
import { useTranslation } from '../../i18n'
import { Header } from '../components/Header'
import { DataTable } from "./components"

type Params = {
  lng: 'en' | 'th'
}

type Props = {
  params: Params,
}

const Page = async (props: Props) => {
  const { params } = props
  let { lng } = params
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  const { t } = await useTranslation(lng, 'form')
  return (
    <>
      <main>
        <Header heading={t('h1')} lng={lng} path='/form' backBtn={t('backBtn')} />
        {typeof t === undefined ? null : (
          <>
            {/* <SheetForm params={params} /> */}
            <DataTable params={params} />
          </>
          )
        }
      </main>
    </>
  )
}

export default Page

'use client'
import { Row, Col } from "antd";
import { Select, Typography, Button, Flex } from 'antd';
import { useRouter } from 'next/navigation'
import { languages } from '../../i18n/settings'

const { Title } = Typography;

type Props = {
  i18n: string,
  lng: string,
  path?: string,
  heading: string,
  backBtn: string,
}

export const Header = (props: Props) => {
  const router = useRouter()
  const { lng, path = '', heading, backBtn } = props
  const handleChange = (value: string) => {
    if(lng !== value) {
      router.push(`/${value}${path}`)
    }
  };
  const handleLink = (value: string) => {
    router.push(`/${lng}${value}`)
  };
  return (
    <>
      <Row>
        <Col span={12}>
          <Title style={{ margin: 0 }} level={2}>{heading}</Title>
        </Col>
        <Col span={12}>
          <Row justify="end">
            <Flex wrap gap="small">
              {path !== '' ? (
                <Button onClick={() => handleLink('/')} type="default">{backBtn}</Button>
              ) : (
                <Button onClick={() => handleLink('/form')} type="default">{backBtn}</Button>
              )}
              <Select
                defaultValue={lng}
                onChange={handleChange}
                options={languages.map((l, index) => ({
                  value: l,
                  label: l.toUpperCase()
                }))}
              />
            </Flex>
          </Row>
        </Col>
      </Row>
    </>
  )
}

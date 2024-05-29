'use client'
import { useState } from 'react';
import { CaretLeftOutlined, CaretRightOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Row, Flex } from 'antd';
import './content.scss'
import { useTranslation } from '@/app/i18n/client';

type Params = {
  lng: 'en' | 'th'
}

type Props = {
  params: Params,
}

const Content = (props) => {
	const { params } = props
  const { lng } = params
	const { t } = useTranslation(lng)
	const [list, setList] = useState(['A', 'B', 'C', 'D', 'E', 'F'])
	const onLeft = () => {
		const firstItem = list[0]
		const newList = list.slice(1, list.length)
		setList([...newList, ...[firstItem]])
	}
	const onRight = () => {
		const listItem = list[list.length - 1]
		const newList = list.slice(0, list.length - 1)
		setList([...[listItem], ...newList])
	}
	return (
		<>
			<Flex wrap gap="small">
				<button className='my-button-cycle' onClick={onLeft}><CaretLeftOutlined /></button>
				<button className='my-button'>{t('movePosition')}</button>
				<button className='my-button-cycle' onClick={onRight}><CaretRightOutlined /></button>
			</Flex>
			<div className='my-space'></div>
			<Row>
				<Flex wrap gap="small">
					{list.map(item => (
						<div key={item} className={`my-button bg-color-${item}`}>{item}</div>
					))}
				</Flex>
			</Row>
			
		</>
	)
}

export default Content
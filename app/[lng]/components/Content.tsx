import { CaretLeftOutlined, CaretRightOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

const Content = () => {
	return (
		<Flex wrap gap="small">
			<Button shape="circle" icon={<CaretLeftOutlined />} size="large" />
			<Button shape="circle" icon={<CaretUpOutlined />} size="large" />
			<Button shape="circle" icon={<CaretDownOutlined />} size="large" />
			<Button shape="circle" icon={<CaretRightOutlined />} size="large" />
		</Flex>
	)
}

export default Content
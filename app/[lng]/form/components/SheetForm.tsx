'use client'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useTranslation } from '../../../i18n/client'
import { Button, Flex, Form, Input, Radio, Row, Col, Typography } from 'antd';
import type { FormProps } from 'antd';
import RHFDatePickerField from './RHFDatePickerField';

const { Title } = Typography

type FieldType = {
  firstname?: string;
  lastname?: string;
	birthdate?: string;
	id_card?: string;
	gender?: string;
	telephone?: string;
	id_passport?: string;
	salary_expect?: number;
};

type Params = {
  lng: 'en' | 'th'
}

type Props = {
  params: Params,
}

type IResult = FieldType | null

const SheetForm = (props: Props) => {
	const { params: { lng } } = props
	const { t } = useTranslation(lng, 'form')
	const [output, setOutput] = useState<IResult>(null)
	const {
    register,
		control,
		reset,
		watch,
    formState: { errors },
  } = useForm<FieldType>()


	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		if(watch('birthdate')) {
			values.birthdate = watch('birthdate').format('YYYY-MM-DD')
		}
		console.log('Success:', values);
		alert('Submit Success!')
		setOutput(values)
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const optionsGender = [
		{ label: t('form.radio.male'), value: 'M' },
		{ label: t('form.radio.female'), value: 'F' },
		{ label: t('form.radio.unspecified'), value: '-'},
	];
  return (
	<Row>
		<Col xs={24} md={12}>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label={t('form.firstname')}
					name="firstname"
					rules={[{ required: true, message: 'Please input your firstname!' }]}
				>
					<Input {...register("firstname")} />
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.lastname')}
					name="lastname"
					rules={[{ required: true, message: 'Please input your lastname!' }]}
				>
					<Input {...register("lastname")} />
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.birthdate')}
					name="birthdate"
					rules={[{ required: false, message: 'Please input your birthdate!' }]}
				>
					<RHFDatePickerField 
						control={control}
						name='birthdate'
						placeholder='YYYY-MM-DD'
					/>
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.id_card')}
					name="id_card"
					rules={[{ 
						required: true, 
						message: 'Please input your ID card!',
					}]}
				>
					<Input {...register("id_card", {
						pattern: {
							value: /^(\d{13})?$/,
							message: 'Invalid ID Card Format'
						} 
					})} />
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.gender')}
					name="gender"
					rules={[{ required: true, message: 'Please input your gender!' }]}
				>
					<Radio.Group
						{...register("gender")}
						options={optionsGender}
						optionType="button"
						buttonStyle="solid"
					/>
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.telephone')}
					name="telephone"
					rules={[{ required: true, message: 'Please input your phone number!' }]}
				>
					<Input {...register("telephone")} />
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.id_passport')}
					name="id_passport"
					rules={[{ required: false, message: 'Please input your ID passport!' }]}
				>
					<Input {...register("id_passport")} />
				</Form.Item>
				<Form.Item<FieldType>
					label={t('form.salary_expect')}
					name="salary_expect"
					rules={[{ required: true, message: 'Please input your salary expect!' }]}
				>
					<Input type="number" {...register("salary_expect")} />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Flex wrap gap="small">
						<Button type="primary" danger onClick={() => reset()}>
							{t('form.btn.reset')}
						</Button>
						<Button type="primary" htmlType="submit">
							{t('form.btn.submit')}
						</Button>
					</Flex>
				</Form.Item>
			</Form>
		</Col>
		<Col xs={24} md={12}>
			<Title style={{ margin: 0 }} level={3}>Result:</Title>
			<pre>{JSON.stringify(output, null, '  ')}</pre>
		</Col>
	</Row>
  );
};

export default SheetForm
"use client"
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useForm } from "react-hook-form"
import { useTranslation } from '../../../i18n/client'
import { Button, Flex, Form, Input, Radio, Row, Modal } from 'antd';
import type { FormProps } from 'antd';
import RHFDatePickerField from './RHFDatePickerField';
import { useEmployeeList } from '../hooks/useEmployeeList';
import type { Employee } from '../@types/Employee'

type FieldType = Employee

type Params = {
  lng: 'en' | 'th'
}

type Props = {
  params: Params,
}

const CreateEmployeeModalForm = (props: Props) => {
    const { params: { lng }} = props
	const { createEmployee } = useEmployeeList()
	const { t } = useTranslation(lng, 'form')
	const {
		register,
		control,
		reset,
		watch,
	} = useForm<FieldType>()

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		if(watch('birthdate')) {
			values.birthdate = watch('birthdate').format('YYYY-MM-DD')
		}
		setConfirmLoading(true);
		setTimeout(() => {
			createEmployee(values)
			reset()
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const optionsGender = [
		{ label: t('form.radio.male'), value: 'M' },
		{ label: t('form.radio.female'), value: 'F' },
		{ label: t('form.radio.unspecified'), value: '-'},
	];
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Row justify="end">
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        {t('form.btn.create')}
      </Button>
      <Modal
        title="Create Employee"
				centered
        open={open}
        confirmLoading={confirmLoading}
				onClose={handleCancel}
				onCancel={handleCancel}
        footer={[]}
      >
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
                <Input maxLength={13} {...register("id_card", {
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
                <Input maxLength={10} {...register("telephone")} />
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
                <Input type="number" min={1} {...register("salary_expect")} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Flex wrap gap="small">
                    <Button type="primary" danger onClick={() => reset()}>
                        {t('form.btn.reset')}
                    </Button>
                    <Button type="primary" htmlType="submit" loading={confirmLoading}>
                        {t('form.btn.submit')}
                    </Button>
                </Flex>
            </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default CreateEmployeeModalForm;
import { Control, Controller } from "react-hook-form"
import { DatePicker } from 'antd'
import dayjs from "dayjs"

interface RHFDatePickerFieldProps {
  control: Control<any>
	name: string
	placeholder?: string

}

const RHFDatePickerField = (props: RHFDatePickerFieldProps) => {
	const { control, name, placeholder } = props
	return (
		<Controller 
			control={control}
			name={name}
			rules={{
				required: "This field is required"
			}}
			render={({ field, fieldState }) => {
				return (
					<>
						<DatePicker
							placeholder={placeholder}
							status={fieldState.error ? 'error' : undefined}
							ref={field.ref}
							name={field.name}
							onBlur={field.onBlur}
							value={field.value ? dayjs(field.value) : null}
							onChange={(date) => {
								field.onChange(date)
							}}
						/>
					</>
				)
			}}
		/>
	)
}

export default RHFDatePickerField
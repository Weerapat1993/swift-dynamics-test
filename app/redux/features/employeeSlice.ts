import { Employee } from "@/app/[lng]/form/@types/Employee";
import { createSlice } from "@reduxjs/toolkit";

type EmployeeState = {
  data: Employee[]
};

const initialState = {
  data: []
} as EmployeeState;

export const employee = createSlice({
  name: "employee",
  initialState,
  reducers: {
    init: () => initialState,
    addEmployee: (state, action) => {
			const keys = state.data.map(item => item.id)
			const initialKeys = [0, ...keys]
			const id = Math.max(...initialKeys) + 1
			const generateData = {
				id,
				...action.payload
			}
      state.data.push(generateData)
    },
		removeEmployeeByListId: (state, action) => {
			state.data = state.data.filter((item) => !action.payload.includes(item.id));
		}
  },
});

export const {
  init,
  addEmployee,
	removeEmployeeByListId,
} = employee.actions;
export default employee.reducer;


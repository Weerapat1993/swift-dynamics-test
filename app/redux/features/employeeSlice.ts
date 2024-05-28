
import { createSlice } from "@reduxjs/toolkit";

type EmployeeState = {
  keys: Object
};

const initialState = {
  keys: {},
} as EmployeeState;

export const employee = createSlice({
  name: "employee",
  initialState,
  reducers: {
    init: () => initialState,
    addEmployee: (state, action) => {
      const ids = Object.keys(state.keys)
			const initialKeys = [0, ...ids]
			const id = Math.max(...initialKeys) + 1
			const generateData = {
				id,
				...action.payload
			}
      state.keys[id] = generateData
    },
    editEmployeeById: (state, action) => {
      state.keys[action.payload.id] = action.payload
    },
		removeEmployeeByListId: (state, action) => {
      (action.payload || []).forEach(key => {
        delete state.keys[key]
      });
		}
  },
});

export const {
  init,
  addEmployee,
	removeEmployeeByListId,
  editEmployeeById,
} = employee.actions;
export default employee.reducer;


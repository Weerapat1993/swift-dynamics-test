
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
    getEmployeeDataFromLocalStorage: (state) => {
      const retrievedObject = localStorage.getItem('employeeData');
      if(retrievedObject) {
        const keys = JSON.parse(retrievedObject)
        state.keys = keys
      }
    },
    addEmployee: (state, action) => {
      const ids = Object.keys(state.keys)
			const initialKeys = [0, ...ids]
			const id = Math.max(...initialKeys) + 1
			const generateData = {
				id,
				...action.payload
			}
      state.keys[id] = generateData
      localStorage.setItem('employeeData', JSON.stringify(state.keys));
    },
    editEmployeeById: (state, action) => {
      state.keys[action.payload.id] = action.payload
      localStorage.setItem('employeeData', JSON.stringify(state.keys));
    },
		removeEmployeeByListId: (state, action) => {
      (action.payload || []).forEach(key => {
        delete state.keys[key]
      });
      localStorage.setItem('employeeData', JSON.stringify(state.keys));
		}
  },
});

export const {
  init,
  addEmployee,
	removeEmployeeByListId,
  editEmployeeById,
  getEmployeeDataFromLocalStorage,
} = employee.actions;
export default employee.reducer;


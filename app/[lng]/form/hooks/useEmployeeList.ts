import { addEmployee, removeEmployeeByListId, editEmployeeById, getEmployeeDataFromLocalStorage } from "@/app/redux/features/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { Employee } from "../@types/Employee";

export const useEmployeeList = () => {
    const keys = useAppSelector((state) => state.employeeReducer.keys);
    const ids = Object.keys(keys)
    const list = ids.map(key => keys?.[key])
    const dispatch = useAppDispatch();

    const getEmployee = () => {
        dispatch(getEmployeeDataFromLocalStorage())
    }

    const createEmployee = (payload: any[]) => {
        dispatch(addEmployee(payload))
    }

    const updateEmployeeById = (payload: Employee[]) => {
        dispatch(editEmployeeById(payload))
    }

    const deleteEmployeeByListId = (keys: number[]) => {
        dispatch(removeEmployeeByListId(keys))
    }

    return {
        list,
        ids,
        keys,
        createEmployee,
        updateEmployeeById,
        deleteEmployeeByListId,
        getEmployee,
    }
}
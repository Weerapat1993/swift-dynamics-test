import { addEmployee, removeEmployeeByListId } from "@/app/redux/features/employeeSlice";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

export const useEmployeeList = () => {
    const list = useAppSelector((state) => state.employeeReducer.data);
    const dispatch = useAppDispatch();

    const createEmployee = (payload: any[]) => {
        dispatch(addEmployee(payload))
    }

    const deleteEmployeeByListId = (keys: number[]) => {
        dispatch(removeEmployeeByListId(keys))
    }

    return {
        list,
        createEmployee,
        deleteEmployeeByListId,
    }
}
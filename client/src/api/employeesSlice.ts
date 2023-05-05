import { Employee } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { employeesApi } from "../app/services/employees";
import { RootState } from "../app/store";

interface InitialEmployee {
  empoyees: Employee[] | null
}
const initialState: InitialEmployee = {
  empoyees: null
}
const slice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (biulder) => {
    biulder.addMatcher(employeesApi.endpoints.getEmployeesAll.matchFulfilled, (state, action) => {
      state.empoyees = action.payload
    })
  }
});
export default slice.reducer;
export const selectEmployees = (state: RootState) => state.employees;
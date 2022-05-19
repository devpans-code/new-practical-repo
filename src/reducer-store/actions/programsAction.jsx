import axios from "axios";
import { toast } from "react-toastify";
import {
  LIST_OF_PROGRAMS,
  LIST_OF_PROGRAMS_ERROR,
  LIST_OF_MODUAL,
  LIST_OF_MODUAL_ERROR,
} from "../ActionTypes";
import {
  ADD_PROGRAM_API,
  LIMIT,
  PAGE,
  PROGRAMS_LIST_API,
  ADD_MODUAL_API,
  MODUAL_LIST_API,
  COUNTRY_LIST,
  UPDATE_PROGRAM_API,
  UPDATE_MODUAL_API,
} from "../constants";

const token = localStorage.getItem("token");
const header = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const ProgramList = (
  status = "0",
  page = PAGE,
  limit = LIMIT,
  token: string,
  order: string,
  search: string
) => {
  header.headers.Authorization = `Bearer ${token}`;
  return async (dispatch: any) => {
    return await axios
      .get(
        `${PROGRAMS_LIST_API}?status=${status}&page=${page}&limit=${limit}&orderBy=${order}&search=${search}`,
        header
      )
      .then((res) => {
        dispatch({
          type: LIST_OF_PROGRAMS,
          payload: res.data,
        });
        return res;
      })
      .catch((error) => {
        dispatch({
          type: LIST_OF_PROGRAMS_ERROR,
        });
        toast.error(error.response.data.errorMsg);
      });
  };
};

export const addProgram = async (userObj: any, token: string) => {
  header.headers.Authorization = `Bearer ${token}`;
  const body = JSON.stringify(userObj);
  return await axios
    .post(ADD_PROGRAM_API, body, header)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.errorMsg);
      return error.response.data;
    });
};

export const updateProgram = async (
  programId,
  userObj,
  token
) => {
  header.headers.Authorization = `Bearer ${token}`;
  const body = JSON.stringify(userObj);
  return await axios
    .put(`${UPDATE_PROGRAM_API}/${programId}`, body, header)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      toast.error(error.response.data.errorMsg);
      return error.response.data;
    });
};


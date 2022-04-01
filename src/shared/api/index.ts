import axios, { AxiosResponse } from "axios";

export const postApiRequest = async (endpoint: string, initProps?: any) => {
  if (!endpoint) {
    throw "No endpoint given";
  }

  try {
    const response: AxiosResponse<any> = await axios(endpoint, {
      method: "POST",

      headers: {
        "Content-type": "application/json",
      },

      ...initProps,
    });

    return response;
  } catch (e) {
    throw e;
  }
};

export const getApiRequest = async (endpoint: string, initProps?: any) => {
  if (!endpoint) {
    throw "No endpoint given";
  }

  try {
    const response: AxiosResponse<any> = await axios(endpoint, {
      method: "GET",

      headers: {
        "Content-type": "application/json",
      },

      ...initProps,
    });

    return response;
  } catch (e) {
    throw e;
  }
};

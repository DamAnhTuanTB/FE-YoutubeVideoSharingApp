import { ROUTES } from "../../routes/routes";
import { eraseCookie, getCookie } from "../../utils/cookies";

export async function fetchData(url: string, method: string, data?: any) {
  const options: any = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = getCookie("token");
  if (token) {
    options.headers.authorization = "Bearer " + token;
  }

  if (method === "POST" || method === "PUT") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${url}`,
      options
    );

    if (!response.ok) {
      if (response.status === 401) {
        eraseCookie("token");
        window.location.href = `${window.location.origin}${ROUTES.LOGIN}`;
      } else {
        const errorData = {
          status: response.status,
          message: response?.statusText,
        };
        throw errorData;
      }
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

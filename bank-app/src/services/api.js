import {
  HOST,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SIGNUP_ROUTE,
} from "../services/config";

export async function Login({ email, password }) {
  try {
    const response = await fetch(HOST + LOGIN_ROUTE, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    // Another case of error, if database is not running or disconnected during the process for example
    console.log("unexpected error: ", error);
    return {
      status: 501,
      message: error,
      remember: false,
    };
  }
}

export async function GetProfile(token) {
  try {
    const response = await fetch(HOST + PROFILE_ROUTE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    // Another case of error, if database is not running or disconnected during the process for example
    console.log("unexpected error: ", error);
    return {
      status: 501,
      message: error,
    };
  }
}

export async function UpdateProfile({ firstName, lastName, token }) {
  try {
    const response = await fetch(HOST + PROFILE_ROUTE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
      }),
    });

    return await response.json();
  } catch (error) {
    // Another case of error, if database is not running or disconnected during the process for example
    console.log("unexpected error: ", error);

    return {
      status: 501,
      message: error,
    };
  }
}

export async function SignUp({ email, password, firstName, lastName }) {
  try {
    const response = await fetch(HOST + SIGNUP_ROUTE, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    // Another case of error, if database is not running or disconnected during the process for example
    console.log("unexpected error: ", error);

    return {
      status: 501,
      message: error,
    };
  }
}

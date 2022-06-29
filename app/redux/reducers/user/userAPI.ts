import axios from "axios"

interface Login {
  email: string,
  password: string
}

export async function fetchUser(payload: Login): Promise<any> {
  const response = await axios.post(
    "http://54.159.8.194/v1/auth/login",
    payload
  );

  return response
}

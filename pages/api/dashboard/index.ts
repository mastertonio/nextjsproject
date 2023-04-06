import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function dashboard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(`/v1/dashboard`);
    const data = response.data;
    console.log("response", response);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get dashboard data" });
  }
}

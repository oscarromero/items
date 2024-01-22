import { backendApiRequest as apiRequest } from "@/components/utils/httpUtils";

export const GET = async (req) => {
  return await apiRequest("items", "GET");
};

export const POST = async (req) => {
  const body = await req.json();
  return await apiRequest("items", "POST", body);
};

export const PUT = async (req) => {
  const body = await req.json();
  return await apiRequest("items", "PUT", body);
};

import { backendApiRequest as apiRequest } from "@/components/utils/httpUtils";

export const GET = async (req, {params}) => {
    const id = params.id;
    if (id >= 0) {
        return await apiRequest(`items/byId?id=${id}`, "GET");
    } else {
        return await apiRequest(`items/byDescription?q=${id}`, "GET");
    }
};

export const DELETE = async (req, {params}) => {
    const id = params.id;
    return await apiRequest(`items?id=${id}`, "DELETE");
};
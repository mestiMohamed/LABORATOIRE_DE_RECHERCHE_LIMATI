import axiosClient from "../../../axiosClient";

const PublicationApi = {
    create: async (payload) => {
        const response = await axiosClient.post("/admin/publications", payload);
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    all: async () => {
        const response = await axiosClient.get("/admin/publications");
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    update: async (id, payload) => {
        const response = await axiosClient.put(`/admin/publications/${id}`, {
            ...payload,
            id,
        });
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },

    delete: async (id) => {
        return await axiosClient.delete(`/admin/publications/${id}`);
    },

    mine: async () => {
        const response = await axiosClient.get("/me/publications");
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
};
export default PublicationApi;

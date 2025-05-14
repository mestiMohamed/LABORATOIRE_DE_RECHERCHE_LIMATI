import axiosClient from "../../../axiosClient";

const EquipeApi = {
    create: async (payload) => {
        const response = await axiosClient.post("/admin/equipes", payload);
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    all: async () => {
        const response = await axiosClient.get("/admin/equipes");
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    update: async (id, payload) => {
        const response = await axiosClient.put(`/admin/equipes/${id}`, {
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
        return await axiosClient.delete(`/admin/equipes/${id}`);
    },
};
export default EquipeApi;

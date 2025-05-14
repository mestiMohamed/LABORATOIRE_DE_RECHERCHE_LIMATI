import axiosClient from "../../../axiosClient";

const ProjetDeRechercheApi = {
    create: async (payload) => {
        const response = await axiosClient.post("/admin/projets", payload);
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    all: async () => {
        const response = await axiosClient.get("/admin/projets");
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    update: async (id, payload) => {
        const response = await axiosClient.put(`/admin/projets/${id}`, {
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
        return await axiosClient.delete(`/admin/projets/${id}`);
    },
};
export default ProjetDeRechercheApi;

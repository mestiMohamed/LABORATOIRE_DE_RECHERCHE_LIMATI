import axiosClient from "../../../axiosClient";

const ChercheurApi = {
    create: async (payload) => {
        const response = await axiosClient.post("/admin/users", payload);
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    all: async () => {
        const response = await axiosClient.get("/admin/users");
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    update: async (id, payload) => {
        return await axiosClient.put(`/admin/users/${id}`, { ...payload, id });
    },

    delete: async (id) => {
        return await axiosClient.delete(`/admin/users/${id}`);
    },

    // toggle
    toggleActive: async (id, is_active) => {
        const response = await axiosClient.patch(
            `/admin/users/${id}/toggle-active`,
            {
                is_active,
            }
        );
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },

    removeFromEquipe(id) {
        return axiosClient.put(`/users/${id}/remove-equipe`);
    },

    

    
};
export default ChercheurApi;

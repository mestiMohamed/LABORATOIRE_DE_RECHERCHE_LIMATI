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
    update: async (id, payload) => {users
        const response = await axiosClient.put(`/admin/users/${id}`, {
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
        return await axiosClient.delete(`/admin/users/${id}`);
    },
};
export default ChercheurApi;

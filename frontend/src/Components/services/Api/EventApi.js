import axiosClient from "../../../axiosClient";

const EventApi = {
    create: async (payload) => {
        const response = await axiosClient.post("/admin/events", payload);
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    all: async () => {
        const response = await axiosClient.get("/admin/events");
        return {
            status: response.status,
            data: response.data,
            ok: response.status >= 200 && response.status < 300,
        };
    },
    /*update: async (id, payload) => {
    return await axiosClient.put(`/admin/parents/${id}`, {...payload, id})
  },*/
  delete: async (id) => {
    return await axiosClient.delete(`/admin/events/${id}`)
  },
};
export default EventApi;

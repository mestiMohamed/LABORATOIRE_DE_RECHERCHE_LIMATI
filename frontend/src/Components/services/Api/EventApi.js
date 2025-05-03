import axiosClient from "../../../axiosClient";

const EventApi = {
  create: async (payload) => {
    return await axiosClient.post('/admin/events', payload)
  },
  /*update: async (id, payload) => {
    return await axiosClient.put(`/admin/parents/${id}`, {...payload, id})
  },
  delete: async (id) => {
    return await axiosClient.delete(`/admin/parents/${id}`)
  },
  all: async (columns = []) => {
    return await axiosClient.get('/admin/parents', {
      params: {
        columns: columns
      },
    })
  },*/
}
export default EventApi
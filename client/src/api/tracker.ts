import axios from '../plugins/axios';

interface ITracker {
    _id?: string;
    title?: string;
    subtitle?: string;
    notes?: string;
    fields?: string[]
}

export default {
    get: () => axios.get('trackers'),
    getOne: (id: string) => axios.get(`trackers/${id}`),
    put: (data: ITracker) => axios.post(`trackers/${data._id}`, data),
    post: (data: ITracker) => axios.post('trackers', data),
    delete: (id: string) => axios.put(`trackers/${id}`)
}
import axios from '../plugins/axios';

import { IUser } from '../App';

export default {
    me: () => axios.get('users'),
    login: (data: IUser) => axios.post('users/login', data),
    register: (data: IUser) => axios.post('users/register', data),
    update: (id: string, data: IUser) => axios.put(`users/${id}`, data)
}

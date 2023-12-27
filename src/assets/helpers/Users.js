
import { getUsersRequest } from "../../api/users";

export const DataUser = [
    {
        id: "1",
        name: 'Luis Fernando',
        user: 'luisf',
        password: '123',
        rol: 'usuario',
    },
    {
        id: "2",
        name: 'admin',
        user: 'admin',
        password: 'admin',
        rol: 'administrador',
    }
]

async function getUsers() {
    const res = await getUsersRequest();
    return res.data;
}

export const getUsersData = await getUsers();


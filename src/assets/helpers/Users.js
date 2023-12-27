import { getUsersRequest } from '../../api/users';

const getUsers = async () => {
    const users = await getUsersRequest();
    return users.data
}

export const getUsersData = await getUsers()
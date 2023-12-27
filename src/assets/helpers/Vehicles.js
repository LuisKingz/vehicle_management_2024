import { getVehiclesRequest } from '../../api/vehicles';


const getVehicle = async () => {
    const vehicles = await getVehiclesRequest();
    return vehicles.data
}

export const getVehicleData = await getVehicle();
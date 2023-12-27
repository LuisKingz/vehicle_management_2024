import { getVehiclesRequest } from "../../api/vehicles";

export const dataTemp = [
    {
        id: 1,
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        type: 'Automovil',
        plate: 'ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        state: "México",
        year: 2013,
        engine_displacement: 4,
        serial_number: 'ABC123',
        engine: 'ABC123',
        registration_card: 'ABC123',
        car_insurance: 1,
        vehicular_tenure: 2021,
        car_inspection: 'Si',
        car_maintenance: 'Si',
        comments: 'Ninguna',
    },
    {
        id: 2,
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        type: 'Automovil',
        plate: 'ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        state: "México",
        year: 2013,
        engine_displacement: 4,
        serial_number: 'ABC123',
        engine: 'ABC123',
        registration_card: 'ABC123',
        car_insurance: 1,
        vehicular_tenure: 2023,
        car_inspection: 'Si',
        car_maintenance: 'Si',
        comments: 'Ninguna',
    },
    {
        id: 3,
        url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        type: 'Automovil',
        plate: 'ABC123',
        brand: 'Toyota',
        model: 'Corolla',
        state: "México",
        year: 2013,
        engine_displacement: 4,
        serial_number: 'ABC123',
        engine: 'ABC123',
        registration_card: 'ABC123',
        car_insurance: 1,
        vehicular_tenure: 2022,
        car_inspection: 'Si',
        car_maintenance: 'Si',
        comments: 'Ninguna',
    }
]

async function getVehicles() {
    const res = await getVehiclesRequest();
    return res.data;
}

export const getVehiclesData = await getVehicles();


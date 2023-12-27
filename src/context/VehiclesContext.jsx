import { createContext, useContext, useState } from "react";
import {
  getVehiclesRequest,
  deleteVehicleRequest,
  addVehicleRequest,
  updateVehicleRequest,
  getVehicleRequest,
} from "../api/vehicles";
import {
  getMaintenancesRequest,
  addMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
} from "../api/maintenance";
import {
  getSparePartsRequest,
  addSparePartsRequest,
  deleteSparePartsRequest,
  updateSparePartsRequest,
} from "../api/sparePart";
const VehiclesContext = createContext();

export const useVehicles = () => {
  const context = useContext(VehiclesContext);
  if (!context) {
    throw new Error("useVehicles must be used within a VehiclesProvider");
  }
  return context;
};

export const VehiclesProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const getVehicles = async () => {
    const res = await getVehiclesRequest();
    setVehicles(res.data);
    return res.data;
  };

  const deleteVehicle = async (placa) => {
    try {
      const res = await deleteVehicleRequest(placa);
      console.log(res);
      if (!res.status) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addVehicles = async (vehicle) => {
    try {
      const res = await addVehicleRequest(vehicle);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getVehicle = async (placa) => {
    try {
      const res = await getVehicleRequest(placa);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateVehicle = async (placa, vehicle) => {
    try {
      await updateVehicleRequest(placa, vehicle);
    } catch (error) {
      console.error(error);
    }
  };

  // MATENIMIENTOS

  const getMaintenances = async (placa) => {
    try {
      if (placa != "") {
        const res = await getMaintenancesRequest(placa);
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addMaintenance = async (maintenance) => {
    try {
      const res = await addMaintenanceRequest(maintenance);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMaintenance = async (id, maintenance) => {
    try {
      await updateMaintenanceRequest(id, maintenance);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMaintenance = async (id) => {
    try {
      const res = await deleteMaintenanceRequest(id);
      console.log(res);
      if (!res.status) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // REFACCIONES
  const getSpareParts = async (id) => {
    try {
      if (id != "") {
        const res = await getSparePartsRequest(id);
        return res.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSpareParts = async (spareParts) => {
    try {
      const res = await addSparePartsRequest(spareParts);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSpareParts = async (id) => {
    try {
      const res = await deleteSparePartsRequest(id);
      console.log(res);
      if (!res.status) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSpareParts = async (id, spareParts) => {
    try {
      await updateSparePartsRequest(id, spareParts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VehiclesContext.Provider
      value={{
        vehicles,
        getVehicles,
        deleteVehicle,
        addVehicles,
        getVehicle,
        updateVehicle,
        getMaintenances,
        addMaintenance,
        updateMaintenance,
        deleteMaintenance,
        getSpareParts,
        addSpareParts,
        deleteSpareParts,
        updateSpareParts,
      }}
    >
      {children}
    </VehiclesContext.Provider>
  );
};

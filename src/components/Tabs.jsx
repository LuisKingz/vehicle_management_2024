import React from 'react'
import { User } from "./tables/User";
import { Vehicle } from "./tables/Vehicle";
import { useAuth } from "../context/AuthContext";

export const Tabs = () => {
  const { user } = useAuth();

  useAuth();

  return (
       <>
      <div className="table-container mt-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {user.rol === "admin" && (
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="users-tab"
                data-bs-toggle="tab"
                data-bs-target="#users"
                type="button"
                role="tab"
                aria-controls="users"
                aria-selected="false"
              >
                Usuario
              </button>
            </li>                       
          )}
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="vehicles-tab"
              data-bs-toggle="tab"
              data-bs-target="#vehicles"
              type="button"
              role="tab"
              aria-controls="vehicles"
              aria-selected="true"
            >
              Vehiculos
            </button>
          </li>
        </ul>
        <div className="tab-content mt-3" id="myTabContent">
            {user.rol === "admin" && (
              <div className="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
                  <User />
              </div>              
            )}
            <div className="tab-pane fade show active" id="vehicles" role="tabpanel" aria-labelledby="vehicles-tab">
                <Vehicle />
            </div>
        </div>
      </div>
    </>
  )
}

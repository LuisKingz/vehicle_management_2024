import React from "react";

export const Spinner = () => {
  return (
    <div className="">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

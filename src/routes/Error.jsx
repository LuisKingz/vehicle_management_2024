import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap'

export const Error = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <Alert variant="danger" onClose={() => {}}>
              <div className="error-container d-flex flex-column justify-content-center align-items-center">
                <h2 className="error-title">Oops!</h2>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="error-message">
                  {error.statusText || error.message}
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                  Regresar a inicio
                </Button>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'

const LoadingButton = () => {
  return (
    <>
  <button type="submit" className="btn-curve btn-lit">
  <span className="spinner-grow spinner-grow-sm text-success" role="status" aria-hidden="true"></span>
  </button>
    </>
  )
}

export default LoadingButton

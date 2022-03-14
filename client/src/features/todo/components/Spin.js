import React from 'react'

const Spin = () => {
  return (
    <div id="loader">
        <svg className="loader__container" width="50" height="50" viewBox="0 0 44 44">
        <circle className="loader__container--path" cx="22" cy="22" r="20" fill="none" strokeWidth="4"></circle>
        </svg>
    </div>
  )
}

export default Spin
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import '../styles.css'

const CSS_HANDLES = ['custom-flags__svg-icon-up']

const UpIcon = () => {
  const { handles } = useCssHandles(CSS_HANDLES)
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={handles['custom-flags__svg-icon-up']}
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </>
  )
}

export default UpIcon

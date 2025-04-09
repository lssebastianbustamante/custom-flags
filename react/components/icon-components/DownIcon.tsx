import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import '../styles.css'

const CSS_HANDLES = ['custom-flags__svg-icon-down']

const DownIcon = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={handles['custom-flags__svg-icon-down']}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
}

export default DownIcon

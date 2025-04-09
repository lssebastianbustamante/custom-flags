import type { ReactNode } from 'react'
import UpIcon from '../../icon-components/UpIcon'
import DownIcon from '../../icon-components/DownIcon'



interface CustomCollapsibleConfig {
  children: ReactNode
  handles: Record<string, string>
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

const CustomCollapsible = ({
  children,
  handles,
  isCollapsed,
  setIsCollapsed,
}: CustomCollapsibleConfig) => {
  const stylesContent = {
    height: isCollapsed ? 'auto' : 0,
    overflow: isCollapsed ? 'visible' : 'hidden',
    transition: 'height 3s ease-out'
  }
  const textBlock = isCollapsed ? 'Ver menos info' : 'Ver más info'
  const caretIcon = isCollapsed ? <UpIcon /> : <DownIcon />

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <>
      <div
        className={
          handles['custom-flags__collapsible-list-container-productgift']
        }
      >
        <div
          className={handles['custom-flags__collapsible-list-productgift']}
          style={stylesContent}
        >
          {children}
        </div>
        <div
          onClick={handleCollapse}
          onKeyUp={(e) => { if (e.key === 'Enter') handleCollapse() }}
          
          className={
            handles['custom-flags__collapsible-list-container-text-productgift']
          }
        >
          <div
            className={
              handles[
                'custom-flags__collapsible-list-container-block-text-productgift'
              ]
            }
          >
            <p
              className={
                handles['custom-flags__collapsible-list-title-productgift']
              }
            >
              {textBlock}
            </p>
            {caretIcon}
          </div>
        </div>
      </div>
    </>
  )
}


export default CustomCollapsible

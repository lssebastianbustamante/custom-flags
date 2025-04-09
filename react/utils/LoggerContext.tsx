/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import type React from 'react'
import { createContext, useContext } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

interface Logger {
  logger: {
    formatMessage(strings: TemplateStringsArray, values: unknown[]): string
    info(strings: TemplateStringsArray, ...values: unknown[]): void
    warn(strings: TemplateStringsArray, ...values: unknown[]): void
    error(strings: TemplateStringsArray, ...values: unknown[]): void
  }
}

const LoggerContext = createContext<Logger | undefined>(undefined)
const LOGGING_ENABLED = canUseDOM && sessionStorage.getItem('mdlzlogging')

declare global {
  interface Window {
    logging: (value: boolean) => void
  }
}

window.logging = (value: boolean) => {
  canUseDOM && value
    ? sessionStorage.setItem('mdlzlogging', `${value}`)
    : sessionStorage.removeItem('mdlzlogging')
}

const styles = {
  info: 'font-weight: bold;background-color: #000;color: #00ff00',
  warn: 'font-weight: bold;background-color: #000;color: #ffff00',
  error: 'font-weight: bold;color: #ff0000'
}

const LoggerProvider = ({ children }: React.PropsWithChildren) => {
  const logger = {
    formatMessage(strings: TemplateStringsArray, values: unknown[]) {
      return strings.reduce(
        (msg, string, i) =>
          msg + string + (values[i] !== undefined ? '%o' : ''),
        ''
      )
    },
    info(strings: TemplateStringsArray, ...values: unknown[]) {
      if (!LOGGING_ENABLED) return
      const message = this.formatMessage(strings, values)

      // eslint-disable-next-line no-console
      console.log(`%cℹ️ ${message}`, styles.info, ...values)
    },
    warn(strings: TemplateStringsArray, ...values: unknown[]) {
      if (!LOGGING_ENABLED) return
      const message = this.formatMessage(strings, values)

      // eslint-disable-next-line no-console
      console.log(`%c🚧 ${message}`, styles.warn, ...values)
    },
    error(strings: TemplateStringsArray, ...values: unknown[]) {
      if (!LOGGING_ENABLED) return
      const message = this.formatMessage(strings, values)

      // eslint-disable-next-line no-console
      console.log(`%c🚨 ${message}`, styles.error, ...values)
    }
  }

  return (
    <LoggerContext.Provider value={{ logger }}>
      {children}
    </LoggerContext.Provider>
  )
}

const useLogger = (): Logger => {
  const context = useContext(LoggerContext)

  if (context === undefined)
    throw new Error('useLogger must be used within a LoggerProvider')

  return context
}

export { LoggerProvider, useLogger }

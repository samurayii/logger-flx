import { EventEmitter } from "events";

export interface ILogger extends EventEmitter {
    readonly mode: string
    log: (message: unknown, mode?: string) => void
    info: (message: unknown, mode?: string) => void
    error: (message: unknown, mode?: string) => void
    warn: (message: unknown, mode?: string) => void
}

export interface ILoggerConfig {
    mode: string
    enable: boolean
    timestamp: string
    type: boolean
}
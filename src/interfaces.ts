import { EventEmitter } from "events";

export interface ILoggerFLX extends EventEmitter {
    readonly name: string
    log: (...messages: string[]) => void
    error: (...messages: string[]) => void
    warn: (...messages: string[]) => void
    debug: (...messages: string[]) => void
    critical: (...messages: string[]) => void
    verbose: (...messages: string[]) => void
    child: (name?: string, bindings?: {[key: string]: string}) => ILoggerFLX
}

export type TLoggerFLXConfigLevels = "critical" | "log" | "error" | "warn" | "debug" | "verbose"
export type TLoggerFLXConfigOutputTimestamp = "full" | "short" | "unix" | "none"
export type TLoggerFLXConfigOutputLevels = "critical" | "log" | "error" | "warn" | "debug" | "verbose"
export type TLoggerFLXConfigOutputBindings = "square" | "bracket" | "none"

export interface ILoggerFLXConfig {
    name: string
    levels: Array<TLoggerFLXConfigLevels>
    bindings: {
        [key: string]: string
    }
    output: {
        timestamp: TLoggerFLXConfigOutputTimestamp
        levels: Array<TLoggerFLXConfigOutputLevels>
        bindings: TLoggerFLXConfigOutputBindings
    }
}
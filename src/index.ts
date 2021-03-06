import * as chalk from "chalk";
import * as dateFormat from "dateformat";
import * as clone from "clone";
import { EventEmitter } from "events";
import { ILoggerFLX, ILoggerFLXConfig, TLoggerFLXConfigLevels } from "./interfaces";

export * from "./interfaces";

export class LoggerFLX extends EventEmitter implements ILoggerFLX {

    private readonly _levels_print_enable: {
        [key: string]: boolean
    }
    private readonly _levels_show_enable: {
        [key: string]: boolean
    }
    private readonly _levels_string: {
        [key: string]: string
    }

    private readonly _name_cache: string
    private readonly _bindings_cache: string

    constructor ( 
        private readonly _config: ILoggerFLXConfig 
    ) {

        super();

        this._levels_print_enable = {
            critical: false,
            error: false,
            log: false,
            debug: false,
            warn: false,
            verbose: false
        };

        this._levels_show_enable = {
            critical: false,
            error: false,
            log: false,
            debug: false,
            warn: false,
            verbose: false
        };

        for (const type_name of this._config.output.levels) {
            this._levels_show_enable[type_name] = true;
        }
        
        for (const type_name of this._config.levels) {
            this._levels_print_enable[type_name] = true;
        }

        this._levels_string = {
            critical: chalk.bgRed(" CRITICAL "),
            error: chalk.red("ERROR"),
            log: chalk.green("INFO"),
            debug: chalk.cyan("DEBUG"),
            warn: chalk.yellow("WARN"),
            verbose: chalk.bgGreen(" VERB "),
        };

        this._name_cache = "";
        this._bindings_cache = "";

        if (this._config.name !== "") {
            this._name_cache = `(${this._config.name}): `;
        }

        if (this._config.output.bindings !== "none" && Object.keys(this._config.bindings).length > 0) {
            
            const entries = Object.entries(this._config.bindings);
            const entries_str = [];

            for (const item of entries) {
                entries_str.push(item.join("="));
            }

            if (this._config.output.bindings === "square") {
                this._bindings_cache = `[${entries_str.join(",")}] `;
            }

            if (this._config.output.bindings === "bracket") {
                this._bindings_cache = `(${entries_str.join(",")}) `;
            }

        }

    }

    get name (): string {
        return this._config.name;
    }

    log (...messages: string[]): void {
        this.emit("message", "log", this._config.name, messages);
        if (this._levels_print_enable.log === false) {
            return;
        }
        this._print("log", "log", messages);
    }

    error (...messages: string[]): void {
        this.emit("message", "error", this._config.name, messages);
        if (this._levels_print_enable.error === false) {
            return;
        }
        this._print("error", "error", messages);
    }

    warn (...messages: string[]): void {
        this.emit("message", "warn", this._config.name, messages);
        if (this._levels_print_enable.warn === false) {
            return;
        }
        this._print("warn", "log", messages);
    }

    debug (...messages: string[]): void {
        this.emit("message", "debug", this._config.name, messages);
        if (this._levels_print_enable.debug === false) {
            return;
        }
        this._print("debug", "log", messages);
    }

    critical (...messages: string[]): void {
        this.emit("message", "critical", this._config.name, messages);
        if (this._levels_print_enable.critical === false) {
            return;
        }
        this._print("critical", "error", messages);
    }

    verbose (...messages: string[]): void {
        this.emit("message", "verbose", this._config.name, messages);
        if (this._levels_print_enable.verbose === false) {
            return;
        }
        this._print("verbose", "log", messages);
    }

    child (name: string = "", bindings: {[key: string]: string} = {}): ILoggerFLX {

        const config: ILoggerFLXConfig = clone(this._config);

        config.name = name;
        config.bindings = {
            ...config.bindings,
            ...bindings
        };

        return new LoggerFLX(config);
    }

    private _getTime (): string {

        if (this._config.output.timestamp === "none") {
            return "";
        }

        if (this._config.output.timestamp === "unix") {
            return `[${Date.now()}] `;
        }

        if (this._config.output.timestamp === "full") {
            return `[${dateFormat(Date.now(), "dd-mm-yyyy HH:MM:ss")}] `;
        }
        
        if (this._config.output.timestamp === "short") {
            return `[${dateFormat(Date.now(), "HH:MM:ss")}] `;
        }

        return "";
    }

    private _print (level: TLoggerFLXConfigLevels, fn: "log" | "error", messages: string[]): void {

        const message = `${this._name_cache}${messages.join(" ")}`;

        if (this._levels_show_enable[level] === true) {
            console[fn](`${this._getTime()}${this._levels_string[level]} ${message} ${chalk.gray(this._bindings_cache)}`);
        } else {
            console[fn](`${this._getTime()}${message} ${chalk.gray(this._bindings_cache)}`);
        }

    }

}
import * as chalk from "chalk";
import { EventEmitter } from "events";
import { ILogger, ILoggerConfig } from "./interfaces";

export * from "./interfaces";

export class Logger extends EventEmitter implements ILogger {

    private _modes: string[];

    constructor ( 
        private readonly _config: ILoggerConfig 
    ) {

        super();

        this._modes = [
            "prod",
            "dev",
            "debug"
        ];

        if (!this._modes.includes(this._config.mode)) {
            throw Error(`Mode must be ${this._modes.join()}`);
        }

        if (this._config.mode === "debug") {
            console.log(chalk.cyan("[LOGGER] Debug mode activated"));
        }

        if (this._config.mode === "dev") {
            console.log(chalk.cyan("[LOGGER] Developer mode activated"));
        }

    }

    private _print (message: unknown, type: string, mode: string, error: boolean = false): void {

        this.emit("message", message, type, mode);

        if (this._config.enable !== true) {
            return;
        }

        if (mode !== "prod" && this._config.mode !== "debug") {
            if (mode !== this._config.mode) {
                if (this._config.mode === "dev" && mode === "debug") {
                    return;
                }
                if (this._config.mode === "prod" && (mode === "dev" || mode === "debug")) {
                    return;
                }
            }
        }

        let total_message: unknown = message;

        if (this._config.type === true) {
            if (type === "info") {
                total_message = `${chalk.cyan("[INFO]")} ${total_message}`;
            } else if (type === "error") {
                total_message = `${chalk.red("[ERROR]")} ${total_message}`;
            } else if (type === "warning") {
                total_message = `${chalk.yellow("[WARNING]")} ${total_message}`;
            }
        }

        if (this._config.timestamp !== "none") {

            const now = new Date();

            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            let txt_hours = `${hours}`;
            let txt_minutes = `${minutes}`;
            let txt_seconds = `${seconds}`;

            if (hours < 10) {
                txt_hours = `0${hours}`;
            }
            if (minutes < 10) {
                txt_minutes = `0${minutes}`;
            }
            if (seconds < 10) {
                txt_seconds = `0${seconds}`;
            }

            if (this._config.timestamp === "time") {
                total_message = `[${txt_hours}:${txt_minutes}:${txt_seconds}] ${total_message}`;
            }

            if (this._config.timestamp === "full") {

                const month = now.getMonth()+1;
                const date = now.getDate();

                let txt_month = `${month}`;
                let txt_date = `${date}`;

                if (month < 10) {
                    txt_month = `0${month}`;
                }

                if (date < 10) {
                    txt_date = `0${txt_date}`;
                }

                total_message = `[${txt_date}.${txt_month}.${now.getFullYear()} ${txt_hours}:${txt_minutes}:${txt_seconds}] ${total_message}`;
            }

        }

        if (error === true) {
            console.error(total_message);
        } else {
            console.log(total_message);
        }

    }

    log (message: unknown, mode: string = "prod"): void {
        this._print(message, "log", mode);
    }

    info (message: unknown, mode: string = "prod"): void {
        this._print(message, "info", mode);
    }

    error (message: unknown, mode: string = "prod"): void {
        this._print(message, "error", mode, true);
    }

    warn (message: unknown, mode: string = "prod"): void {
        this._print(message, "warning", mode);
    }

}
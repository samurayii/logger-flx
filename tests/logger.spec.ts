import { 
    LoggerFLX, 
    TLoggerFLXConfigLevels, 
    TLoggerFLXConfigOutputBindings, 
    TLoggerFLXConfigOutputLevels, 
    TLoggerFLXConfigOutputTimestamp 
} from "../src/index";

describe("LoggerFLX", function() {

    it("all-levels, all-show (list)", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["critical", "log", "error", "warn", "debug"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"full",
                levels: <TLoggerFLXConfigOutputLevels[]>["critical", "log", "error", "warn", "debug"],
                bindings: <TLoggerFLXConfigOutputBindings>"square"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("all-levels, all-show (all)", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["all"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"full",
                levels: <TLoggerFLXConfigOutputLevels[]>["all"],
                bindings: <TLoggerFLXConfigOutputBindings>"square"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("none, all-show", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>[],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"full",
                levels: <TLoggerFLXConfigOutputLevels[]>["all"],
                bindings: <TLoggerFLXConfigOutputBindings>"square"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("all-list, none", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["critical", "log", "error", "warn", "debug"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"full",
                levels: <TLoggerFLXConfigOutputLevels[]>[],
                bindings: <TLoggerFLXConfigOutputBindings>"square"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("short time", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["critical", "log", "error", "warn", "debug"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"short",
                levels: <TLoggerFLXConfigOutputLevels[]>["critical", "log", "error", "warn", "debug"],
                bindings: <TLoggerFLXConfigOutputBindings>"square"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("binding none", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["critical", "log", "error", "warn", "debug"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"short",
                levels: <TLoggerFLXConfigOutputLevels[]>["critical", "log", "error", "warn", "debug"],
                bindings: <TLoggerFLXConfigOutputBindings>"none"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("binding bracket", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["critical", "log", "error", "warn", "debug"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"short",
                levels: <TLoggerFLXConfigOutputLevels[]>["critical", "log", "error", "warn", "debug"],
                bindings: <TLoggerFLXConfigOutputBindings>"bracket"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

    it("only critical", function() {

        const config = {
            name: "logger",
            levels: <TLoggerFLXConfigLevels[]>["critical"],
            bindings: {
                key1: "key1-val",
                key2: "key2-val"
            },
            output: {
                timestamp: <TLoggerFLXConfigOutputTimestamp>"short",
                levels: <TLoggerFLXConfigOutputLevels[]>["all"],
                bindings: <TLoggerFLXConfigOutputBindings>"square"
            }
        };
        
        
        const logger = new LoggerFLX(config);
        
        logger.error("error message");
        logger.log("log message");
        logger.critical("critical message");
        logger.warn("warn message");
        logger.debug("debug message");

    });

});


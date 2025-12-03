const customLevels = {
  custom: 35, // between info (30) and warn (40)
};

export const getLoggingConfig = (nodeEnv: string, level: string) => {
  const isDevelopment = nodeEnv === "development";

  return {
    level,
    customLevels,
    formatters: {
      level: (label: string, number: number) => {
        return {
          level: number,
          levelName: label,
        };
      },
    },

    transport: isDevelopment
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss.l",
            ignore: "pid,hostname",
            customLevels: Object.entries(customLevels)
              .map(([key, value]) => `${key}:${value}`)
              .join(","),
            useOnlyCustomProps: false,
          },
        }
      : undefined,

    timestamp: isDevelopment
      ? () => `,"time":"${new Date().toISOString()}"`
      : true,
  };
};

export const loggingConfig = getLoggingConfig(
  process.env.NODE_ENV || "development",
  process.env.LOGGING_LEVEL || "info",
);

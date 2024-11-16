module.exports = {
  apps: [
    {
      name: "turbo-build",
      script: "npx",
      args: "turbo build",
      cwd: "./",
      watch: false,
      log_file: "./logs/turbo-build.log",
      error_file: "./logs/turbo-build-error.log",
      time: true,
    },
    {
      name: "turbo-start",
      script: "npx",
      args: "turbo start",
      cwd: "./",
      watch: false,
      log_file: "./logs/turbo-start.log",
      error_file: "./logs/turbo-start-error.log",
      time: true,
    },
  ],
};

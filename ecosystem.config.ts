module.exports = {
  apps: [
    {
      name: "cinema-mono-repo",
      script: "yarn",
      args: "turbo start",
      cwd: "./",
      autorestart: true,
      watch: false,
    },
  ],
};

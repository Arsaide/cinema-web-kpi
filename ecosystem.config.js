module.exports = {
  apps: [
    {
      name: "cinema-mono-repo",
      script: "yarn",
      args: "turbo start",
      interpreter: "node",
      cwd: "./",
      autorestart: true,
      watch: false,
    },
  ],
};

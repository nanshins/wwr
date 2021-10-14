const isDevelopment = process.env.NODE_ENV === "development";
const buildDir = isDevelopment ? "development" : "release";

const rootPath = process.cwd();
const srcPath = `${rootPath}/src`;
const outputPath = `${rootPath}/${buildDir}/static`;

module.exports = {
  rootPath,
  srcPath,
  outputPath
};

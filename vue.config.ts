module.exports = setConfig();

function setConfig() {
  switch(import.meta.env.MODE) {
    case "offline":
      return {};
    case "development":
      return {
        devServer: {
          port: '8080',
          proxy: 'http://localhost'
        }
      };
    case "production":
      return {
        devServer: {
          port: '80',
          proxy: 'https://qmsurvey.pi.uni-bamberg.de'
        }
      };
  }

}
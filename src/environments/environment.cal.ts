export const environment = {
  production: false,
  whitelistedDomains: [
    'localhost:8000',
    'localhost:4200',
    'moio.cloud.local',
    'dev-api.my-appsolute-mobility.com'
  ],
  // apiHost: 'http://localhost:8000',
  apiHost: 'https://dev-api.my-appsolute-mobility.com',
  // apiHost: 'http://moio.cloud.local',
  socketHost: 'http://moio.broker.local:8089'
  // socketHost: 'http://localhost:8089'
};
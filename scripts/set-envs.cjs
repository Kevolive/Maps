const {writeFileSync, mkdirSync} = require('fs');


require('dotenv').config();


const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapsboxKey = process.env['MAPBOX_KEY'];

if (!mapsboxKey) {
  throw new Error('MAPBOX_KEY is not set in the environment variables');
}

const envConfigFile = `export const environment = {
    mapsboxKey: '${mapsboxKey}',
};
`;

mkdirSync('./src/environments', { recursive: true });
writeFileSync(targetPath, envConfigFile);
writeFileSync(targetPathDev, envConfigFile);

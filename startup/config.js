require('dotenv').config();

const env = 'dev';

const config = {
    'dev': {
        app: {
            port: parseInt(process.env.DEV_APP_PORT),
            env: 'dev'
        }
    }
}

module.exports = config[env];

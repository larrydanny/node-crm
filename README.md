# node-crm
connect microsoft dynamic365 using nodejs and axios

# packages
1. `adal-node`: Windows Azure Active Directory Authentication Library (ADAL) for Node.js. This library makes it easy for node.js applications to authenticate to AAD in order to access AAD protected web resources.
2. `axios`: Promise based HTTP client for the browser and node.js
3. `dotenv`: Dotenv is a zero-dependency module that loads environment variables from a `.env` file. To get the value use `process.env.VARIABLE_NAME`

# how to use
1. Download the zip files
2. add a `.env` file
3. add below variable with proper value
```
API_VERSION=version_of_your_api
APPLICATION_ID=your_api_application_id
AUTHORITY_HOST=your_api_host_url
CLIENT_SECRET=your_api_secret
TENANT=your_api_tenant
RESOURCE=your_api_url
```
4. Now, `npm i`
5. then, `npm start`

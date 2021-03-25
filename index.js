require("dotenv").config();
const AuthenticationContext = require("adal-node").AuthenticationContext;
const axios = require("axios");

const resource = process.env.RESOURCE; // URI that identifies the resource for which the token is valid.
const tenant = process.env.TENANT; // Azure Active Directory (AAD) Tenant name.
const applicationId = process.env.APPLICATION_ID; // Application Id of app registered under AAD.
const clientSecret = process.env.CLIENT_SECRET; // Secret generated for app. Read this environment variable.
const authorityHost = process.env.AUTHORITY_HOST;
const authorityUrl = `${authorityHost}/${tenant}`;
const apiVersion = process.env.API_VERSION;

const context = new AuthenticationContext(authorityUrl);

const authorize = () => {
  context.acquireTokenWithClientCredentials(
    resource,
    applicationId,
    clientSecret,
    async (err, tokenResponse) => {
      if (err) {
        console.log("Authorization failed", err);
      } else {
        const contacts = await getContacts(tokenResponse.accessToken);
        console.log("authorize -> contacts", contacts);
      }
    }
  );
};

authorize();

const getContacts = async token => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "OData-MaxVersion": "4.0",
      "OData-Version": "4.0",
      Accept: "application/json",
      "Content-Type": "application/json",
      Prefer:
        "odata.include-annotations=OData.Community.Display.V1.FormattedValue,return=representation"
    }
  };

  const response = await axios
    .get(
      `${resource}/api/data/${apiVersion}/contacts?$select=fullname&$top=5`,
      config
    )
    .then(res => res.data) // select only fullname and get last 5 data
    .catch(err => console.log(err.response.data.error));

  return response.value.map(item => {
    return {
      name: item.fullname
    };
  });
};

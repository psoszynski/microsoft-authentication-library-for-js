import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
// export const msalConfig: Configuration = {
//     auth: {
//         clientId: "4078d38b-8292-4013-b643-6302fba7d24a",
//         authority: "https://login.microsoftonline.com/9aaaf89b-c5c5-4c38-98dc-b0c99375f98e",
//         redirectUri: "http://localhost:3000",
//         postLogoutRedirectUri: "/"
//     }
// };

export const msalConfig: Configuration = {
    auth: {
        clientId: "41162cc9-4fd0-47aa-8d9f-292eba9c2df1",
        authority: "https://login.microsoftonline.com/512024a4-8685-4f03-8086-14a61730e817",
        redirectUri: "http://localhost/",
        postLogoutRedirectUri: "/"
    }
};

//Add here scopes for id token to be used at MS Identity Platform endpoints.
// export const loginRequest: PopupRequest = {
//     scopes: ["api://2e75de9b-4f34-4368-8201-4fb1d29922dd/access_menighetsplan_data openid profile"]
// };

export const loginRequest: PopupRequest = {
    scopes: ["openid profile email"]
};


// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me"
};

// Add here the endpoints for MS Graph API services you would like to use.
export const ansattOrgConfig = {
    getAlleSokEndpoint: "https://localhost:44318/api/Sokn/GetAlleSokn"
};

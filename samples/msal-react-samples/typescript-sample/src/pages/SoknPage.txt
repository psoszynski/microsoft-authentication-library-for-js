import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError, AccountInfo } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { callAnsattOrg } from "../utils/RegisterApiCall";

// Material-ui imports
import Paper from "@material-ui/core/Paper";

import "bootstrap/dist/css/bootstrap.min.css";

const SoknContent = () => {
    const { instance, inProgress } = useMsal();
    const [soknData, setSoknData] = useState<null|Sokn[]>(null);

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {

            callAnsattOrg().then(response => setSoknData(response)).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        ...loginRequest,
                        account: instance.getActiveAccount() as AccountInfo
                    });
                }
            });

        }
    }, [inProgress, instance]);

    return (
        <Paper>
            <div className="container">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Navn</th>
                            <th>Kommune</th>
                            <th>Organisasjonsnummer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {soknData && soknData.map(sokn =>
                            <tr>
                                <td>{sokn.navn}</td>
                                <td>{sokn.kommune}</td>
                                <td>{sokn.organisasjonsnummer}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Paper>
    );
};

export type Sokn = {
    navn: string,
    kommune: string,
    organisasjonsnummer: string
};

export function SoknPage() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
            errorComponent={ErrorComponent}
            loadingComponent={Loading}
        >
            <SoknContent />
        </MsalAuthenticationTemplate>
      )
};

import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import SignOutButton from "../SignOut";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function AccountPage(props) {
    const [copyMsg, setCopyMsg] = React.useState("tap to copy");
    
    return (
        <div className = "page">
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        <CopyToClipboard text={""} onCopy={() => window.location.reload()}>
                                    <center>
                                        <p>(Refresh &#8634;)</p>
                                    </center>
                        </CopyToClipboard>
                        <div className="colorheader">
                                
                                <h1>Account</h1>

                                <h3>{authUser.email}</h3>
                                <h2>Points: {authUser.points}</h2>
                                <CopyToClipboard text={authUser.uid} onCopy={() => setCopyMsg("Copied")}>
                                    <div>
                                        <span><b>Your ID </b>({copyMsg}):</span><br />
                                        <span>{authUser.uid}</span>
                                    </div>
                                </CopyToClipboard>

                                <br /><br />
                                <SignOutButton />
                        </div>   
                        <br /><br /><hr /><br />
                        <center>
                            <div className="colorheader">
                                <h2>Change Password</h2>
                            </div>
                            
                            <PasswordChangeForm />
                        </center>                 
                        
                    </div>
                )}
            </AuthUserContext.Consumer>
            <p></p>
        
        </div>
    );
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
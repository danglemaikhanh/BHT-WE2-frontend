import React from 'react';
export default function LoadingIndicator() {
    return <React.Fragment>
        <div className="progress mt-2">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar">Loading ...</div>
        </div>
    </React.Fragment>
}
import React from 'react';


const ErrorContext = React.createContext({
    default:'No-error'
});

const ContentState = React.createContext({
    default:'No-Content'
});

const WistlistState = React.createContext({
    default:'No-content'
})

export { ErrorContext, ContentState, WistlistState};

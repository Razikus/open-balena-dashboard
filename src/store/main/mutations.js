export function setToken (state, token) {
    state.token = token
    state.loggedIn = true
}

export function setSDK(state, sdk) {
    state.sdk = sdk
}

export function selectApplication(state, app) {
    state.selectedApplication = app
}

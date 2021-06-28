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
export function selectDevice(state, device) {
  state.selectedDevice = device
}
export function setTunnelerUrl(state, url) {
    state.tunnelerUrl = url
}

export function setSSLSuffix(state, SSLSuffix) {
    state.SSLSuffix = SSLSuffix
}

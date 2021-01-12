import Vue from 'vue'
import axios from 'axios'
import { boot } from 'quasar/wrappers'

Vue.prototype.$axios = axios

export default boot(async ({ app, router, store, Vue }) => {
    const client = {
        async getConnectionsForDevice(uuid) {
            const data = {
                deviceUUID: uuid
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/connections", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        },
        async getConnectionsForApp(id) {
            const data = {
                additionalLabels: {
                    deviceAppId: id
                }
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/connections", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        },
        async openDomainFor(uuid, domainName, remotePort, useXip, appId) {
            const data = {
                deviceUUID: uuid,
                remotePort: remotePort,
                forwarderType: "TRAEFIK",
                additionalSettings: {
                    domainName: domainName,
                    useXIP: useXip
                },
                additionalLabels: {
                    deviceAppId: appId
                }
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/requestConnection", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        },
        async openSSLDomainFor(uuid, domainName, remotePort, appId) {
            const data = {
                deviceUUID: uuid,
                remotePort: remotePort,
                forwarderType: "SSLTRAEFIK",
                additionalSettings: {
                    domainName: domainName
                },
                additionalLabels: {
                    deviceAppId: appId
                }
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/requestConnection", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        },
        async openSSHTraefik(uuid, domainName, remotePort, useXip, appId) {
            const data = {
                deviceUUID: uuid,
                remotePort: remotePort,
                forwarderType: "SSHTRAEFIK",
                additionalSettings: {
                    domainName: domainName,
                    useXIP: useXip
                },
                additionalLabels: {
                    deviceAppId: appId
                }
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/requestConnection", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        },
        async openSSH(uuid, localPort, remotePort, appId) {
            const data = {
                deviceUUID: uuid,
                remotePort: remotePort,
                localPort: localPort,
                forwarderType: "SSH",
                additionalLabels: {
                    deviceAppId: appId
                }
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/requestConnection", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        },
        async deleteConnections(uuid, localPort = undefined, remotePort = undefined, forwarderType = undefined, additionalSettings = { }, additionalLabels = { }) {
            const data = {
                deviceUUID: uuid,
                localPort: localPort,
                remotePort: remotePort,
                forwarderType: forwarderType,
                additionalSettings: additionalSettings,
                additionalLabels: additionalLabels
            }
            const res = await axios.post(store.state.main.tunnelerUrl + "/stopConnection", data, { headers: { Authorization: "Bearer " + store.state.main.token } })
            return res.data
        }
    }
    Vue.prototype.$tunnelerClient = client
})

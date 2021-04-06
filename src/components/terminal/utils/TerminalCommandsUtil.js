import getopts from "getopts"
import tableify from "tableify"

class TerminalCommandsUtil {
  constructor(uuid, sdk) {
    this.commands = ['list', 'logs']
    this.uuid = uuid
    this.sdk = sdk
    this.colors = ['#d50e3b', '#e501b4', '#15db07', '#dcdc30', '#00B3E6',
      '#e3b645', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
      '#E64D66', '#4DB380', '#FF4D4D', '#32dede', '#6666FF']
  }

  commandExists(command) {
    return this.commands.includes(command) || this.commands.filter(s => command.includes(s)).length > 0
  }

  processCommand(command) {
    const opts = getopts(command.split(" "))
    console.log(opts)
    if (command.includes("list")) {
      if (opts.a) {
        return this.getFullServicesForDevice()
      }
      return this.getServicesForDevice()
    } else if (opts._.includes("logs")) {
      if (opts.s) {
        if (opts.tail) {
          return this.getLogsByService(opts.s).then(messages => messages.slice(-(opts.tail))).then(formatted => formatted.join("<br>"))
        } else {
          return this.getLogsByService(opts.s).then(formatted => formatted.join("<br>"))
        }
      }
      if (opts._.length < 2) {
        if (opts.tail) {
          return this.getAllLogs().then(messages => messages.slice(-(opts.tail))).then(formatted => formatted.join("<br>"))
        }
        return this.getAllLogs().then(formatted => formatted.join("<br>"))
      } else {
        return new Promise(`Wrong format of 'logs' command. Try 'logs' or 'logs -s service name'`)
      }
    } else {
      // Else send error message in output of shell
      return new Promise(`'${command}' is not recognized as an internal command or external`)
    }
  }

  getAllLogs() {
    return this.sdk.logs.history(this.uuid).then(messages => {
      return this.getServicesAndFormatMessages(messages)
    })
  }

  getServicesAndFormatMessages(messages) {
    return this.getServicesMap().then(services => {
      return this.formatMessages(messages, services)
    })
  }

  getServicesMap() {
    return this.sdk.models.device.getWithServiceDetails(this.uuid).then(dev => {
      const servicesObj = {}
      Object.keys(dev.current_services).forEach(key => {
        const service = dev.current_services[key].filter(s => s.status.includes("Running"))[0]
        servicesObj[service.service_id] = key
      })
      return servicesObj
    })
  }

  formatMessages(messages, services) {
    return messages.map(message => this.formatSingleMessage(services, message))
  }

  formatSingleMessage(services, message) {
      if (message.isSystem) {
        return `<b style="color: white;">[SYSTEM]</b> [${this.formatDate(message.createdAt)}] ${message.message}`
      }
      if (message.isStdErr) {
        return `<b style="color: red;">[ERROR]</b> <span style="color: red"> [${this.formatDate(message.createdAt)}] ${message.message}</span>`
      }
      return `<b style="color: ${this.colors[Object.keys(services).indexOf("" + message.serviceId)]};">[${services[message.serviceId]}]</b> [${this.formatDate(message.createdAt)}] ${message.message}`
  }

  formatMessageAsPromise(message) {
    return this.getServicesMap().then(services => {
      return this.formatSingleMessage(services, message)
    })
  }

  getLogsByService(serviceName) {
    return this.sdk.logs.history(this.uuid).then(messages => {
      return this.getServicesMap().then(services => {
        return messages.filter(message => {
          console.log(services)
          return !message.isSystem && !message.isStdErr && services[message.serviceId] === (serviceName)
        }).map(message => {
          return `<b style="color: ${this.colors[Object.keys(services).indexOf("" + message.serviceId)]};">[${services[message.serviceId]}]</b> [${this.formatDate(message.createdAt)}] ${message.message}`
        })
      }).then(formatted => {
        if (formatted.length > 0) {
          return formatted
        } else {
          return "No messages from this service in last 1000 lines"
        }
      })
    })
  }

  formatDate(str) {
    return new Date(str).toLocaleString()
  }

  showHistory() {
    const uuid = this.uuid
    return this.sdk.logs.history(uuid).then(messages => {
      return messages.map(m => m)
    })
  }

  getServicesForDevice() {
    return this.sdk.models.device.getWithServiceDetails(this.uuid).then(dev => {
      console.log(dev)
      return Object.keys(dev.current_services).join(`<br>`)
    })
  }

  getFullServicesForDevice() {
    return this.sdk.models.device.getWithServiceDetails(this.uuid).then(dev => {
      console.log(dev)
      return tableify(Object.keys(dev.current_services).map(key => {
        const service = dev.current_services[key].filter(s => s.status.includes("Running"))[0]
        return {
          id: service.service_id,
          name: ` | ${key}`,
          status: `<div class="bg-green">${service.status}<div>`,
          'install date': `<div class="text-right">${new Date(service.install_date).toLocaleDateString()}</div>`
        }
      }))
    })
  }

  formatText(text) {
    return `<p>${text}</p>`
  }
}

export default TerminalCommandsUtil

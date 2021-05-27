# Open Balena Dashboard (open-balena-dashboard)

Dashboard for Open Balena.

Check it out here

https://razikus.github.io/open-balena-dashboard/#/


Click on screen to check the video:
[![Check the video](https://img.youtube.com/vi/7zWNzNoJsTE/0.jpg)](https://www.youtube.com/watch?v=7zWNzNoJsTE)

# Android
Check out Android app!
https://play.google.com/store/apps/details?id=eu.razniewski.openbalena.dashboard



# Features
* List applications
* List devices in applications
* Check status of devices
* Check logs of device
* Reboot device
* Restart application on device
* Expose port 80 of the device on dynamic DNS http://xip.io  (check https://github.com/Razikus/open-balena-tunneler)
* Expose ssh of the device on dynamic DNS http://xip.io with webssh client (check https://github.com/Razikus/open-balena-tunneler)
* Change and check variables of applications
* Change nd check variables of devices

# Features plan list
* Add applications
* Change log viewer to xterm

# Issues and enchancements

Feel free to add the features, and request one.



# Developing
## Notes
The project uses [Quasar](https://quasar.dev/) which uses Webpack4, so it requires Node.js 14 LTS (as explained [here](https://quasar.dev/quasar-cli/installation) ).
If you use a self-signed certificate for the open-balena server, you need to allow it for your browser or system wide (only Windows).

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

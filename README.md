<p align="center">
  <!-- LOGO
  <a href="https://github.com/hubhazard/core">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  -->
  <h3 align="center">HubHazard - Core</h3>
  <p align="center">
    A core module of the HubHazard server.
    <br />
    <a href="https://github.com/hubhazard/core/wiki">Documentation</a>
    ·
    <a href="https://github.com/hubhazard/core/issues">Report Bug</a>
    ·
    <a href="https://github.com/hubhazard/core/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [What is HubHazard?](#what-is-hubhazard)
  - [Documentation](#documentation)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Guides](#guides)
  - [Your first automation](#your-first-automation)
  - [Hubitat integration setup](#hubitat-integration-setup)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

This is a core module of the HubHazard server.

### What is HubHazard?

HubHazard is a simple home-automation server that allows you to easily write automations using [Typescirpt][typescript].
It's targeted towards people with basic programming skills. You don't have to be a professional developer to use it
effectively.

When using HubHazard our automations can be as simple as a _button toggling a light_ or as complex as _an automated
co-op escape room controller_. You could even integrate an AI to help you control your house. All you need is a device
that supports Node.js 10+, for example a $5 Raspberry Pi Zero W.

**The HubHazard server integrates with [Hubitat Elevation hub][hubitat]!**

### Documentation

The project documentation is available in for of a wiki at [https://github.com/hubhazard/core/wiki/][hubhazardcorewiki].

### Built With

- [Node.js][nodejs]
- [Nest.js][nestjs]
- [Typescript][typescript]

## Getting Started

Before we get started, let's explain some common terms you'll encounter throughout this guide:

- **Automation** - A piece of code responsible for handling specific events. An automation requests events by declaring
  triggers. An automation could for example switch lights on and off depending on an input from a group of motion sensors.
- **Event** - A piece of information describing something that happened. Events are sent to matching automations for
  handling. There could be an event describing that a light switch changed it's state.
- **Trigger** - A declaration describing what kind of events the automation requests.
- **Event service** - A functionality responsible for receiving/generating specific kind of events and propagating
  them to matching automations.
  
### Guides

- [Create a new project from the template](https://github.com/hubhazard/hubhazard-basic-template)
- [Create a new project from scratch](https://github.com/hubhazard/core/wiki/Create-new-project-from-scratch)
- [Your first automation](https://github.com/hubhazard/core/wiki/Your-first-automation)

### Hubitat integration setup

Before you can write automations for [Hubitat Elevation][hubitat] you need to install the Maker API app on
the Hubitat hub. Just follow [official instructions][makerapi].

For HubHazard to be able to receive events from Hubitat, you need to set the `URL to send device events to by POST`
field to:

`http://10.0.0.83:3000/api/hubitat/event`

Just replace the IP address with the IP address of the machine that will run the server. **Make sure the Hubitat hub and
your server machine have static IP addresses.**

While you're in Maker API app settings look at one of the example query URLs. You'll need parts of those URLs for
further HubHazard configuration. Let's take following URL as an example:

> **Get Device Info (replace [DeviceID] with actual subscribed device id**
>
> http://**10.0.0.178**/apps/api/**172**/devices/[DeviceID]?access_token=**64ac3f13-f640-42bc-ab8f-48ae8b40d106**

This URL contains 3 configuration values:

- Hubitat IP address: `10.0.0.178`
- Maker API app id: `172`
- Maker API access token: `64ac3f13-f640-42bc-ab8f-48ae8b40d106`

Let's get back to the server code. To be able to receive device events from Hubitat you need to register the
`HubitatDeviceEventsModule`. That module requires to be configured using the [Nest.js `ConfigModule`][nestjsconfig]. Install it first:

```
$ npm i @nestjs/config
or
$ yarn add $nestjs/config
```

Now create the `.env` file in the root directory of your project and fill it in with correct data from Maker API
settings screen:

```dotenv
HUBITAT_IP=10.0.0.178
HUBITAT_MAKER_API_APP_ID=172
HUBITAT_MAKER_API_ACCESS_TOKEN=64ac3f13-f640-42bc-ab8f-48ae8b40d106
```

Now register the `HubitatDeviceEventsModule` in your `AppModule`:

```ts
import { AutomationsModule, AutomationsService, HubitatDeviceEventsModule, TimerEventsModule } from '@hubhazard/core';
import { Module } from '@nestjs/common';
import { MyFirstAutomation } from './automations/my-first-automation';

@Module({
  imports: [AutomationsModule, HubitatDeviceEventsModule, TimerEventsModule],
  providers: [],
})
export class AppModule {
  constructor(
    private readonly automationsService: AutomationsService,
    private readonly myFirstAutomation: MyFirstAutomation,
  ) {
    automationsService.registerAutomation(myFirstAutomation);
  }
}
```

At this point when you'll [start the server][nestjsstart] the server will
connect to the Hubitat and fetch all devices details to `DevicesService` cache.

To finish it off here's an example of a simple automation using the Hubitat's device events:

```ts
import { Automation, HubitatDeviceEvent, HubitatDeviceTrigger, toggle } from '@hubhazard/core';
import { Injectable } from '@nestjs/common';

// Id's of Hubitat devices
const BASEMENT_CEILING_LIGHTS = 130;
const STAIRCASE_BUTTON = 42;
const STAIRCASE_LIGHT = 67;

@Injectable()
export class StaircaseButtonAutomation extends Automation {
  name = 'Staircase Button Automation';

  // A trigger for STAIRCASE_BUTTON's 'pushed' and 'doubleTapped' events
  triggers = [HubitatDeviceTrigger.for(STAIRCASE_BUTTON).where('pushed').changes().andWhere('doubleTapped').changes()];

  async handleEvent(automationEvent: HubitatDeviceEvent) {
    switch (automationEvent.attributeName) {
      case 'pushed': {
        await toggle(STAIRCASE_LIGHT);
        break;
      }
      case 'doubleTapped': {
        await toggle(BASEMENT_CEILING_LIGHTS);
        break;
      }
    }
  }
}
```

## Roadmap

See a list of [open issues][tasks] with the `task` label.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire,
and create. Any contributions you make are **greatly appreciated**.

1. Find an existing issue or create a new one
2. Tell us (in the issue) that you're working on it
3. Fork the project
4. Create your feature branch (`git checkout -b feature/AmazingFeature`)
5. Check if code is safe and readable.

- Ensure there are enough tests the test suite passes. (`npm run test`)
- Make sure your code is well formatted. (`npm run format`)
- Make sure your code is well formatted and lints. (`npm run lint`)
- Update the documentation
- Update changelog ([CHANGELOG.md][changelogfile])

6. Commit your changes. (`git commit -m 'Add some AmazingFeature'`)
7. Push to the branch. (`git push origin feature/AmazingFeature`)
8. Open a pull request.

See [`CONTRIBUTING.md`][contributingfile] from more information.

## License

Distributed under the MIT License. See [`LICENSE`][licensefile] for more information.

## Contact

Beniamin (Xkonti) Dudek - [@xkonti][twitterxkonti] - online.xkonti@gmail.com

Project Link: [https://github.com/hubhazard/core][hubhazardcore]

<!-- MARKDOWN LINKS & IMAGES -->

[licensefile]: ./LICENSE
[contributingfile]: ./CONTRIBUTING.md
[changelogfile]: ./CHANGELOG.md
[hubitat]: https://hubitat.com/
[makerapi]: https://docs.hubitat.com/index.php?title=Maker_API
[nodejs]: https://nodejs.org/en/
[nodejsreleases]: https://nodejs.org/en/about/releases/
[nodejsdownload]: https://nodejs.org/en/download/
[nestjs]: https://nestjs.com/
[nestjsinstallation]: https://docs.nestjs.com/#installation
[nestjsmodules]: https://docs.nestjs.com/modules
[nestjsstart]: https://docs.nestjs.com/cli/usages#nest-start
[nestjsconfig]: https://docs.nestjs.com/techniques/configuration
[typescript]: https://www.typescriptlang.org/
[tasks]: https://github.com/hubhazard/core/labels/task
[twitterxkonti]: https://twitter.com/xkonti
[hubhazardcore]: https://github.com/hubhazard/core
[hubhazardcorewiki]: https://github.com/hubhazard/core/wiki
[hubhazardtemplate]: https://github.com/hubhazard/hubhazard-basic-template

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

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

HubHazard is a simple home-automation server that allows you to easily write automations using [Typescirpt][typescript].
It's targeted towards people with basic programming skills. You don't have to be a professional developer to use it
effectively.

When using HubHazard our automations can be as simple as a _button toggling a light_ or as complex as _an automated
co-op escape room controller_. You could even integrate an AI to help you control your house. All you need is a device
that supports Node.js 10+, for example a \$5 Raspberry Pi Zero W.

**The HubHazard server integrates with [Hubitat Elevation hub][hubitat]!**

### Documentation

The project documentation is available in for of a wiki at [https://github.com/hubhazard/core/wiki/][hubhazardcorewiki].

### Built With

- [Node.js][nodejs]
- [Nest.js][nestjs]
- [Typescript][typescript]

## Getting Started

1. Create a new project:
   - [Using the template][hubhazardtemplate]
   - [From scratch](https://github.com/hubhazard/core/wiki/Create-new-project-from-scratch)
1. [Your first automation](https://github.com/hubhazard/core/wiki/Your-first-automation)
1. [Setup Hubitat integration](https://github.com/hubhazard/core/wiki/Setup-Hubitat-integration)

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
[nodejs]: https://nodejs.org/en/
[nestjs]: https://nestjs.com/
[typescript]: https://www.typescriptlang.org/
[tasks]: https://github.com/hubhazard/core/labels/task
[twitterxkonti]: https://twitter.com/xkonti
[hubhazardcore]: https://github.com/hubhazard/core
[hubhazardcorewiki]: https://github.com/hubhazard/core/wiki
[hubhazardtemplate]: https://github.com/hubhazard/hubhazard-basic-template

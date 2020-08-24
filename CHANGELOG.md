# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- Template:
## [Release version] - YYYY-MM-DD
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->

## [Unreleased]

## [0.1.0-beta.3] - 2020-08-22

### Added

- Added auto-generated documentation using TypeDoc and GitHub actions. [ #1 ]
- Added a documentation of `common` module functions and classes. [ #1 ]

### Removed

- Removed unused functions from `number-helpers`. [ #2 ]

## [0.1.0-beta.1] - 2020-08-21

### Added

- Initial release
- Added `AutomationsModule` module introducing simple automations and events services management.
- Added `HubitatApiModule` module to allow communication with [Hubitat Elevation](https://hubitat.com/) via
  [MakerAPI](https://docs.hubitat.com/index.php?title=Maker_API).
- Added `HubitatDeviceEventsModule` module to manage a local copy of all Hubitat's devices for receiving device update
  events, easier querying of devices data and simpler device command sending.
- Added `TimerEventsModule` module that allows for easy creaton of automations triggered periodically.
- Added `hubitat-capabilities` functions set allowing to use Hubitat's devices in the
  [capability-based](https://docs.hubitat.com/index.php?title=Driver_Capability_List) manner.
- Added `common` functions set to mostly simplify interactions with collections and random number generation for
  testing purposes.

[Unreleased]: https://github.com/hubhazard/core/compare/v0.1.0-beta.3...HEAD
[0.1.0-beta.3]: https://github.com/hubhazard/core/compare/v0.1.0-beta.1...v0.1.0-beta.3
[0.1.0-beta.1]: https://github.com/hubhazard/core/releases/tag/v0.1.0-beta.1

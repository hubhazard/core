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

### Added

- Added new event value filters when building Hubitat device event trigger definitions:
  - `isGreaterThan` and `wasGreaterThan` - accepts the event if new/previous value is greater than the one specified.
  - `isLesserThan` and `wasLesserThan` - accepts the event if new/previous value is lesser than the one specified.
  - `increase` and `decrease` - accepts the event if the value increased/decreased.
  - `customFilter` - allows to pass a custom event-matching function to be used.

## [0.1.0-beta.6] - 2020-08-27

### Added

- Added capability functions for thermostat devices:
  - `getCoolingSetpoint` and `setCoolingSetpoint`
  - `getHeatingSetpoint` and `setHeatingSetpoint`
  - `getThermostatSchedule` and `setThermostatSchedule`
  - `getSupportedThermostatFanModes`
  - `getSupportedThermostatModes`
  - `getThermostatFanMode` and `setThermostatFanMode`
  - `getThermostatMode` and `setThermostatMode`
  - `getThermostatOperatingState`
  - `getThermostatSetpoint` and `setThermostatSetpoint`
- Added capability functions for virtual thermostat devices:
  - `setSupportedThermostatFanModes`
  - `setSupportedThermostatModes`
  - `setThermostatOperatingState`
- Added capability function for virtual temperature sensor devices: `setTemperature`.
- Added capability-related helper function `enumListToStringList`.
- Added `isHubitatDeviceEvent` and `isTimerEvent` functions for easier checking events and triggers types.

## [0.1.0-beta.5] - 2020-08-26

### Added

- Tests for `AutomationEvent` class

### Changed

- The `Automation.handleEvent` function isn't marked as _internal_ anymore.
- Documentation links now direct to the project wiki
- Roadmap section now leads to a list of issues with a `task` label

## [0.1.0-beta.4] - 2020-08-25

### Added

- Completed the documentation of all source code. [ #7 ]

## [0.1.0-beta.3] - 2020-08-23

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

[unreleased]: https://github.com/hubhazard/core/compare/v0.1.0-beta.6...HEAD
[0.1.0-beta.6]: https://github.com/hubhazard/core/compare/v0.1.0-beta.5...v0.1.0-beta.6
[0.1.0-beta.5]: https://github.com/hubhazard/core/compare/v0.1.0-beta.4...v0.1.0-beta.5
[0.1.0-beta.4]: https://github.com/hubhazard/core/compare/v0.1.0-beta.3...v0.1.0-beta.4
[0.1.0-beta.3]: https://github.com/hubhazard/core/compare/v0.1.0-beta.1...v0.1.0-beta.3
[0.1.0-beta.1]: https://github.com/hubhazard/core/releases/tag/v0.1.0-beta.1

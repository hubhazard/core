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

## Unreleased

### Added

- Added support for [Lock capability](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock) by adding
  functions:
  - `getLockStatus`
  - `isLocked`
  - `isUnlocked`
  - `lock`
  - `unlock`
  - `setLock`

## 0.1.4 - 2020-09-13

### Added

- Added support for [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl) and
  [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl) capabilities by
  adding functions:
  - `close`
  - `getDoorPosition`
  - `isClosed`
  - `open`
  - `setPosition`
- Added support for [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve) capability by adding
  functions:
  - `close`
  - `getValvePosition`
  - `isClosed`
  - `open`
  - `setPosition`
- Added support for [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
  capability by adding functions:
  - `close`
  - `getWindowShadeCoverage`
  - `getWindowShadePosition`
  - `isClosed`
  - `open`
  - `setPosition`
  - `setWindowShadeCoverage`
- Added support for [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
  capability in virtual devices by adding functions:
  - `close`
  - `open`
- Added support for [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl),
  [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl),
  [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve),
  [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade) capabilities in `isOpen`
  function.
- Added capability-related types:
  - `EDoorStatus`
  - `EWindowShadePosition`

### Changed

- Renamed `EOpenStatus` type to `EOpenClosedPosition` for greater compatibility with other capabilities.

## 0.1.3 - 2020-09-07

### Added

- Hubitat capabilities module:
  - Generic `getLevel` function for capabilities: MusicPlayer, SwitchLevel
  - Generic functions for capabilities: Bulb, Light, Outlet, RelaySwitch, SamsungTV, Switch:
    - `isAnyOn`
    - `isOn`
    - `setSwitch`
    - `switchOff`
    - `switchOn`
    - `toggle`
  - Generic `isOpen` function for ContactSensor capability.
  - Generic `isPresent` function for capabilities: Beacon, PresenceSensor.
  - `setThermostatSetpoint` function for **virtual** thermostats.
  - `isAccelerating` function for AccelerationSensor capability.
  - `setAcceleration` function for **virtual** acceleration sensors.
  - `getCarbonDioxide` function for CarbonDioxideMeasurement capability.
  - `getCarbonMonoxide` function for CarbonMonoxideMeasurement capability.
  - `getIlluminance` function for IlluminanceMeasurement capability.

### Changed

- Extracted Hubitat capabilities functions and types to separate files to simplify the codebase (#44)
- Rename `whichButtonIsDoubleTapped` to `whichButtonDoubleTapped`
- Rename `whichButtonIsHeld` to `whichButtonHeld`
- Rename `whichButtonIsPushed` to `whichButtonPushed`
- Rename `whichButtonIsReleased` to `whichButtonReleased`

### Removed

- Hubitat capabilities module:
  - Removed capability-specific functions:
    - `getSwitchLevel` - use `getLevel`
    - `isAnyBulbOn` - use `isAnyOn`
    - `isAnyLightOn` - use `isAnyOn`
    - `isAnyOutletOn` - use `isAnyOn`
    - `isAnyRelaySwitchOn` - use `isAnyOn`
    - `isAnySwitchOn` - use `isAnyOn`
    - `isBulbOn` - use `isOn`
    - `isLightOn` - use `isOn`
    - `isOutletOn` - use `isOn`
    - `isRelaySwitchOn` - use `isOn`
    - `isSwitchOn` - use `isOn`
    - `isContactOpen` - use `isOpen`
    - `setBulb` - use `setSwitch`
    - `setLight` - use `setSwitch`
    - `setOutlet` - use `setSwitch`
    - `setRelaySwitch` - use `setSwitch`
    - `toggleBulb` - use `toggle`
    - `toggleLight` - use `toggle`
    - `toggleOutlet` - use `toggle`
    - `toggleRelaySwitch` - use `toggle`
    - `toggleSwitch` - use `toggle`

## 0.1.2 - 2020-09-01

### Changed

- Automations do not need manual registration by calling the `automationsService.registerAutomation(...)` anymore.

## 0.1.1 - 2020-09-01

### Removed

- Move guides in README.md to the wiki

## 0.1.0-beta.7 - 2020-08-29

### Added

- Added new event value filters when building Hubitat device event trigger definitions:
  - `isGreaterThan` and `wasGreaterThan` - accepts the event if new/previous value is greater than the one specified.
  - `isLesserThan` and `wasLesserThan` - accepts the event if new/previous value is lesser than the one specified.
  - `increase` and `decrease` - accepts the event if the value increased/decreased.
  - `customFilter` - allows to pass a custom event-matching function to be used.

## 0.1.0-beta.6 - 2020-08-27

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

## 0.1.0-beta.5 - 2020-08-26

### Added

- Tests for `AutomationEvent` class

### Changed

- The `Automation.handleEvent` function isn't marked as _internal_ anymore.
- Documentation links now direct to the project wiki
- Roadmap section now leads to a list of issues with a `task` label

## 0.1.0-beta.4 - 2020-08-25

### Added

- Completed the documentation of all source code. [ #7 ]

## 0.1.0-beta.3 - 2020-08-23

### Added

- Added auto-generated documentation using TypeDoc and GitHub actions. [ #1 ]
- Added a documentation of `common` module functions and classes. [ #1 ]

### Removed

- Removed unused functions from `number-helpers`. [ #2 ]

## 0.1.0-beta.1 - 2020-08-21

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

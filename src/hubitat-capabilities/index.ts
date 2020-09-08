/**
 * The HubitatCapabilities module is a collection of functions that simplify
 * interactions with Hubitat's devices. Those functions are following the
 * naming conventions and functionalities of
 * [Hubitat device capabilities](https://docs.hubitat.com/index.php?title=Driver_Capability_List).
 *
 * **These functions are intended to be used within automations only.**
 *
 * @packageDocumentation
 * @module HubitatCapabilities
 * @preferred
 */

/* FUNCTIONS */

export * from './functions/get-alarm-setting.function';
export * from './functions/get-battery-status.function';
export * from './functions/get-carbon-dioxide.function';
export * from './functions/get-carbon-monoxide.function';
export * from './functions/get-contact-sensor-status.function';
export * from './functions/get-cooling-setpoint.function';
export * from './functions/get-heating-setpoint.function';
export * from './functions/get-illuminance.function';
export * from './functions/get-level.function';
export * from './functions/get-location-mode.function';
export * from './functions/get-number-of-buttons.function';
export * from './functions/get-supported-thermostat-fan-modes.function';
export * from './functions/get-supported-thermostat-modes.function';
export * from './functions/get-temperature.function';
export * from './functions/get-thermostat-fan-mode.function';
export * from './functions/get-thermostat-mode.function';
export * from './functions/get-thermostat-operating-state.function';
export * from './functions/get-thermostat-schedule.function';
export * from './functions/get-thermostat-setpoint.function';

export * from './functions/is-accelerating';
export * from './functions/is-any-on.function';
export * from './functions/is-motion-detected.function';
export * from './functions/is-on.function';
export * from './functions/is-open.function';
export * from './functions/is-present.function';

export * from './functions/refresh.function';

export * from './functions/set-acceleration.function';
export * from './functions/set-alarm-setting.function';
export * from './functions/set-cooling-setpoint.function';
export * from './functions/set-heating-setpoint.function';
export * from './functions/set-level.funciton';
export * from './functions/set-supported-thermostat-fan-modes.function';
export * from './functions/set-supported-thermostat-modes.function';
export * from './functions/set-switch.function';
export * from './functions/set-temperature.function';
export * from './functions/set-thermostat-fan-mode.function';
export * from './functions/set-thermostat-mode.function';
export * from './functions/set-thermostat-operating-state.function';
export * from './functions/set-thermostat-schedule.function';
export * from './functions/set-thermostat-setpoint.function';

export * from './functions/start-level-change.function';
export * from './functions/stop-level-change.function';

export * from './functions/switch-off.function';
export * from './functions/switch-on.function';

export * from './functions/toggle.function';

export * from './functions/which-button-double-tapped.function';
export * from './functions/which-button-held.function';
export * from './functions/which-button-pushed.function';
export * from './functions/which-button-released.function';

/* HELPERS */

export * from './helpers/enum-list-to-string-list.function';
export * from './helpers/get-device.function';

/* TYPES */

export * from './types/active-status.type';
export * from './types/alarm-setting.type';
export * from './types/level-change-direction.type';
export * from './types/open-status.type';
export * from './types/switch-status.type';
export * from './types/thermostat-fan-modes.type';
export * from './types/thermostat-modes.type';
export * from './types/thermostat-operating-modes.type';

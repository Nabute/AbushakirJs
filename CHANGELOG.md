## [1.5.2] - 2025-04-17

### Added

- **ECMAScript Date API Compatibility** to `EtDatetime`, including:
  - **Getters**:  
    `getDay()`, `getYear()`,  
    `getUTCDate()`, `getUTCDay()`, `getUTCFullYear()`,  
    `getUTCMonth()`, `getUTCHours()`, `getUTCMinutes()`, `getUTCSeconds()`, `getUTCMilliseconds()`
  - **Setters**:  
    `setDate()`, `setFullYear()`, `setMonth()`, `setHours()`, `setMinutes()`, `setSeconds()`, `setMilliseconds()`, `setTime()`  
    `setYear()` (legacy), and UTC variants:  
    `setUTCDate()`, `setUTCFullYear()`, `setUTCMonth()`, `setUTCHours()`, `setUTCMinutes()`, `setUTCSeconds()`, `setUTCMilliseconds()`
  - **Formatters**:  
    `toDateString()`, `toTimeString()`, `toUTCString()`,  
    `toLocaleString()`, `toLocaleDateString()`, `toLocaleTimeString()`

- **Temporal API Support**:  
  `toTemporalInstant()` (via ES2024 or `@js-temporal/polyfill`)

- Comprehensive **test coverage**:
  - Unit tests for all new API methods
  - Edge case tests for `fourDigits()` and partially `sixDigits()`
  - Symbol coercion and `toJSON()` behavior

- **JSDoc Comments** for all new methods and formatters

### Changed

- Cleaned up internal formatting helpers for year output

---

## [1.5.0] – 2025-04-04

### Added
- ECMAScript-compatible APIs for `EtDatetime` and `Duration`
- `Symbol.toPrimitive` and `toISOString()` for proper value coercion
- Static constructors (`EtDatetime.now()`)

### Changed
- `EtDatetime.toString()` now returns ISO 8601 style format
- `Duration` refactored for immutability, testability, and consistency

### Fixed
- Legacy `Duration` class's shared state issue with `_duration`
- Argument parsing and type safety across both classes

### Removed
- `Duration._duration` shared static field
- Legacy string formatting logic

---

**Migration Tip:** If you used `.toString()` or accessed `Duration._duration`, you should switch to instance methods like `.inMicroseconds` or `.toISOString()`.

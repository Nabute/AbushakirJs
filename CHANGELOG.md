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

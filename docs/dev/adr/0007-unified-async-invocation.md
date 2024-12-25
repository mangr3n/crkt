# 7. Unified Async Invocation Strategy

Date: 2024-12-24

## Status
Proposed

## Context
The project needs a consistent way to handle async invocations across different environments (browser and Node.js). Currently, the scheduling strategy isn't unified, which can lead to inconsistent behavior between platforms. We need a single decision point that can choose the appropriate scheduling mechanism based on the environment and performance requirements.

## Decision
Create a unified async invocation system that:
1. Uses a single entry point for all async scheduling
2. Dynamically selects between MessageChannel and microtaskQueue based on context
3. In browser environments, aligns with frame refresh rates when appropriate
4. In Node.js environments, uses an alternative scheduling strategy optimized for server-side performance

The system will:
- Use MessageChannel for tasks that should align with frame updates in the browser
- Use microtaskQueue for high-priority async operations
- Provide a platform-agnostic API while handling platform-specific implementations internally

## Consequences
### Positive
- Consistent async behavior across platforms
- Better control over task scheduling
- Improved performance through optimized scheduling
- Cleaner API for async operations
- Better testability through unified interface

### Negative
- Need to maintain different implementations for different platforms
- Potential complexity in handling edge cases
- Need to carefully manage task priorities

## Implementation Plan
1. Create a unified AsyncInvoker interface
2. Implement platform detection logic
3. Create browser-specific implementation using requestAnimationFrame/MessageChannel
4. Create Node.js-specific implementation using appropriate scheduling mechanisms
5. Add configuration options for scheduling strategy
6. Migrate existing async code to use new unified system
7. Add comprehensive tests for both platforms
8. Document platform-specific behaviors and considerations

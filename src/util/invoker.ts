// Scheduler that balances between microtasks and macrotasks
class TaskScheduler {
  private lastYieldTime: number = 0;
  private readonly YIELD_INTERVAL: number = 15; // ms before yielding to event loop
  
  constructor() {
    this.lastYieldTime = performance.now();
  }

  private shouldYieldToEventLoop(): boolean {
    const now = performance.now();
    const timeSinceLastYield = now - this.lastYieldTime;
    if (timeSinceLastYield >= this.YIELD_INTERVAL) {
      this.lastYieldTime = now;
      return true;
    }
    return false;
  }

  schedule(task: () => void): void {
    if (this.shouldYieldToEventLoop()) {
      // Use setTimeout to yield to the event loop
      setTimeout(task, 0);
    } else {
      // Use microtask for efficiency when we haven't exceeded our time budget
      queueMicrotask(task);
    }
  }
}

const scheduler = new TaskScheduler();

export const asyncInvoker = (v: any, handler: (v: any) => void): void => {
  queueMicrotask(() => handler(v));
};

export const syncInvoker = (v: any, handler: (v: any) => void): void => handler(v);

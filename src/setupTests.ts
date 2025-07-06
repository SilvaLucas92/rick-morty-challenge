import "@testing-library/jest-dom";
import { TextEncoder } from "util";


Object.assign(global, { TextEncoder });


global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

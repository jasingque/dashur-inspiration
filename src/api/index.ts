// Main API exports
export { default as api } from './axios';
export { authAPI } from './auth';
export { careersAPI } from './careers';
export { contactAPI } from './contact';
export { adminAPI } from './admin';

// Re-export types
export type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from './auth';

export type {
  Position,
  JobApplication,
  ApplicationData,
} from './careers';

export type {
  ContactData,
} from './contact';

export type {
  AdminApplication,
  AdminContact,
  AdminPosition,
  Activity,
} from './admin';

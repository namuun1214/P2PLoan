export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any; // 👈️ turn off type checking
  }
}

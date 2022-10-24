export {};

declare global {
  interface Window {
    recaptchaVerifier: ApplicationVerifier;
    confirmationResult: ConfirmationResult;
  }
}

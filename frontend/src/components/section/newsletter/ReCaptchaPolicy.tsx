export default function ReCaptchaPolicy() {
  return (
    <p className="text-xs text-muted-foreground">
      This site is protected by reCAPTCHA and the Google{' '}
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
        Privacy Policy
      </a>{' '}
      and{' '}
      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">
        Terms of Service
      </a>{' '}
      apply.
    </p>
  );
}

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from "@ioc:Adonis/Core/Validator";

validator.rule("complexPassword", (value, _, options) => {
  if (typeof value !== "string") {
    return;
  }
  const passwordRegexLowercase: RegExp = /[a-z]/;
  const passwordRegexUppercase: RegExp = /[A-Z]/;
  const passwordRegexDigit: RegExp = /[0-9]/;
  const passwordRegexSpecialCharacter: RegExp = /[^a-zA-Z0-9]/;

  function validatePasswordLowercase(password: string): boolean {
    return passwordRegexLowercase.test(password);
  }
  function validatePasswordUppercase(password: string): boolean {
    return passwordRegexUppercase.test(password);
  }
  function validatePasswordDigit(password: string): boolean {
    return passwordRegexDigit.test(password);
  }
  function validatePasswordSpecialCharacter(password: string): boolean {
    return passwordRegexSpecialCharacter.test(password);
  }

  const password: string = value;
  const isValidWithLowercase: boolean = validatePasswordLowercase(password);
  const isValidWithUppercase: boolean = validatePasswordUppercase(password);
  const isValidWithDigit: boolean = validatePasswordDigit(password);
  const isValidWithSpecialCharacter: boolean =
    validatePasswordSpecialCharacter(password);

  if (!isValidWithLowercase) {
    options.errorReporter.report(
      options.pointer,
      "passwordStrength",
      "password needs at least one lowercase letter",
      options.arrayExpressionPointer
    );
  }
  if (!isValidWithUppercase) {
    options.errorReporter.report(
      options.pointer,
      "passwordStrength",
      "password needs at least one uppercase letter",
      options.arrayExpressionPointer
    );
  }
  if (!isValidWithDigit) {
    options.errorReporter.report(
      options.pointer,
      "passwordStrength",
      "password needs at least one digit",
      options.arrayExpressionPointer
    );
  }
  if (!isValidWithSpecialCharacter) {
    options.errorReporter.report(
      options.pointer,
      "passwordStrength",
      "password needs at least one special character",
      options.arrayExpressionPointer
    );
  }
});

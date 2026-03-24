class SecurityUtils {
  static PASSWORD_REQUIREMENTS = {
    minLength: parseInt(process.env.PASSWORD_MIN_LENGTH, 10) || 8,
    requireUppercase: process.env.PASSWORD_REQUIRE_UPPERCASE !== "false",
    requireLowercase: process.env.PASSWORD_REQUIRE_LOWERCASE !== "false",
    requireNumbers: process.env.PASSWORD_REQUIRE_NUMBERS !== "false",
    requireSymbols: process.env.PASSWORD_REQUIRE_SYMBOLS !== "false",
  };

  /**
   * Validate password based on rules
   * @param {string} password
   * @returns {{ success: boolean, errors: string[] }}
   */
  static validatePassword(password) {
    const errors = [];
    const {
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumbers,
      requireSymbols,
    } = this.PASSWORD_REQUIREMENTS;

    //  Empty password check
    if (!password || typeof password !== "string") {
      return {
        success: false,
        errors: ["Password is required"],
      };
    }

    //  Length check
    if (password.length < minLength) {
      errors.push(`Password must be at least ${minLength} characters long`);
    }

    //  Uppercase check
    if (requireUppercase && !/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    //  Lowercase check
    if (requireLowercase && !/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    //  Number check
    if (requireNumbers && !/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    //  Symbol check
    if (requireSymbols && !/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    //  Weak passwords check
    const weakPasswords = new Set([
      "password",
      "123456",
      "qwerty",
      "admin",
      "letmein",
      "password123",
      "admin123",
      "12345678",
      "welcome",
    ]);

    if (weakPasswords.has(password.toLowerCase())) {
      errors.push("Password is too common and easily guessable");
    }

    return {
      success: errors.length === 0,
      errors,
    };
  }
}

export default SecurityUtils;

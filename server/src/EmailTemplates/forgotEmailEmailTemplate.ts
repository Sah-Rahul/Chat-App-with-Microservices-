interface ForgotPasswordProps {
  userName: string;
  resetPasswordUrl: string;
  resetCode: string;
  expiryMinutes: number;
}

export const forgotPasswordEmailTemplate = ({
  userName,
  resetPasswordUrl,
  resetCode,
  expiryMinutes,
}: ForgotPasswordProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - Meridian University</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <!-- Preview text -->
      <div style="display: none; font-size: 1px; color: #f4f7fa; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Reset your Meridian University password securely. This link expires in ${expiryMinutes} minutes.
      </div>

      <!-- Main wrapper -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7fa; padding: 20px 0;">
        <tr>
          <td align="center">
            
            <!-- Email container -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
              
              <!-- Header with gradient -->
              <tr>
                <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center">
                        <!-- Logo/Brand -->
                        <div style="margin-bottom: 15px;">
                          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="28" fill="#ffffff" opacity="0.15"/>
                            <path d="M30 10L45 20V40L30 50L15 40V20L30 10Z" fill="#ffffff"/>
                            <circle cx="30" cy="30" r="8" fill="#1e3a8a"/>
                          </svg>
                        </div>
                        <h1 style="margin: 0; font-size: 32px; color: #ffffff; font-weight: 700; letter-spacing: -0.5px;">
                          Meridian University
                        </h1>
                        <p style="margin: 8px 0 0; font-size: 14px; color: #e0e7ff; letter-spacing: 2px; text-transform: uppercase; font-weight: 500;">
                          Academic Excellence
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Main content -->
              <tr>
                <td style="padding: 50px 40px;">
                  
                  <!-- Icon -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); padding: 20px; border-radius: 50%; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5ZM20 12C21.657 12 23 13.343 23 15C23 16.657 21.657 18 20 18C18.343 18 17 16.657 17 15C17 13.343 18.343 12 20 12ZM20 32C16.686 32 13.686 30.314 12 27.657C12.045 24.967 17.333 23.5 20 23.5C22.657 23.5 27.955 24.967 28 27.657C26.314 30.314 23.314 32 20 32Z" fill="#3b82f6"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Greeting -->
                  <h2 style="margin: 0 0 20px; font-size: 24px; color: #1f2937; text-align: center; font-weight: 600;">
                    Password Reset Request
                  </h2>

                  <p style="margin: 0 0 15px; font-size: 16px; color: #4b5563; text-align: center; line-height: 1.6;">
                    Hello <strong style="color: #1e3a8a;">${userName}</strong>,
                  </p>

                  <p style="margin: 0 0 30px; font-size: 15px; color: #6b7280; text-align: center; line-height: 1.7;">
                    We received a request to reset the password for your Meridian University account. Use the verification code below or click the button to proceed.
                  </p>

                  <!-- OTP Code Box -->
                  <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px dashed #3b82f6; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
                    <p style="margin: 0 0 10px; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                      Verification Code
                    </p>
                    <div style="font-size: 36px; font-weight: 700; color: #1e3a8a; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                      ${resetCode}
                    </div>
                    <p style="margin: 15px 0 0; font-size: 13px; color: #9ca3af;">
                      ⏱️ Expires in <strong style="color: #dc2626;">${expiryMinutes} minutes</strong>
                    </p>
                  </div>

                  <!-- Divider -->
                  <div style="text-align: center; margin: 35px 0; position: relative;">
                    <div style="border-top: 1px solid #e5e7eb;"></div>
                    <span style="background-color: #ffffff; padding: 0 15px; position: relative; top: -12px; font-size: 13px; color: #9ca3af; font-weight: 500;">
                      OR
                    </span>
                  </div>

                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 35px 0;">
                    <a href="${resetPasswordUrl}" 
                       target="_blank" 
                       style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(30, 58, 138, 0.4); transition: all 0.3s ease;">
                      Reset Your Password
                    </a>
                  </div>

                  <!-- Warning box -->
                  <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px; padding: 16px; margin: 30px 0;">
                    <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.5;">
                      <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact our support team immediately. Your account remains secure.
                    </p>
                  </div>

                  <!-- Alternative link -->
                  <p style="margin: 25px 0 0; font-size: 13px; color: #9ca3af; text-align: center; line-height: 1.6;">
                    Having trouble with the button? Copy and paste this link into your browser:<br>
                    <a href="${resetPasswordUrl}" style="color: #3b82f6; word-break: break-all; text-decoration: none;">${resetPasswordUrl}</a>
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px 40px; border-top: 1px solid #e5e7eb;">
                  
                  <!-- Support info -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center">
                        <p style="margin: 0 0 15px; font-size: 14px; color: #6b7280;">
                          Need assistance? We're here to help!
                        </p>
                        <p style="margin: 0 0 20px; font-size: 14px;">
                          <a href="mailto:support@meridian.edu" style="color: #3b82f6; text-decoration: none; font-weight: 600;">support@meridian.edu</a>
                          <span style="color: #d1d5db; margin: 0 8px;">|</span>
                          <a href="tel:+1234567890" style="color: #3b82f6; text-decoration: none; font-weight: 600;">+1 (234) 567-890</a>
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Social links -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <a href="#" style="display: inline-block; margin: 0 8px;">
                          <img src="https://img.icons8.com/fluency/30/facebook-new.png" alt="Facebook" width="28" height="28" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 8px;">
                          <img src="https://img.icons8.com/fluency/30/twitter.png" alt="Twitter" width="28" height="28" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 8px;">
                          <img src="https://img.icons8.com/fluency/30/linkedin.png" alt="LinkedIn" width="28" height="28" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 8px;">
                          <img src="https://img.icons8.com/fluency/30/instagram-new.png" alt="Instagram" width="28" height="28" style="display: block;" />
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Copyright -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center">
                        <p style="margin: 0 0 10px; font-size: 12px; color: #9ca3af; line-height: 1.5;">
                          &copy; ${new Date().getFullYear()} Meridian University. All rights reserved.
                        </p>
                        <p style="margin: 0; font-size: 11px; color: #d1d5db;">
                          <a href="https://meridian.edu/privacy" style="color: #6b7280; text-decoration: none; margin: 0 8px;">Privacy Policy</a>
                          <span style="color: #d1d5db;">•</span>
                          <a href="https://meridian.edu/terms" style="color: #6b7280; text-decoration: none; margin: 0 8px;">Terms of Service</a>
                          <span style="color: #d1d5db;">•</span>
                          <a href="https://meridian.edu/unsubscribe" style="color: #6b7280; text-decoration: none; margin: 0 8px;">Unsubscribe</a>
                        </p>
                        <p style="margin: 15px 0 0; font-size: 11px; color: #d1d5db; line-height: 1.5;">
                          Meridian University, 123 Academic Drive, University City, ST 12345
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

            </table>

            <!-- Extra spacing -->
            <div style="height: 20px;"></div>

          </td>
        </tr>
      </table>
      
    </body>
    </html>
  `;
};
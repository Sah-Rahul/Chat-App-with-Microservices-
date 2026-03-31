export const PasswordResetEmailTemplate = (userName: string): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password – LearnHub</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0f1117;font-family:'DM Sans',sans-serif;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="background-color:#0f1117;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="max-width:600px;width:100%;background-color:#16181f;border-radius:20px;
                 overflow:hidden;border:1px solid #2a2d3a;
                 box-shadow:0 24px 64px rgba(0,0,0,0.6);">

   
          <tr>
            <td style="
              background: linear-gradient(145deg, #1a1040 0%, #2a1545 50%, #1a1535 100%);
              padding: 52px 40px 44px;
              text-align: center;
              border-bottom: 1px solid #2a2d3a;
            ">
              <!-- Icon -->
              <div style="
                display:inline-block;
                width:76px;height:76px;
                background:linear-gradient(135deg,#ff6b6b,#ee5a6f);
                border-radius:20px;
                margin-bottom:20px;
                line-height:76px;
                font-size:36px;
                box-shadow:0 12px 40px rgba(255,107,107,0.35);
              ">🔐</div>

              <h1 style="
                margin:0 0 8px;
                font-family:'DM Serif Display',Georgia,serif;
                font-size:34px;
                font-weight:400;
                color:#f0eeff;
                letter-spacing:-0.5px;
                line-height:1.2;
              ">
                Password Reset
              </h1>

              <p style="
                margin:0;
                font-size:13px;
                color:#7b7fa8;
                letter-spacing:3px;
                text-transform:uppercase;
                font-weight:500;
              ">
                LearnHub Security
              </p>
            </td>
          </tr>

           
          <tr>
            <td style="padding:48px 40px 36px;">

              <!-- Greeting -->
              <h2 style="
                margin:0 0 16px;
                font-family:'DM Serif Display',Georgia,serif;
                font-size:28px;
                font-weight:400;
                font-style:italic;
                color:#e8e4ff;
                letter-spacing:-0.3px;
              ">
                Hi ${userName},
              </h2>

              <!-- Divider line -->
              <div style="width:48px;height:3px;background:linear-gradient(90deg,#ff6b6b,#ee5a6f);border-radius:2px;margin-bottom:28px;"></div>

              <!-- Body text -->
              <p style="
                margin:0 0 18px;
                color:#9097b8;
                font-size:16px;
                line-height:1.75;
              ">
                We received a request to reset the password for your LearnHub account. Don't worry — it happens to the best of us!
              </p>

              <p style="
                margin:0 0 36px;
                color:#9097b8;
                font-size:16px;
                line-height:1.75;
              ">
                Click the button below to create a new password. This link will expire in <strong style="color:#ffa8a8;">1 hour</strong> for security reasons.
              </p>

         
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 36px;">
                <tr>
                  <td align="center"
                    style="
                      background:linear-gradient(135deg,#ff6b6b 0%,#ee5a6f 100%);
                      border-radius:12px;
                      box-shadow:0 8px 32px rgba(255,107,107,0.4);
                    ">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="
                    background-color:#2a1a1f;
                    border:1px solid #3d2530;
                    border-radius:12px;
                    padding:20px 24px;
                  ">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="28" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:18px;">⚠️</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 10px;font-size:15px;font-weight:600;color:#ffb8b8;">
                            Security Notice
                          </p>
                          <p style="margin:0;font-size:14px;color:#9c8690;line-height:1.6;">
                            If you didn't request a password reset, please ignore this email. Your password will remain unchanged. Consider enabling two-factor authentication for extra security.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="
                    background-color:#1a1c2a;
                    border:1px solid #252840;
                    border-radius:12px;
                    padding:24px;
                  ">
                    <p style="margin:0 0 14px;font-size:14px;font-weight:600;color:#c4b9ff;">
                      🛡️ Password Security Tips:
                    </p>
                    <ul style="margin:0;padding-left:20px;color:#7b7fa8;font-size:14px;line-height:1.8;">
                      <li style="margin-bottom:6px;">Use at least 8 characters with a mix of letters, numbers, and symbols</li>
                      <li style="margin-bottom:6px;">Avoid using personal information or common words</li>
                      <li style="margin-bottom:0;">Don't reuse passwords from other accounts</li>
                    </ul>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="
              background-color:#0f1117;
              border-top:1px solid#1e2130;
              padding:28px 40px;
              text-align:center;
            ">
              <p style="margin:0 0 8px;font-size:13px;color:#4a4f6a;">
                Need help? &nbsp;
                <a href="mailto:support@learnhub.com"
                  style="color:#ff6b6b;text-decoration:none;font-weight:500;">
                  support@learnhub.com
                </a>
              </p>
              <p style="margin:0;font-size:12px;color:#373b52;letter-spacing:0.3px;">
                © ${new Date().getFullYear()} LearnHub LMS · All rights reserved
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

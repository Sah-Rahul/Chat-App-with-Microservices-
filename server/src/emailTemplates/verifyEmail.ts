export const verifyEmail = (
  verificationUrl: string,
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email – Educate LMS</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0f1117;font-family:'DM Sans',sans-serif;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="background-color:#0f1117;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="max-width:600px;width:100%;background-color:#16181f;border-radius:20px;
                 overflow:hidden;border:1px solid #2a2d3a;
                 box-shadow:0 24px 64px rgba(0,0,0,0.6);">

          <!-- ═══════════════ HERO BANNER ═══════════════ -->
          <tr>
            <td style="padding:0;position:relative;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="
                    background: linear-gradient(135deg, #1a1f35 0%, #0d1117 40%, #1a1230 100%);
                    padding: 52px 40px 44px;
                    text-align: center;
                    border-bottom: 1px solid #2a2d3a;
                    position: relative;
                    overflow: hidden;
                  ">
                    <!-- Decorative circle -->
                    <div style="
                      display:inline-block;
                      width:72px;height:72px;
                      background:linear-gradient(135deg,#6c63ff,#a78bfa);
                      border-radius:20px;
                      margin-bottom:20px;
                      line-height:72px;
                      font-size:32px;
                    ">🎓</div>

                    <h1 style="
                      margin:0 0 8px;
                      font-family:'DM Serif Display',Georgia,serif;
                      font-size:34px;
                      font-weight:400;
                      color:#f0eeff;
                      letter-spacing:-0.5px;
                      line-height:1.2;
                    ">
                      Educate
                    </h1>

                    <p style="
                      margin:0;
                      font-size:13px;
                      color:#7b7fa8;
                      letter-spacing:3px;
                      text-transform:uppercase;
                      font-weight:500;
                    ">
                      Learning Management System
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════ MAIN BODY ═══════════════ -->
          <tr>
            <td style="padding:48px 40px 36px;">

              <!-- Heading -->
              <h2 style="
                margin:0 0 16px;
                font-family:'DM Serif Display',Georgia,serif;
                font-size:28px;
                font-weight:400;
                font-style:italic;
                color:#e8e4ff;
                letter-spacing:-0.3px;
              ">
                Confirm your email address
              </h2>

              <!-- Divider line -->
              <div style="width:48px;height:3px;background:linear-gradient(90deg,#6c63ff,#a78bfa);border-radius:2px;margin-bottom:28px;"></div>

              <!-- Body text -->
              <p style="
                margin:0 0 18px;
                color:#9097b8;
                font-size:16px;
                line-height:1.75;
              ">
                Welcome aboard! You're one step away from unlocking your full learning experience on LearnHub.
              </p>

              <p style="
                margin:0 0 36px;
                color:#9097b8;
                font-size:16px;
                line-height:1.75;
              ">
                Click the button below to verify your email address and activate your account. This link expires in <strong style="color:#c4b9ff;">15 min</strong>.
              </p>

              <!-- ── CTA Button ── -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto 36px;">
                <tr>
                  <td align="center"
                    style="
                      background:linear-gradient(135deg,#6c63ff 0%,#8b5cf6 100%);
                      border-radius:12px;
                      box-shadow:0 8px 32px rgba(108,99,255,0.45);
                    ">
                    <a href="${verificationUrl}"
                      style="
                        display:inline-block;
                        padding:16px 44px;
                        color:#ffffff;
                        font-family:'DM Sans',sans-serif;
                        font-size:16px;
                        font-weight:600;
                        text-decoration:none;
                        letter-spacing:0.2px;
                        border-radius:12px;
                      ">
                      ✦ &nbsp; Verify My Email
                    </a>
                  </td>
                </tr>
              </table>

              <!-- ── Fallback URL box ── -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="
                    background-color:#1e2130;
                    border:1px solid #2e3248;
                    border-left:3px solid #6c63ff;
                    border-radius:10px;
                    padding:16px 20px;
                  ">
                    <p style="margin:0 0 6px;font-size:12px;color:#6b7094;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">
                      Button not working? Paste this link:
                    </p>
                    <p style="margin:0;font-size:13px;color:#8880c8;word-break:break-all;line-height:1.5;">
                      ${verificationUrl}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ═══════════════ INFO BANNER ═══════════════ -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="
                    background-color:#1a1c2a;
                    border:1px solid #252840;
                    border-radius:12px;
                    padding:20px 24px;
                  ">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="28" style="vertical-align:top;padding-top:2px;">
                          <span style="font-size:18px;">🔒</span>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="margin:0;font-size:14px;color:#7b7fa8;line-height:1.6;">
                            If you did not create a LearnHub account, you can safely ignore this email. No action is required.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══════════════ FOOTER ═══════════════ -->
          <tr>
            <td style="
              background-color:#0f1117;
              border-top:1px solid #1e2130;
              padding:28px 40px;
              text-align:center;
            ">
              <p style="margin:0 0 8px;font-size:13px;color:#4a4f6a;">
                Need help? &nbsp;
                <a href="mailto:support@learnhub.com"
                  style="color:#6c63ff;text-decoration:none;font-weight:500;">
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

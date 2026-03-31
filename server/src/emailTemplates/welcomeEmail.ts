export const WelcomeEmailTemplate = (
  userName: string,
  dashboardUrl: string,
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Educated – ${userName}</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background-color:#0f1117;font-family:'DM Sans', Arial, sans-serif;">

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="background-color:#0f1117;padding:40px 16px;">
    <tr>
      <td align="center">

        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="max-width:600px;width:100%;background-color:#16181f;border-radius:20px;
                 overflow:hidden;border:1px solid #2a2d3a;
                 box-shadow:0 24px 64px rgba(0,0,0,0.6);">

          <tr>
            <td style="
              background: linear-gradient(160deg, #12102a 0%, #1a1040 50%, #0d1117 100%);
              padding: 56px 40px 48px;
              text-align: center;
              border-bottom: 1px solid #2a2d3a;
            ">
              <div style="
                display:inline-block;
                width:80px;height:80px;
                background:linear-gradient(135deg,#6c63ff,#a78bfa);
                border-radius:22px;
                margin-bottom:24px;
                line-height:80px;
                font-size:38px;
              ">🎓</div>

              <h1 style="
                margin:0 0 6px;
                font-family:'DM Serif Display',Georgia,serif;
                font-size:36px;
                font-weight:400;
                color:#f0eeff;
                letter-spacing:-0.5px;
              ">LearnHub</h1>

              <p style="
                margin:0;
                font-size:12px;
                color:#6b6f94;
                letter-spacing:3px;
                text-transform:uppercase;
                font-weight:600;
              ">Learning Management System</p>
            </td>
          </tr>

          <tr>
            <td style="padding:48px 40px 32px;">
              <p style="margin:0 0 6px; font-size:14px; color:#6c63ff; letter-spacing:2px; text-transform:uppercase; font-weight:600;">
                Welcome aboard
              </p>

              <h2 style="margin:0 0 20px; font-family:'DM Serif Display',Georgia,serif; font-size:32px; font-weight:400; font-style:italic; color:#e8e4ff; line-height:1.2;">
                Hello, ${userName}! 👋
              </h2>

              <div style="width:56px;height:3px;background:linear-gradient(90deg,#6c63ff,#a78bfa);border-radius:2px;margin-bottom:28px;"></div>

              <p style="margin:0 0 16px; color:#9097b8; font-size:16px; line-height:1.8;">
                We're thrilled to have you join the LearnHub community. Your account is now active and your learning journey begins today.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:36px;">
                <tr>
                  <td width="50%" style="vertical-align:top;padding-right:8px;padding-bottom:16px;">
                    <div style="background-color:#1e2130; border:1px solid #2e3248; border-radius:12px; padding:20px;">
                      <div style="font-size:24px;margin-bottom:10px;">📚</div>
                      <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#d4cfff;">500+ Courses</p>
                      <p style="margin:0;font-size:13px;color:#6b7094;line-height:1.5;">Expert-led content</p>
                    </div>
                  </td>
                  <td width="50%" style="vertical-align:top;padding-left:8px;padding-bottom:16px;">
                    <div style="background-color:#1e2130; border:1px solid #2e3248; border-radius:12px; padding:20px;">
                      <div style="font-size:24px;margin-bottom:10px;">🏆</div>
                      <p style="margin:0 0 4px;font-size:14px;font-weight:600;color:#d4cfff;">Certificates</p>
                      <p style="margin:0;font-size:13px;color:#6b7094;line-height:1.5;">Verified credentials</p>
                    </div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" style="
                      background: linear-gradient(135deg,#6c63ff 0%,#8b5cf6 100%);
                      padding: 18px 40px;
                      color: #ffffff;
                      display: inline-block;
                      font-size: 16px;
                      font-weight: 600;
                      text-decoration: none;
                      border-radius: 12px;
                    ">
                      ✦ &nbsp; Start Learning Now
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background-color:#0f1117; border-top:1px solid #1e2130; padding:28px 40px; text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#4a4f6a;">
                Questions? <a href="mailto:support@learnhub.com" style="color:#6c63ff;text-decoration:none;">support@learnhub.com</a>
              </p>
              <p style="margin:0;font-size:12px;color:#373b52;">
                © ${new Date().getFullYear()} LearnHub LMS
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

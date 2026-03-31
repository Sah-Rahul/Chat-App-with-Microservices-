export const ForgotPasswordEmailTemplate = (
  userName: string,
  resetUrl: string,
): string => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Reset Your Password – LearnHub</title>
</head>

<body style="margin:0;padding:0;background:#0f1117;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
<tr>
<td align="center">

<table width="600" style="max-width:600px;background:#16181f;border-radius:16px;padding:40px;color:#fff;">

<tr>
<td align="center">
<h1 style="margin:0 0 20px;font-size:28px;color:#ff6b6b;">🔐 Password Reset Request</h1>
</td>
</tr>

<tr>
<td>
<p style="font-size:16px;color:#ccc;">Hi <strong>${userName}</strong>,</p>

<p style="font-size:15px;color:#aaa;line-height:1.6;">
We received a request to reset your LearnHub account password.
Click the button below to set a new password.
</p>

<p style="font-size:15px;color:#aaa;">
This link will expire in <strong style="color:#ff6b6b;">1 hour</strong>.
</p>

<div style="text-align:center;margin:30px 0;">
<a href="${resetUrl}"
style="background:#ff6b6b;padding:14px 30px;color:#fff;text-decoration:none;
border-radius:8px;font-weight:bold;display:inline-block;">
Reset My Password
</a>
</div>

<p style="font-size:13px;color:#888;">
If you didn't request this, you can safely ignore this email.
</p>

<hr style="border:none;border-top:1px solid #2a2d3a;margin:30px 0;" />

<p style="font-size:12px;color:#555;text-align:center;">
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
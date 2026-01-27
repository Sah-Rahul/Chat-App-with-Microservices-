interface WelcomeEmailProps {
  userName: string;
  dashboardUrl: string;
}

export const generateWelcomeEmailTemplate = ({
  userName,
  dashboardUrl,
}: WelcomeEmailProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Meridian University</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      
      <!-- Preview text -->
      <div style="display: none; font-size: 1px; color: #f4f7fa; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
        Welcome to Meridian University! Your journey to academic excellence begins now.
      </div>

      <!-- Main wrapper -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f4f7fa 0%, #e8eef3 100%); padding: 40px 0;">
        <tr>
          <td align="center">
            
            <!-- Email container -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 650px;">
              
              <!-- Header with University Logo -->
              <tr>
                <td align="center" style="padding: 0 0 30px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center">
                        <!-- University Emblem -->
                        <div style="margin-bottom: 20px;">
                          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="40" cy="40" r="38" fill="url(#grad1)" opacity="0.1"/>
                            <circle cx="40" cy="40" r="35" stroke="url(#grad2)" stroke-width="2"/>
                            <path d="M40 15L55 25V45L40 55L25 45V25L40 15Z" fill="url(#grad3)"/>
                            <circle cx="40" cy="40" r="10" fill="#1e3a8a"/>
                            <path d="M40 30L45 35L40 40L35 35L40 30Z" fill="#ffffff"/>
                            <defs>
                              <linearGradient id="grad1" x1="0" y1="0" x2="80" y2="80">
                                <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                              </linearGradient>
                              <linearGradient id="grad2" x1="0" y1="0" x2="80" y2="80">
                                <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                              </linearGradient>
                              <linearGradient id="grad3" x1="0" y1="0" x2="80" y2="80">
                                <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <h1 style="margin: 0 0 8px; font-size: 38px; color: #1e3a8a; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase;">
                          Meridian University
                        </h1>
                        <div style="height: 4px; width: 80px; background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%); margin: 0 auto; border-radius: 2px;"></div>
                        <p style="margin: 12px 0 0; font-size: 13px; color: #6b7280; letter-spacing: 3px; text-transform: uppercase; font-weight: 600;">
                          Pursuit of Excellence
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Main Content Card -->
              <tr>
                <td>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(30, 58, 138, 0.12);">
                    
                    <!-- Decorative Top Border -->
                    <tr>
                      <td style="height: 8px; background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%);"></td>
                    </tr>

                    <!-- Welcome Banner -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 50px 40px; text-align: center;">
                        <div style="margin-bottom: 20px;">
                          <span style="font-size: 60px; display: block; line-height: 1;">🎓</span>
                        </div>
                        <h2 style="margin: 0 0 15px; font-size: 36px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px;">
                          Welcome Aboard!
                        </h2>
                        <p style="margin: 0; font-size: 18px; color: #e0e7ff; font-weight: 500; letter-spacing: 0.5px;">
                          Your Journey to Excellence Begins Here
                        </p>
                      </td>
                    </tr>

                    <!-- Content Body -->
                    <tr>
                      <td style="padding: 50px 45px;">
                        
                        <!-- Personalized Greeting -->
                        <div style="text-align: center; margin-bottom: 35px;">
                          <p style="font-size: 20px; color: #1f2937; margin: 0 0 10px; font-weight: 600;">
                            Dear <span style="color: #1e3a8a; font-weight: 700;">${userName}</span>,
                          </p>
                          <p style="font-size: 16px; color: #6b7280; margin: 0; line-height: 1.7;">
                            We are delighted to welcome you to the Meridian University community! You've joined a distinguished institution dedicated to fostering academic excellence, innovation, and personal growth.
                          </p>
                        </div>

                        <!-- Divider -->
                        <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%); margin: 35px 0;"></div>

                        <!-- What's Next Section -->
                        <div style="margin: 40px 0;">
                          <h3 style="font-size: 22px; color: #1e3a8a; margin: 0 0 30px; text-align: center; font-weight: 700; display: flex; align-items: center; justify-content: center;">
                            <span style="display: inline-block; width: 40px; height: 2px; background: #3b82f6; margin-right: 15px;"></span>
                            Your Next Steps
                            <span style="display: inline-block; width: 40px; height: 2px; background: #3b82f6; margin-left: 15px;"></span>
                          </h3>
                          
                          <!-- Feature Cards -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <!-- Step 1 -->
                            <tr>
                              <td style="padding: 0 0 20px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; border-left: 4px solid #3b82f6;">
                                  <tr>
                                    <td style="padding: 20px 25px;">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td width="50" valign="top">
                                            <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);">
                                              <span style="font-size: 22px; line-height: 45px; display: block; text-align: center;">📋</span>
                                            </div>
                                          </td>
                                          <td valign="top" style="padding-left: 15px;">
                                            <h4 style="margin: 0 0 8px; font-size: 17px; color: #1e3a8a; font-weight: 700;">Complete Your Profile</h4>
                                            <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
                                              Add your personal information, academic history, and preferences to create a comprehensive student profile.
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <!-- Step 2 -->
                            <tr>
                              <td style="padding: 0 0 20px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; border-left: 4px solid #10b981;">
                                  <tr>
                                    <td style="padding: 20px 25px;">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td width="50" valign="top">
                                            <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);">
                                              <span style="font-size: 22px; line-height: 45px; display: block; text-align: center;">📚</span>
                                            </div>
                                          </td>
                                          <td valign="top" style="padding-left: 15px;">
                                            <h4 style="margin: 0 0 8px; font-size: 17px; color: #065f46; font-weight: 700;">Explore Your Dashboard</h4>
                                            <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
                                              Access your courses, academic calendar, library resources, and all the tools you need for success.
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <!-- Step 3 -->
                            <tr>
                              <td style="padding: 0 0 20px 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border-left: 4px solid #f59e0b;">
                                  <tr>
                                    <td style="padding: 20px 25px;">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td width="50" valign="top">
                                            <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">
                                              <span style="font-size: 22px; line-height: 45px; display: block; text-align: center;">🤝</span>
                                            </div>
                                          </td>
                                          <td valign="top" style="padding-left: 15px;">
                                            <h4 style="margin: 0 0 8px; font-size: 17px; color: #92400e; font-weight: 700;">Connect with Community</h4>
                                            <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
                                              Join student groups, attend orientation events, and connect with peers, faculty, and mentors.
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>

                            <!-- Step 4 -->
                            <tr>
                              <td style="padding: 0;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%); border-radius: 12px; border-left: 4px solid #ec4899;">
                                  <tr>
                                    <td style="padding: 20px 25px;">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td width="50" valign="top">
                                            <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #db2777 0%, #ec4899 100%); border-radius: 10px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);">
                                              <span style="font-size: 22px; line-height: 45px; display: block; text-align: center;">💬</span>
                                            </div>
                                          </td>
                                          <td valign="top" style="padding-left: 15px;">
                                            <h4 style="margin: 0 0 8px; font-size: 17px; color: #831843; font-weight: 700;">Get Support Anytime</h4>
                                            <p style="margin: 0; font-size: 14px; color: #4b5563; line-height: 1.6;">
                                              Our dedicated support team and academic advisors are here to help you every step of the way.
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </div>

                        <!-- CTA Button -->
                        <div style="text-align: center; margin: 45px 0 35px;">
                          <a href="${dashboardUrl}" 
                            target="_blank" 
                            style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 18px 55px; text-decoration: none; border-radius: 10px; font-size: 17px; font-weight: 700; box-shadow: 0 8px 25px rgba(30, 58, 138, 0.35); letter-spacing: 0.5px; transition: all 0.3s ease;">
                            Access Your Dashboard →
                          </a>
                        </div>

                        <!-- Quote Section -->
                        <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #3b82f6; border-radius: 8px; padding: 25px 30px; margin: 40px 0 30px;">
                          <p style="margin: 0 0 12px; font-size: 16px; color: #475569; font-style: italic; line-height: 1.7;">
                            "Education is the most powerful weapon which you can use to change the world."
                          </p>
                           
                        </div>

                        <!-- Support Information -->
                        <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin-top: 35px; text-align: center;">
                          <h4 style="margin: 0 0 15px; font-size: 18px; color: #1e3a8a; font-weight: 700;">
                            Need Assistance?
                          </h4>
                          <p style="margin: 0 0 18px; font-size: 14px; color: #6b7280; line-height: 1.6;">
                            Our team is available 24/7 to support you
                          </p>
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center">
                                <a href="mailto:support@meridian.edu" style="color: #3b82f6; text-decoration: none; font-weight: 600; font-size: 15px; margin: 0 15px;">
                                  📧 support@meridian.edu
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding-top: 10px;">
                                <a href="tel:+1234567890" style="color: #3b82f6; text-decoration: none; font-weight: 600; font-size: 15px; margin: 0 15px;">
                                  📞 +977 9874563000
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td align="center" style="padding-top: 10px;">
                                <a href="#" style="color: #3b82f6; text-decoration: none; font-weight: 600; font-size: 15px; margin: 0 15px;">
                                  🌐 Help Center
                                </a>
                              </td>
                            </tr>
                          </table>
                        </div>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 40px 20px 20px; text-align: center;">
                  
                  <!-- Social Media Links -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="padding: 0 0 25px 0;">
                        <p style="margin: 0 0 15px; font-size: 14px; color: #6b7280; font-weight: 600;">
                          Connect With Us
                        </p>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/fluency/32/facebook-new.png" alt="Facebook" width="32" height="32" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/fluency/32/twitter.png" alt="Twitter" width="32" height="32" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/fluency/32/linkedin.png" alt="LinkedIn" width="32" height="32" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/fluency/32/instagram-new.png" alt="Instagram" width="32" height="32" style="display: block;" />
                        </a>
                        <a href="#" style="display: inline-block; margin: 0 10px;">
                          <img src="https://img.icons8.com/fluency/32/youtube-play.png" alt="YouTube" width="32" height="32" style="display: block;" />
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Email Notice -->
                  <p style="font-size: 13px; color: #6b7280; margin: 0 0 15px; line-height: 1.6; max-width: 500px; margin-left: auto; margin-right: auto;">
                    You're receiving this email because you recently created an account at Meridian University. We're excited to have you as part of our academic community!
                  </p>

                  <!-- Copyright -->
                  <p style="font-size: 12px; color: #9ca3af; margin: 0 0 8px;">
                    &copy; ${new Date().getFullYear()} Meridian University. All rights reserved.
                  </p>

                  <!-- University Address -->
                  <p style="font-size: 11px; color: #d1d5db; margin: 0 0 20px; line-height: 1.5;">
                    Meridian University, 123 Academic Drive, University City, ST 12345, United States
                  </p>

                  <!-- Footer Links -->
                  <div style="margin-top: 20px;">
                    <a href="https://meridian.edu/privacy" style="color: #6b7280; text-decoration: none; font-size: 12px; margin: 0 10px; font-weight: 500;">Privacy Policy</a>
                    <span style="color: #d1d5db;">•</span>
                    <a href="https://meridian.edu/terms" style="color: #6b7280; text-decoration: none; font-size: 12px; margin: 0 10px; font-weight: 500;">Terms of Service</a>
                    <span style="color: #d1d5db;">•</span>
                    <a href="https://meridian.edu/contact" style="color: #6b7280; text-decoration: none; font-size: 12px; margin: 0 10px; font-weight: 500;">Contact Us</a>
                    <span style="color: #d1d5db;">•</span>
                    <a href="#" style="color: #6b7280; text-decoration: none; font-size: 12px; margin: 0 10px; font-weight: 500;">Unsubscribe</a>
                  </div>

                </td>
              </tr>

            </table>
            
          </td>
        </tr>
      </table>

      <style>
        @media only screen and (max-width: 640px) {
          .content-padding { padding: 30px 25px !important; }
          .step-card { margin-bottom: 15px !important; }
        }
      </style>
      
    </body>
    </html>
  `;
};
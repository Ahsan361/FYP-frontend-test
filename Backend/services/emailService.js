import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = null; // Don't initialize immediately
  }

  // Lazy initialization - create transporter when first needed
  getTransporter() {
    if (!this.transporter) {
      console.log("🔧 Initializing email transporter...");
      console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Loaded" : "❌ Missing");
      console.log("EMAIL_APP_PASSWORD:", process.env.EMAIL_APP_PASSWORD ? "✅ Loaded" : "❌ Missing");
      
      if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
        throw new Error('Email credentials are not properly configured');
      }

      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD
        }
      });
    }
    return this.transporter;
  }

  async sendVerificationEmail(email, otp, username) {
    const mailOptions = {
      from: {
        name: 'Cultural Heritage Museum',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Verify Your Email - Cultural Heritage Museum',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0F2920 0%, #2D5A3D 100%); padding: 40px 30px; border-radius: 20px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #fff; font-size: 2.5rem; font-weight: 700; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
              Welcome to Cultural Heritage Museum
            </h1>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.1rem; margin: 0;">
              Complete your account verification
            </p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 15px; padding: 30px; margin: 30px 0;">
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem; line-height: 1.6; margin-bottom: 20px;">
              Hello <strong>${username}</strong>,
            </p>
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem; line-height: 1.6; margin-bottom: 25px;">
              Thank you for joining our cultural heritage community! To complete your registration, please use the verification code below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: rgba(255, 255, 255, 0.15); border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 12px; padding: 20px; display: inline-block;">
                <p style="color: #fff; font-size: 2.5rem; font-weight: 700; letter-spacing: 8px; margin: 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
                  ${otp}
                </p>
              </div>
            </div>
            
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; text-align: center; margin: 20px 0;">
              This verification code will expire in <strong>15 minutes</strong>
            </p>
            
            <div style="background: rgba(255, 193, 7, 0.1); border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.9rem; margin: 0;">
                <strong>Security Note:</strong> If you didn't create an account with us, please ignore this email. Your information is safe with us.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.85rem; margin: 0;">
              © 2024 Cultural Heritage Museum. All rights reserved.
            </p>
          </div>
        </div>
      `
    };

    try {
      const transporter = this.getTransporter(); // Get transporter when needed
      await transporter.sendMail(mailOptions);
      console.log(`✅ Verification email sent to ${email}`);
    } catch (error) {
      console.error('❌ Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendWelcomeEmail(email, username) {
    const mailOptions = {
      from: {
        name: 'Cultural Heritage Museum',
        address: process.env.EMAIL_USER
      },
      to: email,
      subject: 'Welcome to Cultural Heritage Museum!',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0F2920 0%, #2D5A3D 100%); padding: 40px 30px; border-radius: 20px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #fff; font-size: 2.5rem; font-weight: 700; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);">
              🎉 Welcome ${username}!
            </h1>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.1rem; margin: 0;">
              Your account has been verified successfully
            </p>
          </div>
          
          <div style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 15px; padding: 30px;">
            <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem; line-height: 1.6;">
              Your journey into our cultural heritage collection begins now! Explore artifacts, exhibitions, and events from around the world.
            </p>
          </div>
        </div>
      `
    };

    try {
      const transporter = this.getTransporter(); // Get transporter when needed
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('❌ Error sending welcome email:', error);
    }
  }
}

export default new EmailService();
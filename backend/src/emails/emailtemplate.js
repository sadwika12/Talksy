export function createWelcomeEmailTemplate(name, clientURL) {
  return `
    <div style="background-color: #f4f4f7; padding: 20px; font-family: Arial, sans-serif;">
      <div style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0,0,0,0.12);
      ">

        <div style="
          background: linear-gradient(135deg, #5A67FF, #3B4BFF);
          color: white;
          padding: 30px;
          text-align: center;
        ">
       
          <h1 style="margin:0; font-size: 26px;">Welcome to Bondly!</h1>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 18px; color:#3B4BFF;">
            <strong>Hello ${name},</strong>
          </p>

          <p style="font-size: 16px; line-height: 1.6;">
            We're thrilled to have you on Bondly — your seamless messaging platform to connect with anyone, anytime.
          </p>

          <div style="
            background: #eef2ff;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #5A67FF;
            margin-top: 20px;
          ">
            <p style="font-weight: bold;">Get started in a few steps:</p>
            <ul style="margin: 0 0 0 18px; padding: 0;">
              <li style="margin-bottom: 8px;">Set up your profile picture</li>
              <li style="margin-bottom: 8px;">Add contacts</li>
              <li style="margin-bottom: 8px;">Start a chat</li>
              <li style="margin-bottom: 8px;">Share photos, videos, and more</li>
            </ul>
          </div>

          <div style="text-align:center; margin-top: 30px;">
            <a href="${clientURL}"
              style="
                background: linear-gradient(135deg, #3B4BFF, #5A67FF);
                color: white;
                padding: 12px 28px;
                border-radius: 40px;
                text-decoration: none;
                font-size: 16px;
                display: inline-block;
                font-weight: bold;
              ">
              Open Bondly
            </a>
          </div>

          <p style="margin-top: 30px; color:#777; font-size:14px;">
            If you ever need help, the Bondly team is always here.
          </p>

          <p style="font-size:14px; color:#777;">
            Best regards,<br /><strong>The Bondly Team</strong>
          </p>
        </div>

      </div>
    </div>
  `;
}

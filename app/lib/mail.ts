import nodemailer from "nodemailer";

export async function sendJobApplicationMail({
  position,
  name,
  email,
  phone,
  resumeUrl,
}: {
  position: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NOTIFY_EMAIL,
        pass: process.env.NOTIFY_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Career Portal" <${process.env.NOTIFY_EMAIL}>`,
      to: process.env.NOTIFY_EMAIL, // <-- your admin inbox
      subject: `New Job Application — ${position}`,
      // html: `
      //   <h2>New Job Application</h2>

      //   <p><b>Position:</b> ${position}</p>

      //   <h3>Applicant Details:</h3>
      //   <p><b>Name:</b> ${name}</p>
      //   <p><b>Email:</b> ${email}</p>
      //   <p><b>Phone:</b> ${phone}</p>

      //   ${
      //     resumeUrl
      //       ? `<p><b>Resume:</b> <a href="${resumeUrl}">View Resume</a></p>`
      //       : ""
      //   }

      //   <br/>
      //   <p style="opacity:0.6;font-size:12px">This message is generated automatically by your job portal.</p>
      // `,
      html: `
  <div style="font-family:Arial, sans-serif; background:#f5f7fa; padding:20px;">
    
    <!-- Email Card -->
    <div style="
      max-width:600px;
      margin:auto;
      background:white;
      border-radius:12px;
      padding:30px;
      box-shadow:0 4px 15px rgba(0,0,0,0.1);
      border:1px solid #e5e7eb;
    ">
      
      <!-- Logo -->
      <div style="text-align:center; margin-bottom:20px;">
         <div>
             <!-- Logo -->
 <div style="
  display:flex;
  align-items:center;
  justify-content:center;
  gap:4px;
  margin-bottom:20px;
">

  <!-- Logo -->
      <img 
        src="https://harlequin-defeated-cobra-480.mypinata.cloud/ipfs/bafkreidcnlfdhqjilorhub42btrmkwgm44zrvh6kybeyxdsryla72vhcie"
        alt="1Technologies Logo" 
        width="40"
        height="40"
        style="display:block;"
      />

      <!-- Company Name -->
      <h1 style="
        margin:0;
        font-size:22px;
        font-weight:700;
        color:#fe6b6e;
        font-family:Arial, sans-serif;
      ">
        1<span style="color:#07a9c3;">Technologies</span>
      </h1>

    </div>

          </div>
      </div>

      <!-- Title -->
      <h2 style="
        text-align:center;
        color:#111827;
        margin-bottom:10px;
        font-size:22px;
      ">
        New Job Application Received
      </h2>

      <p style="
        text-align:center;
        color:#6b7280;
        font-size:14px;
        margin-top:0;
      ">
        Someone applied to <strong>${position}</strong>
      </p>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

      <!-- Applicant Details -->
      <h3 style="color:#111827; font-size:18px; margin-bottom:10px;">
        Applicant Information
      </h3>

      <table style="width:100%; font-size:15px; color:#374151; line-height:1.6;">
        <tr>
          <td style="font-weight:bold; width:150px;">Name:</td>
          <td>${name}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Email:</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Phone:</td>
          <td>${phone || "N/A"}</td>
        </tr>
        <tr>
          <td style="font-weight:bold;">Resume:</td>
          <td>
            ${
              resumeUrl
                ? `<a href="${resumeUrl}" style="color:#00c9a7; font-weight:bold;">View Resume</a>`
                : "Not provided"
            }
          </td>
        </tr>
      </table>

      <hr style="border:none; border-top:1px solid #e5e7eb; margin:25px 0;" />

      <!-- Footer -->
      <p style="font-size:12px; color:#6b7280; text-align:center; margin-top:20px;">
        This is an automated message from your job portal.<br />
        © ${new Date().getFullYear()} 1Technologies ltd. All rights reserved.
      </p>
    </div>
  </div>
`,
    });

    return { success: true };
  } catch (err) {
    console.error("MAIL ERROR:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: errorMessage };
  }
}

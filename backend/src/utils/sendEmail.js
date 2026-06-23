const axios = require('axios');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const sendBuildRequestNotification = async (buildRequest) => {
  try {
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      console.error('BREVO_API_KEY is missing in backend env');
      return false;
    }

    const safe = {
      fullName: buildRequest?.fullName || 'N/A',
      email: buildRequest?.email || 'N/A',
      phone: buildRequest?.phone || 'N/A',
      companyName: buildRequest?.companyName || 'N/A',
      user: buildRequest?.user || 'N/A',
      projectTitle: buildRequest?.projectTitle || 'Untitled Request',
      projectType: buildRequest?.projectType || 'N/A',
      selectedPackage: buildRequest?.selectedPackage || 'N/A',
      timeline: buildRequest?.timeline || 'N/A',
      needDeployment: buildRequest?.needDeployment ? 'Yes' : 'No',
      extraFeaturesCount: buildRequest?.extraFeaturesCount ?? 0,
      projectDescription: buildRequest?.projectDescription || 'N/A',
      additionalNotes: buildRequest?.additionalNotes || '',
      requiredFeatures: Array.isArray(buildRequest?.requiredFeatures)
        ? buildRequest.requiredFeatures
        : [],
      pricing: buildRequest?.pricing || null,
      createdAt: buildRequest?.createdAt || new Date(),
      _id: buildRequest?._id || 'N/A',
    };

    const rawPhone =
      safe.phone && safe.phone !== 'N/A' ? String(safe.phone).trim() : '';

    let sanitizedPhone = rawPhone.replace(/[^\d]/g, '');

    // if user entered 10-digit Indian number, convert to 91xxxxxxxxxx
    if (sanitizedPhone.length === 10) {
      sanitizedPhone = `91${sanitizedPhone}`;
    }

    const whatsappLink = sanitizedPhone
      ? `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(
        `Hi ${safe.fullName}, regarding your Vardaan Labs build request "${safe.projectTitle}".`
      )}`
      : '';

    const replyEmailLink =
      safe.email !== 'N/A'
        ? `mailto:${safe.email}?subject=${encodeURIComponent(
          `Regarding your Vardaan Labs build request`
        )}`
        : '';

    const featuresHtml = safe.requiredFeatures.length
      ? safe.requiredFeatures
        .map((feature) => `<li>${escapeHtml(feature)}</li>`)
        .join('')
      : '<li>No features mentioned</li>';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #333; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background:#8c1e34; color:#fff; padding:20px; text-align:center;">
          <h2 style="margin:0;">New Build Request Received</h2>
          <p style="margin:6px 0 0;">Vardaan Labs</p>
        </div>

        <div style="padding:24px;">
          <h3 style="color:#8c1e34;">Client Information</h3>
          <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Name</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Email</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.email)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Phone</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.phone)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Company</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.companyName)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>User ID</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.user)}</td>
            </tr>
          </table>

          <h3 style="color:#8c1e34;">Project Details</h3>
          <table style="width:100%; border-collapse:collapse; margin-bottom:24px;">
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Project Title</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.projectTitle)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Type</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.projectType)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Package</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.selectedPackage)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Timeline</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.timeline)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Need Deployment</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${escapeHtml(safe.needDeployment)}</td>
            </tr>
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Extra Features</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">${safe.extraFeaturesCount}</td>
            </tr>
            ${safe.pricing?.totalPrice
        ? `
            <tr>
              <td style="padding:8px; border-bottom:1px solid #eee;"><strong>Total Value</strong></td>
              <td style="padding:8px; border-bottom:1px solid #eee;">₹${escapeHtml(safe.pricing.totalPrice)}</td>
            </tr>`
        : ''
      }
          </table>

          <h3 style="color:#8c1e34;">Description</h3>
          <div style="background:#f9f9f9; padding:14px; border-radius:8px; margin-bottom:16px; white-space:pre-wrap;">
            ${escapeHtml(safe.projectDescription)}
          </div>

          <h3 style="color:#8c1e34;">Required Features</h3>
          <div style="background:#f9f9f9; padding:14px; border-radius:8px; margin-bottom:16px;">
            <ul style="margin:0; padding-left:20px;">
              ${featuresHtml}
            </ul>
          </div>

          ${safe.additionalNotes
        ? `
          <h3 style="color:#8c1e34;">Additional Notes</h3>
          <div style="background:#f9f9f9; padding:14px; border-radius:8px; margin-bottom:16px; white-space:pre-wrap;">
            ${escapeHtml(safe.additionalNotes)}
          </div>
          `
        : ''
      }

          <div style="margin-top:30px; text-align:center;">
            ${whatsappLink
        ? `
              <a href="${whatsappLink}" target="_blank"
                 style="display:inline-block; background:#25D366; color:#fff; text-decoration:none; padding:12px 22px; border-radius:6px; margin:6px; font-weight:600;">
                Message on WhatsApp
              </a>
            `
        : ''
      }

            ${replyEmailLink
        ? `
              <a href="${replyEmailLink}" target="_blank"
                 style="display:inline-block; background:#8c1e34; color:#fff; text-decoration:none; padding:12px 22px; border-radius:6px; margin:6px; font-weight:600;">
                Reply by Email
              </a>
            `
        : ''
      }
          </div>

          <div style="margin-top:28px; padding-top:14px; border-top:1px solid #eee; font-size:12px; color:#666;">
            <p><strong>Fallback Contact:</strong> ${escapeHtml(safe.phone)} | ${escapeHtml(safe.email)}</p>
            <p><strong>Submission Time:</strong> ${new Date(safe.createdAt).toLocaleString()}</p>
            <p><strong>Request ID:</strong> ${escapeHtml(safe._id)}</p>
          </div>
        </div>
      </div>
    `;

    const payload = {
      sender: {
        name: process.env.MAIL_FROM_NAME || 'Vardaan Solutions',
        email: process.env.MAIL_FROM || 'vardaansolution@gmail.com',
      },
      to: [
        // { email: 'shailendrasingh3722@gmail.com', name: 'Shailendra' },
        { email: 'satyambpl.2000@gmail.com', name: 'Satyam' },
      ],
      subject: `New Build Request: ${safe.projectTitle}`,
      htmlContent,
    };

    console.log('Sending Brevo mail with sender:', payload.sender);
    console.log('Sending Brevo mail to:', payload.to.map((x) => x.email).join(', '));

    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      payload,
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    console.log('Brevo mail sent successfully:', response.data);
    return true;
  } catch (error) {
    console.error('Brevo mail failed');
    console.error('Message:', error.message);
    console.error('Response data:', error.response?.data);
    console.error('Response status:', error.response?.status);
    return false;
  }
};

module.exports = { sendBuildRequestNotification };
import { IOrder } from '../entities/order';

const nodemailer = require("nodemailer");
require("dotenv").config();


// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASS, // generated ethereal password
  },
});

// Generate email content in HTML format
const generateEmailContent = (order: IOrder, recipientType: 'user' | 'admin'): string => {
  const orderDetails = `
    <h2>Order Details</h2>
    <div style="border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
      <img src="https://yourdomain.com/logo.png" alt="Washerman Logo" style="width: 100px;"/>
      <h1>Washerman</h1>
      <p><strong>Ticket ID:</strong> ${order.ticketID}</p>
      <p><strong>Date Created:</strong> ${new Date(order.dateCreated).toLocaleDateString()}</p>
      <p><strong>Pickup Date:</strong> ${new Date(order.pickupDate).toLocaleDateString()}</p>
      <p><strong>Pickup Address:</strong> ${order.user.pickupAddress}</p>
      <h3>Categories</h3>
      <ul>
        ${order.categories.map(category => `
          <li>
            <strong>${category.name}</strong>
            <ul>
              ${category.clothes.map(clothe => `
                <li>${clothe.clotheType}: ${clothe.quantity}</li>
              `).join('')}
            </ul>
          </li>
        `).join('')}
      </ul>
      <p><strong>Amount:</strong> ₦${order.amount}</p>
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
      
    </div>
  `;

  if (recipientType === 'user') {
    return `
      <h1>Thank you for your order!</h1>
      <p>Dear Customer,</p>
      <p>Your order has been received and is being processed. Please find the details of your order below.</p>
      ${orderDetails}
      <p>Best regards, <br/>Your Washermann</p>
    `;
  } else {
    return `
      <h1>New Order Received</h1>
      <p>Dear Admin,</p>
      <p>A new order has been placed. Here are the details:</p>
      ${orderDetails}
      <p>Best regards, <br/> Washermann </p>
    `;
  }
};

// Function to send an email
const sendEmail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // HTML body content
  });
};

export { sendEmail, generateEmailContent };

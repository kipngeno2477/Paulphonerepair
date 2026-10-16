# 📢 Student Notification System - Setup Guide

Complete guide to set up and use the automatic notification system for students.

## 🎯 Overview

The notification system sends alerts to students about:
- **Class Reminders**: Automatic reminders before classes start
- **Class Cancellations**: Notify about cancelled classes
- **Schedule Changes**: Alert about time/room changes
- **Attendance Alerts**: Warn students with low attendance
- **Daily Summaries**: End-of-day attendance summary
- **Custom Messages**: Send custom notifications anytime

## 📨 Notification Methods

### 1. Email Notifications
- Professional email format
- Instant delivery
- Includes detailed information
- Works for all students with email addresses

### 2. SMS Notifications
- Quick text messages
- Instant mobile alerts
- Short, concise messages
- Works for all students with phone numbers

### 3. In-App Notifications
- Notification center within the app
- Real-time updates
- No additional setup required
- Always available

## 🚀 Quick Start

### Accessing the Notification Panel

1. Open the Attendance System
2. Click **"Notifications"** in the navigation menu
3. You'll see the notification dashboard with:
   - Class Reminders settings
   - Manual notification sender
   - Notification history
   - Settings panel

## ⚙️ Setting Up Automatic Notifications

### Enable Auto Class Reminders

1. Go to **Notifications** tab
2. Check **"Enable Automatic Class Reminders"**
3. Select reminder time (5, 10, 15, 30 minutes, or 1 hour before class)
4. Choose notification methods (Email, SMS, In-App)
5. Students will automatically receive reminders before each class

### Configure Notification Settings

**Daily Attendance Summary**
- Toggle ON to send daily summaries at 6 PM
- Students receive their attendance count for the day

**Low Attendance Warning**
- Toggle ON to monitor attendance rates
- Set threshold percentage (default: 75%)
- Students automatically notified when below threshold

**Weekend Class Reminders**
- Toggle ON/OFF for Saturday/Sunday classes
- Useful for schools with weekend schedules

## 📤 Sending Manual Notifications

### Step-by-Step

1. **Select Recipients**
   - All Students
   - By Course (select specific course)
   - By Year (Year 1-4)
   - Individual Student

2. **Choose Notification Type**
   - Class Reminder
   - Class Cancellation
   - Class Time/Room Change
   - Attendance Alert
   - Custom Message (write your own)

3. **For Custom Messages**
   - Enter Subject
   - Write Message

4. **Click "Send Notification"**
   - System sends to all selected recipients
   - Confirmation toast appears
   - Records saved in history

## 🔧 Technical Setup

### Email Integration (Recommended: Nodemailer with Gmail)

1. **Install Nodemailer**
   ```powershell
   npm install nodemailer
   ```

2. **Configure Email in server.js**

Add at the top of server.js:
```javascript
const nodemailer = require('nodemailer');

// Email Configuration
const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-school-email@gmail.com',
        pass: 'your-app-password' // Use App Password, not regular password
    }
});
```

3. **Update Email Endpoint**

Replace the email endpoint in server.js:
```javascript
app.post('/api/notifications/email', async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        
        await emailTransporter.sendMail({
            from: 'School Attendance System <your-school-email@gmail.com>',
            to: to,
            subject: subject,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #667eea;">${subject}</h2>
                    <p style="font-size: 16px; line-height: 1.6;">${message}</p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
                    <p style="color: #666; font-size: 14px;">
                        Best regards,<br>
                        <strong>School Administration</strong><br>
                        Attendance Management System
                    </p>
                    <p style="color: #999; font-size: 12px; margin-top: 20px;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            `
        });
        
        console.log(`✓ Email sent to ${to}`);
        
        res.json({
            success: true,
            message: 'Email sent successfully',
            recipient: to
        });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }
});
```

4. **Gmail App Password Setup**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate app password for "Mail"
   - Use this password in the code (not your regular password)

### SMS Integration (Twilio)

1. **Sign up for Twilio**
   - Visit https://www.twilio.com
   - Create free account (includes test credits)
   - Get Account SID, Auth Token, and Phone Number

2. **Install Twilio**
   ```powershell
   npm install twilio
   ```

3. **Configure SMS in server.js**

Add at the top:
```javascript
const twilio = require('twilio');

// SMS Configuration
const twilioClient = twilio(
    'YOUR_ACCOUNT_SID',
    'YOUR_AUTH_TOKEN'
);
const TWILIO_PHONE = '+1234567890'; // Your Twilio number
```

4. **Update SMS Endpoint**

Replace the SMS endpoint:
```javascript
app.post('/api/notifications/sms', async (req, res) => {
    try {
        const { to, message } = req.body;
        
        await twilioClient.messages.create({
            body: message,
            from: TWILIO_PHONE,
            to: to
        });
        
        console.log(`✓ SMS sent to ${to}`);
        
        res.json({
            success: true,
            message: 'SMS sent successfully',
            recipient: to
        });
    } catch (error) {
        console.error('SMS error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send SMS'
        });
    }
});
```

### Alternative SMS Services

**AWS SNS**
- Enterprise-grade
- Pay per message
- Global reach
```powershell
npm install aws-sdk
```

**MessageBird**
- International messaging
- Competitive pricing
```powershell
npm install messagebird
```

**Africa's Talking** (For African Schools)
- Best for African countries
- Local rates
```powershell
npm install africastalking
```

## 🔒 Environment Variables Setup

Create `.env` file in the project root:

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-school-email@gmail.com
EMAIL_PASSWORD=your-app-password

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Server Configuration
PORT=3000
SERVER_URL=http://localhost:3000
```

Install dotenv:
```powershell
npm install dotenv
```

Load in server.js:
```javascript
require('dotenv').config();

const emailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

## 📊 How It Works

### Automatic Class Reminders

1. **System checks schedule every minute**
2. **Calculates time until next class**
3. **When reminder time reached:**
   - Finds all enrolled students
   - Sends notification via selected methods
   - Logs to notification history
4. **Students receive:**
   - Course name
   - Class time
   - Room number
   - Instructor info

### Low Attendance Monitoring

1. **System calculates attendance percentage per student**
2. **If below threshold:**
   - Sends warning once per week
   - Includes current percentage
   - Suggests improvement
3. **Students receive actionable alerts**

### Daily Summary

1. **At 6 PM daily**
2. **For each student:**
   - Count classes attended
   - Count classes missed
   - Send summary
3. **Students stay informed**

## 📱 Student View (Mobile App Integration)

For student mobile app (future development):

```javascript
// API endpoint to get student notifications
GET /api/notifications/student/:studentId

// Mark as read
PUT /api/notifications/:id/read

// Response format
{
    "success": true,
    "data": [
        {
            "id": "notif123",
            "title": "Class Reminder: CS101",
            "message": "Your class starts in 15 minutes",
            "timestamp": "2026-10-08T09:00:00Z",
            "read": false,
            "type": "class-reminder"
        }
    ]
}
```

## 🎨 Customizing Notification Templates

### Email Template

Create professional HTML emails:

```javascript
const emailTemplate = (subject, message, studentName) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .content {
            padding: 30px;
        }
        .footer {
            padding: 20px;
            background: #f9f9f9;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 School Attendance System</h1>
        </div>
        <div class="content">
            <p>Dear ${studentName},</p>
            <h2>${subject}</h2>
            <p>${message}</p>
        </div>
        <div class="footer">
            <p>School Administration • Attendance Management System</p>
            <p style="font-size: 12px; color: #999;">
                This is an automated message. Please do not reply.
            </p>
        </div>
    </div>
</body>
</html>
`;
```

### SMS Template

Keep SMS short (160 characters recommended):

```javascript
const smsTemplate = (courseName, time, room) => 
    `Class Reminder: ${courseName} starts at ${time} in Room ${room}. See you there!`;
```

## 📈 Monitoring & Analytics

### View Notification History

1. Go to **Notifications** tab
2. Scroll to **"Notification History"**
3. Filter by:
   - All Notifications
   - Today
   - This Week
   - This Month

### Track Delivery Status

Each notification shows:
- ✓ Sent successfully
- ⏳ Pending
- ✗ Failed

### View Upcoming Notifications

See scheduled automatic reminders:
- Class name
- Send time
- Recipient count

## 🔍 Troubleshooting

### Emails Not Sending

**Check:**
- Gmail App Password is correct
- Less secure app access enabled (if not using App Password)
- Email address is valid
- Internet connection

**Test:**
```javascript
// Add test endpoint
app.get('/api/test-email', async (req, res) => {
    try {
        await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: 'Test Email',
            text: 'If you receive this, email is working!'
        });
        res.send('Test email sent!');
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
});
```

### SMS Not Sending

**Check:**
- Twilio credentials are correct
- Phone numbers include country code (+1 for US)
- Account has credits
- Phone number is verified (in trial mode)

### Notifications Not Triggering

**Check:**
- Auto reminders are enabled
- System time is correct
- Schedules are set up properly
- Students are enrolled in courses

## 💰 Cost Estimates

### Email (Free Options)
- **Gmail**: 500 emails/day (free)
- **SendGrid**: 100 emails/day (free tier)
- **AWS SES**: $0.10 per 1000 emails

### SMS
- **Twilio**: ~$0.0075 per SMS (US)
- **AWS SNS**: ~$0.00645 per SMS
- **Africa's Talking**: ~$0.015 per SMS (Africa)

### Example Monthly Cost (100 students)
- 20 class days/month
- 4 classes/day
- 1 reminder per class

**Calculations:**
- Total notifications: 100 students × 20 days × 4 classes = 8,000
- Email cost: FREE (within Gmail limit)
- SMS cost: 8,000 × $0.0075 = **$60/month**

**Recommendation**: Use email as primary, SMS for critical alerts only.

## 🚀 Best Practices

1. **Don't Over-Notify**
   - Limit to important alerts only
   - Respect quiet hours (before 8 AM, after 9 PM)

2. **Clear Messages**
   - Be specific about action needed
   - Include all relevant details
   - Use friendly, professional tone

3. **Test First**
   - Send to yourself before mass notifications
   - Verify formatting and links
   - Check all notification methods

4. **Monitor Delivery**
   - Check notification history regularly
   - Address failed deliveries
   - Update student contact info

5. **Student Preferences**
   - Allow students to choose notification methods
   - Respect opt-out requests
   - Provide unsubscribe options

## 📞 Support

For technical issues:
1. Check server logs: `npm start` console output
2. Verify API endpoints are working: Test with Postman
3. Check student email/phone data is valid
4. Review notification history for patterns

## 🎓 Training for Staff

Recommended training session outline:
1. Overview of notification system (15 min)
2. Hands-on: Send manual notification (10 min)
3. Configure automatic reminders (10 min)
4. Review history and troubleshoot (10 min)
5. Q&A (15 min)

---

**Version**: 1.0.0  
**Last Updated**: October 2026  
**Status**: Production Ready ✓

// Student Attendance Management System - Backend Server
// This server handles data storage and syncs with school servers

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Data directory
const DATA_DIR = path.join(__dirname, 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');
const COURSES_FILE = path.join(DATA_DIR, 'courses.json');
const SCHEDULES_FILE = path.join(DATA_DIR, 'schedules.json');
const ATTENDANCE_FILE = path.join(DATA_DIR, 'attendance.json');

// School Server Configuration (Update with your school's actual API)
const SCHOOL_SERVER_CONFIG = {
    enabled: false, // Set to true when connecting to actual school server
    url: 'https://school-server.example.com/api',
    apiKey: 'YOUR_API_KEY_HERE',
    syncInterval: 60000 // Sync every 60 seconds
};

// Initialize data directory
async function initializeDataDirectory() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        
        // Initialize files if they don't exist
        const files = [
            { path: STUDENTS_FILE, data: [] },
            { path: COURSES_FILE, data: [] },
            { path: SCHEDULES_FILE, data: [] },
            { path: ATTENDANCE_FILE, data: [] }
        ];
        
        for (const file of files) {
            try {
                await fs.access(file.path);
            } catch {
                await fs.writeFile(file.path, JSON.stringify(file.data, null, 2));
            }
        }
        
        console.log('✓ Data directory initialized');
    } catch (error) {
        console.error('Error initializing data directory:', error);
    }
}

// Helper function to read JSON file
async function readJSONFile(filepath) {
    try {
        const data = await fs.readFile(filepath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filepath}:`, error);
        return [];
    }
}

// Helper function to write JSON file
async function writeJSONFile(filepath, data) {
    try {
        await fs.writeFile(filepath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing ${filepath}:`, error);
        throw error;
    }
}

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Attendance Management Server is running',
        timestamp: new Date().toISOString(),
        schoolServerConnected: SCHOOL_SERVER_CONFIG.enabled
    });
});

// Sync all data from client
app.post('/api/sync', async (req, res) => {
    try {
        const { students, courses, schedules, attendance } = req.body;
        
        // Save to local files
        if (students) await writeJSONFile(STUDENTS_FILE, students);
        if (courses) await writeJSONFile(COURSES_FILE, courses);
        if (schedules) await writeJSONFile(SCHEDULES_FILE, schedules);
        if (attendance) await writeJSONFile(ATTENDANCE_FILE, attendance);
        
        // Sync to school server if enabled
        if (SCHOOL_SERVER_CONFIG.enabled) {
            await syncToSchoolServer({ students, courses, schedules, attendance });
        }
        
        res.json({
            success: true,
            message: 'Data synced successfully',
            timestamp: new Date().toISOString(),
            recordCount: {
                students: students?.length || 0,
                courses: courses?.length || 0,
                schedules: schedules?.length || 0,
                attendance: attendance?.length || 0
            }
        });
    } catch (error) {
        console.error('Sync error:', error);
        res.status(500).json({
            success: false,
            message: 'Sync failed: ' + error.message
        });
    }
});

// Get all students
app.get('/api/students', async (req, res) => {
    try {
        const students = await readJSONFile(STUDENTS_FILE);
        res.json({
            success: true,
            data: students,
            count: students.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch students'
        });
    }
});

// Add new student
app.post('/api/students', async (req, res) => {
    try {
        const students = await readJSONFile(STUDENTS_FILE);
        const newStudent = {
            id: req.body.id || generateId(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        students.push(newStudent);
        await writeJSONFile(STUDENTS_FILE, students);
        
        if (SCHOOL_SERVER_CONFIG.enabled) {
            await syncStudentToSchoolServer(newStudent);
        }
        
        res.status(201).json({
            success: true,
            message: 'Student added successfully',
            data: newStudent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add student: ' + error.message
        });
    }
});

// Update student
app.put('/api/students/:id', async (req, res) => {
    try {
        const students = await readJSONFile(STUDENTS_FILE);
        const index = students.findIndex(s => s.id === req.params.id);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        students[index] = {
            ...students[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };
        
        await writeJSONFile(STUDENTS_FILE, students);
        
        res.json({
            success: true,
            message: 'Student updated successfully',
            data: students[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update student'
        });
    }
});

// Delete student
app.delete('/api/students/:id', async (req, res) => {
    try {
        let students = await readJSONFile(STUDENTS_FILE);
        const initialLength = students.length;
        
        students = students.filter(s => s.id !== req.params.id);
        
        if (students.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }
        
        await writeJSONFile(STUDENTS_FILE, students);
        
        res.json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete student'
        });
    }
});

// Get all courses
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await readJSONFile(COURSES_FILE);
        res.json({
            success: true,
            data: courses,
            count: courses.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch courses'
        });
    }
});

// Add new course
app.post('/api/courses', async (req, res) => {
    try {
        const courses = await readJSONFile(COURSES_FILE);
        const newCourse = {
            id: req.body.id || generateId(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        courses.push(newCourse);
        await writeJSONFile(COURSES_FILE, courses);
        
        res.status(201).json({
            success: true,
            message: 'Course added successfully',
            data: newCourse
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add course'
        });
    }
});

// Get all schedules
app.get('/api/schedules', async (req, res) => {
    try {
        const schedules = await readJSONFile(SCHEDULES_FILE);
        res.json({
            success: true,
            data: schedules,
            count: schedules.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch schedules'
        });
    }
});

// Add new schedule
app.post('/api/schedules', async (req, res) => {
    try {
        const schedules = await readJSONFile(SCHEDULES_FILE);
        const newSchedule = {
            id: req.body.id || generateId(),
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        schedules.push(newSchedule);
        await writeJSONFile(SCHEDULES_FILE, schedules);
        
        res.status(201).json({
            success: true,
            message: 'Schedule added successfully',
            data: newSchedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add schedule'
        });
    }
});

// Get attendance records
app.get('/api/attendance', async (req, res) => {
    try {
        let attendance = await readJSONFile(ATTENDANCE_FILE);
        
        // Filter by query parameters
        if (req.query.studentId) {
            attendance = attendance.filter(a => a.studentId === req.query.studentId);
        }
        if (req.query.courseId) {
            attendance = attendance.filter(a => a.courseId === req.query.courseId);
        }
        if (req.query.startDate && req.query.endDate) {
            attendance = attendance.filter(a => {
                const date = new Date(a.date);
                return date >= new Date(req.query.startDate) && date <= new Date(req.query.endDate);
            });
        }
        
        res.json({
            success: true,
            data: attendance,
            count: attendance.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance'
        });
    }
});

// Mark attendance
app.post('/api/attendance', async (req, res) => {
    try {
        const attendance = await readJSONFile(ATTENDANCE_FILE);
        const records = Array.isArray(req.body) ? req.body : [req.body];
        
        const newRecords = records.map(record => ({
            id: record.id || generateId(),
            ...record,
            timestamp: new Date().toISOString()
        }));
        
        attendance.push(...newRecords);
        await writeJSONFile(ATTENDANCE_FILE, attendance);
        
        // Sync to school server
        if (SCHOOL_SERVER_CONFIG.enabled) {
            await syncAttendanceToSchoolServer(newRecords);
        }
        
        res.status(201).json({
            success: true,
            message: `${newRecords.length} attendance record(s) saved successfully`,
            data: newRecords
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to save attendance: ' + error.message
        });
    }
});

// Get attendance statistics
app.get('/api/statistics', async (req, res) => {
    try {
        const students = await readJSONFile(STUDENTS_FILE);
        const courses = await readJSONFile(COURSES_FILE);
        const attendance = await readJSONFile(ATTENDANCE_FILE);
        
        const today = new Date().toDateString();
        const todayAttendance = attendance.filter(a => new Date(a.date).toDateString() === today);
        
        const stats = {
            totalStudents: students.length,
            totalCourses: courses.length,
            totalAttendanceRecords: attendance.length,
            todayPresent: todayAttendance.filter(a => a.status === 'present').length,
            todayAbsent: todayAttendance.filter(a => a.status === 'absent').length,
            attendanceRate: attendance.length > 0 
                ? ((attendance.filter(a => a.status === 'present').length / attendance.length) * 100).toFixed(2)
                : 0
        };
        
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
});

// Export attendance report
app.get('/api/reports/export', async (req, res) => {
    try {
        const attendance = await readJSONFile(ATTENDANCE_FILE);
        const students = await readJSONFile(STUDENTS_FILE);
        const courses = await readJSONFile(COURSES_FILE);
        
        // Create CSV
        const csv = [
            ['Date', 'Student ID', 'Student Name', 'Course Code', 'Course Name', 'Status', 'Timestamp']
        ];
        
        attendance.forEach(record => {
            const student = students.find(s => s.id === record.studentId);
            const course = courses.find(c => c.id === record.courseId);
            
            csv.push([
                record.date,
                record.studentId,
                student ? student.name : 'Unknown',
                course ? course.code : 'Unknown',
                course ? course.name : 'Unknown',
                record.status,
                record.timestamp
            ]);
        });
        
        const csvContent = csv.map(row => row.join(',')).join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="attendance_report_${new Date().toISOString().split('T')[0]}.csv"`);
        res.send(csvContent);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to export report'
        });
    }
});

// ==================== NOTIFICATION ENDPOINTS ====================

// Send email notification
app.post('/api/notifications/email', async (req, res) => {
    try {
        const { to, subject, message } = req.body;
        
        console.log(`📧 Email Notification:`);
        console.log(`   To: ${to}`);
        console.log(`   Subject: ${subject}`);
        console.log(`   Message: ${message}`);
        
        // Here you would integrate with email service (SendGrid, AWS SES, Nodemailer, etc.)
        // Example with Nodemailer:
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: `
                <h2>${subject}</h2>
                <p>${message}</p>
                <br>
                <p>Best regards,<br>School Administration</p>
            `
        });
        */
        
        res.json({
            success: true,
            message: 'Email notification sent successfully',
            recipient: to
        });
    } catch (error) {
        console.error('Email notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email notification'
        });
    }
});

// Send SMS notification
app.post('/api/notifications/sms', async (req, res) => {
    try {
        const { to, message } = req.body;
        
        console.log(`📱 SMS Notification:`);
        console.log(`   To: ${to}`);
        console.log(`   Message: ${message}`);
        
        // Here you would integrate with SMS service (Twilio, AWS SNS, etc.)
        // Example with Twilio:
        /*
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        
        await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });
        */
        
        res.json({
            success: true,
            message: 'SMS notification sent successfully',
            recipient: to
        });
    } catch (error) {
        console.error('SMS notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send SMS notification'
        });
    }
});

// Get notifications for a student
app.get('/api/notifications/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        
        // In real app, fetch from database
        // For demo, return sample notifications
        const studentNotifications = [
            {
                id: '1',
                title: 'Class Reminder',
                message: 'Your CS101 class starts in 15 minutes at Room A101',
                timestamp: new Date().toISOString(),
                read: false
            }
        ];
        
        res.json({
            success: true,
            data: studentNotifications,
            count: studentNotifications.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications'
        });
    }
});

// Mark notification as read
app.put('/api/notifications/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Update notification status
        // In real app, update in database
        
        res.json({
            success: true,
            message: 'Notification marked as read'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update notification'
        });
    }
});

// Send bulk notification
app.post('/api/notifications/bulk', async (req, res) => {
    try {
        const { recipients, subject, message, methods } = req.body;
        
        console.log(`📢 Bulk Notification:`);
        console.log(`   Recipients: ${recipients.length} student(s)`);
        console.log(`   Subject: ${subject}`);
        console.log(`   Methods: ${Object.keys(methods).filter(k => methods[k]).join(', ')}`);
        
        let sentCount = 0;
        const results = [];
        
        for (const recipient of recipients) {
            try {
                // Send via different methods
                if (methods.email && recipient.email) {
                    // Send email
                    sentCount++;
                }
                
                if (methods.sms && recipient.phone) {
                    // Send SMS
                    sentCount++;
                }
                
                if (methods.inApp) {
                    // Create in-app notification
                    sentCount++;
                }
                
                results.push({
                    recipientId: recipient.id,
                    status: 'sent'
                });
            } catch (error) {
                results.push({
                    recipientId: recipient.id,
                    status: 'failed',
                    error: error.message
                });
            }
        }
        
        res.json({
            success: true,
            message: `Notification sent to ${sentCount} recipient(s)`,
            results: results
        });
    } catch (error) {
        console.error('Bulk notification error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send bulk notification'
        });
    }
});

// ==================== SCHOOL SERVER SYNC ====================

// Sync data to school server
async function syncToSchoolServer(data) {
    if (!SCHOOL_SERVER_CONFIG.enabled) return;
    
    try {
        console.log('Syncing to school server...');
        
        // Example sync request (customize based on your school's API)
        const response = await fetch(`${SCHOOL_SERVER_CONFIG.url}/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SCHOOL_SERVER_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                data: data
            })
        });
        
        if (response.ok) {
            console.log('✓ Successfully synced to school server');
        } else {
            console.error('✗ School server sync failed:', response.statusText);
        }
    } catch (error) {
        console.error('✗ School server sync error:', error.message);
    }
}

// Sync student to school server
async function syncStudentToSchoolServer(student) {
    if (!SCHOOL_SERVER_CONFIG.enabled) return;
    
    try {
        await fetch(`${SCHOOL_SERVER_CONFIG.url}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SCHOOL_SERVER_CONFIG.apiKey}`
            },
            body: JSON.stringify(student)
        });
    } catch (error) {
        console.error('Student sync error:', error);
    }
}

// Sync attendance to school server
async function syncAttendanceToSchoolServer(records) {
    if (!SCHOOL_SERVER_CONFIG.enabled) return;
    
    try {
        await fetch(`${SCHOOL_SERVER_CONFIG.url}/attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SCHOOL_SERVER_CONFIG.apiKey}`
            },
            body: JSON.stringify(records)
        });
        
        console.log(`✓ Synced ${records.length} attendance records to school server`);
    } catch (error) {
        console.error('Attendance sync error:', error);
    }
}

// Auto-sync to school server
function startAutoSync() {
    if (!SCHOOL_SERVER_CONFIG.enabled) return;
    
    setInterval(async () => {
        try {
            const students = await readJSONFile(STUDENTS_FILE);
            const courses = await readJSONFile(COURSES_FILE);
            const schedules = await readJSONFile(SCHEDULES_FILE);
            const attendance = await readJSONFile(ATTENDANCE_FILE);
            
            await syncToSchoolServer({ students, courses, schedules, attendance });
        } catch (error) {
            console.error('Auto-sync error:', error);
        }
    }, SCHOOL_SERVER_CONFIG.syncInterval);
}

// Helper function to generate ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ==================== START SERVER ====================

async function startServer() {
    await initializeDataDirectory();
    
    app.listen(PORT, () => {
        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║  📚 STUDENT ATTENDANCE MANAGEMENT SYSTEM - SERVER          ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📊 API Documentation:\n`);
        console.log(`   Health Check:`);
        console.log(`   GET    ${PORT}/api/health\n`);
        console.log(`   Students:`);
        console.log(`   GET    /api/students`);
        console.log(`   POST   /api/students`);
        console.log(`   PUT    /api/students/:id`);
        console.log(`   DELETE /api/students/:id\n`);
        console.log(`   Courses:`);
        console.log(`   GET    /api/courses`);
        console.log(`   POST   /api/courses\n`);
        console.log(`   Schedules:`);
        console.log(`   GET    /api/schedules`);
        console.log(`   POST   /api/schedules\n`);
        console.log(`   Attendance:`);
        console.log(`   GET    /api/attendance`);
        console.log(`   POST   /api/attendance\n`);
        console.log(`   Statistics & Reports:`);
        console.log(`   GET    /api/statistics`);
        console.log(`   GET    /api/reports/export\n`);
        console.log(`   Data Sync:`);
        console.log(`   POST   /api/sync\n`);
        console.log(`   Notifications:`);
        console.log(`   POST   /api/notifications/email`);
        console.log(`   POST   /api/notifications/sms`);
        console.log(`   POST   /api/notifications/bulk`);
        console.log(`   GET    /api/notifications/student/:studentId`);
        console.log(`   PUT    /api/notifications/:id/read\n`);
        console.log(`🔄 School Server Sync: ${SCHOOL_SERVER_CONFIG.enabled ? 'ENABLED' : 'DISABLED'}`);
        console.log(`📁 Data Directory: ${DATA_DIR}\n`);
    });
    
    // Start auto-sync if enabled
    if (SCHOOL_SERVER_CONFIG.enabled) {
        startAutoSync();
        console.log(`🔄 Auto-sync to school server enabled (every ${SCHOOL_SERVER_CONFIG.syncInterval / 1000}s)`);
    }
}

startServer();

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server...');
    process.exit(0);
});

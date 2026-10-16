# 📚 Student Attendance Management System

A complete, professional web-based system for managing student attendance, course schedules, and synchronizing with school servers in real-time.

## ✨ Key Features

### 🎯 Core Functionality
- **Student Management**: Add, edit, view, and delete student records
- **Course Management**: Manage courses with instructors, credits, and departments
- **Class Scheduling**: Create and manage weekly class schedules with time slots and rooms
- **Attendance Tracking**: Mark and record student attendance for each class
- **Real-time Server Sync**: Automatically syncs all data with school servers
- **Comprehensive Reports**: Generate detailed attendance reports by student, course, or date range

### 📊 Dashboard Features
- Live statistics (total students, courses, present/absent counts)
- Today's class schedule
- Upcoming classes
- Recent attendance records
- Real-time sync status indicator

### 📝 Attendance Recording
- Mark attendance by course and date
- Bulk actions (Mark all present/absent)
- Individual student marking
- Time slot selection
- Instant server synchronization

### 📈 Reporting & Analytics
- Student attendance percentage
- Course attendance statistics
- Date range reports
- Export to CSV functionality
- Visual attendance status indicators

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Internet connection for server sync

### Installation

1. **Navigate to the project directory**
   ```powershell
   cd c:\Users\Administrator\Desktop\PaulRepair\attendance-system
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Start the server**
   ```powershell
   npm start
   ```

4. **Open the application**
   - Open `index.html` in your web browser
   - Or visit `http://localhost:3000` if serving through a web server

## 📖 User Guide

### 1. Dashboard
The main dashboard provides an overview of:
- Total students and courses
- Today's attendance statistics
- Class schedule for today
- Upcoming classes
- Recent attendance records

### 2. Mark Attendance

**Steps:**
1. Click **"Mark Attendance"** in the navigation
2. Select the **Course** from the dropdown
3. Select the **Date**
4. Select the **Time Slot** (based on course schedule)
5. Click **"Load Students"**
6. Mark each student as Present (✓) or Absent (✗)
7. Use **"Mark All Present"** or **"Mark All Absent"** for bulk actions
8. Click **"Submit Attendance"** to save

**Note:** Data is automatically synced to the school server.

### 3. Schedule Management

**Adding a Schedule:**
1. Go to **"Schedule"** view
2. Click **"+ Add Schedule"**
3. Fill in the form:
   - Select Course
   - Select Day of Week
   - Set Start and End Time
   - Enter Room Number
4. Click **"Save Schedule"**

**Viewing Schedules:**
- Use the day filter to view schedules for specific days
- All schedules show course info, instructor, time, and room

### 4. Reports

**Generating Reports:**
1. Go to **"Reports"** view
2. Select **Report Type**:
   - **By Student**: Shows attendance percentage per student
   - **By Course**: Shows attendance statistics per course
   - **By Date Range**: Shows detailed records for a date range
3. Set filters (student, course, dates)
4. Click **"Generate Report"**
5. Click **"Export to CSV"** to download

### 5. Student Management

**Adding Students:**
1. Go to **"Students"** view
2. Click **"+ Add Student"**
3. Fill in:
   - Student ID
   - Full Name
   - Email
   - Department
   - Year
4. Click **"Save Student"**

**Managing Students:**
- Use the search box to find students
- Click **"Edit"** to modify student details
- Click **"Delete"** to remove a student

### 6. Course Management

**Adding Courses:**
1. Go to **"Courses"** view
2. Click **"+ Add Course"**
3. Fill in:
   - Course Code (e.g., CS101)
   - Course Name
   - Instructor
   - Credits
   - Department
4. Click **"Save Course"**

## 🔄 Server Synchronization

### How It Works
The system automatically syncs data with school servers:
- **Auto-sync**: Every 30 seconds
- **Manual sync**: After each data modification
- **Status indicator**: Shows sync status in the navigation bar

### Server Configuration

Edit `script.js` to configure your school server:

```javascript
const SERVER_URL = 'http://your-school-server.com/api';
const SYNC_INTERVAL = 30000; // milliseconds
```

Edit `server.js` for school server integration:

```javascript
const SCHOOL_SERVER_CONFIG = {
    enabled: true, // Set to true to enable
    url: 'https://school-server.example.com/api',
    apiKey: 'YOUR_API_KEY_HERE',
    syncInterval: 60000
};
```

## 🖥️ Backend API

### Starting the Backend Server

```powershell
npm start
```

Server runs on `http://localhost:3000`

### API Endpoints

#### Health Check
```
GET /api/health
```

#### Students
```
GET    /api/students           - Get all students
POST   /api/students           - Add new student
PUT    /api/students/:id       - Update student
DELETE /api/students/:id       - Delete student
```

#### Courses
```
GET    /api/courses            - Get all courses
POST   /api/courses            - Add new course
```

#### Schedules
```
GET    /api/schedules          - Get all schedules
POST   /api/schedules          - Add new schedule
```

#### Attendance
```
GET    /api/attendance         - Get attendance records
POST   /api/attendance         - Mark attendance
```

Query parameters for GET /api/attendance:
- `studentId` - Filter by student
- `courseId` - Filter by course
- `startDate` - Filter by start date
- `endDate` - Filter by end date

#### Statistics
```
GET    /api/statistics         - Get attendance statistics
```

#### Reports
```
GET    /api/reports/export     - Export attendance report as CSV
```

#### Data Sync
```
POST   /api/sync               - Sync all data from client
```

### API Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 📂 Project Structure

```
attendance-system/
├── index.html              # Main application interface
├── styles.css              # Application styling
├── script.js               # Frontend logic and sync
├── server.js               # Backend server with school sync
├── package.json            # Node.js dependencies
├── README.md               # This file
└── data/                   # Data storage (created on first run)
    ├── students.json       # Student records
    ├── courses.json        # Course records
    ├── schedules.json      # Class schedules
    └── attendance.json     # Attendance records
```

## 💾 Data Storage

### Local Storage (Frontend)
- Browser localStorage for offline functionality
- Syncs with backend server automatically

### Backend Storage
- JSON files in `/data` directory
- Persistent storage across server restarts
- Can be upgraded to database (MySQL, MongoDB, etc.)

## 🔐 Security Considerations

### For Production Deployment

1. **Authentication**: Add user authentication and authorization
2. **HTTPS**: Use HTTPS for all communications
3. **API Security**: Implement API key authentication
4. **Data Validation**: Validate all inputs on server-side
5. **Rate Limiting**: Prevent abuse with rate limits
6. **Backup**: Regular automated backups of data
7. **Access Control**: Role-based access (admin, teacher, student)

### School Server Integration

To integrate with your school's server:

1. Update `SCHOOL_SERVER_CONFIG` in `server.js`
2. Set `enabled: true`
3. Configure API endpoint URL
4. Add authentication credentials
5. Map data fields to match school's API format

Example integration:

```javascript
const SCHOOL_SERVER_CONFIG = {
    enabled: true,
    url: 'https://myschool.edu/api/v1',
    apiKey: process.env.SCHOOL_API_KEY,
    syncInterval: 60000,
    endpoints: {
        students: '/students',
        attendance: '/attendance/mark',
        courses: '/courses'
    }
};
```

## 📊 Sample Data

The system includes sample data on first run:
- 3 students (John Doe, Jane Smith, Bob Johnson)
- 2 courses (CS101, CS102)
- 4 class schedules

You can clear this by deleting files in `/data` directory.

## 🎨 Customization

### Changing Theme Colors

Edit `styles.css`:
```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Primary color */
.btn-primary {
    background: #667eea;
}
```

### Adding New Fields

1. Update form in `index.html`
2. Add field to data structure in `script.js`
3. Update API endpoints in `server.js`
4. Update display templates

### Custom Reports

Add new report types in `script.js`:
```javascript
function generateCustomReport(records) {
    // Your custom report logic
}
```

## 🐛 Troubleshooting

### Sync Issues
- Check network connection
- Verify server is running (`npm start`)
- Check browser console for errors
- Verify `SERVER_URL` configuration

### Data Not Saving
- Check localStorage is enabled in browser
- Verify write permissions for `/data` directory
- Check server logs for errors

### Schedule Not Showing
- Verify course is added first
- Check day/time format
- Reload the page

### Attendance Not Recording
- Ensure course and date are selected
- Check if students are enrolled in course
- Verify at least one student is marked

## 📱 Mobile Support

The system is fully responsive and works on:
- Desktop computers
- Tablets
- Smartphones

Mobile features:
- Touch-friendly buttons
- Responsive layouts
- Simplified navigation

## 🔧 Advanced Configuration

### Database Integration

To use a database instead of JSON files:

1. Install database driver (e.g., `npm install mysql2`)
2. Update `server.js` to use database queries
3. Create database schema
4. Update CRUD operations

### Email Notifications

Add email notifications for:
- Low attendance alerts
- Daily attendance summaries
- Absent student notifications

Install nodemailer: `npm install nodemailer`

### Multi-tenant Support

For multiple schools/campuses:
- Add organization/school ID to all records
- Filter data by organization
- Separate data directories per organization

## 🚀 Deployment

### Local Network
1. Get server IP address: `ipconfig`
2. Update firewall to allow port 3000
3. Access from other devices: `http://SERVER_IP:3000`

### Cloud Deployment (Production)

**Recommended Platforms:**
- Heroku
- AWS (Elastic Beanstalk)
- DigitalOcean
- Azure App Service

**Steps:**
1. Set up environment variables
2. Configure production database
3. Enable HTTPS
4. Set up domain name
5. Configure backup strategy

## 📞 Support

For issues or questions:
1. Check this README
2. Review browser console logs
3. Check server logs
4. Verify configuration settings

## 📄 License

MIT License - Free to use for educational and commercial purposes.

## 🙏 Credits

Built with modern web technologies for educational institutions.

---

**Version:** 1.0.0  
**Last Updated:** October 2026  
**Status:** Production Ready ✓

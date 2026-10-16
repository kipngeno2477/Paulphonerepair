// Data Storage
let students = [];
let courses = [];
let schedules = [];
let attendance = [];

// Server Configuration
const SERVER_URL = 'http://localhost:3000/api'; // Change to your school server URL
const SYNC_INTERVAL = 30000; // Sync every 30 seconds

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    initializeNavigation();
    initializeForms();
    updateDashboard();
    updateCurrentDateTime();
    startAutoSync();
    
    // Set default date
    document.getElementById('attendanceDate').valueAsDate = new Date();
    document.getElementById('reportStartDate').valueAsDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    document.getElementById('reportEndDate').valueAsDate = new Date();
});

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding view
            const viewName = item.dataset.view;
            showView(viewName);
        });
    });
}

function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    const view = document.getElementById(`${viewName}-view`);
    if (view) {
        view.classList.add('active');
        
        // Load data for specific views
        switch(viewName) {
            case 'dashboard':
                updateDashboard();
                break;
            case 'mark-attendance':
                loadCoursesForAttendance();
                break;
            case 'schedule':
                loadScheduleList();
                break;
            case 'reports':
                loadReportFilters();
                break;
            case 'students':
                loadStudentsList();
                break;
            case 'courses':
                loadCoursesList();
                break;
        }
    }
}

// Date and Time
function updateCurrentDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
    setTimeout(updateCurrentDateTime, 60000); // Update every minute
}

// Dashboard Functions
function updateDashboard() {
    // Update statistics
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('totalCourses').textContent = courses.length;
    
    const today = new Date().toDateString();
    const todayAttendance = attendance.filter(a => new Date(a.date).toDateString() === today);
    const presentToday = todayAttendance.filter(a => a.status === 'present').length;
    const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
    
    document.getElementById('todayPresent').textContent = presentToday;
    document.getElementById('todayAbsent').textContent = absentToday;
    
    // Load today's classes
    loadTodayClasses();
    loadUpcomingClasses();
    loadRecentAttendance();
}

function loadTodayClasses() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todaySchedules = schedules.filter(s => s.day === today);
    
    const container = document.getElementById('todayClasses');
    if (todaySchedules.length === 0) {
        container.innerHTML = '<p class="empty-state">No classes scheduled for today</p>';
        return;
    }
    
    container.innerHTML = todaySchedules.map(schedule => {
        const course = courses.find(c => c.id === schedule.courseId);
        return `
            <div class="class-item">
                <div class="class-info">
                    <h4>${course ? course.name : 'Unknown Course'}</h4>
                    <p>${course ? course.code : ''} • Room ${schedule.room}</p>
                    <p>Instructor: ${course ? course.instructor : 'N/A'}</p>
                </div>
                <div class="class-time">
                    ${schedule.startTime} - ${schedule.endTime}
                </div>
            </div>
        `;
    }).join('');
}

function loadUpcomingClasses() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const upcomingSchedules = schedules
        .filter(s => s.day === currentDay && s.startTime > currentTime)
        .slice(0, 3);
    
    const container = document.getElementById('upcomingClasses');
    if (upcomingSchedules.length === 0) {
        container.innerHTML = '<p class="empty-state">No upcoming classes today</p>';
        return;
    }
    
    container.innerHTML = upcomingSchedules.map(schedule => {
        const course = courses.find(c => c.id === schedule.courseId);
        return `
            <div class="class-item">
                <div class="class-info">
                    <h4>${course ? course.name : 'Unknown Course'}</h4>
                    <p>Room ${schedule.room}</p>
                </div>
                <div class="class-time">
                    ${schedule.startTime}
                </div>
            </div>
        `;
    }).join('');
}

function loadRecentAttendance() {
    const recentRecords = attendance
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    const container = document.getElementById('recentAttendance');
    if (recentRecords.length === 0) {
        container.innerHTML = '<p class="empty-state">No attendance records yet</p>';
        return;
    }
    
    const table = `
        <table class="report-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${recentRecords.map(record => {
                    const student = students.find(s => s.id === record.studentId);
                    const course = courses.find(c => c.id === record.courseId);
                    return `
                        <tr>
                            <td>${new Date(record.date).toLocaleDateString()}</td>
                            <td>${student ? student.name : 'Unknown'}</td>
                            <td>${course ? course.code : 'Unknown'}</td>
                            <td>
                                <span class="attendance-status ${record.status}">
                                    ${record.status === 'present' ? '✓ Present' : '✗ Absent'}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
    
    container.innerHTML = table;
}

// Mark Attendance Functions
function loadCoursesForAttendance() {
    const select = document.getElementById('attendanceCourse');
    select.innerHTML = '<option value="">-- Select Course --</option>' +
        courses.map(course => `<option value="${course.id}">${course.code} - ${course.name}</option>`).join('');
}

function loadStudentsForAttendance() {
    const courseId = document.getElementById('attendanceCourse').value;
    const date = document.getElementById('attendanceDate').value;
    const time = document.getElementById('attendanceTime').value;
    
    if (!courseId || !date) {
        alert('Please select course and date');
        return;
    }
    
    // Load time slots for selected course
    loadTimeSlots(courseId);
    
    const container = document.getElementById('studentsAttendanceList');
    const listDiv = document.getElementById('attendanceStudentsList');
    
    // Filter students enrolled in the course
    const enrolledStudents = students.filter(s => 
        s.courses && s.courses.includes(courseId)
    );
    
    if (enrolledStudents.length === 0) {
        container.innerHTML = '<p class="empty-state">No students enrolled in this course</p>';
        listDiv.style.display = 'block';
        return;
    }
    
    container.innerHTML = enrolledStudents.map(student => `
        <div class="student-attendance-item" data-student-id="${student.id}">
            <div class="student-info">
                <h4>${student.name}</h4>
                <p>${student.id} • ${student.department}</p>
            </div>
            <div class="attendance-actions">
                <button class="attendance-btn present" onclick="markAttendance('${student.id}', 'present')">
                    ✓ Present
                </button>
                <button class="attendance-btn absent" onclick="markAttendance('${student.id}', 'absent')">
                    ✗ Absent
                </button>
            </div>
        </div>
    `).join('');
    
    listDiv.style.display = 'block';
}

function loadTimeSlots(courseId) {
    const select = document.getElementById('attendanceTime');
    const courseSchedules = schedules.filter(s => s.courseId === courseId);
    
    select.innerHTML = '<option value="">-- Select Time --</option>' +
        courseSchedules.map(schedule => 
            `<option value="${schedule.id}">${schedule.day} ${schedule.startTime} - ${schedule.endTime}</option>`
        ).join('');
}

function markAttendance(studentId, status) {
    const item = document.querySelector(`[data-student-id="${studentId}"]`);
    const buttons = item.querySelectorAll('.attendance-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    item.querySelector(`.attendance-btn.${status}`).classList.add('active');
    
    // Store status in data attribute
    item.dataset.status = status;
}

function markAllPresent() {
    const items = document.querySelectorAll('.student-attendance-item');
    items.forEach(item => {
        const studentId = item.dataset.studentId;
        markAttendance(studentId, 'present');
    });
}

function markAllAbsent() {
    const items = document.querySelectorAll('.student-attendance-item');
    items.forEach(item => {
        const studentId = item.dataset.studentId;
        markAttendance(studentId, 'absent');
    });
}

function submitAttendance() {
    const courseId = document.getElementById('attendanceCourse').value;
    const date = document.getElementById('attendanceDate').value;
    const items = document.querySelectorAll('.student-attendance-item');
    
    if (!courseId || !date) {
        alert('Please select course and date');
        return;
    }
    
    const records = [];
    let unmarked = 0;
    
    items.forEach(item => {
        const studentId = item.dataset.studentId;
        const status = item.dataset.status;
        
        if (!status) {
            unmarked++;
            return;
        }
        
        records.push({
            id: generateId(),
            studentId: studentId,
            courseId: courseId,
            date: date,
            status: status,
            timestamp: new Date().toISOString()
        });
    });
    
    if (unmarked > 0) {
        if (!confirm(`${unmarked} students are not marked. Continue anyway?`)) {
            return;
        }
    }
    
    if (records.length === 0) {
        alert('No attendance marked');
        return;
    }
    
    // Add to attendance array
    attendance.push(...records);
    saveDataToStorage();
    syncToServer();
    
    alert(`Attendance recorded for ${records.length} students!`);
    
    // Reset form
    document.getElementById('attendanceStudentsList').style.display = 'none';
    document.getElementById('attendanceCourse').value = '';
    updateDashboard();
}

// Schedule Functions
function loadScheduleList() {
    const filterDay = document.getElementById('scheduleFilterDay').value;
    let filteredSchedules = schedules;
    
    if (filterDay) {
        filteredSchedules = schedules.filter(s => s.day === filterDay);
    }
    
    const container = document.getElementById('scheduleList');
    
    if (filteredSchedules.length === 0) {
        container.innerHTML = '<p class="empty-state">No schedules found</p>';
        return;
    }
    
    container.innerHTML = filteredSchedules.map(schedule => {
        const course = courses.find(c => c.id === schedule.courseId);
        return `
            <div class="schedule-item">
                <div class="schedule-header">
                    <h4>${course ? course.name : 'Unknown Course'}</h4>
                    <span class="schedule-day">${schedule.day}</span>
                </div>
                <div class="schedule-details">
                    <p><strong>Course Code:</strong> ${course ? course.code : 'N/A'}</p>
                    <p><strong>Time:</strong> ${schedule.startTime} - ${schedule.endTime}</p>
                    <p><strong>Room:</strong> ${schedule.room}</p>
                    <p><strong>Instructor:</strong> ${course ? course.instructor : 'N/A'}</p>
                </div>
            </div>
        `;
    }).join('');
}

document.getElementById('scheduleFilterDay')?.addEventListener('change', loadScheduleList);

// Reports Functions
function loadReportFilters() {
    const studentSelect = document.getElementById('reportStudent');
    const courseSelect = document.getElementById('reportCourse');
    
    studentSelect.innerHTML = '<option value="">-- All Students --</option>' +
        students.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    
    courseSelect.innerHTML = '<option value="">-- All Courses --</option>' +
        courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
}

function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const studentId = document.getElementById('reportStudent').value;
    const courseId = document.getElementById('reportCourse').value;
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    let filteredAttendance = attendance;
    
    // Filter by date range
    if (startDate && endDate) {
        filteredAttendance = filteredAttendance.filter(a => {
            const aDate = new Date(a.date);
            return aDate >= new Date(startDate) && aDate <= new Date(endDate);
        });
    }
    
    // Filter by student
    if (studentId) {
        filteredAttendance = filteredAttendance.filter(a => a.studentId === studentId);
    }
    
    // Filter by course
    if (courseId) {
        filteredAttendance = filteredAttendance.filter(a => a.courseId === courseId);
    }
    
    if (filteredAttendance.length === 0) {
        document.getElementById('reportContent').innerHTML = '<p class="empty-state">No attendance records found for the selected criteria</p>';
        document.getElementById('reportResults').style.display = 'block';
        return;
    }
    
    // Generate report based on type
    let reportHTML = '';
    
    if (reportType === 'student') {
        reportHTML = generateStudentReport(filteredAttendance);
    } else if (reportType === 'course') {
        reportHTML = generateCourseReport(filteredAttendance);
    } else {
        reportHTML = generateDateReport(filteredAttendance);
    }
    
    document.getElementById('reportContent').innerHTML = reportHTML;
    document.getElementById('reportResults').style.display = 'block';
}

function generateStudentReport(records) {
    const studentStats = {};
    
    records.forEach(record => {
        if (!studentStats[record.studentId]) {
            const student = students.find(s => s.id === record.studentId);
            studentStats[record.studentId] = {
                name: student ? student.name : 'Unknown',
                present: 0,
                absent: 0,
                total: 0
            };
        }
        
        studentStats[record.studentId].total++;
        if (record.status === 'present') {
            studentStats[record.studentId].present++;
        } else {
            studentStats[record.studentId].absent++;
        }
    });
    
    return `
        <table class="report-table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Total Classes</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Attendance %</th>
                </tr>
            </thead>
            <tbody>
                ${Object.values(studentStats).map(stat => `
                    <tr>
                        <td>${stat.name}</td>
                        <td>${stat.total}</td>
                        <td>${stat.present}</td>
                        <td>${stat.absent}</td>
                        <td>${((stat.present / stat.total) * 100).toFixed(1)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function generateCourseReport(records) {
    const courseStats = {};
    
    records.forEach(record => {
        if (!courseStats[record.courseId]) {
            const course = courses.find(c => c.id === record.courseId);
            courseStats[record.courseId] = {
                name: course ? `${course.code} - ${course.name}` : 'Unknown',
                present: 0,
                absent: 0,
                total: 0
            };
        }
        
        courseStats[record.courseId].total++;
        if (record.status === 'present') {
            courseStats[record.courseId].present++;
        } else {
            courseStats[record.courseId].absent++;
        }
    });
    
    return `
        <table class="report-table">
            <thead>
                <tr>
                    <th>Course</th>
                    <th>Total Records</th>
                    <th>Present</th>
                    <th>Absent</th>
                    <th>Attendance %</th>
                </tr>
            </thead>
            <tbody>
                ${Object.values(courseStats).map(stat => `
                    <tr>
                        <td>${stat.name}</td>
                        <td>${stat.total}</td>
                        <td>${stat.present}</td>
                        <td>${stat.absent}</td>
                        <td>${((stat.present / stat.total) * 100).toFixed(1)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function generateDateReport(records) {
    return `
        <table class="report-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Course</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${records.sort((a, b) => new Date(b.date) - new Date(a.date)).map(record => {
                    const student = students.find(s => s.id === record.studentId);
                    const course = courses.find(c => c.id === record.courseId);
                    return `
                        <tr>
                            <td>${new Date(record.date).toLocaleDateString()}</td>
                            <td>${student ? student.name : 'Unknown'}</td>
                            <td>${course ? course.code : 'Unknown'}</td>
                            <td>
                                <span class="attendance-status ${record.status}">
                                    ${record.status === 'present' ? '✓ Present' : '✗ Absent'}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function exportReport() {
    const reportContent = document.getElementById('reportContent');
    if (!reportContent.innerHTML || reportContent.innerHTML.includes('empty-state')) {
        alert('No report to export. Please generate a report first.');
        return;
    }
    
    const table = reportContent.querySelector('table');
    if (!table) return;
    
    let csv = '';
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = Array.from(cols).map(col => {
            return `"${col.textContent.trim().replace(/"/g, '""')}"`;
        });
        csv += rowData.join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Students Management
function loadStudentsList() {
    const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
    const filteredStudents = students.filter(s => 
        s.name.toLowerCase().includes(searchTerm) ||
        s.id.toLowerCase().includes(searchTerm) ||
        s.email.toLowerCase().includes(searchTerm)
    );
    
    const container = document.getElementById('studentsList');
    
    if (filteredStudents.length === 0) {
        container.innerHTML = '<p class="empty-state">No students found</p>';
        return;
    }
    
    container.innerHTML = filteredStudents.map(student => `
        <div class="student-item">
            <div class="student-details">
                <h4>
                    ${student.name}
                    <span class="badge badge-year">Year ${student.year}</span>
                </h4>
                <p>${student.id} • ${student.email}</p>
                <p>${student.department}</p>
            </div>
            <div>
                <button class="btn btn-secondary" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent('${student.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

document.getElementById('studentSearch')?.addEventListener('input', loadStudentsList);

// Courses Management
function loadCoursesList() {
    const container = document.getElementById('coursesList');
    
    if (courses.length === 0) {
        container.innerHTML = '<p class="empty-state">No courses found</p>';
        return;
    }
    
    container.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <div>
                    <h3>${course.name}</h3>
                    <p style="color: #666;">${course.department}</p>
                </div>
                <span class="course-code">${course.code}</span>
            </div>
            <div class="course-details">
                <div class="course-detail-item">
                    <p>Instructor:</p>
                    <strong>${course.instructor}</strong>
                </div>
                <div class="course-detail-item">
                    <p>Credits:</p>
                    <strong>${course.credits}</strong>
                </div>
                <div class="course-detail-item">
                    <p>Enrolled Students:</p>
                    <strong>${students.filter(s => s.courses && s.courses.includes(course.id)).length}</strong>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <button class="btn btn-secondary" onclick="editCourse('${course.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteCourse('${course.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Modal Functions
function showAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'block';
}

function showAddCourseModal() {
    document.getElementById('addCourseModal').style.display = 'block';
}

function showAddScheduleModal() {
    const select = document.getElementById('scheduleCourse');
    select.innerHTML = courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
    document.getElementById('addScheduleModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form Initialization
function initializeForms() {
    // Add Student Form
    document.getElementById('addStudentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const student = {
            id: document.getElementById('studentId').value,
            name: document.getElementById('studentName').value,
            email: document.getElementById('studentEmail').value,
            department: document.getElementById('studentDepartment').value,
            year: document.getElementById('studentYear').value,
            courses: []
        };
        
        students.push(student);
        saveDataToStorage();
        syncToServer();
        
        closeModal('addStudentModal');
        e.target.reset();
        loadStudentsList();
        updateDashboard();
        alert('Student added successfully!');
    });
    
    // Add Course Form
    document.getElementById('addCourseForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const course = {
            id: generateId(),
            code: document.getElementById('courseCode').value,
            name: document.getElementById('courseName').value,
            instructor: document.getElementById('courseInstructor').value,
            credits: document.getElementById('courseCredits').value,
            department: document.getElementById('courseDepartment').value
        };
        
        courses.push(course);
        saveDataToStorage();
        syncToServer();
        
        closeModal('addCourseModal');
        e.target.reset();
        loadCoursesList();
        updateDashboard();
        alert('Course added successfully!');
    });
    
    // Add Schedule Form
    document.getElementById('addScheduleForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const schedule = {
            id: generateId(),
            courseId: document.getElementById('scheduleCourse').value,
            day: document.getElementById('scheduleDay').value,
            startTime: document.getElementById('scheduleStartTime').value,
            endTime: document.getElementById('scheduleEndTime').value,
            room: document.getElementById('scheduleRoom').value
        };
        
        schedules.push(schedule);
        saveDataToStorage();
        syncToServer();
        
        closeModal('addScheduleModal');
        e.target.reset();
        loadScheduleList();
        updateDashboard();
        alert('Schedule added successfully!');
    });
}

// Delete Functions
function deleteStudent(studentId) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    
    students = students.filter(s => s.id !== studentId);
    saveDataToStorage();
    syncToServer();
    loadStudentsList();
    updateDashboard();
}

function deleteCourse(courseId) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    courses = courses.filter(c => c.id !== courseId);
    saveDataToStorage();
    syncToServer();
    loadCoursesList();
    updateDashboard();
}

// Data Storage
function saveDataToStorage() {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('schedules', JSON.stringify(schedules));
    localStorage.setItem('attendance', JSON.stringify(attendance));
}

function loadDataFromStorage() {
    students = JSON.parse(localStorage.getItem('students') || '[]');
    courses = JSON.parse(localStorage.getItem('courses') || '[]');
    schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    attendance = JSON.parse(localStorage.getItem('attendance') || '[]');
    
    // Load sample data if empty
    if (students.length === 0) {
        loadSampleData();
    }
}

// Server Sync
async function syncToServer() {
    const syncStatus = document.getElementById('syncStatus');
    
    try {
        syncStatus.textContent = '🔄 Syncing...';
        syncStatus.style.color = '#ffc107';
        
        const response = await fetch(`${SERVER_URL}/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                students,
                courses,
                schedules,
                attendance
            })
        });
        
        if (response.ok) {
            syncStatus.textContent = '✓ Synced';
            syncStatus.style.color = '#28a745';
        } else {
            throw new Error('Sync failed');
        }
    } catch (error) {
        console.error('Sync error:', error);
        syncStatus.textContent = '✗ Sync Failed (Offline Mode)';
        syncStatus.style.color = '#dc3545';
    }
    
    setTimeout(() => {
        syncStatus.textContent = '🔄 Auto-sync enabled';
        syncStatus.style.color = 'white';
    }, 3000);
}

function startAutoSync() {
    setInterval(syncToServer, SYNC_INTERVAL);
}

// Helper Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Load Sample Data
function loadSampleData() {
    students = [
        { id: 'STU001', name: 'John Doe', email: 'john@school.com', department: 'Computer Science', year: '2', courses: ['CS101', 'CS102'] },
        { id: 'STU002', name: 'Jane Smith', email: 'jane@school.com', department: 'Computer Science', year: '2', courses: ['CS101', 'CS102'] },
        { id: 'STU003', name: 'Bob Johnson', email: 'bob@school.com', department: 'Engineering', year: '3', courses: ['CS101'] }
    ];
    
    courses = [
        { id: 'CS101', code: 'CS101', name: 'Introduction to Programming', instructor: 'Dr. Smith', credits: '3', department: 'Computer Science' },
        { id: 'CS102', code: 'CS102', name: 'Data Structures', instructor: 'Dr. Johnson', credits: '4', department: 'Computer Science' }
    ];
    
    schedules = [
        { id: 'SCH001', courseId: 'CS101', day: 'monday', startTime: '09:00', endTime: '11:00', room: 'A101' },
        { id: 'SCH002', courseId: 'CS101', day: 'wednesday', startTime: '09:00', endTime: '11:00', room: 'A101' },
        { id: 'SCH003', courseId: 'CS102', day: 'tuesday', startTime: '14:00', endTime: '16:00', room: 'B202' },
        { id: 'SCH004', courseId: 'CS102', day: 'thursday', startTime: '14:00', endTime: '16:00', room: 'B202' }
    ];
    
    saveDataToStorage();
}


// ==================== NOTIFICATION SYSTEM ====================

let notifications = [];
let notificationSettings = {
    autoReminders: false,
    reminderTime: 15,
    methods: {
        email: true,
        sms: true,
        inApp: true
    },
    dailySummary: false,
    lowAttendanceWarning: false,
    attendanceThreshold: 75,
    weekendReminders: false
};

// Initialize notification system
function initializeNotificationSystem() {
    loadNotificationSettings();
    loadNotifications();
    startNotificationScheduler();
    setupNotificationHandlers();
}

// Load notification settings
function loadNotificationSettings() {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
        notificationSettings = JSON.parse(saved);
    }
    
    // Apply settings to UI
    document.getElementById('autoRemindersEnabled').checked = notificationSettings.autoReminders;
    document.getElementById('reminderTime').value = notificationSettings.reminderTime;
    document.getElementById('notifyEmail').checked = notificationSettings.methods.email;
    document.getElementById('notifySMS').checked = notificationSettings.methods.sms;
    document.getElementById('notifyInApp').checked = notificationSettings.methods.inApp;
    document.getElementById('dailySummary').checked = notificationSettings.dailySummary;
    document.getElementById('lowAttendanceWarning').checked = notificationSettings.lowAttendanceWarning;
    document.getElementById('attendanceThreshold').value = notificationSettings.attendanceThreshold;
    document.getElementById('weekendReminders').checked = notificationSettings.weekendReminders;
}

// Save notification settings
function saveNotificationSettings() {
    notificationSettings = {
        autoReminders: document.getElementById('autoRemindersEnabled').checked,
        reminderTime: parseInt(document.getElementById('reminderTime').value),
        methods: {
            email: document.getElementById('notifyEmail').checked,
            sms: document.getElementById('notifySMS').checked,
            inApp: document.getElementById('notifyInApp').checked
        },
        dailySummary: document.getElementById('dailySummary').checked,
        lowAttendanceWarning: document.getElementById('lowAttendanceWarning').checked,
        attendanceThreshold: parseInt(document.getElementById('attendanceThreshold').value),
        weekendReminders: document.getElementById('weekendReminders').checked
    };
    
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    showToast('Settings Saved', 'Notification settings have been updated successfully');
}

// Toggle auto reminders
function toggleAutoReminders() {
    saveNotificationSettings();
    if (notificationSettings.autoReminders) {
        showToast('Auto Reminders Enabled', 'Students will receive automatic class reminders');
    } else {
        showToast('Auto Reminders Disabled', 'Automatic class reminders have been turned off');
    }
}

// Setup notification handlers
function setupNotificationHandlers() {
    // Recipient type change
    document.getElementById('notificationRecipients').addEventListener('change', function() {
        const value = this.value;
        document.getElementById('courseSelectGroup').style.display = value === 'course' ? 'block' : 'none';
        document.getElementById('yearSelectGroup').style.display = value === 'year' ? 'block' : 'none';
        document.getElementById('studentSelectGroup').style.display = value === 'individual' ? 'block' : 'none';
        
        // Load course and student options
        if (value === 'course') {
            const select = document.getElementById('notificationCourse');
            select.innerHTML = courses.map(c => `<option value="${c.id}">${c.code} - ${c.name}</option>`).join('');
        }
        if (value === 'individual') {
            const select = document.getElementById('notificationStudent');
            select.innerHTML = students.map(s => `<option value="${s.id}">${s.name} (${s.id})</option>`).join('');
        }
    });
    
    // Notification type change
    document.getElementById('notificationType').addEventListener('change', function() {
        const isCustom = this.value === 'custom';
        document.getElementById('customMessageGroup').style.display = isCustom ? 'block' : 'none';
        document.getElementById('messageGroup').style.display = isCustom ? 'block' : 'none';
    });
}

// Load notifications history
function loadNotifications() {
    const saved = localStorage.getItem('notifications');
    if (saved) {
        notifications = JSON.parse(saved);
    }
}

// Save notifications
function saveNotifications() {
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Send manual notification
async function sendManualNotification() {
    const recipientType = document.getElementById('notificationRecipients').value;
    const notificationType = document.getElementById('notificationType').value;
    
    // Get recipients
    let recipients = [];
    if (recipientType === 'all') {
        recipients = students;
    } else if (recipientType === 'course') {
        const courseId = document.getElementById('notificationCourse').value;
        recipients = students.filter(s => s.courses && s.courses.includes(courseId));
    } else if (recipientType === 'year') {
        const year = document.getElementById('notificationYear').value;
        recipients = students.filter(s => s.year === year);
    } else if (recipientType === 'individual') {
        const studentId = document.getElementById('notificationStudent').value;
        const student = students.find(s => s.id === studentId);
        if (student) recipients = [student];
    }
    
    if (recipients.length === 0) {
        alert('No recipients found');
        return;
    }
    
    // Prepare notification content
    let subject, message;
    if (notificationType === 'custom') {
        subject = document.getElementById('notificationSubject').value;
        message = document.getElementById('notificationMessage').value;
        
        if (!subject || !message) {
            alert('Please enter subject and message');
            return;
        }
    } else {
        const content = getNotificationContent(notificationType);
        subject = content.subject;
        message = content.message;
    }
    
    // Create notification record
    const notification = {
        id: generateId(),
        type: notificationType,
        recipientType: recipientType,
        recipientCount: recipients.length,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString(),
        status: 'sent',
        methods: {
            email: notificationSettings.methods.email,
            sms: notificationSettings.methods.sms,
            inApp: notificationSettings.methods.inApp
        }
    };
    
    // Send notifications
    await sendNotifications(recipients, notification);
    
    // Save notification record
    notifications.unshift(notification);
    saveNotifications();
    
    // Show success message
    showToast('Notification Sent', `Notification sent to ${recipients.length} student(s)`);
    
    // Refresh history
    loadNotificationHistory();
    
    // Reset form
    if (notificationType === 'custom') {
        document.getElementById('notificationSubject').value = '';
        document.getElementById('notificationMessage').value = '';
    }
}

// Get notification content based on type
function getNotificationContent(type) {
    const contents = {
        'class-reminder': {
            subject: 'Class Reminder',
            message: 'This is a reminder about your upcoming class. Please be on time.'
        },
        'class-cancel': {
            subject: 'Class Cancellation',
            message: 'Your scheduled class has been cancelled. You will be notified when it is rescheduled.'
        },
        'class-change': {
            subject: 'Class Schedule Change',
            message: 'There has been a change in your class schedule. Please check the updated schedule.'
        },
        'attendance-alert': {
            subject: 'Attendance Alert',
            message: 'Your attendance is below the required threshold. Please improve your attendance.'
        }
    };
    
    return contents[type] || { subject: 'Notification', message: '' };
}

// Send notifications to students
async function sendNotifications(recipients, notification) {
    for (const student of recipients) {
        // Send Email
        if (notification.methods.email && student.email) {
            await sendEmailNotification(student.email, notification.subject, notification.message);
        }
        
        // Send SMS (if phone number available)
        if (notification.methods.sms && student.phone) {
            await sendSMSNotification(student.phone, notification.message);
        }
        
        // Send In-App notification
        if (notification.methods.inApp) {
            sendInAppNotification(student.id, notification.subject, notification.message);
        }
    }
}

// Send email notification
async function sendEmailNotification(email, subject, message) {
    try {
        const response = await fetch(`${SERVER_URL}/notifications/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: email,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            })
        });
        
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Email send error:', error);
    }
}

// Send SMS notification
async function sendSMSNotification(phone, message) {
    try {
        const response = await fetch(`${SERVER_URL}/notifications/sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to: phone,
                message: message,
                timestamp: new Date().toISOString()
            })
        });
        
        console.log(`SMS sent to ${phone}`);
    } catch (error) {
        console.error('SMS send error:', error);
    }
}

// Send in-app notification
function sendInAppNotification(studentId, title, message) {
    // Store in-app notification
    const inAppNotification = {
        id: generateId(),
        studentId: studentId,
        title: title,
        message: message,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    // Save to localStorage (in real app, this would be in database)
    const inAppNotifications = JSON.parse(localStorage.getItem('inAppNotifications') || '[]');
    inAppNotifications.push(inAppNotification);
    localStorage.setItem('inAppNotifications', JSON.stringify(inAppNotifications));
    
    console.log(`In-app notification sent to student ${studentId}`);
}

// Show toast notification
function showToast(title, message) {
    const toast = document.getElementById('notificationToast');
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${title}</span>
            <span class="toast-close" onclick="hideToast()">×</span>
        </div>
        <div class="toast-message">${message}</div>
    `;
    toast.classList.add('show');
    
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    document.getElementById('notificationToast').classList.remove('show');
}

// Load notification history
function loadNotificationHistory() {
    const filter = document.getElementById('notificationHistoryFilter').value;
    const container = document.getElementById('notificationHistory');
    
    let filteredNotifications = [...notifications];
    const now = new Date();
    
    if (filter === 'today') {
        filteredNotifications = filteredNotifications.filter(n => {
            const date = new Date(n.timestamp);
            return date.toDateString() === now.toDateString();
        });
    } else if (filter === 'week') {
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        filteredNotifications = filteredNotifications.filter(n => new Date(n.timestamp) >= weekAgo);
    } else if (filter === 'month') {
        const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
        filteredNotifications = filteredNotifications.filter(n => new Date(n.timestamp) >= monthAgo);
    }
    
    if (filteredNotifications.length === 0) {
        container.innerHTML = '<p class="empty-state">No notifications found</p>';
        return;
    }
    
    container.innerHTML = filteredNotifications.map(notification => `
        <div class="notification-history-item">
            <div class="notification-header">
                <h4>${notification.subject}</h4>
                <span class="notification-status ${notification.status}">${notification.status}</span>
            </div>
            <p class="notification-recipients">
                Sent to ${notification.recipientCount} student(s) • ${notification.recipientType}
            </p>
            <p style="color: #666; font-size: 0.9em; margin-bottom: 10px;">${notification.message}</p>
            <div style="display: flex; gap: 10px; font-size: 0.85em; color: #999;">
                ${notification.methods.email ? '📧 Email' : ''}
                ${notification.methods.sms ? '📱 SMS' : ''}
                ${notification.methods.inApp ? '🔔 In-App' : ''}
            </div>
            <span class="notification-time">${formatDateTime(notification.timestamp)}</span>
        </div>
    `).join('');
}

// Notification scheduler - checks for upcoming classes
function startNotificationScheduler() {
    // Check every minute for upcoming classes
    setInterval(() => {
        if (notificationSettings.autoReminders) {
            checkUpcomingClasses();
        }
        
        if (notificationSettings.dailySummary) {
            checkDailySummary();
        }
        
        if (notificationSettings.lowAttendanceWarning) {
            checkLowAttendance();
        }
    }, 60000); // Every minute
    
    // Initial check
    setTimeout(() => {
        loadUpcomingNotifications();
    }, 1000);
}

// Check for upcoming classes
function checkUpcomingClasses() {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    const reminderMinutes = notificationSettings.reminderTime;
    
    schedules.forEach(schedule => {
        if (schedule.day === currentDay) {
            // Calculate time difference
            const classTime = new Date();
            const [hours, minutes] = schedule.startTime.split(':');
            classTime.setHours(parseInt(hours), parseInt(minutes), 0);
            
            const timeDiff = (classTime - now) / (1000 * 60); // minutes
            
            // If class is starting in reminderMinutes
            if (timeDiff > 0 && timeDiff <= reminderMinutes && timeDiff > (reminderMinutes - 1)) {
                const course = courses.find(c => c.id === schedule.courseId);
                if (course) {
                    sendClassReminder(course, schedule);
                }
            }
        }
    });
}

// Send class reminder
async function sendClassReminder(course, schedule) {
    // Get enrolled students
    const enrolledStudents = students.filter(s => s.courses && s.courses.includes(course.id));
    
    if (enrolledStudents.length === 0) return;
    
    const notification = {
        id: generateId(),
        type: 'class-reminder',
        recipientType: 'course',
        recipientCount: enrolledStudents.length,
        subject: `Class Reminder: ${course.name}`,
        message: `Your ${course.name} class is starting at ${schedule.startTime} in Room ${schedule.room}. Please be on time!`,
        timestamp: new Date().toISOString(),
        status: 'sent',
        methods: notificationSettings.methods
    };
    
    await sendNotifications(enrolledStudents, notification);
    
    // Save notification
    notifications.unshift(notification);
    saveNotifications();
    
    console.log(`Class reminder sent for ${course.name}`);
}

// Check for daily summary
function checkDailySummary() {
    const now = new Date();
    const hours = now.getHours();
    
    // Send daily summary at 6 PM
    if (hours === 18 && now.getMinutes() === 0) {
        sendDailySummary();
    }
}

// Send daily attendance summary
async function sendDailySummary() {
    const today = new Date().toDateString();
    const todayAttendance = attendance.filter(a => new Date(a.date).toDateString() === today);
    
    // Group by student
    const studentAttendance = {};
    todayAttendance.forEach(record => {
        if (!studentAttendance[record.studentId]) {
            studentAttendance[record.studentId] = { present: 0, absent: 0 };
        }
        if (record.status === 'present') {
            studentAttendance[record.studentId].present++;
        } else {
            studentAttendance[record.studentId].absent++;
        }
    });
    
    // Send to each student
    for (const [studentId, stats] of Object.entries(studentAttendance)) {
        const student = students.find(s => s.id === studentId);
        if (!student) continue;
        
        const message = `Daily Attendance Summary:
Classes Attended: ${stats.present}
Classes Missed: ${stats.absent}
Keep up the good work!`;
        
        const notification = {
            id: generateId(),
            type: 'daily-summary',
            recipientType: 'individual',
            recipientCount: 1,
            subject: 'Daily Attendance Summary',
            message: message,
            timestamp: new Date().toISOString(),
            status: 'sent',
            methods: notificationSettings.methods
        };
        
        await sendNotifications([student], notification);
    }
}

// Check for low attendance
function checkLowAttendance() {
    const threshold = notificationSettings.attendanceThreshold;
    
    students.forEach(student => {
        const studentRecords = attendance.filter(a => a.studentId === student.id);
        if (studentRecords.length === 0) return;
        
        const presentCount = studentRecords.filter(a => a.status === 'present').length;
        const attendanceRate = (presentCount / studentRecords.length) * 100;
        
        if (attendanceRate < threshold) {
            // Check if warning already sent recently
            const recentWarning = notifications.find(n => 
                n.type === 'low-attendance-warning' &&
                n.recipientType === 'individual' &&
                new Date(n.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            );
            
            if (!recentWarning) {
                sendLowAttendanceWarning(student, attendanceRate);
            }
        }
    });
}

// Send low attendance warning
async function sendLowAttendanceWarning(student, attendanceRate) {
    const notification = {
        id: generateId(),
        type: 'low-attendance-warning',
        recipientType: 'individual',
        recipientCount: 1,
        subject: 'Attendance Warning',
        message: `Your attendance is ${attendanceRate.toFixed(1)}%, which is below the required ${notificationSettings.attendanceThreshold}%. Please improve your attendance to avoid academic penalties.`,
        timestamp: new Date().toISOString(),
        status: 'sent',
        methods: notificationSettings.methods
    };
    
    await sendNotifications([student], notification);
    
    notifications.unshift(notification);
    saveNotifications();
}

// Load upcoming notifications
function loadUpcomingNotifications() {
    const container = document.getElementById('upcomingNotifications');
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Find upcoming classes today
    const upcomingClasses = schedules
        .filter(s => s.day === currentDay)
        .filter(s => {
            const classTime = new Date();
            const [hours, minutes] = s.startTime.split(':');
            classTime.setHours(parseInt(hours), parseInt(minutes), 0);
            return classTime > now;
        })
        .slice(0, 5);
    
    if (upcomingClasses.length === 0) {
        container.innerHTML = '<p class="empty-state">No notifications scheduled for today</p>';
        return;
    }
    
    container.innerHTML = upcomingClasses.map(schedule => {
        const course = courses.find(c => c.id === schedule.courseId);
        const enrolledCount = students.filter(s => s.courses && s.courses.includes(course.id)).length;
        
        // Calculate reminder time
        const classTime = new Date();
        const [hours, minutes] = schedule.startTime.split(':');
        classTime.setHours(parseInt(hours), parseInt(minutes), 0);
        const reminderTime = new Date(classTime - notificationSettings.reminderTime * 60 * 1000);
        
        return `
            <div class="upcoming-notification-item">
                <div class="upcoming-notification-info">
                    <h4>${course ? course.name : 'Unknown Course'}</h4>
                    <p>Reminder will be sent to ${enrolledCount} student(s) at ${reminderTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                </div>
                <div class="upcoming-notification-time">
                    ${schedule.startTime}
                </div>
            </div>
        `;
    }).join('');
}

// Helper to format date time
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Initialize notification system when page loads
setTimeout(() => {
    initializeNotificationSystem();
}, 500);

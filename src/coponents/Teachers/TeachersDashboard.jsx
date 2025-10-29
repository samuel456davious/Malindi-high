// TeacherDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  // State management
  const [teacher, setTeacher] = useState({
    id: "T001",
    name: "Mr. James Otieno",
    email: "j.otieno@malindihigh.sc.ke",
    subject: "Physics & Science",
    department: "Sciences",
    phone: "+254 712 345 678",
    avatar: "JO"
  });

  const [dashboardData, setDashboardData] = useState({
    classes: [],
    schedule: [],
    announcements: [],
    deadlines: [],
    quickStats: {
      totalClasses: 0,
      totalStudents: 0,
      pendingGrades: 0,
      attendanceToMark: 0,
      unreadMessages: 0
    }
  });

  const [activeView, setActiveView] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);
  const [attendanceData, setAttendanceData] = useState({});
  const [gradeData, setGradeData] = useState({});

  // Mock API service functions
  const apiService = {
    fetchDashboardData: async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        classes: [
          { 
            id: 1, 
            name: "Form 4B - Physics", 
            subject: "Physics", 
            students: 45, 
            room: "Lab 2",
            schedule: ["Mon 8:00-9:00", "Wed 10:00-11:00", "Fri 14:00-15:00"],
            performance: { average: 72, trend: "up" }
          },
          { 
            id: 2, 
            name: "Form 3G - Physics", 
            subject: "Physics", 
            students: 38, 
            room: "B4",
            schedule: ["Tue 9:00-10:00", "Thu 11:00-12:00"],
            performance: { average: 68, trend: "stable" }
          },
          { 
            id: 3, 
            name: "Form 1A - Science", 
            subject: "Science", 
            students: 42, 
            room: "B4",
            schedule: ["Mon 10:30-11:30", "Thu 8:00-9:00"],
            performance: { average: 75, trend: "up" }
          }
        ],
        schedule: [
          { id: 1, time: "8:00 - 9:00", class: "Form 4B - Physics", room: "Lab 2", type: "lesson" },
          { id: 2, time: "9:00 - 10:00", class: "Form 3G - Physics", room: "B4", type: "lesson" },
          { id: 3, time: "10:30 - 11:30", class: "Form 1A - Science", room: "B4", type: "lesson" },
          { id: 4, time: "14:00 - 15:00", class: "Department Meeting", room: "Staff Room", type: "meeting" }
        ],
        announcements: [
          { 
            id: 1, 
            type: "important", 
            title: "Staff Meeting", 
            message: "Emergency staff meeting tomorrow at 4 PM in the staff room. All teachers must attend.", 
            author: "Principal",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            priority: "high"
          },
          { 
            id: 2, 
            type: "info", 
            title: "Swimming Club", 
            message: "Swimming club activities cancelled today due to maintenance.", 
            author: "Sports Dept",
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
            priority: "medium"
          },
          { 
            id: 3, 
            type: "reminder", 
            title: "Term Reports", 
            message: "Term 2 reports are due next week Friday. Please submit to HOD.", 
            author: "Academic Office",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            priority: "medium"
          }
        ],
        deadlines: [
          { 
            id: 1, 
            task: "Form 4 Physics CAT Marks", 
            dueDate: "2024-10-30", 
            subject: "Physics", 
            class: "Form 4B",
            priority: "high",
            progress: 75
          },
          { 
            id: 2, 
            task: "End Term 3 Lesson Plans", 
            dueDate: "2024-11-05", 
            subject: "All", 
            class: "All Classes",
            priority: "medium",
            progress: 40
          },
          { 
            id: 3, 
            task: "Form 1 Science Practical Marks", 
            dueDate: "2024-11-02", 
            subject: "Science", 
            class: "Form 1A",
            priority: "high",
            progress: 90
          }
        ]
      };
    },
    
    markAttendance: async (classId, date, attendance) => {
      console.log('Marking attendance:', { classId, date, attendance });
      // Simulate API call
      return { success: true };
    },
    
    submitGrades: async (classId, assignmentId, grades) => {
      console.log('Submitting grades:', { classId, assignmentId, grades });
      // Simulate API call
      return { success: true };
    },
    
    sendMessage: async (recipients, message) => {
      console.log('Sending message:', { recipients, message });
      // Simulate API call
      return { success: true };
    }
  };

  // Data fetching
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchDashboardData();
        
        // Calculate quick stats
        const quickStats = {
          totalClasses: data.classes.length,
          totalStudents: data.classes.reduce((sum, cls) => sum + cls.students, 0),
          pendingGrades: data.deadlines.reduce((sum, deadline) => sum + (100 - deadline.progress), 0),
          attendanceToMark: 3, // Mock value
          unreadMessages: data.announcements.filter(a => !a.read).length
        };
        
        setDashboardData({ ...data, quickStats });
        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Real-time clock
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Utility functions
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-KE', options);
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  // Enhanced handlers
  const handleClassSelect = useCallback((classItem) => {
    setSelectedClass(classItem);
    // In real app, navigate to class details
    console.log('Selected class:', classItem);
  }, []);

  const handleQuickAction = useCallback(async (action, data = null) => {
    switch(action) {
      case 'attendance':
        // Open attendance modal or page
        console.log('Opening attendance module...');
        break;
      case 'grades':
        console.log('Opening grade input module...');
        break;
      case 'lesson-plan':
        console.log('Opening lesson plan creator...');
        break;
      case 'message-parents':
        console.log('Opening parent communication portal...');
        break;
      case 'mark-all-read':
        setNotifications([]);
        break;
      default:
        break;
    }
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    // Implement search functionality
    console.log('Searching for:', term);
  }, []);

  const handleExportData = useCallback((type) => {
    // Implement export functionality
    console.log('Exporting:', type);
    // This would typically generate and download a file
  }, []);

  // Filter data based on search
  const filteredClasses = dashboardData.classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cls.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="teachersdashboard-skeleton">
      <div className="teachersdashboard-skeleton-header"></div>
      <div className="teachersdashboard-skeleton-content">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="teachersdashboard-skeleton-card"></div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="teachersdashboard-container">
      {/* Header */}
      <header className="teachersdashboard-header">
        <div className="teachersdashboard-header-content">
          <div className="teachersdashboard-header-main">
            <div className="teachersdashboard-header-title">
              <h1 className="teachersdashboard-school-name">
                Malindi High School
                <span className="teachersdashboard-dashboard-subtitle">Teacher Dashboard</span>
              </h1>
            </div>
            
            {/* Search Bar */}
            <div className="teachersdashboard-search-container">
              <input
                type="text"
                placeholder="Search classes, students, or resources..."
                className="teachersdashboard-search-input"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className="teachersdashboard-search-btn">🔍</button>
            </div>
          </div>

          <div className="teachersdashboard-header-info">
            {/* Real-time Clock */}
            <div className="teachersdashboard-clock">
              {currentTime.toLocaleTimeString('en-KE', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>

            <div className="teachersdashboard-teacher-welcome">
              <span className="teachersdashboard-welcome-text">WELCOME BACK,</span>
              <span className="teachersdashboard-teacher-name">{teacher.name}</span>
              <span className="teachersdashboard-teacher-subject">{teacher.department}</span>
            </div>

            {/* Notifications */}
            <div className="teachersdashboard-notifications">
              <button 
                className="teachersdashboard-notification-btn"
                onClick={() => handleQuickAction('mark-all-read')}
              >
                🔔
                {notifications.length > 0 && (
                  <span className="teachersdashboard-notification-badge">
                    {notifications.length}
                  </span>
                )}
              </button>
            </div>

            <div className="teachersdashboard-header-actions">
              <button 
                className="teachersdashboard-export-btn teachersdashboard-btn-secondary"
                onClick={() => handleExportData('reports')}
              >
                📊 Export
              </button>
              <button className="teachersdashboard-profile-btn teachersdashboard-btn-secondary">
                👤 Profile
              </button>
              <button className="teachersdashboard-logout-btn teachersdashboard-btn-primary">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <div className="teachersdashboard-content">
        {/* Left Sidebar */}
        <div className="teachersdashboard-sidebar-left">
          {/* Quick Stats */}
          <div className="teachersdashboard-card teachersdashboard-stats-card">
            <h3 className="teachersdashboard-card-title">QUICK STATS</h3>
            <div className="teachersdashboard-stats-grid">
              <div className="teachersdashboard-stat-item">
                <div className="teachersdashboard-stat-icon">🏫</div>
                <div className="teachersdashboard-stat-value">{dashboardData.quickStats.totalClasses}</div>
                <div className="teachersdashboard-stat-label">Classes</div>
              </div>
              <div className="teachersdashboard-stat-item">
                <div className="teachersdashboard-stat-icon">👥</div>
                <div className="teachersdashboard-stat-value">{dashboardData.quickStats.totalStudents}</div>
                <div className="teachersdashboard-stat-label">Students</div>
              </div>
              <div className="teachersdashboard-stat-item">
                <div className="teachersdashboard-stat-icon">📝</div>
                <div className="teachersdashboard-stat-value">{dashboardData.quickStats.pendingGrades}</div>
                <div className="teachersdashboard-stat-label">Pending</div>
              </div>
              <div className="teachersdashboard-stat-item">
                <div className="teachersdashboard-stat-icon">✅</div>
                <div className="teachersdashboard-stat-value">{dashboardData.quickStats.attendanceToMark}</div>
                <div className="teachersdashboard-stat-label">Attendance</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="teachersdashboard-card teachersdashboard-actions-card">
            <h3 className="teachersdashboard-card-title">QUICK ACTIONS</h3>
            <div className="teachersdashboard-actions-grid">
              <button 
                className="teachersdashboard-action-btn teachersdashboard-btn-primary"
                onClick={() => handleQuickAction('attendance')}
              >
                <span className="teachersdashboard-action-icon">✅</span>
                Mark Attendance
              </button>
              <button 
                className="teachersdashboard-action-btn teachersdashboard-btn-primary"
                onClick={() => handleQuickAction('grades')}
              >
                <span className="teachersdashboard-action-icon">📝</span>
                Input Grades
              </button>
              <button 
                className="teachersdashboard-action-btn teachersdashboard-btn-secondary"
                onClick={() => handleQuickAction('lesson-plan')}
              >
                <span className="teachersdashboard-action-icon">📚</span>
                Lesson Plans
              </button>
              <button 
                className="teachersdashboard-action-btn teachersdashboard-btn-secondary"
                onClick={() => handleQuickAction('message-parents')}
              >
                <span className="teachersdashboard-action-icon">💬</span>
                Message Parents
              </button>
            </div>
          </div>

          {/* My Classes */}
          <div className="teachersdashboard-card teachersdashboard-classes-card">
            <div className="teachersdashboard-card-header">
              <h3 className="teachersdashboard-card-title">MY CLASSES</h3>
              <span className="teachersdashboard-classes-count">
                {dashboardData.classes.length} classes
              </span>
            </div>
            <div className="teachersdashboard-classes-list">
              {filteredClasses.map((classItem) => (
                <div 
                  key={classItem.id} 
                  className={`teachersdashboard-class-item ${
                    selectedClass?.id === classItem.id ? 'teachersdashboard-class-item-active' : ''
                  }`}
                  onClick={() => handleClassSelect(classItem)}
                >
                  <div className="teachersdashboard-class-info">
                    <div className="teachersdashboard-class-name">{classItem.name}</div>
                    <div className="teachersdashboard-class-details">
                      <span className="teachersdashboard-class-subject">{classItem.subject}</span>
                      <span className="teachersdashboard-class-students">{classItem.students} students</span>
                    </div>
                    <div className="teachersdashboard-class-schedule">
                      {classItem.schedule.slice(0, 2).map((slot, idx) => (
                        <span key={idx} className="teachersdashboard-schedule-slot">{slot}</span>
                      ))}
                    </div>
                  </div>
                  <div className="teachersdashboard-class-performance">
                    <div className="teachersdashboard-performance-value">
                      {classItem.performance.average}%
                    </div>
                    <div className={`teachersdashboard-performance-trend teachersdashboard-trend-${classItem.performance.trend}`}>
                      {classItem.performance.trend === 'up' ? '↗' : '→'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="teachersdashboard-main-content">
          {/* Today's Schedule */}
          <div className="teachersdashboard-card teachersdashboard-schedule-card">
            <div className="teachersdashboard-card-header">
              <h3 className="teachersdashboard-card-title">TODAY'S SCHEDULE</h3>
              <button className="teachersdashboard-view-all-btn">View Weekly →</button>
            </div>
            <div className="teachersdashboard-schedule-list">
              {dashboardData.schedule.map((slot) => (
                <div key={slot.id} className="teachersdashboard-schedule-item">
                  <div className="teachersdashboard-schedule-time">{slot.time}</div>
                  <div className="teachersdashboard-schedule-details">
                    <div className="teachersdashboard-schedule-class">{slot.class}</div>
                    <div className="teachersdashboard-schedule-meta">
                      <span className="teachersdashboard-schedule-room">{slot.room}</span>
                      <span className={`teachersdashboard-schedule-type teachersdashboard-type-${slot.type}`}>
                        {slot.type}
                      </span>
                    </div>
                  </div>
                  <div className="teachersdashboard-schedule-actions">
                    <button className="teachersdashboard-schedule-action-btn">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="teachersdashboard-card teachersdashboard-announcements-card">
            <div className="teachersdashboard-card-header">
              <h3 className="teachersdashboard-card-title">ANNOUNCEMENTS</h3>
              <span className="teachersdashboard-announcements-count">
                {dashboardData.announcements.length} new
              </span>
            </div>
            <div className="teachersdashboard-announcements-list">
              {dashboardData.announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className={`teachersdashboard-announcement-item teachersdashboard-priority-${announcement.priority}`}
                >
                  <div className="teachersdashboard-announcement-icon">
                    {announcement.type === 'important' && '⚠️'}
                    {announcement.type === 'info' && 'ℹ️'}
                    {announcement.type === 'reminder' && '⏰'}
                  </div>
                  <div className="teachersdashboard-announcement-content">
                    <div className="teachersdashboard-announcement-header">
                      <div className="teachersdashboard-announcement-title">{announcement.title}</div>
                      <div className="teachersdashboard-announcement-time">
                        {getTimeAgo(announcement.timestamp)}
                      </div>
                    </div>
                    <div className="teachersdashboard-announcement-message">
                      {announcement.message}
                    </div>
                    <div className="teachersdashboard-announcement-footer">
                      <span className="teachersdashboard-announcement-author">
                        By {announcement.author}
                      </span>
                      <button className="teachersdashboard-announcement-action">
                        Mark as read
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines with Progress */}
          <div className="teachersdashboard-card teachersdashboard-deadlines-card">
            <div className="teachersdashboard-card-header">
              <h3 className="teachersdashboard-card-title">UPCOMING DEADLINES</h3>
              <button 
                className="teachersdashboard-export-btn teachersdashboard-btn-secondary"
                onClick={() => handleExportData('deadlines')}
              >
                Export List
              </button>
            </div>
            <div className="teachersdashboard-deadlines-list">
              {dashboardData.deadlines.map((deadline) => {
                const daysUntilDue = getDaysUntilDue(deadline.dueDate);
                return (
                  <div key={deadline.id} className="teachersdashboard-deadline-item">
                    <div className="teachersdashboard-deadline-main">
                      <div className="teachersdashboard-deadline-info">
                        <div className="teachersdashboard-deadline-task">{deadline.task}</div>
                        <div className="teachersdashboard-deadline-meta">
                          <span className="teachersdashboard-deadline-class">{deadline.class}</span>
                          <span className="teachersdashboard-deadline-subject">{deadline.subject}</span>
                        </div>
                      </div>
                      <div className="teachersdashboard-deadline-progress">
                        <div className="teachersdashboard-progress-bar">
                          <div 
                            className="teachersdashboard-progress-fill"
                            style={{ width: `${deadline.progress}%` }}
                          ></div>
                        </div>
                        <span className="teachersdashboard-progress-text">
                          {deadline.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="teachersdashboard-deadline-details">
                      <div className="teachersdashboard-deadline-date">
                        Due: {formatDate(deadline.dueDate)}
                      </div>
                      <div className={`teachersdashboard-deadline-badge ${
                        daysUntilDue <= 1 ? 'teachersdashboard-urgent' : 
                        daysUntilDue <= 3 ? 'teachersdashboard-warning' : 
                        'teachersdashboard-normal'
                      }`}>
                        {daysUntilDue === 0 ? 'Today' : 
                         daysUntilDue === 1 ? 'Tomorrow' : 
                         `${daysUntilDue} days`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <nav className="teachersdashboard-nav">
        <button 
          className={`teachersdashboard-nav-btn ${activeView === 'dashboard' ? 'teachersdashboard-nav-active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <span className="teachersdashboard-nav-icon">📊</span>
          Dashboard
        </button>
        <button 
          className={`teachersdashboard-nav-btn ${activeView === 'classes' ? 'teachersdashboard-nav-active' : ''}`}
          onClick={() => setActiveView('classes')}
        >
          <span className="teachersdashboard-nav-icon">👥</span>
          Classes
        </button>
        <button 
          className={`teachersdashboard-nav-btn ${activeView === 'grades' ? 'teachersdashboard-nav-active' : ''}`}
          onClick={() => setActiveView('grades')}
        >
          <span className="teachersdashboard-nav-icon">📝</span>
          Grades
        </button>
        <button 
          className={`teachersdashboard-nav-btn ${activeView === 'attendance' ? 'teachersdashboard-nav-active' : ''}`}
          onClick={() => setActiveView('attendance')}
        >
          <span className="teachersdashboard-nav-icon">✅</span>
          Attendance
        </button>
        <button 
          className={`teachersdashboard-nav-btn ${activeView === 'resources' ? 'teachersdashboard-nav-active' : ''}`}
          onClick={() => setActiveView('resources')}
        >
          <span className="teachersdashboard-nav-icon">📚</span>
          Resources
        </button>
        <button 
          className={`teachersdashboard-nav-btn ${activeView === 'analytics' ? 'teachersdashboard-nav-active' : ''}`}
          onClick={() => setActiveView('analytics')}
        >
          <span className="teachersdashboard-nav-icon">📈</span>
          Analytics
        </button>
      </nav>
    </div>
  );
};

export default TeacherDashboard;
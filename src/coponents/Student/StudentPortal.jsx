import React, { useState } from "react";
import "./StudentPortal.css";

const StudentPortal = () => {
  const [activeTab, setActiveTab] = useState("results");

  // Mock student data
  const studentInfo = {
    name: "John Doe",
    admissionNumber: "MHS/2023/001",
    class: "Form 4",
    stream: "Blue"
  };

  // Mock exam results
  const examResults = [
    { subject: "Mathematics", marks: 85, grade: "A", points: 11 },
    { subject: "English", marks: 78, grade: "A-", points: 10 },
    { subject: "Kiswahili", marks: 72, grade: "B+", points: 9 },
    { subject: "Chemistry", marks: 88, grade: "A", points: 11 },
    { subject: "Physics", marks: 81, grade: "A-", points: 10 },
    { subject: "Biology", marks: 76, grade: "A-", points: 10 },
    { subject: "History", marks: 70, grade: "B+", points: 9 },
    { subject: "Geography", marks: 74, grade: "B+", points: 9 }
  ];

  const totalPoints = examResults.reduce((sum, result) => sum + result.points, 0);
  const meanGrade = "A-";

  // Mock teacher comments
  const teacherComments = [
    {
      teacher: "Mr. Johnson",
      subject: "Mathematics",
      comment: "Excellent performance! Shows strong problem-solving skills.",
      date: "2025-10-15"
    },
    {
      teacher: "Ms. Smith",
      subject: "English",
      comment: "Good progress in essay writing. Keep reading more literature.",
      date: "2025-10-14"
    },
    {
      teacher: "Dr. Kamau",
      subject: "Chemistry",
      comment: "Outstanding work in practicals. Very attentive in class.",
      date: "2025-10-16"
    }
  ];

  // Mock fees data
  const feesData = {
    totalFees: 45000,
    paidAmount: 30000,
    balance: 15000,
    transactions: [
      { date: "2025-09-01", amount: 15000, receipt: "RCP/001/2025", method: "M-Pesa" },
      { date: "2025-08-01", amount: 15000, receipt: "RCP/002/2025", method: "Bank Transfer" }
    ]
  };

  // Mock attendance data
  const attendanceData = {
    present: 85,
    absent: 5,
    late: 3,
    percentage: 92,
    recentRecords: [
      { date: "2025-10-20", status: "Present" },
      { date: "2025-10-19", status: "Present" },
      { date: "2025-10-18", status: "Late" },
      { date: "2025-10-17", status: "Present" },
      { date: "2025-10-16", status: "Absent" }
    ]
  };

  // Performance analysis data
  const performanceAnalysis = {
    strongSubjects: ["Chemistry", "Mathematics", "Physics"],
    needsImprovement: ["Kiswahili", "History"],
    trend: "Improving",
    classRank: 5,
    totalStudents: 120
  };

  // Mock assignments data
  const assignments = [
    {
      subject: "Mathematics",
      title: "Calculus Problem Set",
      dueDate: "2025-11-10",
      status: "Pending",
      description: "Complete exercises 1-15 from Chapter 5"
    },
    {
      subject: "Chemistry",
      title: "Lab Report - Titration",
      dueDate: "2025-11-08",
      status: "Submitted",
      description: "Write a comprehensive lab report on acid-base titration"
    },
    {
      subject: "English",
      title: "Essay - Climate Change",
      dueDate: "2025-11-12",
      status: "Pending",
      description: "1500 word essay on the impacts of climate change"
    }
  ];

  // Mock announcements data
  const announcements = [
    {
      title: "Mid-Term Break Schedule",
      date: "2025-11-01",
      category: "Important",
      content: "School will close on November 15th for mid-term break. Students expected back on November 29th."
    },
    {
      title: "Sports Day Registration",
      date: "2025-10-28",
      category: "Events",
      content: "Register for Sports Day events by November 5th. Contact your class teacher for details."
    }
  ];

  // Mock messages data
  const messages = [
    {
      from: "Mr. Johnson - Mathematics",
      subject: "Assignment Feedback",
      date: "2025-10-30",
      preview: "Well done on your recent calculus assignment. Keep up the excellent work...",
      unread: true
    },
    {
      from: "Ms. Smith - English",
      subject: "Essay Guidelines",
      date: "2025-10-28",
      preview: "Please review the attached guidelines for the upcoming essay...",
      unread: true
    }
  ];

  // Mock resources data
  const resources = [
    {
      title: "Form 4 Mathematics Notes",
      subject: "Mathematics",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2025-09-15"
    },
    {
      title: "Chemistry Practical Guide",
      subject: "Chemistry",
      type: "PDF",
      size: "1.8 MB",
      uploadDate: "2025-09-10"
    }
  ];

  // Mock academic calendar
  const academicEvents = [
    {
      title: "Mid-Term Exams",
      date: "2025-11-18 to 2025-11-22",
      type: "Exam"
    },
    {
      title: "Sports Day",
      date: "2025-12-05",
      type: "Event"
    }
  ];

  // Grade color mapping
  const getGradeColor = (grade) => {
    const gradeColors = {
      'A': '#10b981',
      'A-': '#34d399',
      'B+': '#f59e0b',
      'B': '#fbbf24',
      'B-': '#fcd34d',
      'C+': '#ef4444',
      'C': '#f87171',
      'C-': '#fca5a5',
      'D+': '#dc2626',
      'D': '#e11d48',
      'D-': '#f43f5e',
      'E': '#ef4444'
    };
    return gradeColors[grade] || '#6b7280';
  };

  // Status badge variants
  const getStatusVariant = (status) => {
    const variants = {
      'Present': 'student-portal-status-present',
      'Late': 'student-portal-status-late',
      'Absent': 'student-portal-status-absent',
      'Submitted': 'student-portal-status-submitted',
      'Pending': 'student-portal-status-pending',
      'Graded': 'student-portal-status-graded',
      'Important': 'student-portal-status-important',
      'Events': 'student-portal-status-events',
      'Exam': 'student-portal-status-exam',
      'default': 'student-portal-status-default'
    };
    return variants[status] || variants['default'];
  };

  return (
    <div className="student-portal-container">
      {/* Header */}
      <header className="student-portal-header">
        <div className="student-portal-header-content">
          <div className="student-portal-profile-card">
            <div className="student-portal-avatar">
              <div className="student-portal-avatar-fallback">JD</div>
            </div>
            <div className="student-portal-profile-details">
              <h1 className="student-portal-student-name">{studentInfo.name}</h1>
              <p className="student-portal-student-meta">
                {studentInfo.admissionNumber} | {studentInfo.class} {studentInfo.stream}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="student-portal-main">
        {/* Tabs Navigation */}
        <div className="student-portal-tabs-nav">
          <button 
            className={`student-portal-tab-btn ${activeTab === 'results' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('results')}
          >
            📊 Results
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'analysis' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            📈 Analysis
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'assignments' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('assignments')}
          >
            📝 Assignments
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'announcements' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            📢 News
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'messages' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            💬 Messages
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'resources' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Resources
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'calendar' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            📅 Calendar
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'comments' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            👨‍🏫 Comments
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'fees' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('fees')}
          >
            💰 Fees
          </button>
          <button 
            className={`student-portal-tab-btn ${activeTab === 'attendance' ? 'student-portal-tab-active' : ''}`}
            onClick={() => setActiveTab('attendance')}
          >
            ✅ Attendance
          </button>
        </div>

        {/* Tab Content */}
        <div className="student-portal-tab-content">
          
          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="student-portal-results-tab">
              <div className="student-portal-section-header">
                <h2>📚 Examination Results</h2>
                <p>October 2025 - Term 3</p>
              </div>

              <div className="student-portal-summary-cards">
                <div className="student-portal-summary-card">
                  <div className="student-portal-summary-label">Total Points</div>
                  <div className="student-portal-summary-value">{totalPoints}</div>
                </div>
                <div className="student-portal-summary-card">
                  <div className="student-portal-summary-label">Mean Grade</div>
                  <div className="student-portal-summary-value">{meanGrade}</div>
                </div>
                <div className="student-portal-summary-card">
                  <div className="student-portal-summary-label">Subjects</div>
                  <div className="student-portal-summary-value">{examResults.length}</div>
                </div>
              </div>

              <div className="student-portal-table-container">
                <table className="student-portal-results-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Marks</th>
                      <th>Grade</th>
                      <th>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examResults.map((result, index) => (
                      <tr key={index}>
                        <td className="student-portal-subject-cell">{result.subject}</td>
                        <td className="student-portal-marks-cell">{result.marks}/100</td>
                        <td>
                          <span 
                            className="student-portal-grade-badge"
                            style={{ backgroundColor: getGradeColor(result.grade) }}
                          >
                            {result.grade}
                          </span>
                        </td>
                        <td className="student-portal-points-cell">{result.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="student-portal-analysis-tab">
              <div className="student-portal-section-header">
                <h2>📈 Performance Analysis</h2>
                <p>Comprehensive analysis of your academic performance</p>
              </div>

              <div className="student-portal-analysis-content">
                <div className="student-portal-stats-grid">
                  <div className="student-portal-stat-card">
                    <h3>Class Rank</h3>
                    <div className="student-portal-stat-value">#{performanceAnalysis.classRank}</div>
                    <p>out of {performanceAnalysis.totalStudents} students</p>
                  </div>
                  <div className="student-portal-stat-card">
                    <h3>Performance Trend</h3>
                    <div className="student-portal-trend-badge student-portal-status-submitted">
                      {performanceAnalysis.trend}
                    </div>
                  </div>
                </div>

                <div className="student-portal-analysis-section">
                  <h3>Strong Subjects</h3>
                  <div className="student-portal-tags-container">
                    {performanceAnalysis.strongSubjects.map((subject, index) => (
                      <span key={index} className="student-portal-tag student-portal-tag-success">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="student-portal-analysis-section">
                  <h3>Areas for Improvement</h3>
                  <div className="student-portal-tags-container">
                    {performanceAnalysis.needsImprovement.map((subject, index) => (
                      <span key={index} className="student-portal-tag student-portal-tag-warning">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="student-portal-analysis-section">
                  <h3>Subject Performance Distribution</h3>
                  <div className="student-portal-performance-bars">
                    {examResults.map((result, index) => (
                      <div key={index} className="student-portal-performance-item">
                        <div className="student-portal-performance-header">
                          <span className="student-portal-performance-subject">{result.subject}</span>
                          <span className="student-portal-performance-percentage">{result.marks}%</span>
                        </div>
                        <div className="student-portal-performance-bar">
                          <div 
                            className="student-portal-performance-fill"
                            style={{ 
                              width: `${result.marks}%`,
                              backgroundColor: getGradeColor(result.grade)
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === 'comments' && (
            <div className="student-portal-comments-tab">
              <div className="student-portal-section-header">
                <h2>👨‍🏫 Teacher Comments</h2>
                <p>Feedback from your teachers</p>
              </div>

              <div className="student-portal-comments-list">
                {teacherComments.map((comment, index) => (
                  <div key={index} className="student-portal-comment-card">
                    <div className="student-portal-comment-header">
                      <div className="student-portal-comment-subject">
                        <h3>{comment.subject}</h3>
                        <p className="student-portal-comment-teacher">{comment.teacher}</p>
                      </div>
                      <span className="student-portal-comment-date">{comment.date}</span>
                    </div>
                    <div className="student-portal-comment-content">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === 'fees' && (
            <div className="student-portal-fees-tab">
              <div className="student-portal-section-header">
                <h2>💰 Fee Statement</h2>
                <p>Your fee payment status and history</p>
              </div>

              <div className="student-portal-summary-cards">
                <div className="student-portal-summary-card">
                  <div className="student-portal-summary-label">Total Fees</div>
                  <div className="student-portal-summary-value">KSh {feesData.totalFees.toLocaleString()}</div>
                </div>
                <div className="student-portal-summary-card student-portal-summary-card-success">
                  <div className="student-portal-summary-label">Paid Amount</div>
                  <div className="student-portal-summary-value">KSh {feesData.paidAmount.toLocaleString()}</div>
                </div>
                <div className="student-portal-summary-card student-portal-summary-card-warning">
                  <div className="student-portal-summary-label">Balance</div>
                  <div className="student-portal-summary-value">KSh {feesData.balance.toLocaleString()}</div>
                </div>
              </div>

              <div className="student-portal-progress-section">
                <div className="student-portal-progress-header">
                  <span>Payment Progress</span>
                  <span>{((feesData.paidAmount / feesData.totalFees) * 100).toFixed(0)}%</span>
                </div>
                <div className="student-portal-progress-bar">
                  <div 
                    className="student-portal-progress-fill"
                    style={{ width: `${(feesData.paidAmount / feesData.totalFees) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="student-portal-table-section">
                <div className="student-portal-table-header">
                  <h3>Payment History</h3>
                  <button className="student-portal-primary-btn">Pay Fees Now</button>
                </div>
                <div className="student-portal-table-container">
                  <table className="student-portal-data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Receipt No.</th>
                        <th>Method</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feesData.transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{transaction.date}</td>
                          <td>KSh {transaction.amount.toLocaleString()}</td>
                          <td>{transaction.receipt}</td>
                          <td>
                            <span className="student-portal-status-badge student-portal-status-default">
                              {transaction.method}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="student-portal-assignments-tab">
              <div className="student-portal-section-header">
                <h2>📝 Assignments & Homework</h2>
                <p>View and submit your assignments</p>
              </div>

              <div className="student-portal-assignments-list">
                {assignments.map((assignment, index) => (
                  <div key={index} className="student-portal-assignment-card">
                    <div className="student-portal-assignment-header">
                      <div className="student-portal-assignment-info">
                        <h3>{assignment.title}</h3>
                        <p className="student-portal-assignment-subject">{assignment.subject}</p>
                      </div>
                      <span className={`student-portal-status-badge ${getStatusVariant(assignment.status)}`}>
                        {assignment.status}
                        {assignment.grade && ` - ${assignment.grade}`}
                      </span>
                    </div>
                    <div className="student-portal-assignment-content">
                      <p className="student-portal-assignment-description">{assignment.description}</p>
                      <div className="student-portal-assignment-footer">
                        <span className="student-portal-assignment-due">Due: {assignment.dueDate}</span>
                        <div className="student-portal-assignment-actions">
                          {assignment.status === 'Pending' && (
                            <button className="student-portal-primary-btn student-portal-btn-sm">
                              📤 Submit
                            </button>
                          )}
                          <button className="student-portal-secondary-btn student-portal-btn-sm">
                            📥 Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="student-portal-attendance-tab">
              <div className="student-portal-section-header">
                <h2>✅ Attendance Record</h2>
                <p>Your attendance statistics for this term</p>
              </div>

              <div className="student-portal-summary-cards">
                <div className="student-portal-summary-card student-portal-summary-card-success">
                  <div className="student-portal-summary-label">Present</div>
                  <div className="student-portal-summary-value">{attendanceData.present}</div>
                </div>
                <div className="student-portal-summary-card student-portal-summary-card-danger">
                  <div className="student-portal-summary-label">Absent</div>
                  <div className="student-portal-summary-value">{attendanceData.absent}</div>
                </div>
                <div className="student-portal-summary-card student-portal-summary-card-warning">
                  <div className="student-portal-summary-label">Late</div>
                  <div className="student-portal-summary-value">{attendanceData.late}</div>
                </div>
                <div className="student-portal-summary-card">
                  <div className="student-portal-summary-label">Percentage</div>
                  <div className="student-portal-summary-value">{attendanceData.percentage}%</div>
                </div>
              </div>

              <div className="student-portal-progress-section">
                <div className="student-portal-progress-header">
                  <span>Attendance Rate</span>
                  <span>{attendanceData.percentage}%</span>
                </div>
                <div className="student-portal-progress-bar">
                  <div 
                    className="student-portal-progress-fill"
                    style={{ width: `${attendanceData.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="student-portal-table-section">
                <h3>Recent Attendance Records</h3>
                <div className="student-portal-table-container">
                  <table className="student-portal-data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.recentRecords.map((record, index) => (
                        <tr key={index}>
                          <td>{record.date}</td>
                          <td>
                            <span className={`student-portal-status-badge ${getStatusVariant(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Add other tabs similarly... */}

        </div>
      </main>
    </div>
  );
};

export default StudentPortal;
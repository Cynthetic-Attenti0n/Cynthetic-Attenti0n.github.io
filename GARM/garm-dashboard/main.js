import * as d3 from 'd3';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initLOSChart();
    initPatientFlowChart();
    initDischargeDestChart();
    initTransferTimesChart();
    
    // Initialize occupancy charts
    initOccupancyChart();
    initBedCapacityChart();
    initAdmissionSourceChart();
    
    // Initialize readmission charts
    initReadmissionRateChart();
    initReadmissionTypeChart();
    initPreventableReadmissionsChart();
    
    // Initialize overview charts
    initLOSTrendChart();
    initOccupancyRateChart();
    initReadmissionSummaryChart();
    
    // Initialize quality and safety charts
    initSatisfactionChart();
    initComplaintsChart();
    initQualityIssuesChart();
    initIncidentsChart();
    initSatisfactionTrendChart();
    initIncidentsCategoryChart();
    initMonthlySatisfactionChart();
    initSurveyCompletionChart();
    initComplaintsCategoryChart();
    initIncidentTrendChart();
    initGapAreasChart();
    
    // Initialize workforce management charts
    initStaffingChart();
    initStaffTurnoverChart();
    initTrainingComplianceChart();
    initShiftCoverageChart();
    
    // Initialize benchmark charts
    initBenchmarkPerformanceChart();
    initNationalComparisonChart();
    initHospitalComparisonChart();
    initTrendAnalysisChart();
    
    // Initialize alerts and issues charts
    initAlertsCategoryChart();
    initCriticalIssuesChart();
    initRiskTrendChart();
    
    // Initialize overview tabs charts
    initOverviewPerformanceChart();
    initOverviewTrendsChart();
    initCensusOverviewChart();
    initOverviewIncidentsChart();
    initOverviewStaffingChart();
    initOverviewSatisfactionChart();
    
    // Initialize UI interactions
    initUIInteractions();
    initDatePicker();
    
    // Add animation to elements
    animateElements();
    
    // Show initial tab
    showTab('patientcare-flow');
    
    // Initial department ward update
    updateWardOptions('SCGH');
});

function initUIInteractions() {
    // Dropdown interactions
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const options = dropdown.querySelectorAll('.dropdown-content a');
        const button = dropdown.querySelector('.dropdown-btn');
        
        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all options
                options.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update button text with selected option
                const icon = button.querySelector('i:first-child');
                const chevron = button.querySelector('i:last-child');
                const value = this.textContent.trim();
                
                button.innerHTML = '';
                button.appendChild(icon);
                button.appendChild(document.createTextNode(' ' + value + ' '));
                button.appendChild(chevron);
                
                // Update banner details
                if (dropdown.querySelector('.dropdown-btn').textContent.includes('Department')) {
                    document.querySelector('.details .detail:nth-child(1) span').textContent = value;
                    // Update available wards based on department
                    updateWardOptions(value);
                } else if (dropdown.querySelector('.dropdown-btn').textContent.includes('Ward')) {
                    document.querySelector('.details .detail:nth-child(2) span').textContent = value;
                } else if (dropdown.querySelector('.dropdown-btn').textContent.includes('Timeframe')) {
                    document.querySelector('.details .detail:nth-child(3) span').textContent = value;
                }
                
                // Refresh data and charts
                refreshData();
            });
        });
    });
    
    // Tab navigation
    const mainTabs = document.querySelectorAll('.main-tabs li');
    const subTabs = document.querySelectorAll('.sub-tabs li');
    
    mainTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            mainTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update banner
            const tabName = this.querySelector('a').textContent.trim();
            document.querySelector('.banner h1').innerHTML = `${tabName} <span>Overview</span>`;
            
            // Update subtabs visibility
            const tabValue = this.querySelector('a').getAttribute('href').substring(1);
            updateSubTabs(tabValue);
            
            // Show first subtab content
            const firstSubTab = document.querySelector(`.sub-tabs[data-parent="${tabValue}"] li:first-child a`);
            if (firstSubTab) {
                const firstSubTabValue = firstSubTab.getAttribute('href').substring(1);
                showTab(firstSubTabValue);
            }
        });
    });
    
    subTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get parent tab
            const parentTab = this.closest('.sub-tabs').getAttribute('data-parent');
            const subTabs = document.querySelectorAll(`.sub-tabs[data-parent="${parentTab}"] li`);
            
            // Remove active class from all subtabs
            subTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked subtab
            this.classList.add('active');
            
            // Update banner
            const mainTab = document.querySelector('.main-tabs li.active a').textContent.trim();
            const subTab = this.querySelector('a').textContent.trim();
            document.querySelector('.banner h1').innerHTML = `${mainTab} <span>${subTab}</span>`;
            
            // Show tab content
            const tabValue = this.querySelector('a').getAttribute('href').substring(1);
            showTab(tabValue);
        });
    });
    
    // Date picker
    const dateBtn = document.querySelector('.date-btn');
    dateBtn.addEventListener('click', function() {
        // In a real app, would show date picker
        alert('Date picker would show here');
    });
    
    // Card refresh buttons
    const refreshButtons = document.querySelectorAll('.action-btn:first-child');
    refreshButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.card');
            
            // Add refresh animation
            this.classList.add('rotating');
            
            // Simulate data refresh
            setTimeout(() => {
                this.classList.remove('rotating');
                
                // Refresh specific chart
                const cardBody = card.querySelector('.card-body');
                if (cardBody.querySelector('#losChart')) {
                    initLOSChart();
                } else if (cardBody.querySelector('#patientFlowChart')) {
                    initPatientFlowChart();
                } else if (cardBody.querySelector('#dischargeDestChart')) {
                    initDischargeDestChart();
                } else if (cardBody.querySelector('#transferTimesChart')) {
                    initTransferTimesChart();
                } else if (cardBody.querySelector('#occupancyChart')) {
                    initOccupancyChart();
                } else if (cardBody.querySelector('#readmissionChart')) {
                    initReadmissionRateChart();
                } else if (cardBody.querySelector('#satisfactionChart')) {
                    initSatisfactionChart();
                } else if (cardBody.querySelector('#incidentsChart')) {
                    initIncidentsChart();
                } else if (cardBody.querySelector('#staffingChart')) {
                    initStaffingChart();
                }
            }, 1000);
        });
    });
    
    // Menu buttons
    const menuButtons = document.querySelectorAll('.action-btn:last-child');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, would show context menu
            alert('Card menu would show here with options like Export, Print, Configure, etc.');
        });
    });
}

function initDatePicker() {
    const dateBtn = document.querySelector('.date-btn');
    const datePickerPanel = document.querySelector('.date-picker-panel');
    
    // Toggle date picker visibility
    dateBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        datePickerPanel.classList.toggle('visible');
        
        if (datePickerPanel.classList.contains('visible')) {
            renderCalendar();
        }
    });
    
    // Close date picker when clicking outside
    document.addEventListener('click', function(e) {
        if (!datePickerPanel.contains(e.target) && e.target !== dateBtn) {
            datePickerPanel.classList.remove('visible');
        }
    });
    
    // Previous month button
    document.querySelector('.prev-month').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    // Next month button
    document.querySelector('.next-month').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    // Apply button
    document.querySelector('.apply-btn').addEventListener('click', function() {
        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            
            // Update date button text
            dateBtn.querySelector('span').textContent = formattedDate;
            
            // Update date display in top bar
            document.querySelector('.date-display span').textContent = formattedDate;
            
            // Close date picker
            datePickerPanel.classList.remove('visible');
            
            // Refresh data
            refreshData();
        }
    });
    
    // Cancel button
    document.querySelector('.cancel-btn').addEventListener('click', function() {
        datePickerPanel.classList.remove('visible');
    });
    
    // Initial date (March 11, 2025)
    let currentDate = new Date(2025, 2, 11);
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let selectedDate = new Date(currentDate);
    
    function renderCalendar() {
        const calendarDays = document.querySelector('.calendar-days');
        calendarDays.innerHTML = '';
        
        // Update month and year display
        document.querySelector('.month-name').textContent = `${getMonthName(currentMonth)} ${currentYear}`;
        
        // Get first day of month
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        
        // Get number of days in month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'day empty';
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'day';
            day.textContent = i;
            
            // Check if this day is today
            const thisDate = new Date(currentYear, currentMonth, i);
            if (thisDate.toDateString() === currentDate.toDateString()) {
                day.classList.add('today');
            }
            
            // Check if this day is selected
            if (selectedDate && thisDate.toDateString() === selectedDate.toDateString()) {
                day.classList.add('selected');
            }
            
            // Add click event
            day.addEventListener('click', function() {
                // Remove selected class from previously selected day
                const selectedDay = document.querySelector('.day.selected');
                if (selectedDay) {
                    selectedDay.classList.remove('selected');
                }
                
                // Add selected class to clicked day
                this.classList.add('selected');
                
                // Update selected date
                selectedDate = new Date(currentYear, currentMonth, i);
            });
            
            calendarDays.appendChild(day);
        }
    }
    
    function getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }
    
    function formatDate(date) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }
}

function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}

function updateSubTabs(mainTabId) {
    // Hide all sub-tabs
    document.querySelectorAll('.sub-tabs').forEach(subTab => {
        subTab.style.display = 'none';
    });
    
    // Show relevant sub-tabs
    const relevantSubTabs = document.querySelector(`.sub-tabs[data-parent="${mainTabId}"]`);
    if (relevantSubTabs) {
        relevantSubTabs.style.display = 'flex';
    }
}

function initLOSChart() {
    const ctx = document.getElementById('losChart').getContext('2d');
    
    // Generate some sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data1 = [7.2, 7.1, 6.8, 6.5, 6.3, 6.2, 6.4, 6.7, 6.9, 6.6, 6.4, 6.2];
    const data2 = [8.5, 8.3, 8.0, 7.8, 7.5, 7.3, 7.2, 7.0, 7.1, 7.3, 7.5, 7.4];
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'SCCH',
                    data: data1,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#3498db',
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'National Average',
                    data: data2,
                    borderColor: '#95a5a6',
                    backgroundColor: 'rgba(149, 165, 166, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: '#95a5a6',
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + ' days';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#7f8c8d'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Average Days',
                        color: '#7f8c8d',
                        font: {
                            size: 12,
                            weight: 'normal'
                        }
                    },
                    min: 5,
                    suggestedMax: 9,
                    ticks: {
                        color: '#7f8c8d',
                        callback: function(value) {
                            return value + ' days';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initPatientFlowChart() {
    const ctx = document.getElementById('patientFlowChart').getContext('2d');
    
    // Generate some sample data
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const admissions = [8, 12, 9, 11, 7, 4, 3, 10, 14, 11, 8, 6, 3, 5];
    const discharges = [5, 8, 7, 9, 11, 6, 3, 7, 10, 13, 9, 8, 5, 4];
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Admissions',
                    data: admissions,
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Discharges',
                    data: discharges,
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    barPercentage: 0.7,
                    categoryPercentage: 0.8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'rectRounded'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#7f8c8d'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#7f8c8d',
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'Number of Patients',
                        color: '#7f8c8d',
                        font: {
                            size: 12,
                            weight: 'normal'
                        }
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initDischargeDestChart() {
    const ctx = document.getElementById('dischargeDestChart').getContext('2d');
    
    // Create the chart
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Home', 'Care Home', 'Other Hospital', 'Rehabilitation', 'Other'],
            datasets: [{
                data: [65, 15, 8, 10, 2],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c',
                    '#f39c12',
                    '#95a5a6'
                ],
                borderColor: 'rgba(255, 255, 255, 0.8)',
                borderWidth: 2,
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value * 100) / total).toFixed(1) + '%';
                            return context.label + ': ' + percentage + ' (' + value + ' patients)';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initTransferTimesChart() {
    const ctx = document.getElementById('transferTimesChart').getContext('2d');
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ED to Ward', 'ICU to Ward', 'Ward to Ward', 'Dept to Ward'],
            datasets: [{
                label: 'Average Transfer Time (mins)',
                data: [125, 95, 45, 60],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)'
                ],
                borderWidth: 1,
                borderRadius: 6,
                barPercentage: 0.7
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.x + ' minutes';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#7f8c8d'
                    },
                    title: {
                        display: true,
                        text: 'Minutes',
                        color: '#7f8c8d',
                        font: {
                            size: 12,
                            weight: 'normal'
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#7f8c8d'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initOccupancyChart() {
    const occupancyChart = document.getElementById('occupancyChart');
    if (!occupancyChart) return;
    
    const ctx = occupancyChart.getContext('2d');
    
    // Generate some sample data
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
    const occupancyData = [88, 92, 95, 89, 86, 91, 94, 97];
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Bed Occupancy (%)',
                    data: occupancyData,
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#f39c12',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#7f8c8d'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Occupancy Rate (%)',
                        color: '#7f8c8d'
                    },
                    min: 80,
                    max: 100,
                    ticks: {
                        color: '#7f8c8d',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function initReadmissionRateChart() {
    const readmissionChart = document.getElementById('readmissionChart');
    if (!readmissionChart) return;
    
    const ctx = readmissionChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['7 Days', '14 Days', '28 Days', '90 Days'],
        datasets: [{
            label: 'Readmission Rate (%)',
            data: [2.1, 3.5, 5.2, 8.7],
            backgroundColor: [
                'rgba(46, 204, 113, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(231, 76, 60, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initSatisfactionChart() {
    const satisfactionChart = document.getElementById('satisfactionChart');
    if (!satisfactionChart) return;
    
    const ctx = satisfactionChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Care Quality', 'Staff Attitude', 'Comfort', 'Communication', 'Facilities', 'Food Quality'],
        datasets: [{
            label: 'Current Period',
            data: [4.7, 4.9, 4.3, 4.6, 4.1, 3.8],
            backgroundColor: 'rgba(46, 204, 113, 0.7)'
        }, {
            label: 'Previous Period',
            data: [4.5, 4.8, 4.0, 4.2, 3.9, 3.6],
            backgroundColor: 'rgba(189, 195, 199, 0.7)'
        }]
    };
    
    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        showLabelBackdrop: false,
                        color: '#7f8c8d'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        color: '#34495e',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            }
        }
    });
}

function initComplaintsChart() {
    const complaintsChart = document.getElementById('complaintsChart');
    if (!complaintsChart) return;
    
    const ctx = complaintsChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Number of Complaints',
            data: [4, 6, 8, 7, 5, 6, 3, 4, 5, 7, 4, 5],
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 1,
            tension: 0.4
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'Number of Complaints'
                    }
                }
            }
        }
    });
}

function initQualityIssuesChart() {
    const qualityIssuesChart = document.getElementById('qualityIssuesChart');
    if (!qualityIssuesChart) return;
    
    const ctx = qualityIssuesChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Communication', 'Medication Errors', 'Documentation', 'Staff Training', 'Facilities', 'Patient Complaints'],
        datasets: [{
            label: 'Risk Score',
            data: [8, 9, 5, 7, 4, 6],
            backgroundColor: function(context) {
                const value = context.raw;
                if (value >= 8) return 'rgba(231, 76, 60, 0.7)';
                if (value >= 6) return 'rgba(241, 196, 15, 0.7)';
                return 'rgba(46, 204, 113, 0.7)';
            },
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            let riskLevel = 'Low Risk';
                            if (value >= 8) riskLevel = 'High Risk';
                            else if (value >= 6) riskLevel = 'Medium Risk';
                            return `Risk Score: ${value} (${riskLevel})`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Risk Score (1-10)'
                    },
                    max: 10
                }
            }
        }
    });
}

function initIncidentsChart() {
    const incidentsChart = document.getElementById('incidentsChart');
    if (!incidentsChart) return;
    
    const ctx = incidentsChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Falls', 'Medication Error', 'Pressure Injuries', 'Patient Conflict', 'Staff Injury', 'Other'],
        datasets: [{
            label: 'Incidents Count',
            data: [12, 8, 5, 3, 2, 7],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(149, 165, 166, 0.7)'
            ],
            borderWidth: 0,
            hoverOffset: 6
        }]
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            }
        }
    });
}

function initStaffingChart() {
    const staffingChart = document.getElementById('staffingChart');
    if (!staffingChart) return;
    
    const ctx = staffingChart.getContext('2d');
    
    // Sample data
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const plannedData = [12, 12, 11, 12, 12, 10, 10];
    const actualData = [11, 10, 9, 12, 11, 8, 9];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Planned Staff',
                    data: plannedData,
                    borderColor: '#3498db',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 4,
                    tension: 0.1
                },
                {
                    label: 'Actual Staff',
                    data: actualData,
                    borderColor: '#e74c3c',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 4,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end'
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'Number of Staff',
                        color: '#7f8c8d'
                    }
                }
            }
        }
    });
}

function initStaffTurnoverChart() {
    const turnoverChart = document.getElementById('staffTurnoverChart');
    if (!turnoverChart) return;
    
    const ctx = turnoverChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Staff Turnover Rate (%)',
            data: [4.2, 3.9, 4.1, 3.7, 3.8, 3.5, 3.2, 3.0, 3.3, 3.5, 3.7, 3.7],
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 2,
            tension: 0.4
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 6,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: true,
                        text: 'Turnover Rate'
                    }
                }
            }
        }
    });
}

function initShiftCoverageChart() {
    const shiftCoverageChart = document.getElementById('shiftCoverageChart');
    if (!shiftCoverageChart) return;
    
    const ctx = shiftCoverageChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Morning', 'Afternoon', 'Night'],
        datasets: [
            {
                label: 'Target',
                data: [12, 10, 8],
                backgroundColor: 'rgba(149, 165, 166, 0.5)',
                borderColor: 'rgba(149, 165, 166, 1)',
                borderWidth: 1,
                order: 1
            },
            {
                label: 'Actual',
                data: [11, 9, 7],
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1,
                borderRadius: 4,
                order: 0
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' staff';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Staff'
                    },
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function initTrainingComplianceChart() {
    const complianceChart = document.getElementById('trainingComplianceChart');
    if (!complianceChart) return;
    
    const ctx = complianceChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Fire Safety', 'Manual Handling', 'Infection Control', 'Safeguarding', 'Information Governance', 'Basic Life Support'],
        datasets: [{
            label: 'Compliance Rate (%)',
            data: [96, 92, 88, 94, 90, 85],
            backgroundColor: function(context) {
                const value = context.raw;
                if (value >= 90) return 'rgba(46, 204, 113, 0.7)';
                if (value >= 85) return 'rgba(241, 196, 15, 0.7)';
                return 'rgba(231, 76, 60, 0.7)';
            },
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initSatisfactionTrendChart() {
    const satisfactionTrendChart = document.getElementById('satisfactionTrendChart');
    if (!satisfactionTrendChart) return;
    
    const ctx = satisfactionTrendChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Overall Satisfaction',
            data: [4.1, 4.2, 4.3, 4.3, 4.2, 4.0, 4.1, 4.3, 4.4, 4.5, 4.5, 4.6],
            borderColor: 'rgba(46, 204, 113, 1)',
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 3.5,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Rating (out of 5)'
                    }
                }
            }
        }
    });
}

function initIncidentsCategoryChart() {
    const incidentsCategoryChart = document.getElementById('incidentsCategoryChart');
    if (!incidentsCategoryChart) return;
    
    const ctx = incidentsCategoryChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Falls', 'Medication Errors', 'Pressure Injuries', 'Patient Conflicts', 'Staff Injuries', 'Other'],
        datasets: [{
            data: [35, 25, 15, 10, 8, 7],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(149, 165, 166, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value * 100) / total).toFixed(1) + '%';
                            return context.label + ': ' + percentage;
                        }
                    }
                }
            }
        }
    });
}

function initMonthlySatisfactionChart() {
    const monthlySatisfactionChart = document.getElementById('monthlySatisfactionChart');
    if (!monthlySatisfactionChart) return;
    
    const ctx = monthlySatisfactionChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Current Year',
                data: [4.1, 4.2, 4.3, 4.3, 4.2, 4.0, 4.1, 4.3, 4.4, 4.5, 4.5, 4.6],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Previous Year',
                data: [3.9, 4.0, 4.1, 4.0, 3.9, 3.8, 4.0, 4.1, 4.2, 4.3, 4.2, 4.3],
                borderColor: 'rgba(149, 165, 166, 1)',
                borderDash: [5, 5],
                backgroundColor: 'transparent',
                tension: 0.4,
                fill: false
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    min: 3.5,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Rating (out of 5)'
                    }
                }
            }
        }
    });
}

function initSurveyCompletionChart() {
    const surveyCompletionChart = document.getElementById('surveyCompletionChart');
    if (!surveyCompletionChart) return;
    
    const ctx = surveyCompletionChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Survey Completion Rate (%)',
            data: [45, 48, 52, 55, 60, 58, 62, 65, 68, 72, 75, 78],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Completion Rate (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initComplaintsCategoryChart() {
    const complaintsCategoryChart = document.getElementById('complaintsCategoryChart');
    if (!complaintsCategoryChart) return;
    
    const ctx = complaintsCategoryChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Communication', 'Staff Attitude', 'Waiting Times', 'Food Quality', 'Facilities', 'Other'],
        datasets: [{
            data: [35, 20, 18, 12, 10, 5],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(149, 165, 166, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value * 100) / total).toFixed(1) + '%';
                            return context.label + ': ' + percentage;
                        }
                    }
                }
            }
        }
    });
}

function initIncidentTrendChart() {
    const incidentTrendChart = document.getElementById('incidentTrendChart');
    if (!incidentTrendChart) return;
    
    const ctx = incidentTrendChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Current Year',
                data: [10, 9, 8, 11, 7, 6, 8, 7, 9, 8, 7, 8],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Previous Year',
                data: [12, 11, 10, 13, 9, 8, 10, 9, 11, 10, 9, 10],
                borderColor: 'rgba(149, 165, 166, 1)',
                borderDash: [5, 5],
                backgroundColor: 'transparent',
                tension: 0.4,
                fill: false
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Incidents'
                    },
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function initGapAreasChart() {
    const gapAreasChart = document.getElementById('gapAreasChart');
    if (!gapAreasChart) return;
    
    const ctx = gapAreasChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Medication Errors',
                data: [3, 2, 4, 3, 2, 3, 2, 2, 1, 2, 2, 2],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Documentation Completeness (%)',
                data: [88, 89, 90, 91, 90, 92, 91, 93, 92, 91, 92, 92],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'transparent',
                tension: 0.4,
                fill: false,
                yAxisID: 'y1'
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Number of Errors'
                    },
                    min: 0,
                    max: 5,
                    ticks: {
                        precision: 0
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Completion (%)'
                    },
                    min: 85,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initOverviewPerformanceChart() {
    const overviewPerformanceChart = document.getElementById('overviewPerformanceChart');
    if (!overviewPerformanceChart) return;
    
    const ctx = overviewPerformanceChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Patient Care', 'Quality & Safety', 'Efficiency', 'Staff Satisfaction', 'Patient Satisfaction'],
        datasets: [{
            label: 'Performance Score',
            data: [85, 78, 92, 80, 88],
            backgroundColor: function(context) {
                const value = context.raw;
                if (value >= 90) return 'rgba(46, 204, 113, 0.7)';
                if (value >= 80) return 'rgba(52, 152, 219, 0.7)';
                if (value >= 70) return 'rgba(241, 196, 15, 0.7)';
                return 'rgba(231, 76, 60, 0.7)';
            },
            borderWidth: 1,
            borderRadius: 4
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Score: ' + context.raw + '/100';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Performance Score'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '/100';
                        }
                    }
                }
            }
        }
    });
}

function initOverviewTrendsChart() {
    const overviewTrendsChart = document.getElementById('overviewTrendsChart');
    if (!overviewTrendsChart) return;
    
    const ctx = overviewTrendsChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Length of Stay',
                data: [7.2, 7.1, 6.9, 6.7, 6.5, 6.4, 6.3, 6.4, 6.2, 6.3, 6.2, 6.2],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'transparent',
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'Readmission Rate',
                data: [5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.4, 5.2, 5.3, 5.2, 5.1, 5.2],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'transparent',
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Length of Stay (days)'
                    },
                    min: 5,
                    max: 8
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Readmission Rate (%)'
                    },
                    min: 4,
                    max: 7,
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initCensusOverviewChart() {
    const censusOverviewChart = document.getElementById('censusOverviewChart');
    if (!censusOverviewChart) return;
    
    const ctx = censusOverviewChart.getContext('2d');
    
    // Sample data
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Admissions',
                data: [28, 32, 25, 30, 27, 33, 29, 31],
                backgroundColor: 'rgba(46, 204, 113, 0.7)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 1,
                borderRadius: 4
            },
            {
                label: 'Discharges',
                data: [25, 30, 28, 29, 26, 31, 27, 29],
                backgroundColor: 'rgba(231, 76, 60, 0.7)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 1,
                borderRadius: 4
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Patients'
                    },
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function initOverviewIncidentsChart() {
    const overviewIncidentsChart = document.getElementById('overviewIncidentsChart');
    if (!overviewIncidentsChart) return;
    
    const ctx = overviewIncidentsChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Falls', 'Medication Errors', 'Pressure Injuries', 'Documentation', 'Other'],
        datasets: [{
            data: [35, 25, 15, 15, 10],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(149, 165, 166, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value * 100) / total).toFixed(1) + '%';
                            return context.label + ': ' + percentage;
                        }
                    }
                }
            }
        }
    });
}

function initOverviewStaffingChart() {
    const overviewStaffingChart = document.getElementById('overviewStaffingChart');
    if (!overviewStaffingChart) return;
    
    const ctx = overviewStaffingChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Staff Coverage (%)',
                data: [92, 93, 94, 92, 91, 93, 95, 96, 94, 93, 95, 96],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Target',
                data: [95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95],
                borderColor: 'rgba(231, 76, 60, 1)',
                borderDash: [5, 5],
                backgroundColor: 'transparent',
                tension: 0,
                fill: false
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 85,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Coverage Rate (%)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initOverviewSatisfactionChart() {
    const overviewSatisfactionChart = document.getElementById('overviewSatisfactionChart');
    if (!overviewSatisfactionChart) return;
    
    const ctx = overviewSatisfactionChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Care Quality', 'Staff Attitude', 'Communication', 'Facilities', 'Food', 'Overall'],
        datasets: [{
            label: 'Current',
            data: [4.5, 4.7, 4.3, 4.1, 3.8, 4.5],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        },
        {
            label: 'Previous',
            data: [4.3, 4.5, 4.0, 3.9, 3.6, 4.2],
            backgroundColor: 'rgba(149, 165, 166, 0.5)',
            borderColor: 'rgba(149, 165, 166, 1)',
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    title: {
                        display: true,
                        text: 'Rating (out of 5)'
                    }
                }
            }
        }
    });
}

function refreshData() {
    // This function would normally fetch new data based on selections
    console.log('Refreshing data based on new selections...');
    
    // For demo, we'll just add a subtle animation to the cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('refreshing');
        setTimeout(() => {
            card.classList.remove('refreshing');
        }, 500);
    });
}

function animateElements() {
    // Add CSS class for animations
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes rotating {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            .rotating {
                animation: rotating 1s linear infinite;
            }
            .refreshing {
                transition: transform 0.5s;
                transform: scale(0.98);
            }
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(52, 152, 219, 0); }
                100% { box-shadow: 0 0 0 0 rgba(52, 152, 219, 0); }
            }
        </style>
    `);
    
    // Simulate loading complete
    setTimeout(() => {
        document.querySelectorAll('.dashboard-item').forEach(item => {
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        });
    }, 100);
}

function initLOSTrendChart() {
    const ctx = document.getElementById('losTrendChart').getContext('2d');
    
    // Generate some sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data1 = [7.2, 7.1, 6.8, 6.5, 6.3, 6.2, 6.4, 6.7, 6.9, 6.6, 6.4, 6.2];
    const data2 = [8.5, 8.3, 8.0, 7.8, 7.5, 7.3, 7.2, 7.0, 7.1, 7.3, 7.5, 7.4];
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'SCCH',
                    data: data1,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#3498db',
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'National Average',
                    data: data2,
                    borderColor: '#95a5a6',
                    backgroundColor: 'rgba(149, 165, 166, 0.1)',
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: false,
                    pointBackgroundColor: '#95a5a6',
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#34495e',
                    bodyColor: '#34495e',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Average Days'
                    }
                }
            }
        }
    });
}

function initOccupancyRateChart() {
    const ctx = document.getElementById('occupancyRateChart').getContext('2d');
    
    // Generate some sample data
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        datasets: [{
            label: 'Occupancy Rate',
            data: [88, 92, 95, 89, 86, 91, 94, 97],
            borderColor: '#f39c12',
            backgroundColor: 'rgba(243, 156, 18, 0.1)',
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: 70,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initReadmissionSummaryChart() {
    const ctx = document.getElementById('readmissionSummaryChart').getContext('2d');
    
    const data = {
        labels: ['7 Days', '14 Days', '28 Days', '90 Days'],
        datasets: [{
            label: 'Readmission Rate (%)',
            data: [2.1, 3.5, 5.2, 8.7],
            backgroundColor: [
                'rgba(46, 204, 113, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(231, 76, 60, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

function initBedCapacityChart() {
    const ctx = document.getElementById('bedCapacityChart').getContext('2d');
    
    const data = {
        labels: ['Ward C16', 'Ward C17', 'Ward 2', 'Ward 3', 'Ward 4'],
        datasets: [{
            label: 'Capacity',
            data: [32, 28, 24, 30, 26],
            backgroundColor: 'rgba(52, 152, 219, 0.5)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        }, {
            label: 'Used',
            data: [29, 24, 20, 28, 22],
            backgroundColor: 'rgba(231, 76, 60, 0.5)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    stacked: false
                },
                y: {
                    stacked: false,
                    beginAtZero: true
                }
            }
        }
    });
}

function initAdmissionSourceChart() {
    const ctx = document.getElementById('admissionSourceChart').getContext('2d');
    
    const data = {
        labels: ['Emergency', 'Planned', 'GP Referral', 'Other Hospital', 'Community', 'Other'],
        datasets: [{
            data: [45, 25, 15, 10, 3, 2],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(149, 165, 166, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = ((value * 100) / total).toFixed(1) + '%';
                            return context.label + ': ' + percentage + ' (' + value + ')';
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

function initReadmissionTypeChart() {
    const ctx = document.getElementById('readmissionTypeChart').getContext('2d');
    
    const data = {
        labels: ['Same Condition', 'Related Condition', 'Unrelated Condition', 'Complication'],
        datasets: [{
            data: [35, 30, 25, 10],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(155, 89, 182, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                }
            }
        }
    });
}

function initPreventableReadmissionsChart() {
    const ctx = document.getElementById('preventableReadmissionsChart').getContext('2d');
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Preventable',
            data: [8, 7, 6, 9, 7, 5, 4, 6, 8, 7, 5, 4],
            backgroundColor: 'rgba(231, 76, 60, 0.7)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 1
        }, {
            label: 'Non-Preventable',
            data: [12, 14, 13, 15, 16, 14, 12, 13, 15, 14, 12, 11],
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true
                }
            }
        }
    });
}

function updateWardOptions(department) {
    const wardDropdowns = document.querySelectorAll('.dropdown-btn');
    let wardButton;
    
    // Find the Ward dropdown button
    for (let btn of wardDropdowns) {
        if (btn.textContent.includes('Ward')) {
            wardButton = btn;
            break;
        }
    }
    
    if (!wardButton) return;
    
    const wardDropdown = wardButton.closest('.dropdown');
    const wardOptions = wardDropdown.querySelectorAll('.dropdown-content a');
    
    // Hide all ward options first
    wardOptions.forEach(option => {
        option.style.display = 'none';
    });
    
    // Show only relevant wards
    if (department === 'SCGH') {
        wardOptions.forEach(option => {
            const wardName = option.textContent.trim();
            if (wardName === 'C16' || wardName === 'C17') {
                option.style.display = 'block';
            }
        });
        // Set default selected ward for SCGH if current ward is not valid
        const currentWard = document.querySelector('.details .detail:nth-child(2) span').textContent;
        if (currentWard !== 'C16' && currentWard !== 'C17') {
            // Set C16 as default
            const c16Option = Array.from(wardOptions).find(opt => opt.textContent.trim() === 'C16');
            if (c16Option) {
                // Update ward dropdown button text
                const icon = wardButton.querySelector('i:first-child');
                const chevron = wardButton.querySelector('i:last-child');
                
                wardButton.innerHTML = '';
                wardButton.appendChild(icon);
                wardButton.appendChild(document.createTextNode(' C16 '));
                wardButton.appendChild(chevron);
                
                // Update selected option
                wardOptions.forEach(opt => opt.classList.remove('active'));
                c16Option.classList.add('active');
                
                // Update banner details
                document.querySelector('.details .detail:nth-child(2) span').textContent = 'C16';
            }
        }
    } else if (department === 'OPH') {
        wardOptions.forEach(option => {
            const wardName = option.textContent.trim();
            if (wardName === 'Ward 2' || wardName === 'Ward 3' || wardName === 'Ward 4' || 
                wardName === 'Ward 5' || wardName === 'Ward 6' || wardName === 'Ward 7') {
                option.style.display = 'block';
            }
        });
        // Set default selected ward for OPH if current ward is not valid
        const currentWard = document.querySelector('.details .detail:nth-child(2) span').textContent;
        if (currentWard === 'C16' || currentWard === 'C17') {
            // Set Ward 2 as default
            const ward2Option = Array.from(wardOptions).find(opt => opt.textContent.trim() === 'Ward 2');
            if (ward2Option) {
                // Update ward dropdown button text
                const icon = wardButton.querySelector('i:first-child');
                const chevron = wardButton.querySelector('i:last-child');
                
                wardButton.innerHTML = '';
                wardButton.appendChild(icon);
                wardButton.appendChild(document.createTextNode(' Ward 2 '));
                wardButton.appendChild(chevron);
                
                // Update selected option
                wardOptions.forEach(opt => opt.classList.remove('active'));
                ward2Option.classList.add('active');
                
                // Update banner details
                document.querySelector('.details .detail:nth-child(2) span').textContent = 'Ward 2';
            }
        }
    }
}

function initBenchmarkPerformanceChart() {
    const benchmarkChart = document.getElementById('benchmarkPerformanceChart');
    if (!benchmarkChart) return;
    
    const ctx = benchmarkChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['LOS', 'Readmission', 'Patient Satisfaction', 'Quality', 'Compliance', 'Resource Use'],
        datasets: [
            {
                label: 'Your Hospital',
                data: [85, 92, 78, 88, 95, 82],
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
            },
            {
                label: 'National Average',
                data: [75, 80, 76, 82, 88, 79],
                backgroundColor: 'rgba(189, 195, 199, 0.6)',
            },
            {
                label: 'Top Performers',
                data: [95, 98, 92, 94, 97, 94],
                backgroundColor: 'rgba(46, 204, 113, 0.6)',
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '/100';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Performance Score'
                    }
                }
            }
        }
    });
}

function initNationalComparisonChart() {
    const nationalChart = document.getElementById('nationalComparisonChart');
    if (!nationalChart) return;
    
    const ctx = nationalChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['LOS', 'Discharge Rate', 'Readmission Rate', 'Patient Satisfaction', 'Staff to Patient Ratio'],
        datasets: [{
            label: 'Your Hospital vs National Average (%)',
            data: [15, 8, -5, 12, 3],
            backgroundColor: function(context) {
                const value = context.raw;
                return value >= 0 ? 'rgba(46, 204, 113, 0.7)' : 'rgba(231, 76, 60, 0.7)';
            }
        }]
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return value >= 0 ? 
                                `${value}% better than national average` : 
                                `${Math.abs(value)}% worse than national average`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: function(context) {
                            if (context.tick.value === 0) {
                                return 'rgba(0, 0, 0, 0.2)';
                            }
                            return 'rgba(0, 0, 0, 0.05)';
                        }
                    },
                    title: {
                        display: true,
                        text: '% Difference from National Average'
                    }
                }
            }
        }
    });
}

function initHospitalComparisonChart() {
    const hospitalChart = document.getElementById('hospitalComparisonChart');
    if (!hospitalChart) return;
    
    const ctx = hospitalChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['SCCH', 'OSH', 'Memorial', 'City General', 'University'],
        datasets: [
            {
                label: 'Average LOS (days)',
                data: [6.2, 6.8, 7.3, 6.9, 7.5],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                yAxisID: 'y'
            },
            {
                label: 'Readmission Rate (%)',
                data: [5.2, 5.7, 6.8, 5.9, 4.9],
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                yAxisID: 'y1'
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Average LOS (days)'
                    },
                    min: 5,
                    max: 8
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Readmission Rate (%)'
                    },
                    min: 4,
                    max: 8,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

function initTrendAnalysisChart() {
    const trendChart = document.getElementById('trendAnalysisChart');
    if (!trendChart) return;
    
    const ctx = trendChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Your Hospital',
                data: [78, 80, 82, 83, 85, 87, 89, 90, 91, 92, 91, 93],
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true
            },
            {
                label: 'National Average',
                data: [76, 76, 77, 77, 78, 79, 79, 80, 81, 81, 82, 82],
                borderColor: 'rgba(149, 165, 166, 1)',
                backgroundColor: 'rgba(149, 165, 166, 0.1)',
                fill: true
            },
            {
                label: 'Top Performers',
                data: [88, 89, 90, 90, 91, 92, 92, 93, 94, 94, 95, 95],
                borderColor: 'rgba(46, 204, 113, 1)',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                fill: true
            }
        ]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + ' points';
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 70,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Overall Quality Score'
                    }
                }
            }
        }
    });
}

function initAlertsCategoryChart() {
    const alertsChart = document.getElementById('alertsCategoryChart');
    if (!alertsChart) return;
    
    const ctx = alertsChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Staffing', 'Quality', 'Safety', 'Compliance', 'Operational', 'Financial'],
        datasets: [{
            label: 'Number of Alerts',
            data: [7, 4, 3, 2, 5, 1],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(52, 152, 219, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(46, 204, 113, 0.7)',
                'rgba(155, 89, 182, 0.7)',
                'rgba(149, 165, 166, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function initCriticalIssuesChart() {
    const issuesChart = document.getElementById('criticalIssuesChart');
    if (!issuesChart) return;
    
    const ctx = issuesChart.getContext('2d');
    
    // Sample data
    const data = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [{
            label: 'Number of Issues',
            data: [3, 8, 12],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(241, 196, 15, 0.7)',
                'rgba(46, 204, 113, 0.7)'
            ],
            borderWidth: 0
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            },
            cutout: '60%'
        }
    });
}

function initRiskTrendChart() {
    const riskChart = document.getElementById('riskTrendChart');
    if (!riskChart) return;
    
    const ctx = riskChart.getContext('2d');
    
    // Sample data
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const highRiskData = [5, 4, 3, 4, 2, 3, 1, 2, 1, 3, 2, 3];
    const mediumRiskData = [8, 7, 9, 6, 5, 7, 8, 6, 5, 7, 9, 8];
    const lowRiskData = [10, 12, 11, 13, 14, 12, 15, 14, 16, 13, 11, 12];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'High Risk',
                    data: highRiskData,
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    fill: true
                },
                {
                    label: 'Medium Risk',
                    data: mediumRiskData,
                    borderColor: 'rgba(241, 196, 15, 1)',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    fill: true
                },
                {
                    label: 'Low Risk',
                    data: lowRiskData,
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Number of Issues'
                    }
                }
            }
        }
    });
}
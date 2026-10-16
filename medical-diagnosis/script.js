// Global Variables
let selectedSymptoms = [];
let currentCategory = 'all';
let patientHistory = [];
let currentDiagnosis = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadPatientHistory();
});

function initializeApp() {
    // Generate patient ID
    document.getElementById('patientId').value = generatePatientId();
    
    // Load symptoms
    loadSymptoms();
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadSymptoms();
        });
    });
    
    // Symptom search
    document.getElementById('symptomSearch').addEventListener('input', function() {
        const query = this.value.trim();
        if (query) {
            const results = searchSymptoms(query);
            displaySymptoms(results);
        } else {
            loadSymptoms();
        }
    });
    
    // History search
    document.getElementById('historySearch').addEventListener('input', function() {
        filterHistory(this.value);
    });
}

// Load Symptoms
function loadSymptoms() {
    const symptoms = getSymptomsByCategory(currentCategory);
    displaySymptoms(symptoms);
}

function displaySymptoms(symptoms) {
    const container = document.getElementById('symptomList');
    
    if (symptoms.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No symptoms found</p></div>';
        return;
    }
    
    container.innerHTML = symptoms.map(symptom => `
        <div class="symptom-item ${selectedSymptoms.includes(symptom.id) ? 'selected' : ''}" 
             onclick="toggleSymptom('${symptom.id}')">
            <span class="symptom-icon">${symptom.icon}</span>
            <span class="symptom-name">${symptom.name}</span>
        </div>
    `).join('');
}

// Toggle Symptom Selection
function toggleSymptom(symptomId) {
    const index = selectedSymptoms.indexOf(symptomId);
    
    if (index > -1) {
        selectedSymptoms.splice(index, 1);
    } else {
        selectedSymptoms.push(symptomId);
    }
    
    updateSelectedSymptoms();
    loadSymptoms(); // Refresh to update visual state
}

function updateSelectedSymptoms() {
    const container = document.getElementById('selectedSymptomsContainer');
    const list = document.getElementById('selectedSymptoms');
    
    if (selectedSymptoms.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    list.innerHTML = selectedSymptoms.map(symptomId => {
        const symptom = getSymptomById(symptomId);
        return `
            <div class="selected-symptom-tag">
                <span>${symptom.icon} ${symptom.name}</span>
                <span class="remove-symptom" onclick="toggleSymptom('${symptomId}')">&times;</span>
            </div>
        `;
    }).join('');
}

// Analyze Symptoms and Diagnose
function analyzeSymptomsAndDiagnose() {
    if (selectedSymptoms.length === 0) {
        alert('Please select at least one symptom to analyze.');
        return;
    }
    
    // Get patient info
    const patientInfo = {
        id: document.getElementById('patientId').value,
        name: document.getElementById('patientName').value,
        age: parseInt(document.getElementById('patientAge').value),
        gender: document.getElementById('patientGender').value,
        weight: parseFloat(document.getElementById('patientWeight').value),
        temperature: parseFloat(document.getElementById('patientTemp').value),
        bloodPressure: document.getElementById('patientBP').value,
        heartRate: parseInt(document.getElementById('patientHR').value),
        duration: document.getElementById('symptomDuration').value,
        medicalHistory: document.getElementById('medicalHistory').value,
        currentMedications: document.getElementById('currentMedications').value,
        additionalNotes: document.getElementById('additionalNotes').value
    };
    
    if (!patientInfo.name) {
        alert('Please enter patient name.');
        return;
    }
    
    // Diagnose
    const diagnosisResults = diagnoseDisease(selectedSymptoms, patientInfo);
    
    // Store current diagnosis
    currentDiagnosis = {
        timestamp: new Date().toISOString(),
        patientInfo: patientInfo,
        symptoms: selectedSymptoms,
        results: diagnosisResults
    };
    
    // Display results
    displayDiagnosisResults(diagnosisResults);
    displayRecommendations(diagnosisResults);
    
    // Save to history
    saveToHistory(currentDiagnosis);
    
    // Scroll to results
    document.getElementById('diagnosisResults').scrollIntoView({ behavior: 'smooth' });
}

function displayDiagnosisResults(results) {
    const container = document.getElementById('diagnosisContent');
    const section = document.getElementById('diagnosisResults');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No matching diseases found. Please consult a healthcare professional.</p></div>';
        section.style.display = 'block';
        return;
    }
    
    // Display top 5 results
    container.innerHTML = results.slice(0, 5).map((result, index) => {
        const disease = result.disease;
        const confidence = result.confidence;
        
        let confidenceClass = 'confidence-low';
        if (confidence >= 70) confidenceClass = 'confidence-high';
        else if (confidence >= 40) confidenceClass = 'confidence-medium';
        
        return `
            <div class="diagnosis-item">
                <div class="diagnosis-header">
                    <div>
                        <div class="diagnosis-name">${index + 1}. ${disease.name}</div>
                        <p style="color: #666; margin-top: 5px;">${disease.category}</p>
                    </div>
                    <span class="confidence-badge ${confidenceClass}">
                        ${confidence.toFixed(1)}% Match
                    </span>
                </div>
                
                <p style="color: #666; margin: 15px 0; line-height: 1.6;">
                    ${disease.description}
                </p>
                
                <div class="diagnosis-details">
                    <div class="detail-section">
                        <h4>✓ Matched Symptoms</h4>
                        <ul>
                            ${result.matchedSymptoms.map(id => {
                                const symptom = getSymptomById(id);
                                return `<li>${symptom.name}</li>`;
                            }).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h4>⚠️ Common Causes</h4>
                        <ul>
                            ${disease.commonCauses.map(cause => `<li>${cause}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h4>🎯 Risk Factors</h4>
                        <ul>
                            ${disease.riskFactors.map(factor => `<li>${factor}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="detail-section">
                        <h4>⚡ Possible Complications</h4>
                        <ul>
                            ${disease.complications.map(comp => `<li>${comp}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px;">
                    <h4 style="color: #667eea; margin-bottom: 10px;">⏱️ Expected Recovery Time</h4>
                    <p style="color: #666;">${disease.recovery}</p>
                </div>
                
                <div style="margin-top: 15px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <h4 style="color: #856404; margin-bottom: 10px;">🚨 When to Seek Immediate Help</h4>
                    <ul style="margin: 0; padding-left: 20px; color: #856404;">
                        ${disease.whenToSeekHelp.map(item => `<li style="margin: 5px 0;">${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }).join('');
    
    section.style.display = 'block';
}

function displayRecommendations(results) {
    const container = document.getElementById('recommendationsContent');
    const section = document.getElementById('recommendationsSection');
    
    if (results.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    const topDisease = results[0].disease;
    
    // Urgency banner
    let urgencyClass = 'urgency-moderate';
    let urgencyText = '📌 Moderate Priority';
    
    if (topDisease.urgency === 'high') {
        urgencyClass = 'urgency-high';
        urgencyText = '⚠️ High Priority - Seek Medical Attention Soon';
    } else if (topDisease.urgency === 'emergency') {
        urgencyClass = 'urgency-emergency';
        urgencyText = '🚨 EMERGENCY - Seek Immediate Medical Attention';
    }
    
    container.innerHTML = `
        <div class="urgency-banner ${urgencyClass}">
            ${urgencyText}
        </div>
        
        <div class="recommendation-grid">
            <div class="recommendation-card">
                <h3>🚑 Immediate Actions</h3>
                <ul>
                    ${topDisease.recommendations.immediate.map(action => `<li>${action}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recommendation-card">
                <h3>💊 Medications</h3>
                <ul>
                    ${topDisease.recommendations.medications.map(med => `<li>${med}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recommendation-card">
                <h3>🏠 Lifestyle & Home Care</h3>
                <ul>
                    ${topDisease.recommendations.lifestyle.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recommendation-card">
                <h3>🛡️ Prevention</h3>
                <ul>
                    ${topDisease.recommendations.prevention.map(prev => `<li>${prev}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <button class="btn-primary" onclick="generateReport()" style="margin-right: 15px;">
                📄 Generate Full Report
            </button>
            <button class="btn-secondary" onclick="startNewDiagnosis()">
                🔄 New Diagnosis
            </button>
        </div>
    `;
    
    section.style.display = 'block';
}

// Patient History
function saveToHistory(diagnosis) {
    patientHistory.unshift(diagnosis);
    localStorage.setItem('patientHistory', JSON.stringify(patientHistory));
    loadPatientHistory();
}

function loadPatientHistory() {
    const saved = localStorage.getItem('patientHistory');
    if (saved) {
        patientHistory = JSON.parse(saved);
    }
    displayHistory(patientHistory);
}

function displayHistory(history) {
    const container = document.getElementById('patientHistory');
    
    if (!history || history.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><p>No patient history yet</p></div>';
        return;
    }
    
    container.innerHTML = history.slice(0, 20).map((record, index) => {
        const topDiagnosis = record.results[0] ? record.results[0].disease.name : 'No diagnosis';
        const date = new Date(record.timestamp);
        
        return `
            <div class="history-item" onclick="viewHistoryRecord(${index})">
                <div class="history-header">
                    <div>
                        <strong>${record.patientInfo.name}</strong> (${record.patientInfo.age}y, ${record.patientInfo.gender})
                        <br>
                        <span class="history-diagnosis">${topDiagnosis}</span>
                    </div>
                    <span class="history-date">${date.toLocaleDateString()} ${date.toLocaleTimeString()}</span>
                </div>
                <p style="color: #666; margin-top: 10px;">
                    ${record.symptoms.length} symptoms analyzed • ${record.results.length} possible diagnoses
                </p>
            </div>
        `;
    }).join('');
}

function filterHistory(query) {
    if (!query) {
        displayHistory(patientHistory);
        return;
    }
    
    const lowerQuery = query.toLowerCase();
    const filtered = patientHistory.filter(record => 
        record.patientInfo.name.toLowerCase().includes(lowerQuery) ||
        record.patientInfo.id.toLowerCase().includes(lowerQuery) ||
        (record.results[0] && record.results[0].disease.name.toLowerCase().includes(lowerQuery))
    );
    
    displayHistory(filtered);
}

function viewHistoryRecord(index) {
    const record = patientHistory[index];
    currentDiagnosis = record;
    
    // Populate form with historical data
    document.getElementById('patientId').value = record.patientInfo.id;
    document.getElementById('patientName').value = record.patientInfo.name;
    document.getElementById('patientAge').value = record.patientInfo.age;
    document.getElementById('patientGender').value = record.patientInfo.gender;
    document.getElementById('patientWeight').value = record.patientInfo.weight || '';
    document.getElementById('patientTemp').value = record.patientInfo.temperature || '';
    document.getElementById('patientBP').value = record.patientInfo.bloodPressure || '';
    document.getElementById('patientHR').value = record.patientInfo.heartRate || '';
    
    // Restore selected symptoms
    selectedSymptoms = [...record.symptoms];
    updateSelectedSymptoms();
    loadSymptoms();
    
    // Display results
    displayDiagnosisResults(record.results);
    displayRecommendations(record.results);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Report Generation
function generateReport() {
    if (!currentDiagnosis) {
        alert('No diagnosis available to generate report.');
        return;
    }
    
    const modal = document.getElementById('reportModal');
    const content = document.getElementById('reportContent');
    
    const date = new Date(currentDiagnosis.timestamp);
    const topDiagnosis = currentDiagnosis.results[0];
    
    content.innerHTML = `
        <div style="padding: 20px; border: 2px solid #667eea; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #667eea; padding-bottom: 20px;">
                <h1 style="color: #667eea; margin-bottom: 10px;">⚕️ MEDICAL DIAGNOSTIC REPORT</h1>
                <p style="color: #666;">Computer-Assisted Diagnosis System</p>
                <p style="color: #999; font-size: 0.9em;">Generated: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}</p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">PATIENT INFORMATION</h2>
                <table style="width: 100%; margin-top: 15px;">
                    <tr><td style="padding: 8px; font-weight: 600;">Patient ID:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.id}</td></tr>
                    <tr><td style="padding: 8px; font-weight: 600;">Name:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.name}</td></tr>
                    <tr><td style="padding: 8px; font-weight: 600;">Age:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.age} years</td></tr>
                    <tr><td style="padding: 8px; font-weight: 600;">Gender:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.gender}</td></tr>
                    ${currentDiagnosis.patientInfo.temperature ? `<tr><td style="padding: 8px; font-weight: 600;">Temperature:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.temperature}°C</td></tr>` : ''}
                    ${currentDiagnosis.patientInfo.bloodPressure ? `<tr><td style="padding: 8px; font-weight: 600;">Blood Pressure:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.bloodPressure}</td></tr>` : ''}
                    ${currentDiagnosis.patientInfo.heartRate ? `<tr><td style="padding: 8px; font-weight: 600;">Heart Rate:</td><td style="padding: 8px;">${currentDiagnosis.patientInfo.heartRate} bpm</td></tr>` : ''}
                </table>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">PRESENTING SYMPTOMS</h2>
                <ul style="margin-top: 15px; columns: 2;">
                    ${currentDiagnosis.symptoms.map(id => {
                        const symptom = getSymptomById(id);
                        return `<li style="margin: 5px 0;">${symptom.icon} ${symptom.name}</li>`;
                    }).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">DIAGNOSTIC FINDINGS</h2>
                <div style="margin-top: 15px; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                    <h3 style="color: #667eea;">Primary Diagnosis: ${topDiagnosis.disease.name}</h3>
                    <p style="margin: 10px 0;"><strong>Confidence Level:</strong> ${topDiagnosis.confidence.toFixed(1)}%</p>
                    <p style="margin: 10px 0;"><strong>Category:</strong> ${topDiagnosis.disease.category}</p>
                    <p style="margin: 10px 0; line-height: 1.6;">${topDiagnosis.disease.description}</p>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">DIFFERENTIAL DIAGNOSES</h2>
                <ul style="margin-top: 15px;">
                    ${currentDiagnosis.results.slice(1, 4).map((result, index) => `
                        <li style="margin: 10px 0;">
                            <strong>${index + 2}. ${result.disease.name}</strong> - ${result.confidence.toFixed(1)}% match
                            <br><span style="color: #666; font-size: 0.9em;">${result.disease.description}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h2 style="color: #667eea; border-bottom: 2px solid #e0e0e0; padding-bottom: 10px;">TREATMENT RECOMMENDATIONS</h2>
                <div style="margin-top: 15px;">
                    <h4 style="color: #667eea;">Immediate Actions:</h4>
                    <ul>${topDiagnosis.disease.recommendations.immediate.map(action => `<li style="margin: 5px 0;">${action}</li>`).join('')}</ul>
                    
                    <h4 style="color: #667eea; margin-top: 15px;">Medications:</h4>
                    <ul>${topDiagnosis.disease.recommendations.medications.map(med => `<li style="margin: 5px 0;">${med}</li>`).join('')}</ul>
                </div>
            </div>
            
            <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 30px;">
                <strong style="color: #856404;">⚠️ MEDICAL DISCLAIMER:</strong>
                <p style="color: #856404; margin-top: 10px; line-height: 1.6;">
                    This report is generated by an AI-assisted diagnostic tool and is for informational purposes only. 
                    It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with 
                    a qualified healthcare provider for proper medical evaluation and treatment.
                </p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeReportModal() {
    document.getElementById('reportModal').style.display = 'none';
}

function printReport() {
    window.print();
}

function downloadReport() {
    // In a real application, you would use a library like jsPDF
    alert('PDF download functionality would be implemented here using a library like jsPDF.');
}

// Export History
function exportHistory() {
    if (patientHistory.length === 0) {
        alert('No history to export.');
        return;
    }
    
    let csv = 'Date,Patient ID,Patient Name,Age,Gender,Symptoms,Top Diagnosis,Confidence\n';
    
    patientHistory.forEach(record => {
        const date = new Date(record.timestamp).toLocaleString();
        const symptoms = record.symptoms.map(id => getSymptomById(id).name).join('; ');
        const topDiagnosis = record.results[0];
        
        csv += `"${date}","${record.patientInfo.id}","${record.patientInfo.name}",${record.patientInfo.age},"${record.patientInfo.gender}","${symptoms}","${topDiagnosis.disease.name}",${topDiagnosis.confidence.toFixed(1)}%\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient_history_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Start New Diagnosis
function startNewDiagnosis() {
    // Clear form
    document.getElementById('patientForm').reset();
    document.getElementById('patientId').value = generatePatientId();
    document.getElementById('medicalHistory').value = '';
    document.getElementById('currentMedications').value = '';
    document.getElementById('additionalNotes').value = '';
    
    // Clear symptoms
    selectedSymptoms = [];
    updateSelectedSymptoms();
    loadSymptoms();
    
    // Hide results
    document.getElementById('diagnosisResults').style.display = 'none';
    document.getElementById('recommendationsSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Helper Functions
function generatePatientId() {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `P${year}${random}`;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeReportModal();
    }
}

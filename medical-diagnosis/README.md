# ⚕️ Medical Symptom Checker & Disease Diagnosis System

An AI-powered medical diagnostic tool that analyzes patient symptoms to identify potential diseases with confidence scores, treatment recommendations, and comprehensive medical reports.

## 🎯 Features

### 📊 Comprehensive Symptom Database
- **90+ symptoms** across 7 categories:
  - General Symptoms
  - Respiratory Symptoms
  - Digestive Symptoms
  - Neurological Symptoms
  - Skin Symptoms
  - Cardiovascular Symptoms
  - Musculoskeletal Symptoms

### 🔬 Disease Database
- **15+ common diseases** including:
  - Common Cold
  - Influenza (Flu)
  - COVID-19
  - Pneumonia
  - Bronchitis
  - Asthma
  - Gastroenteritis
  - Food Poisoning
  - Migraine
  - Diabetes
  - Hypertension
  - Allergic Reactions
  - Anemia
  - UTI (Urinary Tract Infection)

### 🎯 Smart Diagnostic Algorithm
- Symptom matching with confidence scores
- Primary vs. secondary symptom weighting
- Age and risk factor consideration
- Multiple diagnosis suggestions
- Differential diagnosis support

### 📋 Patient Management
- Complete patient information tracking
- Medical history recording
- Current medications tracking
- Vital signs monitoring (temperature, BP, heart rate)
- Automatic patient ID generation

### 💊 Treatment Recommendations
- Immediate actions
- Medication suggestions
- Lifestyle & home care advice
- Prevention strategies
- When to seek emergency help

### 📄 Medical Reports
- Professional report generation
- Print-ready format
- Detailed diagnostic findings
- Treatment recommendations
- Differential diagnoses
- Export to CSV

### 📚 Patient History
- Complete diagnosis history
- Search and filter capabilities
- View past diagnoses
- Export historical data

## 🚀 How to Use

### Quick Start

1. **Open the application**
   ```
   Open index.html in your web browser
   ```

2. **Enter patient information**
   - Patient name, age, gender
   - Vital signs (optional but recommended)
   - Medical history and current medications

3. **Select symptoms**
   - Browse by category or search
   - Click symptoms to select
   - Select all applicable symptoms

4. **Analyze & Diagnose**
   - Click "Analyze Symptoms & Diagnose"
   - Review diagnosis results
   - Check confidence scores
   - Read treatment recommendations

5. **Generate report**
   - Click "Generate Full Report"
   - Print or save as needed

## 📖 Detailed Usage Guide

### Step 1: Patient Information

**Required Fields:**
- Full Name
- Age
- Gender

**Optional but Recommended:**
- Weight (kg)
- Temperature (°C)
- Blood Pressure (e.g., 120/80)
- Heart Rate (bpm)

**Additional Information:**
- Duration of symptoms
- Medical history (pre-existing conditions)
- Current medications
- Additional notes

### Step 2: Symptom Selection

**Browse by Category:**
- Click category buttons to filter symptoms
- Select "All Symptoms" to see everything

**Search Symptoms:**
- Type in search box to find specific symptoms
- Results update in real-time

**Select Multiple Symptoms:**
- Click any symptom to select/deselect
- Selected symptoms appear highlighted
- View all selected symptoms in the summary box

### Step 3: Analysis

**Diagnostic Process:**
1. System matches symptoms to disease database
2. Calculates confidence scores (0-95%)
3. Ranks diseases by probability
4. Considers patient age and risk factors

**Confidence Levels:**
- 🟢 **High (70-95%)**: Strong match
- 🟡 **Medium (40-69%)**: Possible match
- 🔴 **Low (0-39%)**: Weak match

### Step 4: Review Results

**Each diagnosis includes:**
- Disease name and category
- Confidence percentage
- Description
- Matched symptoms
- Common causes
- Risk factors
- Possible complications
- Expected recovery time
- When to seek immediate help

### Step 5: Treatment Recommendations

**Four areas covered:**
1. **Immediate Actions** - What to do right now
2. **Medications** - Suggested treatments
3. **Lifestyle & Home Care** - Self-care tips
4. **Prevention** - How to avoid recurrence

## 🎨 System Components

### Symptoms Database (`symptoms-database.js`)
- 90+ symptoms with categories
- Icons for visual identification
- Search functionality
- Category filtering

### Disease Database (`disease-database.js`)
- 15+ diseases with detailed information
- Symptom patterns and primary symptoms
- Diagnostic criteria
- Treatment protocols
- Risk factors and complications

### Main Application (`script.js`)
- User interface logic
- Diagnostic algorithm
- Patient history management
- Report generation

## 🔍 Diagnostic Algorithm

The system uses a sophisticated matching algorithm:

1. **Symptom Matching**
   - Each symptom match adds points
   - Primary symptoms weighted x3
   - Secondary symptoms weighted x1

2. **Confidence Calculation**
   ```
   Confidence = (Matched Points / Total Possible Points) × 100
   ```

3. **Age Adjustment**
   - Adds +5% for age-related risk factors
   - Example: Age >65 for pneumonia

4. **Minimum Threshold**
   - Requires at least 2 symptom matches
   - OR 1 primary symptom match

5. **Result Ranking**
   - Sorted by confidence score
   - Top 5 displayed

## 📊 Example Use Cases

### Case 1: Common Cold
**Symptoms:** Runny nose, stuffy nose, sneezing, sore throat
**Expected Result:** Common Cold (85-95% confidence)
**Recommendations:** Rest, fluids, OTC medications

### Case 2: Influenza
**Symptoms:** Fever, muscle pain, fatigue, dry cough, chills
**Expected Result:** Influenza (80-90% confidence)
**Recommendations:** Antiviral medications, rest, isolation

### Case 3: COVID-19
**Symptoms:** Fever, dry cough, loss of taste/smell, fatigue
**Expected Result:** COVID-19 (85-95% confidence)
**Recommendations:** Test immediately, isolate, monitor oxygen

### Case 4: Gastroenteritis
**Symptoms:** Diarrhea, vomiting, nausea, abdominal pain
**Expected Result:** Gastroenteritis (80-90% confidence)
**Recommendations:** Rehydration, rest, BRAT diet

## ⚠️ Important Medical Disclaimer

**THIS IS NOT A REPLACEMENT FOR PROFESSIONAL MEDICAL CARE**

This system is designed for:
- ✅ Educational purposes
- ✅ Preliminary assessment
- ✅ Health awareness
- ✅ Symptom documentation
- ✅ Discussion aid with doctors

This system is NOT for:
- ❌ Self-diagnosis without doctor consultation
- ❌ Emergency medical situations
- ❌ Replacing professional medical advice
- ❌ Treatment without medical supervision
- ❌ Ignoring serious symptoms

### When to Seek Immediate Medical Attention

**Call 911 or go to ER immediately if:**
- Chest pain or pressure
- Difficulty breathing or shortness of breath
- Sudden severe headache
- Loss of consciousness
- Severe bleeding
- Suspected stroke symptoms (facial drooping, arm weakness, speech difficulty)
- Severe allergic reaction
- Suicidal thoughts
- Severe abdominal pain
- High fever with stiff neck

## 🔧 Technical Details

### Browser Requirements
- Modern browser with JavaScript enabled
- Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- Local storage support
- 1024x768 minimum screen resolution

### File Structure
```
medical-diagnosis/
├── index.html              # Main application interface
├── styles.css              # Complete styling
├── symptoms-database.js    # 90+ symptoms database
├── disease-database.js     # Disease information & algorithms
├── script.js               # Application logic
└── README.md              # This file
```

### Data Storage
- Patient history stored in browser localStorage
- No server required
- Data persists across sessions
- Can be exported to CSV

### Performance
- Instant symptom search
- Real-time diagnosis (< 100ms)
- Responsive design for all devices
- Optimized for mobile and desktop

## 🎓 For Healthcare Professionals

### Clinical Decision Support Tool

This system can serve as a:
- **Differential diagnosis aid**
- **Patient education tool**
- **Documentation assistant**
- **Teaching resource for medical students**

### Customization for Clinical Use

**Adding new diseases:**
1. Edit `disease-database.js`
2. Add new disease object with:
   - Symptoms array
   - Primary symptoms
   - Description
   - Recommendations
   - Complications

**Adding new symptoms:**
1. Edit `symptoms-database.js`
2. Add symptom with:
   - Unique ID
   - Name
   - Category
   - Icon

### Integration Possibilities

Can be integrated with:
- Electronic Health Records (EHR)
- Hospital information systems
- Telemedicine platforms
- Medical education systems
- Patient portals

## 📱 Mobile Support

Fully responsive design works on:
- 📱 Smartphones (iOS, Android)
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

Features adapt to screen size:
- Touch-friendly buttons
- Responsive layouts
- Mobile-optimized navigation
- Readable text on small screens

## 🔒 Privacy & Security

### Data Privacy
- All data stored locally in browser
- No data sent to external servers
- No user tracking
- No cookies used
- Compliant with HIPAA (when used properly)

### Recommendations for Clinical Use
- Use on secure networks only
- Clear browser data when done (public computers)
- Don't store on shared devices
- Use encrypted storage for sensitive data
- Follow institution's privacy policies

## 🚀 Future Enhancements

Potential additions:
- [ ] More diseases (100+ diseases)
- [ ] Machine learning improvements
- [ ] Multilingual support
- [ ] Image-based symptom detection
- [ ] Voice input for symptoms
- [ ] Integration with medical databases
- [ ] Real-time severity assessment
- [ ] Medication interaction checker
- [ ] Lab result interpretation
- [ ] Appointment scheduling
- [ ] Telehealth integration

## 📞 Support & Contribution

### For Issues
This is a demonstration/educational tool. For actual medical concerns, consult healthcare professionals.

### Educational Use
Feel free to use this system for:
- Medical education
- Healthcare training
- Research projects
- Demonstration purposes
- Learning web development

## 📝 Credits & Acknowledgments

### Medical Information Sources
- CDC (Centers for Disease Control)
- WHO (World Health Organization)
- Mayo Clinic
- NIH (National Institutes of Health)
- Medical literature and textbooks

### Technology
- Pure HTML, CSS, JavaScript
- No external dependencies
- Responsive design principles
- Accessibility best practices

## ⚖️ License

This is an educational tool. Use responsibly and always consult healthcare professionals for medical advice.

---

**Version:** 1.0.0  
**Last Updated:** October 2026  
**Status:** Educational Tool ✓  
**Medical Use:** Requires professional oversight ⚕️

**Remember: This tool assists decision-making but never replaces professional medical judgment.**

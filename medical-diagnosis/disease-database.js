// Comprehensive Disease Database with Diagnosis Criteria
const DISEASES_DATABASE = [
    {
        id: 'common-cold',
        name: 'Common Cold',
        category: 'Viral Infection',
        symptoms: ['runny-nose', 'stuffy-nose', 'sneezing', 'sore-throat', 'cough-dry', 'mild-headache', 'fatigue'],
        primarySymptoms: ['runny-nose', 'stuffy-nose', 'sneezing'],
        description: 'A viral infection of the upper respiratory tract, usually harmless and self-limiting.',
        severity: 'mild',
        urgency: 'low',
        commonCauses: ['Rhinovirus', 'Coronavirus (not COVID-19)', 'RSV'],
        riskFactors: ['Close contact with infected persons', 'Weakened immune system', 'Cold weather'],
        complications: ['Sinus infection', 'Ear infection', 'Bronchitis'],
        recommendations: {
            immediate: ['Rest', 'Stay hydrated', 'Use over-the-counter cold medications'],
            medications: ['Decongestants', 'Pain relievers (Acetaminophen, Ibuprofen)', 'Cough suppressants'],
            lifestyle: ['Get plenty of sleep', 'Drink warm fluids', 'Use humidifier', 'Gargle with salt water'],
            prevention: ['Wash hands frequently', 'Avoid close contact with sick people', 'Don\'t touch face']
        },
        whenToSeekHelp: ['Symptoms last more than 10 days', 'High fever (>101.3°F)', 'Severe headache', 'Difficulty breathing'],
        recovery: '7-10 days'
    },
    {
        id: 'influenza',
        name: 'Influenza (Flu)',
        category: 'Viral Infection',
        symptoms: ['fever', 'chills', 'muscle-pain', 'headache', 'fatigue', 'cough-dry', 'sore-throat', 'runny-nose'],
        primarySymptoms: ['fever', 'muscle-pain', 'fatigue', 'cough-dry'],
        description: 'A contagious respiratory illness caused by influenza viruses.',
        severity: 'moderate',
        urgency: 'moderate',
        commonCauses: ['Influenza A virus', 'Influenza B virus'],
        riskFactors: ['Age (<5 or >65)', 'Pregnancy', 'Chronic medical conditions', 'Weakened immune system'],
        complications: ['Pneumonia', 'Bronchitis', 'Sinus infections', 'Ear infections', 'Myocarditis'],
        recommendations: {
            immediate: ['Rest', 'Stay hydrated', 'Antiviral medications (if within 48 hours of symptom onset)'],
            medications: ['Oseltamivir (Tamiflu)', 'Zanamivir (Relenza)', 'Pain relievers', 'Fever reducers'],
            lifestyle: ['Isolate from others', 'Cover coughs and sneezes', 'Get plenty of sleep', 'Drink fluids'],
            prevention: ['Annual flu vaccine', 'Hand hygiene', 'Avoid touching face', 'Clean surfaces']
        },
        whenToSeekHelp: ['Difficulty breathing', 'Chest pain', 'Severe weakness', 'Confusion', 'High fever not improving'],
        recovery: '1-2 weeks'
    },
    {
        id: 'covid-19',
        name: 'COVID-19',
        category: 'Viral Infection',
        symptoms: ['fever', 'cough-dry', 'fatigue', 'loss-taste', 'loss-smell', 'sore-throat', 'headache', 'muscle-pain', 'difficulty-breathing'],
        primarySymptoms: ['fever', 'cough-dry', 'loss-taste', 'loss-smell'],
        description: 'Coronavirus disease caused by SARS-CoV-2 virus.',
        severity: 'moderate-severe',
        urgency: 'high',
        commonCauses: ['SARS-CoV-2 virus'],
        riskFactors: ['Age >65', 'Obesity', 'Diabetes', 'Heart disease', 'Lung disease', 'Weakened immune system'],
        complications: ['Pneumonia', 'ARDS', 'Blood clots', 'Multi-organ failure', 'Long COVID'],
        recommendations: {
            immediate: ['Get tested', 'Isolate immediately', 'Monitor oxygen levels', 'Contact healthcare provider'],
            medications: ['Antiviral medications (Paxlovid)', 'Monoclonal antibodies', 'Fever reducers', 'Pain relievers'],
            lifestyle: ['Complete isolation', 'Monitor symptoms', 'Stay hydrated', 'Rest'],
            prevention: ['Vaccination', 'Masking in crowded areas', 'Social distancing', 'Hand hygiene']
        },
        whenToSeekHelp: ['Difficulty breathing', 'Chest pain/pressure', 'Confusion', 'Blue lips/face', 'Oxygen <94%'],
        recovery: '2-6 weeks (mild cases)'
    },
    {
        id: 'pneumonia',
        name: 'Pneumonia',
        category: 'Respiratory Infection',
        symptoms: ['fever', 'cough-wet', 'shortness-breath', 'chest-pain', 'fatigue', 'sweating', 'chills', 'rapid-heartbeat'],
        primarySymptoms: ['fever', 'cough-wet', 'difficulty-breathing', 'chest-pain'],
        description: 'Infection that inflames air sacs in one or both lungs.',
        severity: 'moderate-severe',
        urgency: 'high',
        commonCauses: ['Streptococcus pneumoniae', 'Haemophilus influenzae', 'Viruses', 'Fungi'],
        riskFactors: ['Age <2 or >65', 'Smoking', 'Weakened immune system', 'Chronic lung disease'],
        complications: ['Respiratory failure', 'Sepsis', 'Lung abscess', 'Pleural effusion'],
        recommendations: {
            immediate: ['Seek medical attention', 'Chest X-ray', 'Blood tests', 'Sputum culture'],
            medications: ['Antibiotics (bacterial)', 'Antivirals (viral)', 'Oxygen therapy', 'Pain relievers'],
            lifestyle: ['Complete rest', 'Stay hydrated', 'Use humidifier', 'Avoid smoking'],
            prevention: ['Pneumococcal vaccine', 'Flu vaccine', 'Hand hygiene', 'No smoking']
        },
        whenToSeekHelp: ['Difficulty breathing', 'High fever', 'Chest pain', 'Confusion', 'Blue lips'],
        recovery: '2-3 weeks with treatment'
    },
    {
        id: 'bronchitis',
        name: 'Acute Bronchitis',
        category: 'Respiratory Infection',
        symptoms: ['cough-wet', 'chest-tightness', 'shortness-breath', 'wheezing', 'fatigue', 'low-fever', 'chills'],
        primarySymptoms: ['cough-wet', 'chest-tightness'],
        description: 'Inflammation of the bronchial tubes carrying air to lungs.',
        severity: 'mild-moderate',
        urgency: 'moderate',
        commonCauses: ['Viruses', 'Bacteria', 'Irritants (smoke, dust)'],
        riskFactors: ['Smoking', 'Weak immune system', 'Exposure to irritants'],
        complications: ['Pneumonia', 'Chronic bronchitis'],
        recommendations: {
            immediate: ['Rest', 'Stay hydrated', 'Use humidifier'],
            medications: ['Cough suppressants', 'Bronchodilators', 'Pain relievers', 'Antibiotics (if bacterial)'],
            lifestyle: ['Avoid smoking', 'Rest', 'Drink warm liquids', 'Use steam inhalation'],
            prevention: ['Avoid smoking', 'Hand hygiene', 'Flu vaccine', 'Avoid irritants']
        },
        whenToSeekHelp: ['Cough lasts >3 weeks', 'Coughing blood', 'High fever', 'Shortness of breath'],
        recovery: '1-3 weeks'
    },
    {
        id: 'asthma',
        name: 'Asthma Attack',
        category: 'Respiratory Disorder',
        symptoms: ['wheezing', 'shortness-breath', 'chest-tightness', 'cough-dry', 'breathing-difficulty'],
        primarySymptoms: ['wheezing', 'shortness-breath', 'chest-tightness'],
        description: 'Airways narrow and swell, producing extra mucus.',
        severity: 'moderate-severe',
        urgency: 'high',
        commonCauses: ['Allergens', 'Cold air', 'Exercise', 'Respiratory infections', 'Stress'],
        riskFactors: ['Family history', 'Allergies', 'Smoking exposure', 'Obesity'],
        complications: ['Status asthmaticus', 'Respiratory failure', 'Pneumonia'],
        recommendations: {
            immediate: ['Use rescue inhaler', 'Sit upright', 'Calm breathing', 'Remove triggers'],
            medications: ['Quick-relief inhalers (Albuterol)', 'Corticosteroids', 'Long-term control medications'],
            lifestyle: ['Avoid triggers', 'Monitor peak flow', 'Have action plan', 'Exercise safely'],
            prevention: ['Identify triggers', 'Take controller medications', 'Get vaccines', 'Manage allergies']
        },
        whenToSeekHelp: ['Severe breathing difficulty', 'Blue lips/nails', 'No improvement with inhaler', 'Can\'t speak'],
        recovery: 'Ongoing management required'
    },
    {
        id: 'gastroenteritis',
        name: 'Gastroenteritis (Stomach Flu)',
        category: 'Digestive Infection',
        symptoms: ['diarrhea', 'nausea', 'vomiting', 'abdominal-pain', 'stomach-cramps', 'fever', 'headache'],
        primarySymptoms: ['diarrhea', 'vomiting', 'abdominal-pain'],
        description: 'Inflammation of the stomach and intestines.',
        severity: 'mild-moderate',
        urgency: 'moderate',
        commonCauses: ['Norovirus', 'Rotavirus', 'Bacteria (E. coli, Salmonella)', 'Parasites'],
        riskFactors: ['Contaminated food/water', 'Close contact with infected persons', 'Poor hygiene'],
        complications: ['Dehydration', 'Electrolyte imbalance', 'Malnutrition'],
        recommendations: {
            immediate: ['Rehydrate with oral rehydration solution', 'Rest', 'Avoid solid foods initially'],
            medications: ['Anti-diarrheal (Loperamide)', 'Anti-nausea', 'Pain relievers', 'Antibiotics (if bacterial)'],
            lifestyle: ['BRAT diet (Bananas, Rice, Applesauce, Toast)', 'Sip clear fluids', 'Rest', 'Avoid dairy'],
            prevention: ['Hand hygiene', 'Food safety', 'Clean water', 'Avoid sick contacts']
        },
        whenToSeekHelp: ['Severe dehydration', 'Blood in stool/vomit', 'High fever', 'Symptoms >3 days'],
        recovery: '1-3 days'
    },
    {
        id: 'food-poisoning',
        name: 'Food Poisoning',
        category: 'Digestive Infection',
        symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal-pain', 'fever', 'chills', 'headache', 'weakness'],
        primarySymptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal-pain'],
        description: 'Illness from eating contaminated food.',
        severity: 'mild-moderate',
        urgency: 'moderate',
        commonCauses: ['Salmonella', 'E. coli', 'Listeria', 'Norovirus', 'Campylobacter'],
        riskFactors: ['Eating raw/undercooked food', 'Poor food handling', 'Contaminated water'],
        complications: ['Severe dehydration', 'Kidney failure', 'Chronic arthritis', 'Brain damage (rare)'],
        recommendations: {
            immediate: ['Stop eating', 'Hydrate', 'Rest', 'Track symptoms'],
            medications: ['Oral rehydration salts', 'Anti-nausea', 'Antibiotics (severe cases)'],
            lifestyle: ['Clear liquids', 'Gradual food reintroduction', 'Rest', 'Avoid dairy/fatty foods'],
            prevention: ['Cook food thoroughly', 'Proper food storage', 'Hand washing', 'Avoid cross-contamination']
        },
        whenToSeekHelp: ['Blood in stool', 'High fever >101.5°F', 'Severe dehydration', 'Neurological symptoms'],
        recovery: '1-7 days'
    },
    {
        id: 'migraine',
        name: 'Migraine',
        category: 'Neurological Disorder',
        symptoms: ['severe-headache', 'nausea', 'vomiting', 'sensitivity-light', 'blurred-vision', 'dizziness'],
        primarySymptoms: ['severe-headache', 'sensitivity-light', 'nausea'],
        description: 'Intense, throbbing headache often on one side.',
        severity: 'moderate-severe',
        urgency: 'moderate',
        commonCauses: ['Genetic factors', 'Hormonal changes', 'Triggers (stress, foods, weather)', 'Sleep changes'],
        riskFactors: ['Family history', 'Female gender', 'Age 20-40', 'Hormonal changes'],
        complications: ['Chronic migraines', 'Medication overuse headache', 'Status migrainosus'],
        recommendations: {
            immediate: ['Rest in dark, quiet room', 'Apply cold compress', 'Take medication early'],
            medications: ['Triptans', 'NSAIDs', 'Anti-nausea drugs', 'Preventive medications'],
            lifestyle: ['Identify triggers', 'Regular sleep', 'Stress management', 'Stay hydrated', 'Regular meals'],
            prevention: ['Avoid triggers', 'Preventive medications', 'Regular exercise', 'Consistent routine']
        },
        whenToSeekHelp: ['Sudden severe headache', 'Headache with fever/stiff neck', 'Neurological symptoms', 'After head injury'],
        recovery: '4-72 hours per episode'
    },
    {
        id: 'diabetes',
        name: 'Diabetes Mellitus',
        category: 'Metabolic Disorder',
        symptoms: ['increased-thirst', 'frequent-urination', 'fatigue', 'blurred-vision', 'weight-loss', 'slow-healing', 'numbness'],
        primarySymptoms: ['increased-thirst', 'frequent-urination', 'fatigue'],
        description: 'Chronic condition affecting blood sugar regulation.',
        severity: 'chronic-serious',
        urgency: 'high',
        commonCauses: ['Type 1: Autoimmune destruction', 'Type 2: Insulin resistance', 'Genetic factors'],
        riskFactors: ['Obesity', 'Family history', 'Age >45', 'Sedentary lifestyle', 'Gestational diabetes history'],
        complications: ['Heart disease', 'Kidney disease', 'Neuropathy', 'Retinopathy', 'Foot problems'],
        recommendations: {
            immediate: ['Check blood glucose', 'See endocrinologist', 'Start monitoring'],
            medications: ['Insulin', 'Metformin', 'Other oral medications', 'GLP-1 agonists'],
            lifestyle: ['Healthy diet', 'Regular exercise', 'Weight management', 'Monitor blood sugar', 'Foot care'],
            prevention: ['Maintain healthy weight', 'Exercise regularly', 'Healthy eating', 'Regular screening']
        },
        whenToSeekHelp: ['Blood sugar >600 mg/dL', 'Confusion', 'Fruity breath', 'Severe weakness', 'Vision changes'],
        recovery: 'Lifelong management'
    },
    {
        id: 'hypertension',
        name: 'Hypertension (High Blood Pressure)',
        category: 'Cardiovascular Disorder',
        symptoms: ['headache', 'shortness-breath', 'nosebleeds', 'chest-pain', 'dizziness', 'blurred-vision'],
        primarySymptoms: ['often-no-symptoms'],
        description: 'Persistently elevated blood pressure (≥130/80 mmHg).',
        severity: 'chronic-serious',
        urgency: 'high',
        commonCauses: ['Genetics', 'Obesity', 'High salt intake', 'Lack of exercise', 'Stress'],
        riskFactors: ['Age', 'Family history', 'Obesity', 'Smoking', 'Excessive alcohol', 'High sodium diet'],
        complications: ['Heart attack', 'Stroke', 'Heart failure', 'Kidney disease', 'Vision loss'],
        recommendations: {
            immediate: ['Check blood pressure regularly', 'See doctor for diagnosis'],
            medications: ['ACE inhibitors', 'ARBs', 'Diuretics', 'Beta-blockers', 'Calcium channel blockers'],
            lifestyle: ['Low sodium diet', 'DASH diet', 'Regular exercise', 'Weight loss', 'Limit alcohol', 'No smoking'],
            prevention: ['Healthy diet', 'Regular exercise', 'Maintain healthy weight', 'Stress management']
        },
        whenToSeekHelp: ['BP >180/120', 'Chest pain', 'Severe headache', 'Vision changes', 'Difficulty breathing'],
        recovery: 'Lifelong management'
    },
    {
        id: 'allergic-reaction',
        name: 'Allergic Reaction',
        category: 'Immune Response',
        symptoms: ['rash', 'itching', 'hives', 'swelling', 'runny-nose', 'sneezing', 'watery-eyes'],
        primarySymptoms: ['rash', 'itching', 'swelling'],
        description: 'Immune system reaction to a foreign substance.',
        severity: 'mild-severe',
        urgency: 'high',
        commonCauses: ['Foods', 'Medications', 'Insect stings', 'Pollen', 'Animal dander', 'Latex'],
        riskFactors: ['Family history', 'Asthma', 'Age (children)', 'Previous allergic reactions'],
        complications: ['Anaphylaxis', 'Asthma complications', 'Chronic sinusitis'],
        recommendations: {
            immediate: ['Remove allergen', 'Antihistamines', 'Monitor for worsening', 'Use EpiPen if severe'],
            medications: ['Antihistamines', 'Corticosteroids', 'Epinephrine (severe)', 'Decongestants'],
            lifestyle: ['Avoid known allergens', 'Carry medication', 'Wear medical ID', 'Educate others'],
            prevention: ['Allergy testing', 'Allergen avoidance', 'Immunotherapy', 'Carry emergency medication']
        },
        whenToSeekHelp: ['Difficulty breathing', 'Swelling of throat/tongue', 'Rapid pulse', 'Dizziness', 'Loss of consciousness'],
        recovery: 'Hours to days'
    },
    {
        id: 'anemia',
        name: 'Anemia (Iron Deficiency)',
        category: 'Blood Disorder',
        symptoms: ['fatigue', 'weakness', 'pale-skin', 'shortness-breath', 'dizziness', 'cold-extremities', 'headache'],
        primarySymptoms: ['fatigue', 'weakness', 'pale-skin'],
        description: 'Lack of healthy red blood cells to carry oxygen.',
        severity: 'mild-moderate',
        urgency: 'moderate',
        commonCauses: ['Iron deficiency', 'Vitamin B12 deficiency', 'Blood loss', 'Chronic diseases'],
        riskFactors: ['Poor diet', 'Menstruation', 'Pregnancy', 'Intestinal disorders', 'Chronic conditions'],
        complications: ['Heart problems', 'Pregnancy complications', 'Growth delays (children)'],
        recommendations: {
            immediate: ['Blood test', 'Identify cause', 'Start supplementation'],
            medications: ['Iron supplements', 'Vitamin B12', 'Folic acid', 'Erythropoietin (severe)'],
            lifestyle: ['Iron-rich foods', 'Vitamin C for absorption', 'Avoid tea/coffee with meals'],
            prevention: ['Balanced diet', 'Iron supplements if needed', 'Treat underlying conditions']
        },
        whenToSeekHelp: ['Severe fatigue', 'Chest pain', 'Rapid heartbeat', 'Fainting', 'Shortness of breath at rest'],
        recovery: '2-3 months with treatment'
    },
    {
        id: 'urinary-tract-infection',
        name: 'Urinary Tract Infection (UTI)',
        category: 'Bacterial Infection',
        symptoms: ['frequent-urination', 'burning-urination', 'cloudy-urine', 'blood-urine', 'pelvic-pain', 'fever', 'back-pain'],
        primarySymptoms: ['frequent-urination', 'burning-urination', 'pelvic-pain'],
        description: 'Infection in any part of the urinary system.',
        severity: 'mild-moderate',
        urgency: 'moderate',
        commonCauses: ['E. coli bacteria', 'Sexual activity', 'Catheter use', 'Urinary obstruction'],
        riskFactors: ['Female anatomy', 'Sexual activity', 'Menopause', 'Urinary catheter', 'Kidney stones'],
        complications: ['Kidney infection', 'Recurrent infections', 'Sepsis', 'Kidney damage'],
        recommendations: {
            immediate: ['Drink plenty of water', 'Urinate frequently', 'See doctor for antibiotics'],
            medications: ['Antibiotics', 'Pain relievers', 'Urinary analgesics (Phenazopyridine)'],
            lifestyle: ['Drink lots of water', 'Urinate after sex', 'Wipe front to back', 'Avoid irritants'],
            prevention: ['Stay hydrated', 'Proper hygiene', 'Urinate after sex', 'Avoid holding urine']
        },
        whenToSeekHelp: ['Blood in urine', 'Fever >101°F', 'Back/side pain', 'Nausea/vomiting', 'No improvement in 2 days'],
        recovery: '3-5 days with antibiotics'
    }
];

// Diagnostic algorithm
function diagnoseDisease(selectedSymptoms, patientInfo) {
    const results = [];
    
    DISEASES_DATABASE.forEach(disease => {
        let matchScore = 0;
        let matchedSymptoms = [];
        let primaryMatches = 0;
        
        // Check for symptom matches
        selectedSymptoms.forEach(symptomId => {
            if (disease.symptoms.includes(symptomId)) {
                matchedSymptoms.push(symptomId);
                matchScore += 1;
                
                // Extra weight for primary symptoms
                if (disease.primarySymptoms.includes(symptomId)) {
                    matchScore += 2;
                    primaryMatches++;
                }
            }
        });
        
        // Calculate confidence percentage
        const totalPossibleScore = disease.symptoms.length + (disease.primarySymptoms.length * 2);
        let confidence = (matchScore / totalPossibleScore) * 100;
        
        // Adjust confidence based on age and other factors
        if (patientInfo.age && disease.riskFactors) {
            const ageFactors = disease.riskFactors.join(' ').toLowerCase();
            if (patientInfo.age < 5 && ageFactors.includes('age <5')) {
                confidence += 5;
            } else if (patientInfo.age > 65 && ageFactors.includes('age >65')) {
                confidence += 5;
            }
        }
        
        // Only include if there's a reasonable match
        if (matchedSymptoms.length >= 2 || primaryMatches >= 1) {
            results.push({
                disease: disease,
                confidence: Math.min(confidence, 95), // Cap at 95%
                matchedSymptoms: matchedSymptoms,
                matchCount: matchedSymptoms.length
            });
        }
    });
    
    // Sort by confidence
    results.sort((a, b) => b.confidence - a.confidence);
    
    return results;
}

// Comprehensive Symptoms Database
const SYMPTOMS_DATABASE = [
    // General Symptoms
    { id: 'fever', name: 'Fever', category: 'general', icon: '🌡️' },
    { id: 'fatigue', name: 'Fatigue / Tiredness', category: 'general', icon: '😴' },
    { id: 'weakness', name: 'Weakness', category: 'general', icon: '💪' },
    { id: 'chills', name: 'Chills', category: 'general', icon: '🥶' },
    { id: 'sweating', name: 'Excessive Sweating', category: 'general', icon: '💦' },
    { id: 'weight-loss', name: 'Unexplained Weight Loss', category: 'general', icon: '⚖️' },
    { id: 'weight-gain', name: 'Weight Gain', category: 'general', icon: '⚖️' },
    { id: 'loss-appetite', name: 'Loss of Appetite', category: 'general', icon: '🍽️' },
    { id: 'dehydration', name: 'Dehydration', category: 'general', icon: '💧' },
    { id: 'swollen-glands', name: 'Swollen Lymph Nodes', category: 'general', icon: '🔴' },

    // Respiratory Symptoms
    { id: 'cough-dry', name: 'Dry Cough', category: 'respiratory', icon: '🤧' },
    { id: 'cough-wet', name: 'Wet Cough (with mucus)', category: 'respiratory', icon: '🤧' },
    { id: 'shortness-breath', name: 'Shortness of Breath', category: 'respiratory', icon: '😮‍💨' },
    { id: 'wheezing', name: 'Wheezing', category: 'respiratory', icon: '🌬️' },
    { id: 'chest-pain', name: 'Chest Pain', category: 'respiratory', icon: '💔' },
    { id: 'sore-throat', name: 'Sore Throat', category: 'respiratory', icon: '🗣️' },
    { id: 'runny-nose', name: 'Runny Nose', category: 'respiratory', icon: '👃' },
    { id: 'stuffy-nose', name: 'Stuffy Nose', category: 'respiratory', icon: '👃' },
    { id: 'sneezing', name: 'Sneezing', category: 'respiratory', icon: '🤧' },
    { id: 'breathing-difficulty', name: 'Difficulty Breathing', category: 'respiratory', icon: '😤' },
    { id: 'coughing-blood', name: 'Coughing up Blood', category: 'respiratory', icon: '🩸' },
    { id: 'chest-tightness', name: 'Chest Tightness', category: 'respiratory', icon: '💥' },

    // Digestive Symptoms
    { id: 'nausea', name: 'Nausea', category: 'digestive', icon: '🤢' },
    { id: 'vomiting', name: 'Vomiting', category: 'digestive', icon: '🤮' },
    { id: 'diarrhea', name: 'Diarrhea', category: 'digestive', icon: '🚽' },
    { id: 'constipation', name: 'Constipation', category: 'digestive', icon: '🚫' },
    { id: 'abdominal-pain', name: 'Abdominal Pain', category: 'digestive', icon: '🔴' },
    { id: 'bloating', name: 'Bloating', category: 'digestive', icon: '🎈' },
    { id: 'heartburn', name: 'Heartburn', category: 'digestive', icon: '🔥' },
    { id: 'indigestion', name: 'Indigestion', category: 'digestive', icon: '🍽️' },
    { id: 'blood-stool', name: 'Blood in Stool', category: 'digestive', icon: '🩸' },
    { id: 'dark-stool', name: 'Dark/Black Stool', category: 'digestive', icon: '⚫' },
    { id: 'stomach-cramps', name: 'Stomach Cramps', category: 'digestive', icon: '💢' },
    { id: 'loss-taste', name: 'Loss of Taste', category: 'digestive', icon: '👅' },

    // Neurological Symptoms
    { id: 'headache', name: 'Headache', category: 'neurological', icon: '🤕' },
    { id: 'migraine', name: 'Migraine', category: 'neurological', icon: '⚡' },
    { id: 'dizziness', name: 'Dizziness', category: 'neurological', icon: '😵' },
    { id: 'vertigo', name: 'Vertigo', category: 'neurological', icon: '🌀' },
    { id: 'confusion', name: 'Confusion', category: 'neurological', icon: '❓' },
    { id: 'memory-loss', name: 'Memory Loss', category: 'neurological', icon: '🧠' },
    { id: 'seizures', name: 'Seizures', category: 'neurological', icon: '⚡' },
    { id: 'numbness', name: 'Numbness/Tingling', category: 'neurological', icon: '🔌' },
    { id: 'tremors', name: 'Tremors', category: 'neurological', icon: '🤝' },
    { id: 'blurred-vision', name: 'Blurred Vision', category: 'neurological', icon: '👁️' },
    { id: 'sensitivity-light', name: 'Sensitivity to Light', category: 'neurological', icon: '💡' },
    { id: 'loss-consciousness', name: 'Loss of Consciousness', category: 'neurological', icon: '😵' },
    { id: 'difficulty-speaking', name: 'Difficulty Speaking', category: 'neurological', icon: '🗣️' },
    { id: 'loss-smell', name: 'Loss of Smell', category: 'neurological', icon: '👃' },

    // Skin Symptoms
    { id: 'rash', name: 'Rash', category: 'skin', icon: '🔴' },
    { id: 'itching', name: 'Itching', category: 'skin', icon: '✋' },
    { id: 'hives', name: 'Hives', category: 'skin', icon: '🔴' },
    { id: 'redness', name: 'Skin Redness', category: 'skin', icon: '🔴' },
    { id: 'swelling', name: 'Swelling', category: 'skin', icon: '🎈' },
    { id: 'bruising', name: 'Easy Bruising', category: 'skin', icon: '🟣' },
    { id: 'pale-skin', name: 'Pale Skin', category: 'skin', icon: '👻' },
    { id: 'yellow-skin', name: 'Yellow Skin (Jaundice)', category: 'skin', icon: '🟡' },
    { id: 'dry-skin', name: 'Dry Skin', category: 'skin', icon: '🏜️' },
    { id: 'skin-lesions', name: 'Skin Lesions', category: 'skin', icon: '🔴' },
    { id: 'skin-ulcers', name: 'Skin Ulcers', category: 'skin', icon: '🕳️' },

    // Cardiovascular Symptoms
    { id: 'palpitations', name: 'Heart Palpitations', category: 'cardiovascular', icon: '❤️' },
    { id: 'rapid-heartbeat', name: 'Rapid Heartbeat', category: 'cardiovascular', icon: '💗' },
    { id: 'irregular-heartbeat', name: 'Irregular Heartbeat', category: 'cardiovascular', icon: '💓' },
    { id: 'chest-pressure', name: 'Chest Pressure', category: 'cardiovascular', icon: '💥' },
    { id: 'leg-swelling', name: 'Leg Swelling', category: 'cardiovascular', icon: '🦵' },
    { id: 'fainting', name: 'Fainting', category: 'cardiovascular', icon: '😵' },
    { id: 'cold-extremities', name: 'Cold Hands/Feet', category: 'cardiovascular', icon: '🥶' },

    // Musculoskeletal Symptoms
    { id: 'joint-pain', name: 'Joint Pain', category: 'musculoskeletal', icon: '🦴' },
    { id: 'muscle-pain', name: 'Muscle Pain', category: 'musculoskeletal', icon: '💪' },
    { id: 'back-pain', name: 'Back Pain', category: 'musculoskeletal', icon: '🔙' },
    { id: 'stiffness', name: 'Stiffness', category: 'musculoskeletal', icon: '🔒' },
    { id: 'joint-swelling', name: 'Joint Swelling', category: 'musculoskeletal', icon: '🎈' },
    { id: 'muscle-weakness', name: 'Muscle Weakness', category: 'musculoskeletal', icon: '💪' },
    { id: 'difficulty-walking', name: 'Difficulty Walking', category: 'musculoskeletal', icon: '🚶' },
    { id: 'neck-pain', name: 'Neck Pain', category: 'musculoskeletal', icon: '🦒' },
    { id: 'muscle-cramps', name: 'Muscle Cramps', category: 'musculoskeletal', icon: '💢' }
];

// Function to get symptoms by category
function getSymptomsByCategory(category) {
    if (category === 'all') {
        return SYMPTOMS_DATABASE;
    }
    return SYMPTOMS_DATABASE.filter(symptom => symptom.category === category);
}

// Function to search symptoms
function searchSymptoms(query) {
    const lowerQuery = query.toLowerCase();
    return SYMPTOMS_DATABASE.filter(symptom => 
        symptom.name.toLowerCase().includes(lowerQuery)
    );
}

// Function to get symptom by ID
function getSymptomById(id) {
    return SYMPTOMS_DATABASE.find(symptom => symptom.id === id);
}

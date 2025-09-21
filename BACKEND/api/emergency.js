const express = require('express');
const router = express.Router();
// --- NEW: Import sample data and notification service ---
const { doctors, rooms } = require('../data/sampleData');
const notificationService = require('../services/notificationService');

router.post('/', (req, res) => {
    const { emergencyType, location } = req.body;

    if (!emergencyType || !location) {
        return res.status(400).json({ message: 'Missing emergency type or location data.' });
    }

    console.log('--- NEW EMERGENCY REQUEST ---');
    console.log(`Time: ${new Date("2025-09-17T18:42:22").toLocaleString()}`); // Using fixed time for consistency
    console.log(`Type: ${emergencyType}`);
    console.log(`Location: Lat ${location.lat}, Lng ${location.lng}`);



    // 1. Find Nearest Ambulance
    const nearestAmbulance = findNearestAmbulance(location);
    console.log(`[Dispatch] Found nearest ambulance: ${nearestAmbulance.id} (${nearestAmbulance.eta} mins)`);

    // 2. Identify Required Specialists
    const requiredSpecialty = getRequiredSpecialty(emergencyType);
    console.log(`[Analysis] Required specialty: ${requiredSpecialty}`);

    // 3. Allot an available doctor and room
    const allottedDoctor = doctors.find(doc => doc.specialty === requiredSpecialty && doc.isAvailable);
    const allottedRoom = rooms.find(room => room.type === 'Trauma' && !room.isOccupied);

    if (!allottedDoctor) {
        console.error(`[Allocation Error] No available doctor found for specialty: ${requiredSpecialty}`);
        return res.status(500).json({ message: 'Failed to allocate a specialist.' });
    }
    if (!allottedRoom) {
        console.error(`[Allocation Error] No available trauma room found.`);
        return res.status(500).json({ message: 'Failed to allocate a room.' });
    }

    console.log(`[Allocation] Allotted Doctor: Dr. ${allottedDoctor.name} (ID: ${allottedDoctor.id})`);
    console.log(`[Allocation] Allotted Room: ${allottedRoom.roomId}`);

    // 4. Send Notification to the Allotted Doctor
    const patientInfo = { emergencyType, allottedRoom };
    notificationService.sendSmsAlert(allottedDoctor, patientInfo);

    console.log('--- RESPONSE DISPATCHED ---');

    res.status(200).json({ message: 'Emergency signal received. Response team activated.' });
});


// --- HELPER FUNCTIONS  ---

function findNearestAmbulance(userLocation) {
    return { id: 'AMB_207', eta: 8 };
}

function getRequiredSpecialty(emergencyType) {
    const specialtyMap = {
        'cardiac_arrest': 'Cardiologist',
        'severe_trauma': 'Trauma Surgeon',
        'breathing_difficulty': 'Pulmonologist',
        'stroke': 'Neurologist',
        'severe_burn': 'Dermatologist',
        'unconscious': 'Neurologist'
    };
    return specialtyMap[emergencyType] || 'Emergency Physician';
}

module.exports = router;
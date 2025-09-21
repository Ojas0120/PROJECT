// This service simulates sending notifications.

const sendSmsAlert = (doctor, patientInfo) => {

    const message = `
    -------------------------------------------
    *** EMERGENCY ALERT ***
    To: Dr. ${doctor.name} (${doctor.specialty})
    Emergency Type: ${patientInfo.emergencyType}
    Action: Please report to Room ${patientInfo.allottedRoom.roomId} immediately.
    Patient ETA: 8 minutes.
    -------------------------------------------
    `;


    console.log(`[Notification Service] Sending SMS to Dr. ${doctor.name}...`);
    console.log(message);

    return true;
};

module.exports = { sendSmsAlert };
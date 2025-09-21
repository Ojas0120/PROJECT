// This file contains sample data to simulate a hospital's resources.

const doctors = [
    { id: 'doc_01', name: 'Arjun Sharma', specialty: 'Cardiologist', isAvailable: true },
    { id: 'doc_02', name: 'Priya Singh', specialty: 'Cardiologist', isAvailable: false },
    { id: 'doc_03', name: 'Vikram Rao', specialty: 'Trauma Surgeon', isAvailable: true },
    { id: 'doc_04', name: 'Sunita Reddy', specialty: 'Neurologist', isAvailable: true },
    { id: 'doc_05', name: 'Anil Kumar', specialty: 'Trauma Surgeon', isAvailable: true },
];

const rooms = [
    { roomId: '10010', type: 'Trauma', isOccupied: false },
    { roomId: '10011', type: 'Trauma', isOccupied: true },
    { roomId: '10012', type: 'ICU', isOccupied: false },
    { roomId: '10013', type: 'ICU', isOccupied: false },
];

module.exports = { doctors, rooms };
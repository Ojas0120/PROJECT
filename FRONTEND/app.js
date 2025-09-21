document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.getElementById('help-button');
  const emergencyTypeSelect = document.getElementById('emergency-type');
  const statusPanel = document.getElementById('status-panel');
  const statusUpdates = document.getElementById('status-updates');

  helpButton.addEventListener('click', () => {
    helpButton.disabled = true;
    helpButton.querySelector('.front').innerText = 'PROCESSING...';

    statusPanel.classList.remove('hidden');
    addStatusUpdate('✅ Request initiated. Getting your location...');

    if (!navigator.geolocation) {
      addStatusUpdate('❌ Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error);
  });

  function success(position) {
    const { latitude, longitude } = position.coords;
    const emergencyType = emergencyTypeSelect.value;

    addStatusUpdate(`📍 Location confirmed: (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);

    sendEmergencyRequest({
      emergencyType,
      location: { lat: latitude, lng: longitude }
    });
  }

  function error() {
    addStatusUpdate('❌ Unable to retrieve your location. Please enable location services.');
  }

  async function sendEmergencyRequest(data) {
    addStatusUpdate('📡 Transmitting details to response center...');
    try {

      const response = await fetch('http://localhost:3000/api/emergency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result = await response.json();

      addStatusUpdate(`✔️ ${result.message}`);
      setTimeout(() => addStatusUpdate('🚑 Closest ambulance dispatched. ETA: 8 minutes.'), 1000);
      setTimeout(() => addStatusUpdate('👨‍⚕️ Specialist doctors at SRM Hospital, Kattankulathur notified.'), 2000);
      setTimeout(() => addStatusUpdate('💊 Medical supplies are being prepared.'), 3000);

    } catch (err) {
      console.error('Error:', err);
      addStatusUpdate('❌ Failed to connect to the emergency server.');
    }
  }

  let delay = 0;
  function addStatusUpdate(message) {
    const li = document.createElement('li');
    li.textContent = message;
    li.style.animationDelay = `${delay}s`;
    statusUpdates.appendChild(li);
    delay += 0.2;
  }
});

// src/components/GPSTracker.js
const GPSTracker = ({ vehicle, settings }) => {
  const [trackingActive, setTrackingActive] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  const handleStartTracking = async () => {
    const granted = await gpsService.requestPermission();
    if (granted) {
      setPermissionGranted(true);
      gpsService.startTracking(vehicle.veicolo_id, settings.update_interval);
      setTrackingActive(true);
    }
  };
};

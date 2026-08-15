export const mockUser = {
  id: 'usr_1',
  fullName: 'Geethika Parvatham',
  email: 'geethika@example.com',
  mobile: '+91 98765 43210',
  city: 'Hyderabad',
  language: 'English',
  avatar: 'https://i.pravatar.cc/150?img=47',
};

export const mockEmergencyContacts = [
  { id: 'ec_1', name: 'Mother', relation: 'Family', phone: '+91 91234 56789', isPrimary: true },
  { id: 'ec_2', name: 'Ravi (Brother)', relation: 'Family', phone: '+91 99887 76655', isPrimary: false },
];

export const mockAlerts = [
  {
    id: 'alt_1',
    type: 'Traffic',
    title: 'Heavy Traffic Ahead',
    location: 'Outer Ring Road (ORR)',
    time: '10 mins ago',
    severity: 'Medium',
    description: 'Slow moving traffic reported due to a broken down vehicle.',
    action: 'Consider alternate route via Service Road.'
  },
  {
    id: 'alt_2',
    type: 'Accident',
    title: 'Road Accident',
    location: 'Banjara Hills, Road No. 12',
    time: '25 mins ago',
    severity: 'High',
    description: 'Accident reported. Emergency services are on the scene.',
    action: 'Avoid the area. Severe delays expected.'
  },
  {
    id: 'alt_3',
    type: 'Weather',
    title: 'Heavy Rain Warning',
    location: 'Hyderabad City',
    time: '1 hr ago',
    severity: 'Medium',
    description: 'Sudden downpour reducing visibility on highways.',
    action: 'Drive slowly and keep headlights on.'
  }
];

export const mockNearbyHelp = [
  { id: 'h_1', name: 'Apollo Hospital', category: 'Hospitals', distance: '1.2 km', address: 'Jubilee Hills, Hyderabad', contact: '1066' },
  { id: 'h_2', name: 'Panjagutta Police Station', category: 'Police Stations', distance: '2.5 km', address: 'Panjagutta, Hyderabad', contact: '100' },
  { id: 'h_3', name: 'HP Petrol Pump', category: 'Petrol Pumps', distance: '0.8 km', address: 'Banjara Hills, Hyderabad', contact: 'N/A' },
];

export const mockJourneyHistory = [
  { id: 'j_old_1', date: '12 Aug 2026', from: 'Hyderabad', to: 'Warangal', duration: '2h 15m', distance: '148 km', status: 'Completed', safety: 'Safe' },
  { id: 'j_old_2', date: '10 Aug 2026', from: 'Office (Madhapur)', to: 'Home', duration: '45m', distance: '15 km', status: 'Completed', safety: 'Safe' },
  { id: 'j_old_3', date: '05 Aug 2026', from: 'Hyderabad', to: 'Vijayawada', duration: '4h 30m', distance: '275 km', status: 'Completed', safety: 'Alert Issued' },
];

// Admin mock data
export const adminStats = {
  activeUsers: 1245,
  activeJourneys: 342,
  emergencyAlerts: 5,
  resolvedIncidents: 89,
  activeSOS: 2
};

export const adminLiveJourneys = [
  { id: 'lj_1', user: 'Amit Kumar', vehicle: 'Car (TS 09 AB 1234)', location: 'NH 44, near Shamshabad', destination: 'Kurnool', eta: '2h 10m', status: 'In Progress', safety: 'Safe' },
  { id: 'lj_2', user: 'Priya Reddy', vehicle: 'Bike', location: 'Gachibowli', destination: 'Kukatpally', eta: '35m', status: 'In Progress', safety: 'Safe' },
  { id: 'lj_3', user: 'Suresh V', vehicle: 'Bus', location: 'Vijayawada Highway', destination: 'Suryapet', eta: '1h 50m', status: 'Delayed', safety: 'Medium Risk' },
];

export const adminEmergencies = [
  { id: 'em_1', user: 'Rahul D', location: 'ORR Exit 4', time: '14:20', severity: 'Critical', status: 'Active', action: 'Contacting Police' },
  { id: 'em_2', user: 'Neha S', location: 'Kukatpally Y Junction', time: '14:55', severity: 'High', status: 'Active', action: 'Ambulance Dispatched' },
];

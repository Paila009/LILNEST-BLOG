import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const EmergencyContactCard = ({ type, name, phone, onEdit, onCall }) => {
  const icons = {
    hospital: 'Building2',
    doctor: 'Stethoscope',
    partner: 'Heart',
    family: 'Users',
    emergency: 'PhoneCall'
  };
  
  const colors = {
    hospital: 'from-red-500 to-rose-500',
    doctor: 'from-blue-500 to-cyan-500',
    partner: 'from-pink-500 to-rose-500',
    family: 'from-purple-500 to-indigo-500',
    emergency: 'from-orange-500 to-red-500'
  };
  
  return (
    <div className="group bg-card hover:bg-card/80 rounded-2xl p-5 border border-border hover:border-primary/30 shadow-soft hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[type]} flex items-center justify-center text-white shadow-lg`}>
          <Icon name={icons[type]} className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{type}</div>
          <h3 className="font-semibold text-foreground truncate">{name || 'Not Set'}</h3>
          <p className="text-sm text-muted-foreground">{phone || 'Add contact'}</p>
        </div>
        <div className="flex gap-2">
          {phone ? (
            <button
              onClick={onCall}
              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Icon name="Phone" className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="p-3 bg-primary hover:bg-primary/80 text-primary-foreground rounded-xl transition-all duration-300"
            >
              <Icon name="Plus" className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const RedFlagCard = ({ icon, title, description, severity }) => {
  const colors = {
    critical: 'from-red-500 to-rose-500',
    high: 'from-orange-500 to-red-500',
    moderate: 'from-yellow-500 to-orange-500'
  };
  
  return (
    <div className="flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border/50">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[severity]} flex items-center justify-center text-white flex-shrink-0`}>
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const Emergency = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState({
    hospital: { name: '', phone: '' },
    doctor: { name: '', phone: '' },
    partner: { name: '', phone: '' },
    family: { name: '', phone: '' }
  });
  
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [location, setLocation] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [showSOSModal, setShowSOSModal] = useState(false);

  useEffect(() => {
    // Load saved contacts from localStorage
    const saved = localStorage.getItem('emergencyContacts');
    if (saved) {
      setContacts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Location error:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    let interval;
    if (sosActive && sosCountdown > 0) {
      interval = setInterval(() => {
        setSosCountdown(prev => {
          if (prev <= 1) {
            triggerSOS();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sosActive, sosCountdown]);

  const saveContact = (type, name, phone) => {
    const updated = {
      ...contacts,
      [type]: { name, phone }
    };
    setContacts(updated);
    localStorage.setItem('emergencyContacts', JSON.stringify(updated));
    setEditingContact(null);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const triggerSOS = () => {
    setSosActive(false);
    setShowSOSModal(true);
    
    // Build SOS message
    const locationText = location 
      ? `My location: https://www.google.com/maps?q=${location.lat},${location.lng}`
      : 'Location unavailable';
    
    const message = `🚨 EMERGENCY SOS from NeuroSync 🚨\n\nI need immediate help!\n\n${locationText}\n\nPlease contact me or come to my location immediately.`;
    
    // Send SMS to all contacts with phone numbers
    Object.values(contacts).forEach(contact => {
      if (contact.phone) {
        // Note: SMS sending will open default messaging app
        window.location.href = `sms:${contact.phone}?body=${encodeURIComponent(message)}`;
      }
    });
    
    // Call emergency number
    setTimeout(() => {
      if (contacts.hospital.phone) {
        window.location.href = `tel:${contacts.hospital.phone}`;
      }
    }, 2000);
  };

  const activateSOS = () => {
    setSosActive(true);
    setSosCountdown(5);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setSosCountdown(5);
  };

  const shareLocation = () => {
    if (location) {
      const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else {
      alert('Location not available. Please enable location services.');
    }
  };

  const redFlags = [
    {
      icon: 'Droplets',
      title: 'Severe Bleeding or Fluid Leakage',
      description: 'Heavy vaginal bleeding or sudden fluid leakage (possible water breaking)',
      severity: 'critical'
    },
    {
      icon: 'Heart',
      title: 'Decreased Baby Movements',
      description: 'Noticeable reduction in fetal movement or no movement for several hours',
      severity: 'critical'
    },
    {
      icon: 'AlertTriangle',
      title: 'Severe Headache & Vision Problems',
      description: 'Persistent severe headache with blurred vision or seeing spots',
      severity: 'critical'
    },
    {
      icon: 'Activity',
      title: 'Severe Abdominal Pain',
      description: 'Sharp, persistent pain in abdomen or cramping that won\'t stop',
      severity: 'high'
    },
    {
      icon: 'Wind',
      title: 'Difficulty Breathing',
      description: 'Shortness of breath, chest pain, or rapid heartbeat',
      severity: 'high'
    },
    {
      icon: 'Thermometer',
      title: 'High Fever',
      description: 'Temperature above 101°F (38.3°C) with chills or flu-like symptoms',
      severity: 'high'
    },
    {
      icon: 'TrendingDown',
      title: 'Severe Vomiting',
      description: 'Persistent vomiting preventing food/liquid intake for 24+ hours',
      severity: 'moderate'
    },
    {
      icon: 'Zap',
      title: 'Contractions Before 37 Weeks',
      description: 'Regular contractions (4+ per hour) before full term',
      severity: 'high'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/50 via-background to-rose-50/50">
      <Header />
      
      <main className="pt-20 pb-10 px-4 max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 text-sm font-medium mb-4">
            <Icon name="AlertCircle" className="w-4 h-4" />
            Emergency Support Available 24/7
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Emergency & SOS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick access to emergency contacts and instant SOS alert system for your safety
          </p>
        </div>

        {/* SOS Button Section */}
        <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 rounded-3xl p-8 border-2 border-red-500/20 shadow-xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-600 text-sm font-semibold">
              <Icon name="AlertTriangle" className="w-4 h-4" />
              Emergency SOS System
            </div>
            
            <div className="relative">
              <button
                onClick={activateSOS}
                onMouseDown={() => !sosActive && activateSOS()}
                className={`relative w-32 h-32 mx-auto rounded-full shadow-2xl transition-all duration-300 ${
                  sosActive 
                    ? 'bg-gradient-to-br from-red-600 to-rose-600 scale-110 animate-pulse' 
                    : 'bg-gradient-to-br from-red-500 to-rose-500 hover:scale-105'
                } text-white font-bold text-xl`}
              >
                {sosActive ? (
                  <div className="flex flex-col items-center justify-center">
                    <Icon name="AlertCircle" className="w-12 h-12 mb-2 animate-bounce" />
                    <span className="text-3xl font-bold">{sosCountdown}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Icon name="PhoneCall" className="w-12 h-12 mb-2" />
                    <span>SOS</span>
                  </div>
                )}
              </button>
              
              {sosActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-4 border-red-500 animate-ping"></div>
                </div>
              )}
            </div>
            
            {sosActive ? (
              <div className="space-y-3">
                <p className="text-foreground font-semibold">
                  Sending emergency alert in {sosCountdown} seconds...
                </p>
                <Button variant="outline" onClick={cancelSOS} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                  Cancel SOS
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground font-semibold">
                  Press and hold for 3 seconds to activate emergency SOS
                </p>
                <p className="text-sm text-muted-foreground">
                  Will send your location and alerts to all emergency contacts
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Emergency Contacts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(contacts).map(([type, contact]) => (
                  <EmergencyContactCard
                    key={type}
                    type={type}
                    name={contact.name}
                    phone={contact.phone}
                    onEdit={() => setEditingContact(type)}
                    onCall={() => handleCall(contact.phone)}
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <h3 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleCall('911')}
                >
                  <Icon name="PhoneCall" className="w-5 h-5 mr-3 text-red-500" />
                  <div className="text-left">
                    <div className="font-semibold">Call Emergency (911)</div>
                    <div className="text-xs text-muted-foreground">Immediate assistance</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={shareLocation}
                >
                  <Icon name="MapPin" className="w-5 h-5 mr-3 text-blue-500" />
                  <div className="text-left">
                    <div className="font-semibold">Share Location</div>
                    <div className="text-xs text-muted-foreground">Send to contacts</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => window.location.href = `sms:?&body=I need help! Please contact me.`}
                >
                  <Icon name="MessageSquare" className="w-5 h-5 mr-3 text-green-500" />
                  <div className="text-left">
                    <div className="font-semibold">Send SMS</div>
                    <div className="text-xs text-muted-foreground">Quick message</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => navigate('/marketplace')}
                >
                  <Icon name="Users" className="w-5 h-5 mr-3 text-purple-500" />
                  <div className="text-left">
                    <div className="font-semibold">Find Care Provider</div>
                    <div className="text-xs text-muted-foreground">Browse marketplace</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Location Status */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="MapPin" className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Location Status</h3>
              </div>
              {location ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Location Enabled</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                  </p>
                  <Button size="sm" variant="outline" onClick={shareLocation} className="w-full">
                    View on Map
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-warning">
                    <Icon name="AlertCircle" className="w-4 h-4" />
                    <span>Location Unavailable</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Please enable location services for better emergency response
                  </p>
                </div>
              )}
            </div>

            {/* Emergency Numbers */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Phone" className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Important Numbers</h3>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => handleCall('911')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div>
                    <div className="font-medium">Emergency</div>
                    <div className="text-sm text-muted-foreground">911</div>
                  </div>
                  <Icon name="Phone" className="w-4 h-4 text-red-500" />
                </button>
                <button 
                  onClick={() => handleCall('1-800-273-8255')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div>
                    <div className="font-medium">Crisis Hotline</div>
                    <div className="text-sm text-muted-foreground">1-800-273-8255</div>
                  </div>
                  <Icon name="Phone" className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Pregnancy Red Flags */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
          <div className="flex items-center gap-3 mb-6">
            <Icon name="AlertTriangle" className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-semibold text-foreground">Pregnancy Warning Signs</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Call your doctor or go to the emergency room immediately if you experience any of these symptoms:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redFlags.map((flag, index) => (
              <RedFlagCard key={index} {...flag} />
            ))}
          </div>
        </div>
      </main>

      {/* Contact Edit Modal */}
      {editingContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-md w-full p-6 border border-border shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold capitalize">Add {editingContact} Contact</h2>
              <button 
                onClick={() => setEditingContact(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              saveContact(editingContact, formData.get('name'), formData.get('phone'));
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={contacts[editingContact]?.name}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder={`Enter ${editingContact} name`}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  defaultValue={contacts[editingContact]?.phone}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setEditingContact(null)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Contact
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOS Success Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-md w-full p-6 border border-border shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle2" className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">SOS Alert Sent!</h2>
            <p className="text-muted-foreground mb-6">
              Emergency notifications have been sent to all your contacts with your location.
            </p>
            <Button onClick={() => setShowSOSModal(false)} className="w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;

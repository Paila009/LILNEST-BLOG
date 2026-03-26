import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Review Card Component
const ReviewCard = ({ review }) => (
  <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all">
    <div className="flex items-start gap-4 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon name="User" className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-bold text-foreground">{review.name}</h4>
          {review.verified && (
            <div className="flex items-center gap-1 text-green-600 text-xs">
              <Icon name="CheckCircle2" className="w-3 h-3" />
              <span>Verified</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Icon 
                key={i} 
                name="Star" 
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{review.date}</span>
        </div>
      </div>
    </div>
    <p className="text-foreground leading-relaxed mb-3">{review.comment}</p>
    <div className="flex flex-wrap gap-2">
      {review.tags.map((tag, i) => (
        <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// Booking Modal Component
const BookingModal = ({ isOpen, onClose, provider }) => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    sessionType: 'virtual',
    notes: '',
    paymentMethod: 'card'
  });

  if (!isOpen) return null;

  const sessionTypes = [
    { id: 'virtual', label: 'Virtual Consultation', icon: 'Video', price: '₹1,500', duration: '45 min' },
    { id: 'home', label: 'Home Visit', icon: 'Home', price: '₹2,500', duration: '60 min' },
    { id: 'clinic', label: 'Clinic Visit', icon: 'Building', price: '₹2,000', duration: '45 min' }
  ];

  const timeSlots = ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

  const handleConfirmBooking = () => {
    // In production, save to Firebase and send confirmation
    alert('Booking confirmed! Check your email for details.');
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-primary to-purple-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Book Consultation</h2>
              <p className="text-white/80">with {provider.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <Icon name="X" className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex gap-2 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`flex-1 h-2 rounded-full transition-all ${
                  i <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Choose Session Type</h3>
                <div className="grid gap-4">
                  {sessionTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setBookingData({ ...bookingData, sessionType: type.id })}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        bookingData.sessionType === type.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          bookingData.sessionType === type.id ? 'bg-primary text-white' : 'bg-muted'
                        }`}>
                          <Icon name={type.icon} className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground">{type.label}</h4>
                          <p className="text-sm text-muted-foreground">{type.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{type.price}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={() => setStep(2)} className="w-full" size="lg">
                Continue
                <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Select Date & Time</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Choose Date</label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-card border-2 border-border focus:border-primary rounded-xl outline-none"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Available Time Slots</label>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setBookingData({ ...bookingData, time })}
                          className={`p-3 rounded-xl border-2 font-semibold transition-all ${
                            bookingData.time === time
                              ? 'border-primary bg-primary text-white'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  <Icon name="ArrowLeft" className="w-5 h-5 mr-2" />
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1" disabled={!bookingData.date || !bookingData.time}>
                  Continue
                  <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Additional Information</h3>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Share any specific concerns or questions you'd like to discuss..."
                  className="w-full h-32 px-4 py-3 bg-card border-2 border-border focus:border-primary rounded-xl outline-none resize-none"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  <Icon name="ArrowLeft" className="w-5 h-5 mr-2" />
                  Back
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  Continue to Payment
                  <Icon name="ArrowRight" className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">Confirm & Pay</h3>
                
                {/* Booking Summary */}
                <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl p-6 mb-6 border border-primary/20">
                  <h4 className="font-bold text-foreground mb-4">Booking Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Provider</span>
                      <span className="font-semibold">{provider.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Session Type</span>
                      <span className="font-semibold capitalize">{bookingData.sessionType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="font-semibold">{bookingData.date} at {bookingData.time}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {sessionTypes.find(t => t.id === bookingData.sessionType)?.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-foreground">Payment Method</label>
                  {['card', 'upi', 'wallet'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setBookingData({ ...bookingData, paymentMethod: method })}
                      className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                        bookingData.paymentMethod === method
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Icon name="CreditCard" className="w-6 h-6" />
                      <span className="font-semibold capitalize">{method === 'upi' ? 'UPI' : method}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                  <Icon name="ArrowLeft" className="w-5 h-5 mr-2" />
                  Back
                </Button>
                <Button onClick={handleConfirmBooking} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                  <Icon name="CheckCircle2" className="w-5 h-5 mr-2" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const ServiceProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  // Mock provider data - In production, fetch from Firebase using id
  const provider = useMemo(() => ({
    id: id,
    name: 'Dr. Aishwarya Menon',
    category: 'Lactation Consultant',
    title: 'IBCLC Certified Lactation Consultant',
    rating: 4.9,
    reviews: 234,
    experience: 12,
    verified: true,
    online: true,
    featured: true,
    languages: ['English', 'Hindi', 'Malayalam'],
    location: 'Mumbai, Maharashtra',
    distance: '1.6 km',
    responseTime: '~2h',
    about: 'Experienced IBCLC certified lactation consultant with over 12 years of helping mothers establish successful breastfeeding. Specializing in early breastfeeding challenges, tongue-tie assessment, and returning to work strategies.',
    expertise: [
      'Latching difficulties',
      'Low milk supply',
      'Tongue-tie assessment',
      'Pumping strategies',
      'Returning to work',
      'Weaning support'
    ],
    certifications: [
      'IBCLC (International Board Certified Lactation Consultant)',
      'Certified Breastfeeding Counselor',
      'Pediatric First Aid & CPR',
      'Child Development Specialist'
    ],
    services: [
      { name: 'Initial Consultation', duration: '60 min', price: '₹2,500', type: 'Virtual/Home' },
      { name: 'Follow-up Session', duration: '30 min', price: '₹1,500', type: 'Virtual/Home' },
      { name: 'Emergency Support', duration: '45 min', price: '₹3,000', type: '24/7 Available' }
    ],
    availability: {
      monday: ['09:00 AM - 12:00 PM', '02:00 PM - 06:00 PM'],
      tuesday: ['09:00 AM - 12:00 PM', '02:00 PM - 06:00 PM'],
      wednesday: ['09:00 AM - 12:00 PM'],
      thursday: ['09:00 AM - 12:00 PM', '02:00 PM - 06:00 PM'],
      friday: ['09:00 AM - 12:00 PM', '02:00 PM - 06:00 PM'],
      saturday: ['10:00 AM - 02:00 PM'],
      sunday: ['Closed']
    }
  }), [id]);

  const reviews = useMemo(() => [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      comment: 'Dr. Aishwarya was a lifesaver! My baby had latching issues and she helped us resolve them in just one session. Very patient and knowledgeable.',
      tags: ['Professional', 'Patient', 'Helpful']
    },
    {
      id: 2,
      name: 'Ananya Reddy',
      rating: 5,
      date: '1 month ago',
      verified: true,
      comment: 'Excellent support during my breastfeeding journey. She provided practical solutions and was always available for questions. Highly recommend!',
      tags: ['Responsive', 'Expert', 'Supportive']
    },
    {
      id: 3,
      name: 'Neha Patel',
      rating: 4,
      date: '2 months ago',
      verified: true,
      comment: 'Very helpful and understanding. Gave me confidence to continue breastfeeding when I was about to give up.',
      tags: ['Encouraging', 'Knowledgeable']
    }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="pt-20 pb-10">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <Button variant="outline" onClick={() => navigate('/marketplace')}>
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Provider Header Card */}
              <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                      <div className="w-[95%] h-[95%] bg-card rounded-xl flex items-center justify-center">
                        <Icon name="User" className="w-16 h-16 text-primary" />
                      </div>
                    </div>
                    {provider.online && (
                      <div className="absolute -bottom-2 -right-2 flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Online
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h1 className="text-3xl font-bold text-foreground">{provider.name}</h1>
                          {provider.verified && (
                            <div className="bg-green-500 rounded-full p-1">
                              <Icon name="CheckCircle2" className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-lg text-muted-foreground font-medium">{provider.title}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-xl">
                        <Icon name="Star" className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-yellow-600">{provider.rating}</span>
                        <span className="text-sm text-muted-foreground">({provider.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
                        <Icon name="Briefcase" className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-foreground">{provider.experience} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl">
                        <Icon name="Clock" className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-foreground">Responds in {provider.responseTime}</span>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" className="w-4 h-4" />
                        <span>{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Languages" className="w-4 h-4" />
                        <span>{provider.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="flex border-b border-border">
                  {[
                    { id: 'about', label: 'About', icon: 'User' },
                    { id: 'services', label: 'Services & Pricing', icon: 'DollarSign' },
                    { id: 'reviews', label: 'Reviews', icon: 'Star' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'about' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">About</h3>
                        <p className="text-foreground leading-relaxed">{provider.about}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Areas of Expertise</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {provider.expertise.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 p-3 bg-primary/10 rounded-xl">
                              <Icon name="CheckCircle2" className="w-5 h-5 text-primary" />
                              <span className="font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-3">Certifications</h3>
                        <div className="space-y-3">
                          {provider.certifications.map((cert, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-xl border border-primary/20">
                              <Icon name="Award" className="w-6 h-6 text-primary" />
                              <span className="font-semibold">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'services' && (
                    <div className="space-y-4">
                      {provider.services.map((service, i) => (
                        <div key={i} className="p-6 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border hover:shadow-lg transition-all">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-lg font-bold text-foreground">{service.name}</h4>
                              <p className="text-sm text-muted-foreground">{service.duration} • {service.type}</p>
                            </div>
                            <div className="text-3xl font-bold text-primary">{service.price}</div>
                          </div>
                          <Button className="w-full" onClick={() => setShowBookingModal(true)}>
                            <Icon name="Calendar" className="w-4 h-4 mr-2" />
                            Book This Service
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {/* Review Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
                          <div className="text-5xl font-bold text-yellow-600 mb-2">{provider.rating}</div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Icon key={i} name="Star" className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{provider.reviews} reviews</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                          <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
                          <p className="text-sm text-muted-foreground font-semibold">Recommend this provider</p>
                        </div>
                      </div>

                      {/* Reviews List */}
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className="bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-6 text-white shadow-2xl sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-sm opacity-80 mb-2">Starting from</div>
                  <div className="text-4xl font-bold mb-1">₹1,500</div>
                  <div className="text-sm opacity-80">per session</div>
                </div>
                <Button 
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-white text-primary hover:bg-white/90 shadow-xl mb-4"
                  size="lg"
                >
                  <Icon name="Calendar" className="w-5 h-5 mr-2" />
                  Book Consultation
                </Button>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="w-5 h-5" />
                    <span>Instant booking confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" className="w-5 h-5" />
                    <span>100% secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="w-5 h-5" />
                    <span>Free rescheduling</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Calendar" className="w-5 h-5 text-primary" />
                  Weekly Availability
                </h3>
                <div className="space-y-3">
                  {Object.entries(provider.availability).map(([day, times]) => (
                    <div key={day} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
                      <span className="font-semibold text-foreground capitalize">{day}</span>
                      <div className="text-right">
                        {Array.isArray(times) ? (
                          times.map((time, i) => (
                            <div key={i} className="text-sm text-muted-foreground">{time}</div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">{times}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="MessageCircle" className="w-5 h-5 mr-3" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Heart" className="w-5 h-5 mr-3" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Share2" className="w-5 h-5 mr-3" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        provider={provider}
      />
    </div>
  );
};

export default ServiceProviderProfile;


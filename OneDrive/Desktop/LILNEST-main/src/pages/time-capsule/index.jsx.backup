import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

const TimeCapsule = () => {
  const navigate = useNavigate();
  const [capsules, setCapsules] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewCapsule, setViewCapsule] = useState(null);
  const [activeTab, setActiveTab] = useState('my-capsules');
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'locked', 'unlocked'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  // New capsule form state
  const [newCapsule, setNewCapsule] = useState({
    title: '',
    recipientName: '',
    message: '',
    deliveryDate: '',
    deliveryTrigger: 'date', // 'date' | 'birthday' | 'milestone'
    age: '',
    photos: [],
    videos: [],
    voiceNotes: [],
    tags: []
  });

  // Load capsules from localStorage (simulating Firebase)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const saved = localStorage.getItem('timeCapsules');
      if (saved) {
        setCapsules(JSON.parse(saved));
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Save capsules to localStorage
  const saveCapsules = (updatedCapsules) => {
    localStorage.setItem('timeCapsules', JSON.stringify(updatedCapsules));
    setCapsules(updatedCapsules);
  };

  const handleCreateCapsule = () => {
    if (!newCapsule.title || !newCapsule.recipientName || !newCapsule.message) {
      alert('Please fill in all required fields');
      return;
    }

    if (!newCapsule.deliveryDate && newCapsule.deliveryTrigger === 'date') {
      alert('Please select a delivery date');
      return;
    }

    const capsule = {
      id: Date.now().toString(),
      ...newCapsule,
      createdAt: new Date().toISOString(),
      status: 'locked',
      opened: false,
      color: ['primary', 'purple', 'pink', 'blue', 'green'][Math.floor(Math.random() * 5)]
    };

    saveCapsules([...capsules, capsule]);
    setShowCreateModal(false);
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 3000);
    
    setNewCapsule({
      title: '',
      recipientName: '',
      message: '',
      deliveryDate: '',
      deliveryTrigger: 'date',
      age: '',
      photos: [],
      videos: [],
      voiceNotes: [],
      tags: []
    });
  };

  // Filter capsules
  const filteredCapsules = useMemo(() => {
    return capsules
      .filter(c => filterStatus === 'all' || c.status === filterStatus)
      .filter(c => 
        searchQuery === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [capsules, filterStatus, searchQuery]);

  const handleDeleteCapsule = (id) => {
    if (confirm('Are you sure you want to delete this time capsule? This cannot be undone.')) {
      saveCapsules(capsules.filter(c => c.id !== id));
    }
  };

  const handleOpenCapsule = (capsule) => {
    const today = new Date();
    const deliveryDate = new Date(capsule.deliveryDate);

    if (today >= deliveryDate || capsule.status === 'unlocked') {
      // Allow opening
      const updated = capsules.map(c => 
        c.id === capsule.id ? { ...c, status: 'unlocked', opened: true, openedAt: new Date().toISOString() } : c
      );
      saveCapsules(updated);
      setViewCapsule({ ...capsule, status: 'unlocked', opened: true });
    } else {
      alert(`This time capsule is locked until ${deliveryDate.toLocaleDateString()}`);
    }
  };

  const getStatusColor = (status) => {
    if (status === 'locked') return 'text-warning';
    if (status === 'unlocked') return 'text-primary';
    return 'text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    if (status === 'locked') return 'Lock';
    if (status === 'unlocked') return 'Unlock';
    return 'Clock';
  };

  const daysUntilUnlock = (deliveryDate) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diff = Math.ceil((delivery - today) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        {/* Success Animation */}
        {showSuccessAnimation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-card rounded-3xl p-8 shadow-2xl border-2 border-primary animate-in zoom-in">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Icon name="Gift" size={48} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Time Capsule Created! 🎉</h3>
                <p className="text-muted-foreground">Your precious memory has been sealed and will be unlocked on the scheduled date.</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section with enhanced gradient */}
        <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-10 mb-8 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-3xl" />
          
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="Gift" size={32} className="text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Time Capsule
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Preserve precious memories and heartfelt messages for your child's future. 
              Create letters, save photos, record videos, and set them to unlock on special dates 
              like birthdays or milestones. Build a legacy of love that lasts forever.
            </p>
            <Button size="lg" onClick={() => setShowCreateModal(true)} className="shadow-xl hover:shadow-2xl">
              <Icon name="Plus" size={22} className="mr-2" />
              Create Time Capsule
            </Button>
          </div>
        </div>

        {/* Tabs with improved design */}
        <div className="flex gap-4 mb-6 border-b-2 border-border">
          <button
            onClick={() => setActiveTab('my-capsules')}
            className={`px-6 py-4 font-bold transition-all relative ${
              activeTab === 'my-capsules'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            My Capsules ({capsules.length})
            {activeTab === 'my-capsules' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('ideas')}
            className={`px-6 py-4 font-bold transition-all relative ${
              activeTab === 'ideas'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Ideas & Inspiration
            {activeTab === 'ideas' && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
            )}
          </button>
        </div>

        {/* My Capsules Tab */}
        {activeTab === 'my-capsules' && (
          <>
            {/* Filters and Search */}
            {capsules.length > 0 && (
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search capsules..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {['all', 'locked', 'unlocked'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                        filterStatus === status
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <SkeletonLoader key={i} type="card" />
                ))}
              </div>
            ) : filteredCapsules.length === 0 && capsules.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-secondary/30 to-transparent rounded-3xl border-2 border-dashed border-border">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Icon name="Gift" size={56} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-3">No Time Capsules Yet</h3>
                <p className="text-muted-foreground mb-8 text-lg max-w-md mx-auto">
                  Start preserving memories for your child's future. Create your first time capsule today!
                </p>
                <Button size="lg" onClick={() => setShowCreateModal(true)} className="shadow-xl">
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Create Your First Capsule
                </Button>
              </div>
            ) : filteredCapsules.length === 0 ? (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No capsules match your filters</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter settings</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCapsules.map((capsule) => {
                  const isLocked = new Date(capsule.deliveryDate) > new Date();
                  const daysLeft = daysUntilUnlock(capsule.deliveryDate);
                  
                  const colorClasses = {
                    primary: 'from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50',
                    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-500/50',
                    pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-500/50',
                    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50',
                    green: 'from-green-500/20 to-green-500/5 border-green-500/30 hover:border-green-500/50',
                  };
                  
                  const iconColorClasses = {
                    primary: 'text-primary',
                    purple: 'text-purple-500',
                    pink: 'text-pink-500',
                    blue: 'text-blue-500',
                    green: 'text-green-500',
                  };
                  
                  const capsuleColor = capsule.color || 'primary';
                  
                  return (
                    <div
                      key={capsule.id}
                      className={`bg-gradient-to-br ${colorClasses[capsuleColor]} border-2 rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer group`}
                      onClick={() => !isLocked && handleOpenCapsule(capsule)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${colorClasses[capsuleColor]} rounded-2xl flex items-center justify-center border-2 border-border group-hover:scale-110 transition-transform`}>
                          <Icon 
                            name={capsule.status === 'locked' ? "Lock" : "Gift"} 
                            size={28} 
                            className={iconColorClasses[capsuleColor]}
                          />
                        </div>
                        {capsule.status === 'locked' && daysLeft <= 30 && daysLeft > 0 && (
                          <div className="bg-orange-500/20 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full text-xs font-semibold border border-orange-500/30 animate-pulse">
                            {daysLeft} days left
                          </div>
                        )}
                        {capsule.status === 'unlocked' && (
                          <div className="bg-green-500/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold border border-green-500/30">
                            <Icon name="Unlock" size={12} className="inline mr-1" />
                            Unlocked
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {capsule.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {capsule.message}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Icon name="User" size={16} className="mr-2" />
                          <span>For {capsule.recipientName}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Icon 
                            name={capsule.status === 'locked' ? "Clock" : "CheckCircle"} 
                            size={16} 
                            className={`mr-2 ${capsule.status === 'locked' ? 'text-orange-500' : 'text-green-500'}`}
                          />
                          <span className={capsule.status === 'locked' ? 'text-orange-700 dark:text-orange-300 font-semibold' : 'text-green-700 dark:text-green-300 font-semibold'}>
                            {capsule.status === 'locked' ? `Unlocks: ${new Date(capsule.deliveryDate).toLocaleDateString()}` : `Opened: ${new Date(capsule.deliveryDate).toLocaleDateString()}`}
                          </span>
                        </div>
                      </div>
                      
                      {/* Media Count */}
                      <div className="flex gap-4 mb-4 text-sm">
                        {capsule.photos?.length > 0 && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="Image" size={16} className={iconColorClasses[capsuleColor]} />
                            <span>{capsule.photos.length}</span>
                          </div>
                        )}
                        {capsule.videos?.length > 0 && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="Video" size={16} className={iconColorClasses[capsuleColor]} />
                            <span>{capsule.videos.length}</span>
                          </div>
                        )}
                        {capsule.voiceNotes?.length > 0 && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Icon name="Mic" size={16} className={iconColorClasses[capsuleColor]} />
                            <span>{capsule.voiceNotes.length}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant={capsule.status === 'locked' ? "outline" : "default"}
                          className="flex-1 group-hover:shadow-lg transition-shadow"
                          disabled={capsule.status === 'locked' && daysLeft > 0}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenCapsule(capsule);
                          }}
                        >
                          {capsule.status === 'locked' ? (
                            <>
                              <Icon name="Lock" size={18} className="mr-2" />
                              Locked
                            </>
                          ) : capsule.opened ? (
                            <>
                              <Icon name="Eye" size={18} className="mr-2" />
                              View Again
                            </>
                          ) : (
                            <>
                              <Icon name="Gift" size={18} className="mr-2" />
                              Open
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCapsule(capsule.id);
                          }}
                          className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Ideas Tab */}
        {activeTab === 'ideas' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'First Day Home',
                icon: 'Home',
                desc: 'Capture your thoughts and feelings bringing baby home for the first time',
                age: 'Birth'
              },
              {
                title: 'First Birthday Letter',
                icon: 'Cake',
                desc: 'Write about their first year milestones and your hopes for them',
                age: '1 year'
              },
              {
                title: 'First Day of School',
                icon: 'Backpack',
                desc: 'Share your emotions and advice as they start their educational journey',
                age: '5 years'
              },
              {
                title: 'Teenage Wisdom',
                icon: 'Heart',
                desc: 'Life lessons, family stories, and guidance for their teenage years',
                age: '13 years'
              },
              {
                title: 'Graduation Message',
                icon: 'GraduationCap',
                desc: 'Congratulations and wisdom as they complete a major milestone',
                age: '18 years'
              },
              {
                title: 'Wedding Day',
                icon: 'Heart',
                desc: 'Blessings and memories for their special day',
                age: '25+ years'
              }
            ].map((idea, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <Icon name={idea.icon} size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{idea.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{idea.desc}</p>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      Unlock at {idea.age}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Capsule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-2xl shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Create Time Capsule</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-sm font-medium mb-2">Capsule Title *</label>
                <Input
                  type="text"
                  placeholder="e.g., First Birthday Letter"
                  value={newCapsule.title}
                  onChange={(e) => setNewCapsule({ ...newCapsule, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Recipient Name *</label>
                <Input
                  type="text"
                  placeholder="Your child's name"
                  value={newCapsule.recipientName}
                  onChange={(e) => setNewCapsule({ ...newCapsule, recipientName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your Message *</label>
                <textarea
                  placeholder="Write your heartfelt message here..."
                  rows={6}
                  value={newCapsule.message}
                  onChange={(e) => setNewCapsule({ ...newCapsule, message: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Delivery Trigger</label>
                <select
                  value={newCapsule.deliveryTrigger}
                  onChange={(e) => setNewCapsule({ ...newCapsule, deliveryTrigger: e.target.value })}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="date">Specific Date</option>
                  <option value="birthday">Birthday Age</option>
                  <option value="milestone">Milestone</option>
                </select>
              </div>

              {newCapsule.deliveryTrigger === 'date' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Delivery Date *</label>
                  <Input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={newCapsule.deliveryDate}
                    onChange={(e) => setNewCapsule({ ...newCapsule, deliveryDate: e.target.value })}
                  />
                </div>
              )}

              {newCapsule.deliveryTrigger === 'birthday' && (
                <div>
                  <label className="block text-sm font-medium mb-2">At Age *</label>
                  <Input
                    type="number"
                    placeholder="e.g., 10, 16, 18"
                    min="1"
                    max="100"
                    value={newCapsule.age}
                    onChange={(e) => setNewCapsule({ ...newCapsule, age: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Set in Profile to enable birthday triggers
                  </p>
                </div>
              )}

              <div className="bg-secondary/30 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Icon name="Paperclip" size={18} />
                  Attachments (Coming Soon)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Add photos, videos, and voice recordings to your time capsule
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateCapsule} className="flex-1">
                Create Capsule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* View Capsule Modal */}
      {viewCapsule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-3xl shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{viewCapsule.title}</h2>
                <p className="text-muted-foreground">For {viewCapsule.recipientName}</p>
              </div>
              <button
                onClick={() => setViewCapsule(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Unlock Animation */}
              <div className="text-center py-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl">
                <Icon name="Gift" size={64} className="mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Time Capsule Unlocked! 🎉</h3>
                <p className="text-sm text-muted-foreground">
                  Opened on {new Date(viewCapsule.openedAt || Date.now()).toLocaleDateString()}
                </p>
              </div>

              {/* Message */}
              <div>
                <h4 className="font-semibold mb-3">Message:</h4>
                <div className="bg-secondary/30 rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {viewCapsule.message}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-secondary/20 rounded-lg p-3">
                  <div className="text-muted-foreground mb-1">Created On</div>
                  <div className="font-medium">
                    {new Date(viewCapsule.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-secondary/20 rounded-lg p-3">
                  <div className="text-muted-foreground mb-1">Scheduled For</div>
                  <div className="font-medium">
                    {new Date(viewCapsule.deliveryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setViewCapsule(null)} className="flex-1">
                Close
              </Button>
              <Button className="flex-1">
                <Icon name="Share2" size={16} className="mr-2" />
                Share Memory
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeCapsule;

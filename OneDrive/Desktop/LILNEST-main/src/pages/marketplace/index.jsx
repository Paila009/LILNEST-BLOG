import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import SkeletonLoader from '../../components/ui/SkeletonLoader';

// Provider Card Component with enhanced design
const ProviderCard = ({ provider, onClick, isFavorite, onToggleFavorite }) => (
  <div className="group bg-gradient-to-br from-card to-card/50 rounded-2xl p-6 shadow-soft border border-border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden">
    {/* Animated Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Featured & Verified Badges */}
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      {provider.featured && (
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
          ⭐ Featured
        </div>
      )}
      {provider.verified && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1.5 rounded-full shadow-lg">
          <Icon name="CheckCircle2" className="w-4 h-4" />
        </div>
      )}
    </div>

    <div className="relative" onClick={onClick}>
      {/* Provider Avatar with Status */}
      <div className="relative mx-auto w-24 h-24 mb-4">
        <div className="w-full h-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:rotate-6 transition-transform duration-300">
          <div className="w-[90%] h-[90%] bg-card rounded-xl flex items-center justify-center">
            <Icon name="User" className="w-12 h-12 text-primary" />
          </div>
        </div>
        {provider.online && (
          <div className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Online
          </div>
        )}
      </div>

      {/* Provider Info */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
          {provider.name}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{provider.category}</p>
      </div>

      {/* Stats with icons */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1.5 rounded-lg">
          <Icon name="Star" className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-yellow-600">{provider.rating}</span>
          <span className="text-xs text-muted-foreground">({provider.reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Icon name="MapPin" className="w-4 h-4" />
          <span className="text-sm font-medium">{provider.distance}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {provider.tags.slice(0, 2).map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20">
            {tag}
          </span>
        ))}
      </div>

      {/* Response Time */}
      {provider.responseTime && (
        <div className="flex items-center justify-center gap-2 text-green-600 text-sm mb-4">
          <Icon name="Clock" className="w-4 h-4" />
          <span className="font-medium">Responds in {provider.responseTime}</span>
        </div>
      )}

      {/* Price & CTA */}
      <div className="pt-4 border-t border-border/50">
        <div className="text-center mb-3">
          <span className="text-xs text-muted-foreground block mb-1">Starting from</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {provider.priceRange.split(' - ')[0]}
          </span>
        </div>
        <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 transition-all shadow-lg">
          <Icon name="Calendar" className="w-4 h-4 mr-2" />
          Book Consultation
        </Button>
      </div>
    </div>

    {/* Favorite Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite(provider.id);
      }}
      className="absolute top-4 left-4 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:scale-110 transition-transform z-10"
    >
      <Icon name="Heart" className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
    </button>
  </div>
);

// Category Card Component
const CategoryCard = ({ category, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`group flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl scale-105'
        : 'bg-card hover:bg-card/80 border border-border hover:border-primary/30 hover:shadow-lg hover:scale-105'
    }`}
  >
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
      isActive 
        ? 'bg-primary-foreground/20' 
        : 'bg-primary/10 group-hover:bg-primary/20'
    }`}>
      <Icon name={category.icon} className={`w-8 h-8 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
    </div>
    <div className="text-center">
      <h3 className={`font-bold mb-1 ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
        {category.label}
      </h3>
      <p className={`text-sm ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
        {count} providers
      </p>
    </div>
  </button>
);

// Filter Chip Component
const FilterChip = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-lg scale-105'
        : 'bg-secondary hover:bg-secondary/80 text-foreground'
    }`}
  >
    {icon && <Icon name={icon} className="w-4 h-4" />}
    <span className="text-sm">{label}</span>
  </button>
);

const Marketplace = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteProviders');
    return saved ? JSON.parse(saved) : [];
  });
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    online: false,
    verified: false,
    available: false
  });
  const [showCategoryView, setShowCategoryView] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('favoriteProviders', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (providerId) => {
    setFavorites(prev => 
      prev.includes(providerId) 
        ? prev.filter(id => id !== providerId)
        : [...prev, providerId]
    );
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: 'Store', color: 'primary' },
    { id: 'lactation', label: 'Lactation', icon: 'Baby', color: 'pink', description: 'Expert breastfeeding support' },
    { id: 'doula', label: 'Doulas', icon: 'Heart', color: 'rose', description: 'Birth & postpartum care' },
    { id: 'sleep', label: 'Sleep Training', icon: 'Moon', color: 'indigo', description: 'Baby sleep specialists' },
    { id: 'massage', label: 'Massage', icon: 'Hand', color: 'green', description: 'Prenatal & postnatal therapy' },
    { id: 'nanny', label: 'Childcare', icon: 'Users', color: 'orange', description: 'Nannies & babysitters' },
    { id: 'nutrition', label: 'Nutrition', icon: 'Apple', color: 'red', description: 'Pediatric nutritionists' },
    { id: 'mental', label: 'Mental Health', icon: 'Brain', color: 'purple', description: 'Counselors & therapists' },
    { id: 'physio', label: 'Physiotherapy', icon: 'Activity', color: 'blue', description: 'Pediatric physiotherapists' }
  ];

  const allProviders = useMemo(() => [
    {
      id: '1',
      name: 'Dr. Aishwarya Menon',
      category: 'Lactation Consultant',
      rating: 4.9,
      reviews: 234,
      distance: '1.6 km',
      priceRange: '₹1,500 - ₹2,500',
      verified: true,
      featured: true,
      online: true,
      responseTime: '~2h',
      tags: ['IBCLC Certified', 'Home Visits', '24/7 Support'],
      categoryId: 'lactation',
      available: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      category: 'Postpartum Doula',
      rating: 4.8,
      reviews: 189,
      distance: '2.3 km',
      priceRange: '₹3,000 - ₹5,000',
      verified: true,
      featured: true,
      online: false,
      responseTime: '~4h',
      tags: ['12 Years Exp', 'Night Care', 'Certified'],
      categoryId: 'doula',
      available: true
    },
    {
      id: '3',
      name: 'Sleep Solutions',
      category: 'Pediatric Sleep Trainer',
      rating: 4.7,
      reviews: 156,
      distance: 'Online',
      priceRange: '₹2,000 - ₹4,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~1h',
      tags: ['Video Sessions', 'Follow-ups', 'Custom Plans'],
      categoryId: 'sleep',
      available: true
    },
    {
      id: '4',
      name: 'Wellness Touch',
      category: 'Prenatal Massage Therapist',
      rating: 4.9,
      reviews: 287,
      distance: '3.5 km',
      priceRange: '₹1,800 - ₹3,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~3h',
      tags: ['Certified', 'Home Service', 'Aromatherapy'],
      categoryId: 'massage',
      available: false
    },
    {
      id: '5',
      name: 'Care Angels',
      category: 'Nanny Services',
      rating: 4.6,
      reviews: 412,
      distance: '1.2 km',
      priceRange: '₹15,000/month',
      verified: true,
      featured: false,
      online: false,
      responseTime: '~6h',
      tags: ['Background Check', 'Full-time', 'First Aid'],
      categoryId: 'nanny',
      available: true
    },
    {
      id: '6',
      name: 'NutriMom Clinic',
      category: 'Pediatric Nutritionist',
      rating: 4.8,
      reviews: 198,
      distance: 'Online',
      priceRange: '₹1,200 - ₹2,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~2h',
      tags: ['Custom Plans', 'Online', 'Diet Charts'],
      categoryId: 'nutrition',
      available: true
    },
    {
      id: '7',
      name: 'Maya Doula Services',
      category: 'Birth Doula',
      rating: 5.0,
      reviews: 143,
      distance: '4.1 km',
      priceRange: '₹20,000 - ₹35,000',
      verified: true,
      featured: true,
      online: true,
      responseTime: '~1h',
      tags: ['Birth Support', 'Prenatal', 'Postnatal'],
      categoryId: 'doula',
      available: true
    },
    {
      id: '8',
      name: 'Dr. Anjali Kumar',
      category: 'Lactation Specialist',
      rating: 4.9,
      reviews: 321,
      distance: '2.8 km',
      priceRange: '₹1,800 - ₹2,800',
      verified: true,
      featured: false,
      online: false,
      responseTime: '~5h',
      tags: ['Hospital Visits', 'Emergencies', 'NICU Support'],
      categoryId: 'lactation',
      available: true
    },
    {
      id: '9',
      name: 'MindCare Clinic',
      category: 'Perinatal Mental Health',
      rating: 4.9,
      reviews: 167,
      distance: 'Online',
      priceRange: '₹2,500 - ₹4,000',
      verified: true,
      featured: false,
      online: true,
      responseTime: '~2h',
      tags: ['Licensed', 'PPD Specialist', 'Anxiety Support'],
      categoryId: 'mental',
      available: true
    },
    {
      id: '10',
      name: 'Active Kids Physio',
      category: 'Pediatric Physiotherapist',
      rating: 4.7,
      reviews: 92,
      distance: '5.2 km',
      priceRange: '₹1,500 - ₹2,500',
      verified: true,
      featured: false,
      online: false,
      responseTime: '~4h',
      tags: ['Child Development', 'Home Visits', 'Certified'],
      categoryId: 'physio',
      available: true
    }
  ], []);

  const filteredProviders = useMemo(() => {
    return allProviders
      .filter(p => selectedCategory === 'all' || p.categoryId === selectedCategory)
      .filter(p => 
        searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .filter(p => !selectedFilters.online || p.online)
      .filter(p => !selectedFilters.verified || p.verified)
      .filter(p => !selectedFilters.available || p.available)
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviews - a.reviews;
        if (sortBy === 'distance') {
          const aNum = parseFloat(a.distance) || 999;
          const bNum = parseFloat(b.distance) || 999;
          return aNum - bNum;
        }
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });
  }, [allProviders, selectedCategory, searchQuery, sortBy, selectedFilters]);

  const categoryProviderCounts = useMemo(() => {
    const counts = {};
    categories.forEach(cat => {
      counts[cat.id] = allProviders.filter(p => cat.id === 'all' || p.categoryId === cat.id).length;
    });
    return counts;
  }, [allProviders, categories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Icon name="Shield" className="w-4 h-4" />
              100% Verified & Trusted Professionals
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Marketplace & Consultation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with verified maternal & child care experts. Book consultations, find trusted professionals, and get expert support—all in one place.
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'Users', label: 'Verified Experts', value: '500+', color: 'from-blue-500 to-cyan-500' },
            { icon: 'Star', label: 'Average Rating', value: '4.8', color: 'from-yellow-500 to-orange-500' },
            { icon: 'CheckCircle2', label: 'Consultations', value: '10K+', color: 'from-green-500 to-emerald-500' },
            { icon: 'Award', label: 'Satisfaction', value: '98%', color: 'from-purple-500 to-pink-500' }
          ].map((stat, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-soft hover:shadow-lg transition-all">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon name={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-3xl p-6 shadow-xl border border-border">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search for services, specialists, or conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-background border-2 border-border focus:border-primary rounded-xl outline-none transition-all text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  <Icon name="X" className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-2">
                <FilterChip
                  label="Online"
                  icon="Video"
                  isActive={selectedFilters.online}
                  onClick={() => setSelectedFilters(prev => ({ ...prev, online: !prev.online }))}
                />
                <FilterChip
                  label="Verified"
                  icon="CheckCircle2"
                  isActive={selectedFilters.verified}
                  onClick={() => setSelectedFilters(prev => ({ ...prev, verified: !prev.verified }))}
                />
                <FilterChip
                  label="Available Now"
                  icon="Clock"
                  isActive={selectedFilters.available}
                  onClick={() => setSelectedFilters(prev => ({ ...prev, available: !prev.available }))}
                />
              </div>

              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setShowCategoryView(!showCategoryView)}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                >
                  <Icon name={showCategoryView ? "Grid" : "LayoutGrid"} className="w-4 h-4" />
                  <span className="text-sm font-medium">{showCategoryView ? 'Providers' : 'Categories'}</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-xl outline-none font-medium text-sm transition-colors"
                >
                  <option value="recommended">⭐ Recommended</option>
                  <option value="rating">🏆 Top Rated</option>
                  <option value="reviews">📊 Most Reviewed</option>
                  <option value="distance">📍 Nearest</option>
                </select>

                <div className="flex bg-secondary rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                  >
                    <Icon name="Grid3x3" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}
                  >
                    <Icon name="List" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories View or Providers View */}
        {showCategoryView ? (
          <>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.filter(cat => cat.id !== 'all').map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    count={categoryProviderCounts[cat.id]}
                    isActive={selectedCategory === cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setShowCategoryView(false);
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Category Pills */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl whitespace-nowrap transition-all font-semibold ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg scale-105'
                      : 'bg-card hover:bg-card/80 border border-border text-foreground hover:border-primary/30'
                  }`}
                >
                  <Icon name={cat.icon} className="w-5 h-5" />
                  <span>{cat.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === cat.id ? 'bg-primary-foreground/20' : 'bg-muted'
                  }`}>
                    {categoryProviderCounts[cat.id]}
                  </span>
                </button>
              ))}
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {filteredProviders.length} {filteredProviders.length === 1 ? 'Provider' : 'Providers'} Found
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedCategory !== 'all' && `in ${categories.find(c => c.id === selectedCategory)?.label}`}
                </p>
              </div>
              <div className="flex gap-3">
                {favorites.length > 0 && (
                  <Button variant="outline">
                    <Icon name="Heart" className="w-4 h-4 mr-2 text-red-500" />
                    Favorites ({favorites.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Providers Grid/List */}
            {loading ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonLoader key={i} type="card" />
                ))}
              </div>
            ) : filteredProviders.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onClick={() => navigate(`/marketplace/provider/${provider.id}`)}
                    isFavorite={favorites.includes(provider.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="SearchX" className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No providers found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedFilters({ online: false, verified: false, available: false });
                }}>
                  <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                  Reset All Filters
                </Button>
              </div>
            )}
          </>
        )}

        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 border-2 border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
              <Icon name="ShieldCheck" className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">100% Verified & Trusted</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every professional undergoes rigorous background verification, certification validation, and continuous quality monitoring. Your safety and satisfaction are our top priorities.
              </p>
              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold">Background Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Award" className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold">Certified Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Star" className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold">Top Rated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Lock" className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-semibold">Secure Payments</span>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
              Learn More
            </Button>
          </div>
        </div>

        {/* Integration Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '3D Baby Visualizer',
              description: 'Get week-specific care recommendations',
              icon: 'Baby',
              color: 'from-pink-500 to-rose-500',
              link: '/visualizer'
            },
            {
              title: 'Community Forum',
              description: 'Ask questions and connect with experts',
              icon: 'Users',
              color: 'from-blue-500 to-cyan-500',
              link: '/community'
            },
            {
              title: 'Time Capsule',
              description: 'Save consultation memories',
              icon: 'Gift',
              color: 'from-purple-500 to-indigo-500',
              link: '/time-capsule'
            }
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => navigate(item.link)}
              className="group bg-card hover:bg-card/80 rounded-2xl p-6 border border-border hover:border-primary/30 transition-all text-left"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon name={item.icon} className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Marketplace;

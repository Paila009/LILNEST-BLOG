import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { db } from '../../firebase/config';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc, increment } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';

// Category Badge Component
const CategoryBadge = ({ category, count }) => {
  const categoryStyles = {
    'Pregnancy': 'bg-pink-500/10 text-pink-600 border-pink-500/20',
    'Postpartum': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    'Breastfeeding': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    'Baby Sleep': 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
    'Nutrition': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    'Mental Health': 'bg-teal-500/10 text-teal-600 border-teal-500/20',
    'Working Parents': 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20',
    'Local Groups': 'bg-green-500/10 text-green-600 border-green-500/20'
  };
  
  return (
    <div className={`group hover:scale-105 transition-all duration-300 cursor-pointer rounded-2xl p-6 border ${categoryStyles[category] || 'bg-muted/50 text-foreground border-border'}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{category}</h3>
        <Icon name="ChevronRight" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
      <p className="text-sm opacity-80">{count} active discussions</p>
    </div>
  );
};

// Expert Provider Card Component
const ExpertCard = ({ name, specialty, rating, reviews, image }) => (
  <div className="bg-gradient-to-br from-card to-card/50 rounded-xl p-4 border border-border hover:shadow-lg transition-all duration-300">
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold">
        {name.charAt(0)}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-sm">{name}</h4>
          <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full border border-green-500/20">
            ✓ Verified
          </span>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{specialty}</p>
        <div className="flex items-center gap-1 mb-3">
          <Icon name="Star" className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
        </div>
        <Button size="xs" className="w-full">Book Consultation</Button>
      </div>
    </div>
  </div>
);

// Thread Card Component
const ThreadCard = ({ thread, onClick, onLike, onSaveToTimeCapsule }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleLike = async (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (onLike) onLike(thread.id);
  };
  
  const handleSave = async (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onSaveToTimeCapsule) onSaveToTimeCapsule(thread);
  };
  
  return (
    <div 
      onClick={onClick}
      className="group bg-card hover:bg-card/80 rounded-2xl p-6 border border-border hover:border-primary/30 shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
            {thread.authorName?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {thread.title}
              </h3>
              {thread.isExpert && (
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-xs rounded-full border border-blue-500/20 flex-shrink-0">
                  ✓ Expert
                </span>
              )}
              {thread.isNew && (
                <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full border border-green-500/20 flex-shrink-0">
                  New
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span>{thread.authorName || 'Anonymous'}</span>
              <span>•</span>
              <span>{thread.timeAgo || 'Just now'}</span>
              {thread.category && (
                <>
                  <span>•</span>
                  <span className="text-primary">{thread.category}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {thread.body}
      </p>
      
      {thread.tags && thread.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {thread.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-muted hover:bg-muted/80 px-3 py-1 rounded-full transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${isLiked ? 'text-pink-500' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name={isLiked ? "Heart" : "Heart"} className={`w-4 h-4 ${isLiked ? 'fill-pink-500' : ''}`} />
            <span>{thread.likes || 0}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="MessageCircle" className="w-4 h-4" />
            <span>{thread.replies || 0}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="Eye" className="w-4 h-4" />
            <span>{thread.views || 0}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            className={`p-2 rounded-lg transition-colors ${isSaved ? 'bg-purple-500/10 text-purple-500' : 'hover:bg-muted text-muted-foreground'}`}
            title="Save to Time Capsule"
          >
            <Icon name="Gift" className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <Icon name="Share2" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Trending Badge
const TrendingBadge = () => (
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 text-xs font-medium rounded-full border border-orange-500/20">
    <Icon name="TrendingUp" className="w-3 h-3" />
    Trending
  </span>
);

const Community = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('Pregnancy');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeTab, setActiveTab] = useState('for-you');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((d) => {
        const data = d.data();
        list.push({ 
          id: d.id, 
          ...data,
          timeAgo: data.createdAt?.toDate ? getTimeAgo(data.createdAt.toDate()) : 'Just now',
          isNew: data.createdAt?.toDate ? (Date.now() - data.createdAt.toDate().getTime() < 86400000) : true
        });
      });
      setPosts(list);
    });
    return () => unsub();
  }, []);

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const createPost = async () => {
    if (!title.trim() || !body.trim()) return;
    await addDoc(collection(db, 'posts'), {
      title: title.trim(),
      body: body.trim(),
      category: category,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      authorName: isAnonymous ? 'Anonymous' : (user?.displayName || user?.email || 'Anonymous'),
      isAnonymous: isAnonymous,
      likes: 0,
      replies: 0,
      views: 0,
      createdAt: serverTimestamp(),
    });
    setTitle('');
    setBody('');
    setTags('');
    setShowPostModal(false);
  };

  const categories = [
    { name: 'Pregnancy', count: 234, icon: 'Baby' },
    { name: 'Postpartum', count: 156, icon: 'Heart' },
    { name: 'Breastfeeding', count: 189, icon: 'Droplet' },
    { name: 'Baby Sleep', count: 145, icon: 'Moon' },
    { name: 'Nutrition', count: 98, icon: 'UtensilsCrossed' },
    { name: 'Mental Health', count: 167, icon: 'Sparkles' },
    { name: 'Working Parents', count: 123, icon: 'Briefcase' },
    { name: 'Local Groups', count: 89, icon: 'MapPin' }
  ];

  const expertProviders = [
    { name: 'Dr. Sarah Johnson', specialty: 'Lactation Consultant', rating: 4.9, reviews: 234, image: '' },
    { name: 'Dr. Michael Chen', specialty: 'Pediatrician', rating: 4.8, reviews: 189, image: '' },
    { name: 'Emily Rodriguez', specialty: 'Doula & Birth Coach', rating: 5.0, reviews: 156, image: '' }
  ];

  const handleSaveToTimeCapsule = (thread) => {
    // Integration with Time Capsule feature
    alert(`"${thread.title}" saved to your Time Capsule! 💝`);
  };

  const filteredPosts = posts.filter(post => {
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-600 text-sm font-medium mb-4">
            <Icon name="Users" className="w-4 h-4" />
            Join 10,000+ Parents in Our Community
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Community Forum
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A safe, supportive space to share experiences, ask questions, and connect with other parents and verified experts.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search discussions, topics, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <Button 
            size="lg"
            onClick={() => setShowPostModal(true)}
            className="md:w-auto w-full"
          >
            <Icon name="Plus" className="w-5 h-5 mr-2" />
            Ask a Question
          </Button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'for-you', label: 'For You', icon: 'Sparkles' },
            { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
            { id: 'categories', label: 'Categories', icon: 'Grid3x3' },
            { id: 'local', label: 'Local Groups', icon: 'MapPin' },
            { id: 'experts', label: 'Expert Answers', icon: 'Award' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card hover:bg-muted text-muted-foreground'
              }`}
            >
              <Icon name={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'categories' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <CategoryBadge key={cat.name} category={cat.name} count={cat.count} />
                ))}
              </div>
            ) : (
              <>
                {filteredPosts.map((thread) => (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    onClick={() => setSelectedThread(thread)}
                    onSaveToTimeCapsule={handleSaveToTimeCapsule}
                  />
                ))}
                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="MessageCircle" className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No discussions found</h3>
                    <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
                    <Button onClick={() => setShowPostModal(true)}>
                      Start Discussion
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Expert Help */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Award" className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Need Expert Help?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with verified maternal care professionals
              </p>
              <div className="space-y-3">
                {expertProviders.slice(0, 2).map((expert) => (
                  <ExpertCard key={expert.name} {...expert} />
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => navigate('/marketplace')}>
                View All Experts
              </Button>
            </div>

            {/* Popular Topics */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="TrendingUp" className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {['First Trimester Tips', 'Baby Sleep Training', 'Breastfeeding Support', 'Postpartum Recovery', 'Newborn Care'].map((topic) => (
                  <button
                    key={topic}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    #{topic.replace(/\s+/g, '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20">
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => navigate('/visualizer')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors text-left"
                >
                  <Icon name="Baby" className="w-5 h-5 text-pink-500" />
                  <div>
                    <div className="text-sm font-medium">3D Baby Visualizer</div>
                    <div className="text-xs text-muted-foreground">Track fetal development</div>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/time-capsule')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors text-left"
                >
                  <Icon name="Gift" className="w-5 h-5 text-purple-500" />
                  <div>
                    <div className="text-sm font-medium">Time Capsule</div>
                    <div className="text-xs text-muted-foreground">Save memories</div>
                  </div>
                </button>
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/50 transition-colors text-left"
                >
                  <Icon name="Store" className="w-5 h-5 text-indigo-500" />
                  <div>
                    <div className="text-sm font-medium">Marketplace</div>
                    <div className="text-xs text-muted-foreground">Find care providers</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-soft">
              <h3 className="font-semibold text-foreground mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Members</span>
                  <span className="text-sm font-semibold">10,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Today</span>
                  <span className="text-sm font-semibold">1,456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Discussions</span>
                  <span className="text-sm font-semibold">3,891</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expert Answers</span>
                  <span className="text-sm font-semibold">2,567</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Post Creation Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Ask a Question</h2>
              <button 
                onClick={() => setShowPostModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {!user && (
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-sm text-warning">
                  Please login to post a question
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What would you like to ask or share?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px]"
                  placeholder="Share more details about your question or experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (optional)</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. firsttrimester, morningsickness, tips"
                />
                <p className="text-xs text-muted-foreground mt-1">Separate tags with commas</p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="anonymous" className="text-sm cursor-pointer">
                  Post anonymously for sensitive topics
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowPostModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={createPost} disabled={!user || !title.trim() || !body.trim()} className="flex-1">
                  Post Question
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Thread Detail Modal */}
      {selectedThread && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold line-clamp-1">{selectedThread.title}</h2>
              <button 
                onClick={() => setSelectedThread(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {selectedThread.authorName?.charAt(0) || 'A'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{selectedThread.authorName || 'Anonymous'}</span>
                    {selectedThread.isExpert && (
                      <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-xs rounded-full border border-blue-500/20">
                        ✓ Expert
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedThread.timeAgo}</p>
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-foreground">{selectedThread.body}</p>
              </div>
              
              {selectedThread.tags && selectedThread.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-6">
                  {selectedThread.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-muted px-3 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Expert Suggestions for this thread */}
              <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl p-6 border border-blue-500/10 mb-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Award" className="w-5 h-5 text-blue-500" />
                  Need Expert Help with This?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {expertProviders.slice(0, 2).map((expert) => (
                    <ExpertCard key={expert.name} {...expert} />
                  ))}
                </div>
              </div>
              
              {/* Reply Section */}
              <div className="border-t border-border pt-6">
                <h3 className="font-semibold mb-4">{selectedThread.replies || 0} Replies</h3>
                <div className="bg-muted/50 rounded-xl p-4">
                  <textarea
                    placeholder="Share your thoughts or advice..."
                    className="w-full bg-card border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3"
                    rows={3}
                  />
                  <div className="flex justify-end">
                    <Button size="sm">Post Reply</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-40"
      >
        <Icon name="Plus" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Community;

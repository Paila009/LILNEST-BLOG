import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WebsiteBlocker = ({ isEnabled, onToggle, blockedSites, onSitesChange }) => {
  const [newSite, setNewSite] = useState('');
  const [tempOverride, setTempOverride] = useState(null);

  const defaultBlockedSites = [
    { url: 'facebook.com', category: 'Social Media', isActive: true },
    { url: 'twitter.com', category: 'Social Media', isActive: true },
    { url: 'instagram.com', category: 'Social Media', isActive: false },
    { url: 'youtube.com', category: 'Entertainment', isActive: true },
    { url: 'reddit.com', category: 'Social Media', isActive: false },
    { url: 'tiktok.com', category: 'Entertainment', isActive: true },
    { url: 'netflix.com', category: 'Entertainment', isActive: false }
  ];

  const handleAddSite = () => {
    if (newSite?.trim()) {
      const site = {
        url: newSite?.trim()?.toLowerCase(),
        category: 'Custom',
        isActive: true
      };
      onSitesChange([...blockedSites, site]);
      setNewSite('');
    }
  };

  const handleToggleSite = (index) => {
    const updatedSites = blockedSites?.map((site, i) => 
      i === index ? { ...site, isActive: !site?.isActive } : site
    );
    onSitesChange(updatedSites);
  };

  const handleRemoveSite = (index) => {
    const updatedSites = blockedSites?.filter((_, i) => i !== index);
    onSitesChange(updatedSites);
  };

  const handleTempOverride = (site) => {
    setTempOverride(site);
    // In a real app, this would temporarily allow access
    setTimeout(() => setTempOverride(null), 300000); // 5 minutes
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Social Media':
        return 'Users';
      case 'Entertainment':
        return 'Play';
      case 'Custom':
        return 'Globe';
      default:
        return 'Link';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Social Media':
        return 'text-warning';
      case 'Entertainment':
        return 'text-error';
      case 'Custom':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const activeSites = blockedSites?.filter(site => site?.isActive);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Website Blocker
          </h3>
        </div>
        
        <Button
          variant={isEnabled ? "default" : "outline"}
          size="sm"
          iconName={isEnabled ? "ShieldCheck" : "Shield"}
          iconPosition="left"
          onClick={onToggle}
          className="organic-hover"
        >
          {isEnabled ? 'Enabled' : 'Disabled'}
        </Button>
      </div>
      {/* Status Overview */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-body text-foreground">
            Blocking Status
          </span>
          <div className={`flex items-center space-x-2 ${
            isEnabled ? 'text-success' : 'text-muted-foreground'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              isEnabled ? 'bg-success animate-gentle-pulse' : 'bg-muted-foreground'
            }`}></div>
            <span className="text-sm font-caption">
              {isEnabled ? `${activeSites?.length} sites blocked` : 'Inactive'}
            </span>
          </div>
        </div>
        
        {isEnabled && activeSites?.length > 0 && (
          <div className="text-xs font-caption text-muted-foreground">
            Active during focus sessions only
          </div>
        )}
      </div>
      {/* Add New Site */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h4 className="font-body font-medium text-foreground mb-3">
          Add Website to Block
        </h4>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="example.com"
            value={newSite}
            onChange={(e) => setNewSite(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleAddSite()}
            className="flex-1"
          />
          <Button
            variant="outline"
            iconName="Plus"
            onClick={handleAddSite}
            disabled={!newSite?.trim()}
          >
            Add
          </Button>
        </div>
      </div>
      {/* Blocked Sites List */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h4 className="font-body font-medium text-foreground mb-4">
          Blocked Websites ({blockedSites?.length})
        </h4>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {blockedSites?.map((site, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                site?.isActive 
                  ? 'border-error/20 bg-error/5' :'border-border bg-muted/20'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getCategoryIcon(site?.category)} 
                  size={16} 
                  className={getCategoryColor(site?.category)}
                />
                <div>
                  <div className="text-sm font-body text-foreground">
                    {site?.url}
                  </div>
                  <div className="text-xs font-caption text-muted-foreground">
                    {site?.category}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {site?.isActive && tempOverride === site?.url && (
                  <span className="text-xs font-caption text-warning">
                    Override: 5m
                  </span>
                )}
                
                {site?.isActive && isEnabled && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Clock"
                    onClick={() => handleTempOverride(site?.url)}
                    className="text-xs"
                  >
                    5m Override
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={site?.isActive ? "Eye" : "EyeOff"}
                  onClick={() => handleToggleSite(index)}
                  className={site?.isActive ? 'text-success' : 'text-muted-foreground'}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => handleRemoveSite(index)}
                  className="text-error hover:text-error"
                />
              </div>
            </div>
          ))}
          
          {blockedSites?.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Globe" size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-body">No websites blocked yet</p>
              <p className="text-xs font-caption">Add sites above to get started</p>
            </div>
          )}
        </div>
      </div>
      {/* Quick Presets */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h4 className="font-body font-medium text-foreground mb-3">
          Quick Presets
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Users"
            iconPosition="left"
            onClick={() => onSitesChange([
              ...blockedSites,
              ...defaultBlockedSites?.filter(site => 
                site?.category === 'Social Media' && 
                !blockedSites?.some(existing => existing?.url === site?.url)
              )
            ])}
            className="justify-start"
          >
            Block Social Media
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={() => onSitesChange([
              ...blockedSites,
              ...defaultBlockedSites?.filter(site => 
                site?.category === 'Entertainment' && 
                !blockedSites?.some(existing => existing?.url === site?.url)
              )
            ])}
            className="justify-start"
          >
            Block Entertainment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBlocker;
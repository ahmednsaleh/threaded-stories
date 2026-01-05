import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { User, Mail, Camera, Lock, Trash2, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../integrations/supabase/client';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subscriptionTier, setSubscriptionTier] = React.useState('free');
  const [activeSince, setActiveSince] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setEmail(user.email || '');
      
      const { data: profile } = await supabase
        .from('users')
        .select('full_name, subscription_tier, updated_at, avatar_url')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setFullName(profile.full_name || '');
        setSubscriptionTier(profile.subscription_tier || 'free');
        setAvatarUrl(profile.avatar_url || null);
        const date = new Date(profile.updated_at || Date.now());
        setActiveSince(`Active since ${date.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' })}`);
      }
    };
    
    fetchUserProfile();
  }, [user]);

  const handleDeleteAccount = () => toast.error("Action restricted in preview environment.");
  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    
    const { error } = await supabase
      .from('users')
      .update({ 
        full_name: fullName,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (error) {
      toast.error('Failed to save profile');
    } else {
      toast.success('Profile saved successfully!');
      window.dispatchEvent(new CustomEvent('profile-updated', { 
        detail: { fullName, avatarUrl } 
      }));
    }
    setSaving(false);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    
    setUploading(true);
    
    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error('Failed to upload avatar');
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    // Save URL to database
    const { error: updateError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      toast.error('Failed to save avatar');
    } else {
      setAvatarUrl(publicUrl);
      toast.success('Profile picture updated!');
      window.dispatchEvent(new CustomEvent('profile-updated', { 
        detail: { fullName, avatarUrl: publicUrl } 
      }));
    }
    setUploading(false);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold tracking-tight text-[#2C3E50]">Profile</h1>
        </div>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden border-t-4 border-t-[#C2410C]">
          <CardContent className="p-10">
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shadow-inner">
                  {avatarUrl ? <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" /> : <User className="w-12 h-12" />}
                </div>
                <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {uploading ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-white mb-1" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest">Change</span>
                    </>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" disabled={uploading} />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{fullName}</h2>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest">{subscriptionTier === 'pro' ? 'Pro Member' : 'Free Plan'}</span>
                  <span className="text-slate-300 font-mono">•</span>
                  <span className="text-slate-400 text-sm font-mono tracking-tight">{activeSince || 'Active'}</span>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-slate-100 mb-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 focus:border-[#C2410C] font-medium transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono ml-1">Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="email" value={email} readOnly className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-100 bg-slate-50 text-slate-500 cursor-not-allowed font-medium" />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleSave}
                disabled={saving || !fullName.trim()}
                className="bg-[#C2410C] hover:bg-[#C2410C]/90 text-white font-bold px-8 h-12 rounded-full transition-all"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-12 pb-20">
          <div className="bg-red-50/50 border border-red-200 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-red-700">Delete Account</h4>
              <p className="text-sm text-red-600/70 max-w-md font-medium">Permanently remove your account and all lead data. This action cannot be undone.</p>
            </div>
            <Button variant="ghost" onClick={handleDeleteAccount} className="text-red-600 hover:bg-red-100 font-bold px-8 h-12 rounded-full border border-red-200 transition-all flex-shrink-0">
              <Trash2 className="w-4 h-4 mr-2" /> Delete Account
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

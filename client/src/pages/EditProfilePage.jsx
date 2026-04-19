import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const CREATOR_CATEGORIES = [
  'Cinematography',
  'Photography',
  '3D Motion',
  'Design',
  'Illustration',
  'Animation',
  'Graphic Design',
  'VFX'
];

const BRAND_CATEGORIES = [
  'Fashion & Beauty',
  'Tech & Gadgets',
  'Food & Beverage',
  'Travel & Hospitality',
  'Health & Wellness',
  'Finance & Services',
  'Home & Lifestyle',
  'E-commerce'
];

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isCreator = user?.role === 'creator';
  const categories = isCreator ? CREATOR_CATEGORIES : BRAND_CATEGORIES;

  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [formData, setFormData] = useState({
    bio: '',
    category: '',
    location: '',
    avatar_url: '',
    banner_url: '',
    instagram: '',
    twitter: '',
    website: ''
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [dragActiveAvatar, setDragActiveAvatar] = useState(false);
  const [dragActiveBanner, setDragActiveBanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  // Load current profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get(`/creators/${user.id}`);
        const creator = res.data.creator;
        setFormData({
          bio: creator.bio || '',
          category: creator.category || '',
          location: creator.location || '',
          avatar_url: creator.avatar_url || '',
          banner_url: creator.banner_url || '',
          instagram: creator.instagram || '',
          twitter: creator.twitter || '',
          website: creator.website || ''
        });
        if (creator.avatar_url) setAvatarPreview(creator.avatar_url);
        if (creator.banner_url) setBannerPreview(creator.banner_url);
      } catch (err) {
        console.error('Failed to load profile:', err);
        setMessage({ type: 'error', text: 'Failed to load profile' });
      } finally {
        setInitialLoading(false);
      }
    };
    if (user?.id) loadProfile();
  }, [user?.id]);

  // Handle file selection/drop
  const handleAvatarDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActiveAvatar(true);
    } else if (e.type === 'dragleave') {
      setDragActiveAvatar(false);
    }
  };

  const handleAvatarDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveAvatar(false);
    if (e.dataTransfer.files?.[0]) {
      processAvatarFile(e.dataTransfer.files[0]);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files?.[0]) {
      processAvatarFile(e.target.files[0]);
    }
  };

  const processAvatarFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setErrors(p => ({ ...p, avatar: 'Avatar must be an image' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, avatar: 'Avatar must be under 5MB' }));
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setErrors(p => ({ ...p, avatar: '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleBannerDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActiveBanner(true);
    } else if (e.type === 'dragleave') {
      setDragActiveBanner(false);
    }
  };

  const handleBannerDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveBanner(false);
    if (e.dataTransfer.files?.[0]) {
      processBannerFile(e.dataTransfer.files[0]);
    }
  };

  const handleBannerChange = (e) => {
    if (e.target.files?.[0]) {
      processBannerFile(e.target.files[0]);
    }
  };

  const processBannerFile = (file) => {
    if (!file.type.startsWith('image/')) {
      setErrors(p => ({ ...p, banner: 'Banner must be an image' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, banner: 'Banner must be under 5MB' }));
      return;
    }
    setBannerFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setBannerPreview(reader.result);
      setErrors(p => ({ ...p, banner: '' }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be 500 characters or less';
    }
    if (formData.location && formData.location.length > 100) {
      newErrors.location = 'Location must be 100 characters or less';
    }
    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Enter a valid website URL';
    }
    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let avatarUrl = formData.avatar_url;
      let bannerUrl = formData.banner_url;

      // 1. Upload images first if they were changed
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatarFile);
        const res = await api.post('/upload/avatar', avatarFormData);
        avatarUrl = res.data.publicUrl;
      }

      if (bannerFile) {
        const bannerFormData = new FormData();
        bannerFormData.append('banner', bannerFile);
        const res = await api.post('/upload/banner', bannerFormData);
        bannerUrl = res.data.publicUrl;
      }

      // 2. Prepare payload
      const payload = {
        bio:       formData.bio,
        category:  formData.category,
        location:  formData.location,
        instagram: formData.instagram,
        twitter:   formData.twitter,
        website:   formData.website,
        avatar_url: avatarUrl,
        banner_url: bannerUrl
      };

      // 3. Update profile
      await api.patch('/creators/profile', payload);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => {
        navigate(`/dashboard/${user.role}`);
      }, 1500);
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border-b py-3 focus:outline-none transition-colors bg-transparent text-black placeholder:text-[#CCC] ${
      errors[field] ? 'border-red-400' : 'border-[#DDD] focus:border-black'
    }`;

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#666]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit Profile — Driplens</title>
        <meta name="description" content="Edit your Driplens profile" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-black mb-2 tracking-tight">Edit Profile</h1>
          <p className="text-[#666] mb-12 text-sm">
            {isCreator ? 'Showcase your work and let brands find you.' : 'Tell creators about your brand and what you\'re looking for.'}
          </p>

          {/* Banner Upload */}
          <div className="mb-12">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-4">
              Banner Image
            </label>
            <div
              onDragEnter={handleBannerDrag}
              onDragLeave={handleBannerDrag}
              onDragOver={handleBannerDrag}
              onDrop={handleBannerDrop}
              onClick={() => bannerInputRef.current?.click()}
              className={`aspect-[3/1] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-8 relative overflow-hidden ${
                dragActiveBanner ? 'border-black bg-gray-50' : 'border-[#DDD] bg-white hover:border-black'
              }`}
            >
              <input
                type="file"
                className="hidden"
                ref={bannerInputRef}
                onChange={handleBannerChange}
                accept="image/*"
              />
              {bannerPreview ? (
                <img src={bannerPreview} alt="Banner Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-10 h-10 text-[#CCC] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-xs font-bold uppercase tracking-widest text-black mb-1">Drag & Drop or Click</p>
                  <p className="text-[10px] text-[#999]">Recommended: 1200×400px</p>
                </>
              )}
            </div>
            {errors.banner && <p className="text-red-500 text-xs mt-2">{errors.banner}</p>}
          </div>

          {/* Avatar Upload */}
          <div className="mb-12">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-4">
              Avatar Image
            </label>
            <div
              onDragEnter={handleAvatarDrag}
              onDragLeave={handleAvatarDrag}
              onDragOver={handleAvatarDrag}
              onDrop={handleAvatarDrop}
              onClick={() => avatarInputRef.current?.click()}
              className={`w-32 h-32 border-2 border-dashed transition-all cursor-pointer flex items-center justify-center relative overflow-hidden rounded-lg ${
                dragActiveAvatar ? 'border-black bg-gray-50' : 'border-[#DDD] bg-white hover:border-black'
              }`}
            >
              <input
                type="file"
                className="hidden"
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
              />
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <svg className="w-8 h-8 text-[#CCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                  </svg>
                </>
              )}
            </div>
            <p className="text-[10px] text-[#999] mt-2">Square image recommended (500×500px)</p>
            {errors.avatar && <p className="text-red-500 text-xs mt-2">{errors.avatar}</p>}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <AnimatePresence>
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`text-xs font-bold uppercase tracking-widest p-4 ${
                    message.type === 'error'
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'bg-green-50 text-green-600 border border-green-200'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bio */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">
                Bio {formData.bio.length > 0 && <span className="text-[#CCC] font-normal">({formData.bio.length}/500)</span>}
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell your story..."
                rows="4"
                className={`w-full border rounded p-3 focus:outline-none transition-colors resize-none bg-transparent ${
                  errors.bio ? 'border-red-400' : 'border-[#DDD] focus:border-black'
                }`}
                maxLength="500"
              />
              {errors.bio && <p className="text-red-500 text-xs mt-2">{errors.bio}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">
                {isCreator ? 'Specialty' : 'Industry'}
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full border-b py-3 bg-transparent focus:outline-none transition-colors appearance-none ${
                  errors.category ? 'border-red-400' : 'border-[#DDD] focus:border-black'
                }`}
              >
                <option value="">Select a category...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-2">{errors.category}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                className={inputClass('location')}
              />
              {errors.location && <p className="text-red-500 text-xs mt-2">{errors.location}</p>}
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-[#EEE]">
              <h3 className="text-sm font-bold text-black mb-6">Social Links (Optional)</h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="yourhandle (without the @)"
                    className={inputClass('instagram')}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">
                    Twitter/X Handle
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    placeholder="yourhandle (without the @)"
                    className={inputClass('twitter')}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    className={inputClass('website')}
                  />
                  {errors.website && <p className="text-red-500 text-xs mt-2">{errors.website}</p>}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-8">
              <button
                type="button"
                onClick={() => navigate(`/dashboard/${user.role}`)}
                className="flex-1 border border-black text-black py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 bg-black text-white py-4 font-bold text-xs uppercase tracking-[0.2em] hover:bg-black/90 transition-all ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
}

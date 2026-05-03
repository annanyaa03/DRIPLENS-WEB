import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';

// FIX: mirror the server-side allowed types so the client rejects bad files
// immediately instead of wasting a round-trip
const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm',
];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500 MB

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cinematography');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  // FIX: useAuth is imported but was unused — keep it for future role-guard use
  const { user } = useAuth();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  // FIX: validate file type and size on the client before even setting state
  const handleFiles = (selectedFile) => {
    if (!ALLOWED_MIME_TYPES.includes(selectedFile.type)) {
      setMessage({
        type: 'error',
        text: 'Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF, MP4, MOV, WEBM.',
      });
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setMessage({ type: 'error', text: 'File too large. Maximum size is 500 MB.' });
      return;
    }
    setMessage({ type: '', text: '' });
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview({ url, type: selectedFile.type.startsWith('video') ? 'video' : 'image' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !category) {
      setMessage({ type: 'error', text: 'Please fill all required fields and select a file.' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('media', file);
    formData.append('title', title);
    formData.append('category', category);
    if (description) formData.append('description', description);

    try {
      await api.post('/upload/portfolio', formData);
      setMessage({ type: 'success', text: 'Published successfully!' });
      setTimeout(() => navigate('/explore'), 1800);
    } catch (err) {
      // FIX: api.post returns undefined on 401 redirect (window.location.href set),
      //      so err.message may be undefined — provide a clear fallback message.
      setMessage({
        type: 'error',
        text: err?.message || 'Upload failed. Please check you are logged in and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen">
      <Helmet>
        <title>Upload Your Work — Driplens</title>
        <meta name="description" content="Upload Your Work on Driplens" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl font-bold text-black mb-4 tracking-tight uppercase">Upload Content</h1>
        <p className="text-[#666666]">Share your best work with the Driplens community. High resolution landscape images preferred.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Drop zone */}
        <div className="lg:col-span-2">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`aspect-[16/9] border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-12 relative overflow-hidden ${dragActive ? 'border-black bg-gray-50' : 'border-[#DDD] bg-white hover:border-black'
              }`}
          >
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
            />

            {preview ? (
              preview.type === 'video'
                ? <video src={preview.url} className="absolute inset-0 w-full h-full object-cover" controls={false} muted />
                : <img src={preview.url} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <svg className="w-12 h-12 text-[#CCC] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-sm font-bold uppercase tracking-widest text-black mb-2">Drag & Drop Files</p>
                <p className="text-xs text-[#999] uppercase tracking-widest">or click to browse from device</p>
                <p className="text-xs text-[#BBB] mt-3">JPEG · PNG · WEBP · GIF · MP4 · MOV · WEBM — max 500 MB</p>
              </>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`text-xs font-bold uppercase tracking-widest p-4 ${message.type === 'error' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                  }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">Project Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Minimalist Architecture"
              className="w-full border-b border-[#DDD] py-3 focus:outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-b border-[#DDD] py-3 bg-transparent focus:outline-none focus:border-black transition-colors appearance-none"
            >
              <option>Cinematography</option>
              <option>Photography</option>
              <option>3D Motion</option>
              <option>Design</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#999] mb-3">Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the story behind this work..."
              className="w-full border border-[#EEE] p-4 focus:outline-none focus:border-black transition-colors resize-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-5 font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black/90 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Publishing...' : 'Publish Content'}
          </button>
        </form>
      </div>
    </div>
  );
}
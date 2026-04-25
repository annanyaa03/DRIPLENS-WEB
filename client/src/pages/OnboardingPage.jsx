import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { useOnboarding } from '../context/OnboardingContext';
import { api } from '../lib/api';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'Cinematography', icon: '🎬' },
  { label: 'Photography',    icon: '📷' },
  { label: '3D Motion',      icon: '🌀' },
  { label: 'Design',         icon: '🎨' },
  { label: 'Illustration',   icon: '✏️' },
  { label: 'Animation',      icon: '🎞' },
  { label: 'Graphic Design', icon: '🖼' },
  { label: 'VFX',            icon: '✨' },
];

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Twitch', 'LinkedIn'];

const PLATFORM_ICONS = {
  Instagram: '📸', TikTok: '🎵', YouTube: '▶️',
  Twitter: '🐦', Twitch: '🟣', LinkedIn: '💼',
};

const WORK_TYPES = [
  'One-off Project', 'Retainer / Ongoing', 'UGC Only',
  'Affiliate / Commission', 'Gifting / Barter',
];

const CATEGORY_TAGS = {
  Cinematography:  ['cinematic','storytelling','documentary','music video','commercial','short film','colour grading'],
  Photography:     ['editorial','lifestyle','portrait','product','fashion','street','event','food'],
  '3D Motion':     ['abstract','product viz','character animation','NFT','VFX','motion graphics','loop art'],
  Design:          ['brand identity','UI/UX','packaging','typography','poster','logo','system design'],
  Illustration:    ['editorial','concept art','character design','mural','children\'s book','pattern','storyboard'],
  Animation:       ['2D','frame-by-frame','explainer','character','logo animation','whiteboard','kinetic type'],
  'Graphic Design':['social media','ads','infographic','presentation','print','campaign','web banners'],
  VFX:             ['compositing','green screen','simulation','titles','particle FX','environment build'],
};

const TIER_COLORS = {
  Nano: '#64748b', Micro: '#0ea5e9', Macro: '#8b5cf6', Mega: '#f59e0b',
};

// ─── Shared UI ────────────────────────────────────────────────────────────────

function ProgressBar({ step, total = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 6, width: '100%', maxWidth: 320 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: i < step ? '#000' : '#E5E7EB',
          transition: 'background 0.3s ease',
        }} />
      ))}
    </div>
  );
}

function Chip({ label, selected, onClick, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '8px 14px',
        borderRadius: 4,
        border: selected ? '2px solid #000' : '1.5px solid #E5E7EB',
        background: selected ? '#000' : '#fff',
        color: selected ? '#fff' : '#333',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 600,
        fontFamily: 'Poppins, sans-serif',
        display: 'flex', alignItems: 'center', gap: 6,
        transition: 'all 0.15s ease',
        transform: selected ? 'scale(1.04)' : 'scale(1)',
        whiteSpace: 'nowrap',
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text', maxLength, note }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 6, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB',
          borderRadius: 4, fontSize: 14, fontFamily: 'Poppins, sans-serif',
          outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#000'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
      />
      {note && <p style={{ fontSize: 11, color: '#999', marginTop: 4, fontFamily: 'Poppins, sans-serif' }}>{note}</p>}
      {maxLength && <p style={{ fontSize: 10, color: '#bbb', marginTop: 2, textAlign: 'right', fontFamily: 'Poppins, sans-serif' }}>{value?.length || 0}/{maxLength}</p>}
    </div>
  );
}

function NavButtons({ onBack, onNext, nextLabel = 'Continue →', nextDisabled = false, loading = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32 }}>
      {onBack
        ? <button type="button" onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#999', fontWeight: 600 }}>← Back</button>
        : <div />
      }
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || loading}
        style={{
          padding: '12px 28px', background: nextDisabled ? '#E5E7EB' : '#000',
          color: nextDisabled ? '#999' : '#fff', border: 'none', borderRadius: 4,
          cursor: nextDisabled ? 'not-allowed' : 'pointer',
          fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: 1,
          transition: 'all 0.2s',
        }}
      >
        {loading ? 'Saving...' : nextLabel}
      </button>
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ onNext }) {
  const { data, update } = useOnboarding();
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#000', marginBottom: 6, fontFamily: 'Poppins, sans-serif' }}>What kind of creator are you?</h2>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28, fontFamily: 'Poppins, sans-serif' }}>This shapes everything on your profile. Pick one.</p>

      <Input label="Display Name" value={data.display_name} onChange={v => update({ display_name: v })} placeholder="Your public name" />
      <Input label="One-line tagline" value={data.tagline} onChange={v => update({ tagline: v })} placeholder="Describe your work in one line..." maxLength={80} />

      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 12, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Creative Category</label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 8 }}>
        {CATEGORIES.map(c => (
          <Chip key={c.label} label={c.label} icon={c.icon} selected={data.category === c.label} onClick={() => update({ category: c.label, tags: [] })} />
        ))}
      </div>

      <NavButtons onNext={onNext} nextDisabled={!data.category} />
    </div>
  );
}

function Step2({ onNext, onBack }) {
  const { data, update, audienceTier } = useOnboarding();

  const togglePlatform = (p) => {
    const next = data.platforms.includes(p) ? data.platforms.filter(x => x !== p) : [...data.platforms, p];
    const primary = next.length === 1 ? next[0] : (next.includes(data.primary_platform) ? data.primary_platform : '');
    update({ platforms: next, primary_platform: primary });
  };

  const tierColor = audienceTier ? TIER_COLORS[audienceTier] : null;

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#000', marginBottom: 6, fontFamily: 'Poppins, sans-serif' }}>Where do you create?</h2>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28, fontFamily: 'Poppins, sans-serif' }}>Brands search by platform. Select all that apply.</p>

      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 12, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Active Platforms</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        {PLATFORMS.map(p => <Chip key={p} label={p} icon={PLATFORM_ICONS[p]} selected={data.platforms.includes(p)} onClick={() => togglePlatform(p)} />)}
      </div>

      {data.platforms.length > 1 && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 10, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Primary Platform</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.platforms.map(p => <Chip key={p} label={p} icon={PLATFORM_ICONS[p]} selected={data.primary_platform === p} onClick={() => update({ primary_platform: p })} />)}
          </div>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 6, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>
          {data.primary_platform ? `${data.primary_platform} Followers` : 'Follower Count'}
        </label>
        <input
          type="number"
          value={data.follower_count}
          onChange={e => update({ follower_count: e.target.value })}
          placeholder="e.g. 25000"
          style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 14, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
          onFocus={e => e.target.style.borderColor = '#000'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        />
        {audienceTier && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8, padding: '4px 12px', borderRadius: 20, background: tierColor + '18', border: `1.5px solid ${tierColor}` }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: tierColor }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: tierColor, fontFamily: 'Poppins, sans-serif' }}>You are a {audienceTier} Creator</span>
          </div>
        )}
      </div>

      <NavButtons onBack={onBack} onNext={onNext} nextDisabled={data.platforms.length === 0} />
    </div>
  );
}

function Step3({ onNext, onBack }) {
  const { data, update } = useOnboarding();
  const [customTag, setCustomTag] = useState('');
  const suggestedTags = CATEGORY_TAGS[data.category] || [];

  const toggleTag = (t) => {
    const next = data.tags.includes(t) ? data.tags.filter(x => x !== t) : [...data.tags, t];
    update({ tags: next });
  };

  const addCustomTag = () => {
    const t = customTag.trim().toLowerCase();
    if (t && !data.tags.includes(t)) update({ tags: [...data.tags, t] });
    setCustomTag('');
  };

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#000', marginBottom: 6, fontFamily: 'Poppins, sans-serif' }}>Your style & skills</h2>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28, fontFamily: 'Poppins, sans-serif' }}>Tag your specialisations so brands can find the right fit.</p>

      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 10, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Content Style Tags</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
        {suggestedTags.map(t => <Chip key={t} label={t} selected={data.tags.includes(t)} onClick={() => toggleTag(t)} />)}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          value={customTag}
          onChange={e => setCustomTag(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addCustomTag()}
          placeholder="Add custom tag..."
          style={{ flex: 1, padding: '8px 12px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 13, fontFamily: 'Poppins, sans-serif', outline: 'none' }}
        />
        <button type="button" onClick={addCustomTag} style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700 }}>+</button>
      </div>

      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 10, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Qualifications / Credentials</label>
      {data.qualifications.map((q, i) => (
        <input
          key={i}
          value={q}
          onChange={e => { const next = [...data.qualifications]; next[i] = e.target.value; update({ qualifications: next }); }}
          placeholder={`e.g. BA in Cinematic Arts`}
          style={{ width: '100%', padding: '9px 14px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 13, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box', marginBottom: 8 }}
        />
      ))}

      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 10, marginTop: 16, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Past Work Highlights</label>
      {data.past_work.map((p, i) => (
        <input
          key={i}
          value={p}
          onChange={e => { const next = [...data.past_work]; next[i] = e.target.value; update({ past_work: next }); }}
          placeholder={`e.g. Vogue Italy Cover Feature`}
          style={{ width: '100%', padding: '9px 14px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 13, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box', marginBottom: 8 }}
        />
      ))}

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function Step4({ onNext, onBack }) {
  const { data, update } = useOnboarding();

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#000', marginBottom: 6, fontFamily: 'Poppins, sans-serif' }}>Rates & availability</h2>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28, fontFamily: 'Poppins, sans-serif' }}>Brands filter by budget fit. You can always change this later.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 6, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Minimum ($)</label>
          <input
            type="number"
            value={data.min_budget}
            onChange={e => update({ min_budget: Number(e.target.value) })}
            placeholder="0"
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 14, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: 10, color: '#999', marginTop: 4, fontFamily: 'Poppins, sans-serif' }}>I do not work below this</p>
        </div>
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 6, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Maximum ($)</label>
          <input
            type="number"
            value={data.max_budget}
            onChange={e => update({ max_budget: Number(e.target.value) })}
            placeholder="10000"
            style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 14, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
          />
          <p style={{ fontSize: 10, color: '#999', marginTop: 4, fontFamily: 'Poppins, sans-serif' }}>My max for a single project</p>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 12, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Availability</label>
        <div
          onClick={() => update({ is_available: !data.is_available })}
          style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
            border: `2px solid ${data.is_available ? '#000' : '#E5E7EB'}`,
            borderRadius: 6, cursor: 'pointer',
            background: data.is_available ? '#000' : '#fff',
            transition: 'all 0.2s',
          }}
        >
          <div style={{
            width: 40, height: 22, borderRadius: 11,
            background: data.is_available ? '#fff' : '#D1D5DB',
            position: 'relative', transition: 'background 0.2s',
          }}>
            <div style={{
              position: 'absolute', top: 3, left: data.is_available ? 20 : 3,
              width: 16, height: 16, borderRadius: '50%',
              background: data.is_available ? '#000' : '#fff',
              transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }} />
          </div>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: data.is_available ? '#fff' : '#333' }}>
            {data.is_available ? '✓ Available for Hire' : 'Not Taking Projects'}
          </span>
        </div>
      </div>

      <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 10, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Preferred Work Type</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        {WORK_TYPES.map(t => (
          <Chip
            key={t} label={t}
            selected={data.preferred_work_type.includes(t)}
            onClick={() => {
              const next = data.preferred_work_type.includes(t)
                ? data.preferred_work_type.filter(x => x !== t)
                : [...data.preferred_work_type, t];
              update({ preferred_work_type: next });
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: 11, color: '#999', fontFamily: 'Poppins, sans-serif', marginTop: 16, fontStyle: 'italic' }}>You can change all of this anytime from your dashboard.</p>

      <NavButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

function Step5({ onBack, onSubmit, loading }) {
  const { data, update } = useOnboarding();
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => update({ avatar_url: ev.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 800, color: '#000', marginBottom: 6, fontFamily: 'Poppins, sans-serif' }}>Your public face</h2>
      <p style={{ color: '#777', fontSize: 13, marginBottom: 28, fontFamily: 'Poppins, sans-serif' }}>Creators with photos get 3× more inquiries from brands.</p>

      {/* Avatar upload */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
        <div
          onClick={() => fileRef.current.click()}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            border: '2px dashed #D1D5DB',
            cursor: 'pointer', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: data.avatar_url ? 'transparent' : '#F9FAFB',
            flexShrink: 0,
          }}
        >
          {data.avatar_url
            ? <img src={data.avatar_url} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: 28 }}>📷</span>
          }
        </div>
        <div>
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            style={{ padding: '8px 18px', border: '1.5px solid #000', background: '#fff', borderRadius: 4, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700 }}
          >
            {data.avatar_url ? 'Change Photo' : 'Upload Photo'}
          </button>
          <p style={{ fontSize: 11, color: '#999', marginTop: 4, fontFamily: 'Poppins, sans-serif' }}>JPG, PNG or WebP — max 5MB</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>

      <Input label="Location" value={data.location} onChange={v => update({ location: v })} placeholder="City, Country" />

      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontWeight: 700, fontSize: 11, letterSpacing: 1.2, color: '#555', marginBottom: 6, fontFamily: 'Poppins, sans-serif', textTransform: 'uppercase' }}>Bio</label>
        <textarea
          value={data.bio}
          onChange={e => update({ bio: e.target.value })}
          maxLength={300}
          placeholder="Tell brands what you do and what makes your work unique..."
          rows={4}
          style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #E5E7EB', borderRadius: 4, fontSize: 14, fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
          onFocus={e => e.target.style.borderColor = '#000'}
          onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        />
        <p style={{ fontSize: 10, color: '#bbb', textAlign: 'right', fontFamily: 'Poppins, sans-serif' }}>{data.bio?.length || 0}/300</p>
      </div>

      <Input label="Portfolio Link (Optional)" value={data.website} onChange={v => update({ website: v })} placeholder="https://yourportfolio.com" />

      <NavButtons onBack={onBack} onNext={onSubmit} nextLabel="Complete My Profile 🎉" loading={loading} />
    </div>
  );
}

// ─── Celebration ──────────────────────────────────────────────────────────────

function Celebration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: 'center', padding: '40px 0' }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h2 style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Poppins, sans-serif', marginBottom: 8 }}>You're all set!</h2>
      <p style={{ color: '#777', fontFamily: 'Poppins, sans-serif', fontSize: 14 }}>Taking you to your dashboard...</p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const STEP_TITLES = [
  'Identity', 'Platforms', 'Style & Skills', 'Rates', 'Profile'
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const { data, clear, audienceTier } = useOnboarding();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const next = () => setStep(s => Math.min(s + 1, 5));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const submit = async () => {
    setLoading(true);
    try {
      // Compute audience tier
      const follower_count = parseInt(data.follower_count) || 0;
      let audience_tier = null;
      if (follower_count >= 1_000_000) audience_tier = 'Mega';
      else if (follower_count >= 100_000) audience_tier = 'Macro';
      else if (follower_count >= 10_000)  audience_tier = 'Micro';
      else if (follower_count >= 1)       audience_tier = 'Nano';

      const payload = {
        display_name:       data.display_name || user?.username,
        category:           data.category,
        tagline:            data.tagline,
        platforms:          data.platforms,
        primary_platform:   data.primary_platform || data.platforms[0] || '',
        follower_count,
        audience_tier,
        tags:               data.tags,
        qualifications:     data.qualifications.filter(Boolean),
        past_work:          data.past_work.filter(Boolean),
        min_budget:         data.min_budget,
        max_budget:         data.max_budget,
        is_available:       data.is_available,
        preferred_work_type: data.preferred_work_type,
        avatar_url:         data.avatar_url,
        location:           data.location,
        bio:                data.bio,
        website:            data.website,
        onboarding_complete: true,
      };

      // Save to backend
      await api.patch(`/creators/${user?.id}`, payload);

      // Update localStorage user object
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...storedUser, onboarding_complete: true, ...payload }));

      clear();
      setDone(true);
      setTimeout(() => navigate('/dashboard/creator', { replace: true }), 2000);
    } catch (err) {
      console.error('Onboarding save failed:', err);
      // Navigate anyway so the user isn't stuck
      clear();
      navigate('/dashboard/creator', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const stepComponents = [
    <Step1 onNext={next} />,
    <Step2 onNext={next} onBack={back} />,
    <Step3 onNext={next} onBack={back} />,
    <Step4 onNext={next} onBack={back} />,
    <Step5 onBack={back} onSubmit={submit} loading={loading} />,
  ];

  return (
    <>
      <Helmet>
        <title>Setup Your Profile — Driplens</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </Helmet>

      <div style={{
        minHeight: '100vh', background: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '0 16px 60px',
        fontFamily: 'Poppins, sans-serif',
      }}>
        {/* Top bar */}
        <div style={{
          width: '100%', maxWidth: 520,
          padding: '28px 0 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}>
          <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: 2, color: '#000' }}>DRIPLENS</div>
          {!done && (
            <>
              <ProgressBar step={step} />
              <p style={{ fontSize: 11, color: '#aaa', fontWeight: 600, letterSpacing: 1 }}>
                STEP {step} OF 5 — {STEP_TITLES[step - 1].toUpperCase()}
              </p>
            </>
          )}
        </div>

        {/* Card */}
        <div style={{
          width: '100%', maxWidth: 520,
          border: '1.5px solid #E5E7EB', borderRadius: 8,
          padding: '36px 36px',
          background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
        }}>
          {done ? (
            <Celebration />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.22 }}
              >
                {stepComponents[step - 1]}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </>
  );
}

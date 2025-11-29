import React, { useState } from 'react';
import { 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Play, 
  Layers, 
  Smartphone, 
  ChevronDown,
  Code,
  MessageCircle,
  X
} from 'lucide-react';
import { portfolioData, profileData } from './data';
import { ProjectCategory, AppProject, VideoProject, ThumbnailProject } from './types';
import BeforeAfterSlider from './components/BeforeAfterSlider';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'ALL'>('ALL');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const filteredProjects = activeTab === 'ALL' 
    ? portfolioData 
    : portfolioData.filter(p => p.category === activeTab);

  const apps = portfolioData.filter(p => p.category === ProjectCategory.APP) as AppProject[];
  const videos = portfolioData.filter(p => p.category === ProjectCategory.VIDEO) as VideoProject[];
  const thumbnails = portfolioData.filter(p => p.category === ProjectCategory.THUMBNAIL) as ThumbnailProject[];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Contato para freelance!");
    const body = encodeURIComponent(`Name: ${contactName}\n\nMessage:\n${contactMessage}`);
    window.location.href = `mailto:${profileData.social.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      
      {/* Header / Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-dark/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Meet {profileData.name}
          </span>
          <div className="flex gap-4">
            {profileData.social.linkedin && (
              <a href={profileData.social.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" title="LinkedIn">
                <Linkedin size={22} />
              </a>
            )}
            {profileData.social.whatsapp && (
              <a href={profileData.social.whatsapp} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-green-400 transition-colors" title="WhatsApp">
                <MessageCircle size={22} />
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-slate-800 border border-slate-700 text-sm font-medium text-primary">
            👋 Welcome to my portfolio
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">
            Turning ideas into <br/>
            <span className="bg-gradient-to-r from-primary via-secondary to-pink-500 bg-clip-text text-transparent">
              digital reality
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            {profileData.about}
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#portfolio" 
              className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all shadow-lg shadow-primary/25"
            >
              See Work
            </a>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full border border-slate-700 transition-all"
            >
              Contact Me
            </button>
          </div>
        </div>
        
        <a href="#portfolio" className="absolute bottom-4 animate-bounce text-slate-500">
          <ChevronDown size={24} />
        </a>
      </section>

      {/* Portfolio Sections */}
      <div id="portfolio" className="flex-1 w-full max-w-6xl mx-auto px-4 py-16 space-y-24">

        {/* 1. APPS & DEV */}
        {apps.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Smartphone size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Apps & Web</h2>
                <p className="text-slate-400">Projects developed with modern code</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => (
                <div key={app.id} className="bg-card rounded-xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all group hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="h-48 overflow-hidden relative">
                    <img src={app.imageUrl} alt={app.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{app.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{app.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {app.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a 
                        href={app.appLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium text-sm transition-colors"
                      >
                        <ExternalLink size={16} /> Open App
                      </a>
                      {app.repoLink && (
                        <a 
                          href={app.repoLink} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
                          title="View Code"
                        >
                          <Code size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2. THUMBNAILS (Before/After) */}
        {thumbnails.length > 0 && (
          <section>
             <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <Layers size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Image Editing</h2>
                <p className="text-slate-400">Before and after comparison</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {thumbnails.map((thumb) => (
                <div key={thumb.id} className="bg-card rounded-2xl p-4 border border-slate-700/50">
                  <div className="mb-4">
                     <BeforeAfterSlider 
                        beforeImage={thumb.imageBefore}
                        afterImage={thumb.imageAfter}
                        alt={thumb.title}
                     />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{thumb.title}</h3>
                  <p className="text-slate-400 text-sm mb-3">{thumb.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {thumb.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full border border-purple-500/30 text-purple-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. VÍDEOS */}
        {videos.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                <Play size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Video Production</h2>
                <p className="text-slate-400">Editing, motion graphics, and post-production</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {videos.map((video) => (
                <div key={video.id} className="group relative">
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                    <iframe 
                      src={video.videoUrl} 
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-2">{video.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-slate-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Let's work together?</h3>
          <div className="flex justify-center gap-6 mb-8">
             <button onClick={() => setIsContactOpen(true)} className="p-3 bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all">
                <Mail size={24} />
             </button>
             {profileData.social.whatsapp && (
              <a href={profileData.social.whatsapp} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-green-500 hover:text-white transition-all">
                <MessageCircle size={24} />
              </a>
             )}
             {profileData.social.linkedin && (
              <a href={profileData.social.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={24} />
              </a>
             )}
          </div>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} {profileData.name}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-card w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-2">Get in touch</h2>
              <p className="text-slate-400 mb-6">Fill in the form below to open your email client.</p>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Message</label>
                  <textarea 
                    id="message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-dark border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import { useState, useMemo } from 'react'

import logo from './assets/ACES LOGO.jpg'
import bgImage from './assets/BACKGROUND.jpg'

interface ResearchRepo {
  id: string;
  leadAuthor: string;
  coAuthors: string;
  title: string;
  abstract: string;
  methodology: string;
  category: string;
  type: 'Theory' | 'Student Research';
  year: string;
  institution: string;
  keywords: string;
  pdfUrl?: string; 
}

export default function App() {
  // Navigation & Auth
  const [activeTab, setActiveTab] = useState<'explore' | 'contribute' | 'login' | 'signup'>('explore');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser] = useState('Rhod Borja');
  const [showAbout, setShowAbout] = useState(false);

  // Form State (Submission)
  const [title, setTitle] = useState('');
  const [coAuthors, setCoAuthors] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [keywords, setKeywords] = useState('');
  const [abstract, setAbstract] = useState('');
  const [methodology, setMethodology] = useState('');
  const [type, setType] = useState<'Theory' | 'Student Research'>('Student Research');
  
  // Search & Filter & Data
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Theory' | 'Student Research'>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<ResearchRepo[]>([
    {
      id: '1',
      leadAuthor: 'Kathleen Gayle Lecong',
      coAuthors: 'Rhodcille Jhon M. Borja',
      title: 'THE ROLE OF INTERNSHIP PROGRAM ON WORKPLACE ADAPTABILITY OF NEWLY HIRED TEACHERS: A LITERATURE REVIEW',
      abstract: 'An analysis of how structured internship experiences influence the professional adjustment and pedagogical flexibility of first-year educators.',
      methodology: 'Qualitative Literature Review: Systematic analysis of peer-reviewed journals (2015-2025).',
      category: 'Educational Psychology',
      type: 'Student Research',
      year: '2026-04-20',
      institution: 'PUP Biñan',
      keywords: 'Internship, Adaptability, Pedagogy, Literature Review'
    }
  ]);

  const availableYears = useMemo(() => {
    const years = [...new Set(repos.map(r => r.year.split('-')[0]))].sort((a, b) => Number(b) - Number(a));
    return ['All', ...years];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let result = repos.filter(r => {
      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.leadAuthor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.keywords.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'All' || r.type === filterType;
      const matchesYear = filterYear === 'All' || r.year.startsWith(filterYear);
      return matchesSearch && matchesType && matchesYear;
    });
    if (sortBy === 'newest') result = result.sort((a, b) => b.year.localeCompare(a.year));
    if (sortBy === 'oldest') result = result.sort((a, b) => a.year.localeCompare(b.year));
    if (sortBy === 'az') result = result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'za') result = result.sort((a, b) => b.title.localeCompare(a.title));
    return result;
  }, [searchQuery, filterType, filterYear, sortBy, repos]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newEntry: ResearchRepo = {
        id: Date.now().toString(),
        leadAuthor: currentUser,
        coAuthors: coAuthors || 'N/A',
        title, abstract, methodology, type,
        category: 'Psychology', 
        year: publishDate || new Date().toISOString().split('T')[0], 
        institution: 'PUP Biñan',
        keywords: keywords || 'General'
      };
      setRepos([newEntry, ...repos]);
      setLoading(false);
      setActiveTab('explore');
      // Reset fields
      setTitle(''); setCoAuthors(''); setKeywords(''); setAbstract(''); setMethodology(''); setPublishDate('');
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen bg-slate-950 font-sans text-slate-200"
      style={{ 
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.93), rgba(15, 23, 42, 0.98)), url(${bgImage})`,
        backgroundSize: 'cover', backgroundAttachment: 'fixed'
      }}
    >
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowAbout(true)}>
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg shadow-lg" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">Psych<span className="text-indigo-500">Vault</span></span>
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.25em] items-center">
            <button onClick={() => setActiveTab('explore')} className={`transition-colors ${activeTab === 'explore' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>Archives</button>
            <button onClick={() => isLoggedIn ? setActiveTab('contribute') : setActiveTab('login')} className={`transition-colors ${activeTab === 'contribute' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>Contribute</button>
            {!isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveTab('login')} className={`transition-colors ${activeTab === 'login' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>Log In</button>
                <button onClick={() => setActiveTab('signup')} className="bg-indigo-600 px-5 py-2.5 rounded-xl text-white hover:bg-indigo-500 transition-all shadow-lg">Sign Up</button>
              </div>
            ) : (
              <button onClick={() => setIsLoggedIn(false)} className="text-red-400 font-bold">Logout</button>
            )}
          </div>
        </div>
      </nav>

      {/* ABOUT MODAL */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-6" onClick={() => setShowAbout(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-12 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4">
              <img src={logo} alt="Logo" className="w-14 h-14 rounded-2xl shadow-lg" />
              <div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Psych<span className="text-indigo-500">Vault</span></h2>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Neural Research Registry</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              PsychVault is an open-source digital repository dedicated to archiving psychological research, theories, and student studies solely made for <span className="text-white font-semibold">My Baby</span>.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-2xl font-black text-indigo-400">Open</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Access</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-2xl font-black text-indigo-400">PUP</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Biñan Campus</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest text-center">ACES Research Group • 2026</p>
            <button onClick={() => setShowAbout(false)} className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all">Close</button>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-6 py-12">
        
        {/* HERO SECTION */}
        {activeTab === 'explore' && searchQuery === '' && (
          <section className="text-center space-y-6 py-16 animate-in fade-in duration-1000">
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">Mapping the <span className="text-indigo-500">Human Mind.</span></h1>
            <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">A collective open-source repository for psychological research and pioneers.</p>
            <button onClick={() => document.getElementById('search-archive')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-indigo-600 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">Explore Archive</button>
          </section>
        )}

        {/* TAB: EXPLORE */}
        {activeTab === 'explore' && (
          <div id="search-archive" className="space-y-12 animate-in fade-in">
            <div className="relative group max-w-3xl mx-auto">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by title, author, or keywords..." className="w-full p-6 pl-16 bg-white/5 border border-white/10 rounded-[2rem] outline-none focus:border-indigo-500 transition-all text-lg" />
              <span className="absolute left-7 top-6.5 text-xl opacity-30">🔍</span>
            </div>

            {/* FILTER BAR */}
            <div className="flex flex-wrap gap-3 items-center justify-between max-w-3xl mx-auto">
              {/* Type Filter */}
              <div className="flex gap-2">
                {(['All', 'Student Research', 'Theory'] as const).map(t => (
                  <button key={t} onClick={() => setFilterType(t)}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${filterType === t ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-indigo-500/40 hover:text-white'}`}>
                    {t === 'All' ? '⬡ All Types' : t === 'Student Research' ? '📄 Student' : '📚 Theory'}
                  </button>
                ))}
              </div>

              {/* Year & Sort */}
              <div className="flex gap-2">
                <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none hover:border-indigo-500/40 transition-all cursor-pointer">
                  {availableYears.map(y => <option key={y} value={y}>{y === 'All' ? '📅 All Years' : y}</option>)}
                </select>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none hover:border-indigo-500/40 transition-all cursor-pointer">
                  <option value="newest">↓ Newest</option>
                  <option value="oldest">↑ Oldest</option>
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 max-w-3xl mx-auto">
              {filteredRepos.length} {filteredRepos.length === 1 ? 'entry' : 'entries'} found
              {filterType !== 'All' && <span className="text-indigo-500"> • {filterType}</span>}
              {filterYear !== 'All' && <span className="text-indigo-500"> • {filterYear}</span>}
            </p>
            <div className="grid gap-6">
              {filteredRepos.length === 0 && (
                <div className="text-center py-20 space-y-4">
                  <p className="text-5xl">🔬</p>
                  <p className="text-white font-black text-xl uppercase tracking-tight">No Studies Found</p>
                  <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                  <button onClick={() => { setSearchQuery(''); setFilterType('All'); setFilterYear('All'); }}
                    className="px-6 py-3 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600/40 transition-all">
                    Clear Filters
                  </button>
                </div>
              )}
              {filteredRepos.map(r => (
                <div key={r.id} className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full">{r.type}</span>
                    <span>Published: {r.year}</span>
                  </div>
                  <h3 className="text-3xl font-serif italic text-white mb-4 leading-tight">{r.title}</h3>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Principal Author: <span className="text-slate-200">{r.leadAuthor}</span> • Co-Authors: <span className="text-slate-400 font-medium uppercase italic">{r.coAuthors}</span></p>
                  <p className="text-sm text-slate-400 mb-6 italic">Keywords: {r.keywords}</p>
                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <p className="text-sm text-slate-400"><strong className="text-indigo-400 uppercase text-[10px] tracking-widest block mb-1">Abstract</strong> {r.abstract}</p>
                    <button className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors">📄 Download Full PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: CONTRIBUTE (The Updated Form) */}
        {activeTab === 'contribute' && isLoggedIn && (
          <div className="max-w-4xl mx-auto animate-in slide-in-from-right-12">
             <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                <header className="mb-10">
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Upload Publication</h2>
                  <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">New Repository Entry</p>
                </header>

                <form onSubmit={handlePublish} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Title of the Research</label>
                    <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter full research title..." className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500" />
                  </div>

                  {/* Authors & Date */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Co-Authors</label>
                      <input type="text" value={coAuthors} onChange={(e) => setCoAuthors(e.target.value)} placeholder="Separate with commas" className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Date Published</label>
                      <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-slate-400" />
                    </div>
                  </div>

                  {/* Keywords & Type */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Keywords</label>
                      <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. Psychology, IoT, Behavior" className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Archive Classification</label>
                      <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none text-slate-400">
                        <option value="Student Research">Student Research Paper</option>
                        <option value="Theory">Classical Theory Framework</option>
                      </select>
                    </div>
                  </div>

                  {/* Abstract & Methodology */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Abstract</label>
                    <textarea required rows={4} value={abstract} onChange={(e) => setAbstract(e.target.value)} placeholder="Provide a brief summary of the study..." className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 resize-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Methodology</label>
                    <input required type="text" value={methodology} onChange={(e) => setMethodology(e.target.value)} placeholder="e.g. Case Study, Quantitative Survey..." className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500" />
                  </div>

                  {/* PDF UPLOAD LINK */}
                  <div className="p-6 border border-dashed border-indigo-500/30 rounded-3xl bg-indigo-600/5 space-y-3">
                    <label className="block text-[10px] font-black uppercase text-indigo-400 tracking-widest text-center">Full Study Document (PDF)</label>
                    <input required type="file" accept=".pdf" className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer" />
                    <p className="text-[9px] text-slate-500 text-center">Maximum file size: 10MB</p>
                  </div>

                  <button className="w-full py-6 bg-white text-slate-950 font-black rounded-3xl uppercase tracking-widest text-xs hover:bg-indigo-400 hover:text-white transition-all shadow-xl">
                    {loading ? "Cataloging Entry..." : "Submit for Review"}
                  </button>
                </form>
            </div>
          </div>
        )}

        {/* AUTH TABS (SIGNUP / LOGIN) - Kept existing structure */}
        {activeTab === 'signup' && (
          <div className="max-w-2xl mx-auto animate-in zoom-in-95">
            <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-xl">
              <h2 className="text-4xl font-black text-white mb-10">Researcher Registry</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Full Name" className="p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none" />
                <input type="text" placeholder="Student ID (20XX-00XXX-BN-0)" className="p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none" />
                <input type="text" placeholder="Course" className="p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none" />
                <input type="text" placeholder="Grade Level" className="p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none" />
                <input type="text" placeholder="University" className="p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none md:col-span-2" />
                <input type="email" placeholder="Valid Email" className="p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none md:col-span-2" />
                <button type="button" onClick={() => {setIsLoggedIn(true); setActiveTab('explore')}} className="md:col-span-2 py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-indigo-500 transition-all">Complete Registration</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'login' && (
          <div className="max-w-md mx-auto py-12 text-center">
            <div className="bg-white/5 p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-xl">
              <h2 className="text-3xl font-black text-white mb-8">Sign In</h2>
              <div className="space-y-4 mb-10">
                <input type="text" placeholder="Student ID" className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none" />
                <input type="password" placeholder="Password" className="w-full p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none" />
              </div>
              <button onClick={() => {setIsLoggedIn(true); setActiveTab('explore')}} className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-2xl shadow-indigo-600/30">Authenticate</button>
            </div>
          </div>
        )}

      </main>

      <footer className="py-20 border-t border-white/5 text-center space-y-4 opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.8em]">PsychVault Neural Registry • 2026</p>
        <p className="text-[9px] font-bold italic uppercase">Polytechnic University of the Philippines - Biñan Campus • ACES Research Group</p>
      </footer>
    </div>
  )
}
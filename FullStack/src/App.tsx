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

interface Researcher {
  fullName: string;
  studentId: string;
  course: string;
  gradeLevel: string;
  university: string;
  profilePic: string | null;
}

const ADMIN_CREDENTIALS = { username: 'admin', password: 'admin123' };

const INITIAL_REPOS: ResearchRepo[] = [
  { id: '1', leadAuthor: 'Maria Santos', coAuthors: 'Juan dela Cruz, Ana Reyes', title: 'THE ROLE OF INTERNSHIP PROGRAM ON WORKPLACE ADAPTABILITY OF NEWLY HIRED TEACHERS: A LITERATURE REVIEW', abstract: 'An analysis of how structured internship experiences influence the professional adjustment and pedagogical flexibility of first-year educators in Philippine public schools.', methodology: 'Qualitative Literature Review: Systematic analysis of peer-reviewed journals (2015–2025).', category: 'Educational Psychology', type: 'Student Research', year: '2026-03-15', institution: 'PUP Biñan', keywords: 'Internship, Adaptability, Pedagogy, Literature Review', pdfUrl: '#' },
  { id: '2', leadAuthor: 'Carl Jung', coAuthors: 'N/A', title: 'ANALYTICAL PSYCHOLOGY AND THE THEORY OF THE COLLECTIVE UNCONSCIOUS', abstract: 'A foundational framework positing that the unconscious mind is shared among beings of the same species, comprising archetypes and instincts that influence behavior and personality development.', methodology: 'Theoretical Framework: Psychoanalytic case studies and philosophical inquiry.', category: 'Psychoanalytic Theory', type: 'Theory', year: '1916-01-01', institution: 'University of Zurich', keywords: 'Collective Unconscious, Archetypes, Psychoanalysis, Jung', pdfUrl: '#' },
  { id: '3', leadAuthor: 'Lena Cruz', coAuthors: 'Marco Villanueva', title: 'SOCIAL MEDIA USAGE AND ANXIETY LEVELS AMONG COLLEGE STUDENTS IN CALABARZON', abstract: 'This study examines the correlation between daily social media consumption and self-reported anxiety levels among undergraduate students in Region IV-A.', methodology: 'Quantitative Survey: 450 respondents, Likert-scale GAD-7 instrument, SPSS regression analysis.', category: 'Clinical Psychology', type: 'Student Research', year: '2025-11-20', institution: 'PUP Biñan', keywords: 'Social Media, Anxiety, GAD-7, College Students, Mental Health', pdfUrl: '#' },
  { id: '4', leadAuthor: 'Abraham Maslow', coAuthors: 'N/A', title: 'A THEORY OF HUMAN MOTIVATION: THE HIERARCHY OF NEEDS', abstract: 'Maslow proposes a motivational theory comprising a five-tier model of human needs, from physiological and safety needs to love, esteem, and self-actualization.', methodology: 'Theoretical Framework: Humanistic psychology, biographical case analysis.', category: 'Humanistic Psychology', type: 'Theory', year: '1943-07-01', institution: 'Brooklyn College', keywords: 'Hierarchy of Needs, Motivation, Self-Actualization, Humanistic Psychology', pdfUrl: '#' },
  { id: '5', leadAuthor: 'Patricia Gomez', coAuthors: 'Rhea Mendoza, Karl Bautista', title: 'ACADEMIC BURNOUT AND COPING MECHANISMS AMONG BS PSYCHOLOGY STUDENTS POST-PANDEMIC', abstract: 'This research investigates the prevalence of academic burnout and identifies coping strategies adopted by Psychology students following the COVID-19 pandemic disruption.', methodology: 'Mixed Methods: MBI-SS burnout scale, focus group discussions, thematic analysis.', category: 'Educational Psychology', type: 'Student Research', year: '2025-06-30', institution: 'PUP Biñan', keywords: 'Academic Burnout, Coping Mechanisms, Post-Pandemic, MBI-SS', pdfUrl: '#' },
  { id: '6', leadAuthor: 'B.F. Skinner', coAuthors: 'N/A', title: 'OPERANT CONDITIONING: REINFORCEMENT, PUNISHMENT, AND BEHAVIORAL SHAPING', abstract: "Skinner's theory describes how behavior is modified through its consequences, introducing schedules of reinforcement and the concept of behavior shaping through successive approximations.", methodology: 'Experimental: Controlled laboratory studies using Skinner Box, behavioral observation.', category: 'Behavioral Psychology', type: 'Theory', year: '1938-01-01', institution: 'Harvard University', keywords: 'Operant Conditioning, Reinforcement, Punishment, Behaviorism, Skinner', pdfUrl: '#' },
  { id: '7', leadAuthor: 'Jerome Reyes', coAuthors: 'Christelle Lim', title: 'PARENTING STYLES AND SELF-ESTEEM AMONG ADOLESCENTS IN URBAN LAGUNA', abstract: 'An investigation of how authoritative, authoritarian, and permissive parenting styles predict self-esteem scores among Filipino teenagers aged 13–18 in urban communities.', methodology: 'Quantitative Correlational: Rosenberg Self-Esteem Scale, Parenting Styles Questionnaire, n=312.', category: 'Developmental Psychology', type: 'Student Research', year: '2025-09-12', institution: 'PUP Biñan', keywords: 'Parenting Styles, Self-Esteem, Adolescents, Rosenberg, Developmental', pdfUrl: '#' },
  { id: '8', leadAuthor: 'Albert Bandura', coAuthors: 'N/A', title: 'SOCIAL LEARNING THEORY: OBSERVATIONAL LEARNING AND SELF-EFFICACY', abstract: "Bandura argues that people learn from observing others and that self-efficacy—one's belief in their capability to execute behaviors—is a central determinant of motivation and performance.", methodology: 'Experimental: Bobo Doll experiments, longitudinal observation studies.', category: 'Social Psychology', type: 'Theory', year: '1977-01-01', institution: 'Stanford University', keywords: 'Social Learning, Self-Efficacy, Observational Learning, Bandura, Modeling', pdfUrl: '#' },
  { id: '9', leadAuthor: 'Bianca Torres', coAuthors: 'Nathaniel Aquino, Sofia Castillo', title: 'RESILIENCE AND ACADEMIC PERFORMANCE: MEDIATING ROLE OF GROWTH MINDSET IN STEM STUDENTS', abstract: 'This study tests whether growth mindset mediates the relationship between psychological resilience and academic performance in STEM-track senior high school students.', methodology: 'Quantitative: Structural Equation Modeling (SEM), Connor-Davidson Resilience Scale, DWECK Mindset Inventory.', category: 'Educational Psychology', type: 'Student Research', year: '2026-01-18', institution: 'PUP Biñan', keywords: 'Resilience, Growth Mindset, STEM, SEM, Academic Performance', pdfUrl: '#' },
  { id: '10', leadAuthor: 'Ivan Pavlov', coAuthors: 'N/A', title: 'CLASSICAL CONDITIONING: STIMULUS-RESPONSE THEORY OF BEHAVIORAL LEARNING', abstract: "Pavlov's landmark discovery describes how a neutral stimulus, when repeatedly paired with an unconditioned stimulus, comes to elicit a conditioned response.", methodology: 'Experimental: Controlled experiments with dogs, salivation measurement, stimulus pairing.', category: 'Behavioral Psychology', type: 'Theory', year: '1897-01-01', institution: 'Imperial Military Medical Academy, Russia', keywords: 'Classical Conditioning, Stimulus-Response, Pavlov, Behaviorism, Reflex', pdfUrl: '#' },
  { id: '11', leadAuthor: 'Rachel Domingo', coAuthors: 'Luis Fernando', title: 'LONELINESS AND SMARTPHONE DEPENDENCY AMONG WORKING ADULTS IN METRO MANILA', abstract: 'Explores the relationship between loneliness scores and smartphone dependency levels among remote workers, highlighting the role of digital communication in moderating social isolation.', methodology: 'Quantitative Survey: UCLA Loneliness Scale, Smartphone Addiction Scale–Short Version, n=280.', category: 'Clinical Psychology', type: 'Student Research', year: '2025-08-04', institution: 'PUP Biñan', keywords: 'Loneliness, Smartphone Dependency, Remote Work, Digital Isolation, SAS-SV', pdfUrl: '#' },
  { id: '12', leadAuthor: 'Erik Erikson', coAuthors: 'N/A', title: 'PSYCHOSOCIAL DEVELOPMENT: EIGHT STAGES OF THE HUMAN LIFE CYCLE', abstract: "Erikson's theory outlines eight developmental stages from infancy to late adulthood, each marked by a psychosocial conflict that must be resolved to achieve psychological health.", methodology: 'Theoretical: Cross-cultural biographical analysis, clinical observation, psychoanalytic synthesis.', category: 'Developmental Psychology', type: 'Theory', year: '1950-01-01', institution: 'University of California, Berkeley', keywords: 'Psychosocial Development, Erikson, Identity, Life Stages, Personality', pdfUrl: '#' },
  { id: '13', leadAuthor: 'Theo Pascual', coAuthors: 'Angela Vitug, Nico Sy', title: 'MINDFULNESS-BASED STRESS REDUCTION (MBSR) AND ITS EFFECT ON DEPRESSIVE SYMPTOMS IN UNIVERSITY STUDENTS', abstract: 'A pre-test/post-test experimental study testing an 8-week adapted MBSR program on depressive symptom reduction in university students with mild-to-moderate depression.', methodology: 'Quasi-Experimental: PHQ-9 pre/post measurement, 8-week MBSR intervention, control group comparison.', category: 'Clinical Psychology', type: 'Student Research', year: '2025-12-05', institution: 'PUP Biñan', keywords: 'MBSR, Mindfulness, Depression, PHQ-9, Intervention, University Students', pdfUrl: '#' },
  { id: '14', leadAuthor: 'Lev Vygotsky', coAuthors: 'N/A', title: 'SOCIOCULTURAL THEORY OF COGNITIVE DEVELOPMENT AND THE ZONE OF PROXIMAL DEVELOPMENT', abstract: 'Vygotsky proposes that cognitive development is fundamentally social in origin, introducing the Zone of Proximal Development (ZPD) as the gap between independent capability and guided potential.', methodology: 'Theoretical: Naturalistic observation, comparative cross-cultural developmental studies.', category: 'Developmental Psychology', type: 'Theory', year: '1934-01-01', institution: 'Moscow State University', keywords: 'ZPD, Sociocultural Theory, Cognitive Development, Vygotsky, Scaffolding', pdfUrl: '#' },
  { id: '15', leadAuthor: 'Claire Evangelista', coAuthors: 'Mark Hernandez', title: 'DEATH ANXIETY AND RELIGIOSITY AMONG ELDERLY FILIPINOS IN LONG-TERM CARE FACILITIES', abstract: 'Investigates whether intrinsic religiosity buffers death anxiety in elderly residents of long-term care facilities in Laguna Province, using a correlational design.', methodology: 'Quantitative Correlational: Templer Death Anxiety Scale, Religious Orientation Scale, n=150.', category: 'Gerontological Psychology', type: 'Student Research', year: '2025-04-22', institution: 'PUP Biñan', keywords: 'Death Anxiety, Religiosity, Elderly, Long-Term Care, Gerontology', pdfUrl: '#' },
  { id: '16', leadAuthor: 'Jean Piaget', coAuthors: 'N/A', title: 'COGNITIVE DEVELOPMENT THEORY: STAGES OF INTELLECTUAL GROWTH IN CHILDREN', abstract: 'Piaget describes four sequential stages of cognitive development—sensorimotor, preoperational, concrete operational, and formal operational—through which children construct understanding of the world.', methodology: 'Experimental: Clinical interview method, naturalistic observation of children, conservation tasks.', category: 'Developmental Psychology', type: 'Theory', year: '1952-01-01', institution: 'University of Geneva', keywords: 'Cognitive Development, Piaget, Stages, Schema, Conservation, Child Psychology', pdfUrl: '#' },
  { id: '17', leadAuthor: 'Daniel Navarro', coAuthors: 'Cristina Ocampo, Paolo Dela Rosa', title: 'PEER VICTIMIZATION AND EMOTIONAL REGULATION AMONG MIDDLE SCHOOL STUDENTS: A CROSS-SECTIONAL STUDY', abstract: 'This study examines how peer victimization (bullying) affects emotional regulation capacity in Grades 7–9 students, with gender and family cohesion as moderating variables.', methodology: 'Quantitative: DERS emotional regulation scale, Olweus Bully/Victim Questionnaire, multi-level regression, n=389.', category: 'Social Psychology', type: 'Student Research', year: '2026-02-28', institution: 'PUP Biñan', keywords: 'Bullying, Peer Victimization, Emotional Regulation, DERS, Middle School', pdfUrl: '#' },
  { id: '18', leadAuthor: 'Aaron Beck', coAuthors: 'N/A', title: 'COGNITIVE THEORY OF DEPRESSION: NEGATIVE COGNITIVE TRIAD AND SCHEMA', abstract: "Beck's cognitive model of depression centers on the negative cognitive triad—negative views of self, world, and future—and maladaptive schemas as the cognitive architecture underlying depressive disorders.", methodology: 'Clinical: Structured patient interviews, development of Beck Depression Inventory, CBT outcome studies.', category: 'Clinical Psychology', type: 'Theory', year: '1967-01-01', institution: 'University of Pennsylvania', keywords: 'Cognitive Theory, Depression, Beck, CBT, Negative Triad, Schema', pdfUrl: '#' },
  { id: '19', leadAuthor: 'Francesca Abad', coAuthors: 'Timothy Chua', title: 'IMPOSTER SYNDROME AND CAREER SELF-EFFICACY AMONG FRESH GRADUATES IN THE IT SECTOR', abstract: 'Examines the prevalence of imposter syndrome and its negative relationship with career self-efficacy among newly employed IT graduates in Metro Manila, with gender as a moderating variable.', methodology: 'Quantitative: Clance Imposter Phenomenon Scale, Career Decision Self-Efficacy Scale, moderation analysis, n=210.', category: 'Industrial/Organizational Psychology', type: 'Student Research', year: '2025-10-17', institution: 'PUP Biñan', keywords: 'Imposter Syndrome, Self-Efficacy, IT Sector, Fresh Graduates, Career Psychology', pdfUrl: '#' },
  { id: '20', leadAuthor: 'Sigmund Freud', coAuthors: 'N/A', title: 'THE INTERPRETATION OF DREAMS AND THE STRUCTURE OF THE UNCONSCIOUS MIND', abstract: "Freud's seminal work presents the theory that dreams are the royal road to the unconscious, introducing the structural model of the psyche (id, ego, superego) and the mechanisms of repression and wish fulfillment.", methodology: 'Psychoanalytic: Free association, dream analysis, case studies of neurotic patients.', category: 'Psychoanalytic Theory', type: 'Theory', year: '1899-11-04', institution: 'University of Vienna', keywords: 'Unconscious, Dreams, Freud, Id Ego Superego, Psychoanalysis, Repression', pdfUrl: '#' }
];

const INITIAL_RESEARCHERS: Researcher[] = [
  { fullName: 'Maria Santos', studentId: '2022-00142-BN-0', course: 'BS Psychology', gradeLevel: '4th Year', university: 'PUP Biñan', profilePic: null },
  { fullName: 'Lena Cruz', studentId: '2022-00198-BN-0', course: 'BS Psychology', gradeLevel: '4th Year', university: 'PUP Biñan', profilePic: null },
  { fullName: 'Patricia Gomez', studentId: '2023-00056-BN-0', course: 'BS Psychology', gradeLevel: '3rd Year', university: 'PUP Biñan', profilePic: null },
  { fullName: 'Jerome Reyes', studentId: '2021-00311-BN-0', course: 'BS Psychology', gradeLevel: '4th Year', university: 'PUP Biñan', profilePic: null },
  { fullName: 'Bianca Torres', studentId: '2023-00089-BN-0', course: 'BS Psychology', gradeLevel: '3rd Year', university: 'PUP Biñan', profilePic: null }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'contribute' | 'login' | 'signup' | 'profile' | 'admin'>('explore');
  // Controls whether to show the hero/landing section or jump straight to the archive search
  const [showArchive, setShowArchive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [userProfile, setUserProfile] = useState<Researcher>({ fullName: '', studentId: '', course: '', gradeLevel: '', university: '', profilePic: null });
  const [researchers, setResearchers] = useState<Researcher[]>(INITIAL_RESEARCHERS);

  const [regName, setRegName] = useState('');
  const [regId, setRegId] = useState('');
  const [regCourse, setRegCourse] = useState('');
  const [regLevel, setRegLevel] = useState('');
  const [regUni, setRegUni] = useState('');

  const [adminRegName, setAdminRegName] = useState('');
  const [adminRegId, setAdminRegId] = useState('');
  const [adminRegCourse, setAdminRegCourse] = useState('');
  const [adminRegLevel, setAdminRegLevel] = useState('');
  const [adminRegUni, setAdminRegUni] = useState('');

  const [title, setTitle] = useState('');
  const [coAuthors, setCoAuthors] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [keywords, setKeywords] = useState('');
  const [abstract, setAbstract] = useState('');
  const [methodology, setMethodology] = useState('');
  const [type, setType] = useState<'Theory' | 'Student Research'>('Student Research');

  const [adminTitle, setAdminTitle] = useState('');
  const [adminLeadAuthor, setAdminLeadAuthor] = useState('');
  const [adminCoAuthors, setAdminCoAuthors] = useState('');
  const [adminPublishDate, setAdminPublishDate] = useState('');
  const [adminKeywords, setAdminKeywords] = useState('');
  const [adminAbstract, setAdminAbstract] = useState('');
  const [adminMethodology, setAdminMethodology] = useState('');
  const [adminType, setAdminType] = useState<'Theory' | 'Student Research'>('Student Research');
  const [adminPanel, setAdminPanel] = useState<'repos' | 'researchers' | 'addRepo' | 'addResearcher'>('repos');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Theory' | 'Student Research'>('All');
  const [filterYear, setFilterYear] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'az' | 'za'>('newest');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<ResearchRepo[]>(INITIAL_REPOS);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserProfile(prev => ({ ...prev, profilePic: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const navigate = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Reset archive view when navigating away from explore
    if (tab !== 'explore') setShowArchive(false);
  };

  // Called by "Explore Full Archive" button on the hero — shows archive section directly
  const openArchive = () => {
    setShowArchive(true);
    setActiveTab('explore');
    // Small timeout to let React render before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const userStudies = useMemo(() => repos.filter(r => r.leadAuthor.toLowerCase() === currentUser.toLowerCase()), [repos, currentUser]);
  const availableYears = useMemo(() => {
    const years = [...new Set(repos.map(r => r.year.split('-')[0]))].sort((a, b) => Number(b) - Number(a));
    return ['All', ...years];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    let result = repos.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.leadAuthor.toLowerCase().includes(searchQuery.toLowerCase()) || r.keywords.toLowerCase().includes(searchQuery.toLowerCase());
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

  const recentRepos = useMemo(() => [...repos].sort((a, b) => b.year.localeCompare(a.year)).slice(0, 4), [repos]);

  const handleLogin = () => {
    setLoginError('');
    if (loginId === ADMIN_CREDENTIALS.username && loginPassword === ADMIN_CREDENTIALS.password) {
      setIsAdmin(true); setIsLoggedIn(true); setCurrentUser('Administrator');
      navigate('admin'); setLoginId(''); setLoginPassword('');
    } else { setLoginError('Invalid credentials. Please try again.'); }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setIsAdmin(false); setCurrentUser('');
    setUserProfile({ fullName: '', studentId: '', course: '', gradeLevel: '', university: '', profilePic: null });
    setShowArchive(false);
    navigate('explore');
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      setRepos([{ id: Date.now().toString(), leadAuthor: currentUser, coAuthors: coAuthors || 'N/A', title, abstract, methodology, type, category: 'Psychology', year: publishDate || new Date().toISOString().split('T')[0], institution: 'PUP Biñan', keywords: keywords || 'General', pdfUrl: '#' }, ...repos]);
      setLoading(false); navigate('explore');
      setTitle(''); setCoAuthors(''); setKeywords(''); setAbstract(''); setMethodology(''); setPublishDate('');
    }, 1500);
  };

  const handleAdminAddRepo = (e: React.FormEvent) => {
    e.preventDefault();
    setRepos([{ id: Date.now().toString(), leadAuthor: adminLeadAuthor || 'Unknown', coAuthors: adminCoAuthors || 'N/A', title: adminTitle, abstract: adminAbstract, methodology: adminMethodology, type: adminType, category: 'Psychology', year: adminPublishDate || new Date().toISOString().split('T')[0], institution: 'PUP Biñan', keywords: adminKeywords || 'General', pdfUrl: '#' }, ...repos]);
    setAdminTitle(''); setAdminLeadAuthor(''); setAdminCoAuthors(''); setAdminPublishDate(''); setAdminKeywords(''); setAdminAbstract(''); setAdminMethodology('');
    setAdminPanel('repos');
  };

  const handleAdminAddResearcher = (e: React.FormEvent) => {
    e.preventDefault();
    setResearchers([...researchers, { fullName: adminRegName, studentId: adminRegId, course: adminRegCourse, gradeLevel: adminRegLevel, university: adminRegUni, profilePic: null }]);
    setAdminRegName(''); setAdminRegId(''); setAdminRegCourse(''); setAdminRegLevel(''); setAdminRegUni('');
    setAdminPanel('researchers');
  };

  const handleCompleteRegistration = () => {
    const r: Researcher = { fullName: regName, studentId: regId, course: regCourse, gradeLevel: regLevel, university: regUni, profilePic: null };
    setCurrentUser(regName); setUserProfile(r); setResearchers(prev => [...prev, r]);
    setIsLoggedIn(true); navigate('explore');
  };

  const inputCls = "w-full p-3 sm:p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 text-sm text-slate-200 placeholder:text-slate-600";
  const adminInputCls = "w-full p-3 sm:p-4 bg-slate-950/50 border border-white/10 rounded-2xl outline-none focus:border-amber-500 text-sm text-slate-200 placeholder:text-slate-600";
  const labelCls = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1";

  // ── BACKGROUND: use a wrapper div with absolute positioning so it works on all devices
  // backgroundAttachment: 'fixed' is broken on iOS Safari and many Android browsers.
  // Instead we use a fixed-position pseudo-layer via an absolutely positioned div.
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 relative">
      {/* Background layer — fixed position works cross-device unlike backgroundAttachment:fixed */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(rgba(15,23,42,0.93), rgba(15,23,42,0.98))',
        }}
      />

      {/* All content sits above the background layers */}
      <div className="relative" style={{ zIndex: 2 }}>

        {/* ── NAVBAR ── */}
        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => setShowAbout(true)}>
              <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg shadow-lg" />
              <span className="text-base sm:text-xl font-black tracking-tighter text-white uppercase">Psych<span className="text-indigo-500">Vault</span></span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.25em] items-center">
              <button
                onClick={() => { setShowArchive(false); navigate('explore'); }}
                className={`transition-colors ${activeTab === 'explore' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Archives
              </button>
              {isLoggedIn && !isAdmin && <button onClick={() => navigate('contribute')} className={`transition-colors ${activeTab === 'contribute' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>Contribute</button>}
              {isAdmin && <button onClick={() => navigate('admin')} className={`transition-colors ${activeTab === 'admin' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>Admin Panel</button>}
              {!isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => navigate('login')} className={`transition-colors ${activeTab === 'login' ? 'text-indigo-500' : 'text-slate-500 hover:text-slate-300'}`}>Log In</button>
                  <button onClick={() => navigate('signup')} className="bg-indigo-600 px-4 py-2 rounded-xl text-white hover:bg-indigo-500 transition-all shadow-lg text-[10px]">Sign Up</button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {!isAdmin && (
                    <button onClick={() => navigate('profile')} className={`flex items-center gap-2 transition-colors ${activeTab === 'profile' ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}>
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black overflow-hidden border border-white/10">
                        {userProfile.profilePic ? <img src={userProfile.profilePic} alt="PFP" className="w-full h-full object-cover" /> : currentUser.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[10px]">{currentUser}</span>
                    </button>
                  )}
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-black border border-white/10">⚙</div>
                      <span className="text-amber-400 font-black text-[10px]">Administrator</span>
                    </div>
                  )}
                  <button onClick={handleLogout} className="text-red-400 font-bold text-[10px]">Logout</button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-slate-400 transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/5 mt-3 pt-3 pb-2 px-4 space-y-1">
              <button
                onClick={() => { setShowArchive(false); navigate('explore'); }}
                className={`w-full text-left py-2.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${activeTab === 'explore' && !showArchive ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'}`}
              >
                📚 Archives
              </button>
              {isLoggedIn && !isAdmin && <button onClick={() => navigate('contribute')} className={`w-full text-left py-2.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${activeTab === 'contribute' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'}`}>✏️ Contribute</button>}
              {isAdmin && <button onClick={() => navigate('admin')} className={`w-full text-left py-2.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${activeTab === 'admin' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}>⚙️ Admin Panel</button>}
              {isLoggedIn && !isAdmin && <button onClick={() => navigate('profile')} className={`w-full text-left py-2.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${activeTab === 'profile' ? 'text-indigo-400 bg-indigo-500/10' : 'text-slate-400'}`}>👤 My Profile</button>}
              {!isLoggedIn ? (
                <div className="flex gap-2 pt-1">
                  <button onClick={() => navigate('login')} className="flex-1 py-2.5 text-center text-[11px] font-black uppercase tracking-widest text-slate-400 border border-white/10 rounded-xl hover:border-indigo-500/40 transition-colors">Log In</button>
                  <button onClick={() => navigate('signup')} className="flex-1 py-2.5 text-center text-[11px] font-black uppercase tracking-widest bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors">Sign Up</button>
                </div>
              ) : (
                <button onClick={handleLogout} className="w-full text-left py-2.5 px-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-red-400">🚪 Logout</button>
              )}
            </div>
          )}
        </nav>

        {/* ABOUT MODAL */}
        {showAbout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={() => setShowAbout(false)}>
            <div className="bg-slate-900 border border-white/10 rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 max-w-lg w-full shadow-2xl space-y-5" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-lg" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">Psych<span className="text-indigo-500">Vault</span></h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Neural Research Registry</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">PsychVault is an open-source digital repository dedicated to archiving psychological research, theories, and student studies from <span className="text-white font-semibold">PUP Biñan Campus</span>.</p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5"><p className="text-xl sm:text-2xl font-black text-indigo-400">Open</p><p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Access</p></div>
                <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/5"><p className="text-xl sm:text-2xl font-black text-indigo-400">PUP</p><p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Biñan Campus</p></div>
              </div>
              <button onClick={() => setShowAbout(false)} className="w-full py-3 sm:py-4 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all">Close</button>
            </div>
          </div>
        )}

        <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-12">

          {/* ── HERO LANDING — shown only when on explore tab and showArchive is false ── */}
          {activeTab === 'explore' && !showArchive && (
            <section className="space-y-10 sm:space-y-16 py-4 sm:py-6">
              <div className="text-center space-y-4 sm:space-y-6 px-2">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                  {repos.length} Studies Archived
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
                  Mapping the <span className="text-indigo-500">Human Mind.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-lg leading-relaxed">A collective open-source repository for psychological research and pioneers.</p>
                {/* ── FIX: button now calls openArchive() which sets showArchive=true ── */}
                <button
                  onClick={openArchive}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 rounded-full font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20 active:scale-95"
                >
                  Explore Full Archive
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto">
                {[
                  { label: 'Total Entries', value: repos.length },
                  { label: 'Student Research', value: repos.filter(r => r.type === 'Student Research').length },
                  { label: 'Classic Theories', value: repos.filter(r => r.type === 'Theory').length },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl p-3 sm:p-6 text-center">
                    <p className="text-2xl sm:text-3xl font-black text-indigo-400">{s.value}</p>
                    <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Recently Added */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-1 h-5 sm:h-6 bg-indigo-500 rounded-full"></span>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Recently Added</h2>
                  </div>
                  <button onClick={openArchive} className="text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 transition-colors">View All →</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {recentRepos.map(r => (
                    <div key={r.id} className="group bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 transition-all cursor-pointer active:scale-[0.98]"
                      onClick={openArchive}>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 sm:px-3 py-1 rounded-full ${r.type === 'Theory' ? 'bg-purple-500/10 text-purple-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                          {r.type === 'Theory' ? '📚 Theory' : '📄 Student'}
                        </span>
                        <span className="text-[9px] text-slate-600 font-mono">{r.year}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug mb-2 line-clamp-2">{r.title}</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-1">{r.leadAuthor}</p>
                      <p className="text-[10px] text-slate-600 italic line-clamp-2">{r.abstract}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── ARCHIVE SEARCH — shown when showArchive=true OR when user types in search ── */}
          {activeTab === 'explore' && showArchive && (
            <div className="space-y-5 sm:space-y-8 pt-2">
              {/* Back to home button */}
              <button
                onClick={() => { setShowArchive(false); setSearchQuery(''); setFilterType('All'); setFilterYear('All'); }}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors mb-2"
              >
                ← Back to Home
              </button>

              {/* Search */}
              <div className="relative max-w-3xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by title, author, or keywords..."
                  className="w-full p-4 sm:p-5 pl-12 sm:pl-14 bg-white/5 border border-white/10 rounded-2xl sm:rounded-[2rem] outline-none focus:border-indigo-500 transition-all text-sm sm:text-base"
                  autoFocus
                />
                <span className="absolute left-4 sm:left-5 top-4 sm:top-5 text-base sm:text-lg opacity-30">🔍</span>
              </div>

              {/* Filters — scrollable row on mobile */}
              <div className="flex flex-col gap-3 max-w-3xl mx-auto">
                <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                  {(['All', 'Student Research', 'Theory'] as const).map(t => (
                    <button key={t} onClick={() => setFilterType(t)}
                      className={`shrink-0 px-3 sm:px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${filterType === t ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-indigo-500/40'}`}>
                      {t === 'All' ? '⬡ All' : t === 'Student Research' ? '📄 Student' : '📚 Theory'}
                    </button>
                  ))}
                  {/* Year and sort dropdowns inline on mobile too */}
                  <select value={filterYear} onChange={e => setFilterYear(e.target.value)}
                    className="shrink-0 px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none cursor-pointer">
                    {availableYears.map(y => <option key={y} value={y}>{y === 'All' ? '📅 All Years' : y}</option>)}
                  </select>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                    className="shrink-0 px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none cursor-pointer">
                    <option value="newest">↓ Newest</option>
                    <option value="oldest">↑ Oldest</option>
                    <option value="az">A → Z</option>
                    <option value="za">Z → A</option>
                  </select>
                </div>
              </div>

              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 max-w-3xl mx-auto">
                {filteredRepos.length} {filteredRepos.length === 1 ? 'entry' : 'entries'} found
                {filterType !== 'All' && <span className="text-indigo-500"> • {filterType}</span>}
                {filterYear !== 'All' && <span className="text-indigo-500"> • {filterYear}</span>}
              </p>

              <div className="grid gap-4 sm:gap-6">
                {filteredRepos.map(r => (
                  <div key={r.id} className="bg-slate-900/40 p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-white/5 hover:border-indigo-500/30 transition-all backdrop-blur-sm">
                    <div className="flex flex-wrap justify-between items-center mb-3 sm:mb-5 gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <span className={`px-3 py-1 rounded-full ${r.type === 'Theory' ? 'bg-purple-500/10 text-purple-400' : 'bg-indigo-500/10 text-indigo-400'}`}>{r.type}</span>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        <span className="text-slate-600 hidden sm:inline">{r.category}</span>
                        <span>Published: {r.year}</span>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-serif italic text-white mb-3 sm:mb-4 leading-tight">{r.title}</h3>
                    <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-2 leading-relaxed">
                      Principal Author: <span className="text-slate-200">{r.leadAuthor}</span>
                    </p>
                    <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                      Co-Authors: <span className="text-slate-400 font-medium uppercase italic">{r.coAuthors}</span>
                    </p>
                    <p className="text-[10px] text-slate-600 mb-1">🏛 {r.institution}</p>
                    <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-5 italic">🔑 {r.keywords}</p>
                    <div className="space-y-3 sm:space-y-4 border-t border-white/5 pt-4 sm:pt-5">
                      <p className="text-xs sm:text-sm text-slate-400"><strong className="text-indigo-400 uppercase text-[10px] tracking-widest block mb-1">Abstract</strong>{r.abstract}</p>
                      <p className="text-xs sm:text-sm text-slate-500"><strong className="text-slate-600 uppercase text-[10px] tracking-widest block mb-1">Methodology</strong>{r.methodology}</p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a href={r.pdfUrl} target="_blank" rel="noreferrer" className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">👁️ View Online</a>
                        <a href={r.pdfUrl} download className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">📥 Download PDF</a>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredRepos.length === 0 && (
                  <div className="bg-slate-900/40 p-10 sm:p-20 rounded-3xl sm:rounded-[3rem] border border-dashed border-white/10 text-center space-y-4">
                    <p className="text-4xl sm:text-5xl">🔬</p>
                    <p className="text-white font-black text-lg sm:text-xl uppercase tracking-tight">No Studies Found</p>
                    <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
                    <button onClick={() => { setSearchQuery(''); setFilterType('All'); setFilterYear('All'); }} className="px-6 py-3 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600/40 transition-all">Clear Filters</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── PROFILE ── */}
          {activeTab === 'profile' && isLoggedIn && !isAdmin && (
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-[3rem] p-5 sm:p-10 backdrop-blur-xl flex flex-col items-center sm:flex-row sm:items-start gap-5 sm:gap-10">
                <div className="relative group shrink-0">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl sm:text-4xl font-black shadow-2xl overflow-hidden border-2 border-white/10">
                    {userProfile.profilePic ? <img src={userProfile.profilePic} alt="PFP" className="w-full h-full object-cover" /> : currentUser.split(' ').map(n => n[0]).join('')}
                  </div>
                  <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl sm:rounded-[2.5rem] cursor-pointer text-[10px] font-black uppercase tracking-widest text-white">
                    Change <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
                  </label>
                </div>
                <div className="text-center sm:text-left space-y-2 sm:space-y-3 w-full">
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter break-words">{userProfile.fullName}</h2>
                  <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.3em]">Verified Researcher • {userProfile.university}</p>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{userProfile.course} • {userProfile.gradeLevel}</p>
                  <p className="text-slate-600 text-[9px] font-mono">ID: {userProfile.studentId}</p>
                  <div className="px-5 py-3 bg-white/5 rounded-2xl border border-white/5 inline-block text-center mt-2">
                    <p className="text-2xl font-bold text-white">{userStudies.length}</p>
                    <p className="text-[8px] uppercase tracking-widest text-slate-500">Publications</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 ml-1 sm:ml-2">My Published Repositories</h3>
                {userStudies.length === 0 ? (
                  <div className="bg-slate-900/40 p-10 sm:p-16 rounded-2xl sm:rounded-[3rem] border border-dashed border-white/10 text-center">
                    <p className="text-slate-500 italic text-sm mb-4">No personal research cataloged yet.</p>
                    <button onClick={() => navigate('contribute')} className="text-indigo-500 font-black uppercase text-[10px] tracking-widest">Start First Submission →</button>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:gap-4">
                    {userStudies.map(r => (
                      <div key={r.id} className="group bg-slate-900/60 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/5 hover:border-indigo-500/40 transition-all flex justify-between items-start sm:items-center gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1">{r.type}</p>
                          <h4 className="text-sm sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">{r.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">Cataloged on {r.year}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button className="p-2 sm:p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white text-xs">Edit</button>
                          <button onClick={() => setRepos(repos.filter(repo => repo.id !== r.id))} className="p-2 sm:p-3 bg-white/5 rounded-xl hover:bg-red-500/20 transition-colors text-slate-400 hover:text-red-400 text-xs">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── CONTRIBUTE ── */}
          {activeTab === 'contribute' && isLoggedIn && !isAdmin && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-[3.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                <header className="mb-6 sm:mb-10">
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">Upload Publication</h2>
                  <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">New Repository Entry</p>
                </header>
                <form onSubmit={handlePublish} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2"><label className={labelCls}>Full Title of the Research</label><input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter full research title..." className={inputCls} /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2"><label className={labelCls}>Co-Authors</label><input type="text" value={coAuthors} onChange={e => setCoAuthors(e.target.value)} placeholder="Separate with commas" className={inputCls} /></div>
                    <div className="space-y-2"><label className={labelCls}>Date Published</label><input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)} className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2"><label className={labelCls}>Keywords</label><input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g. Psychology, IoT, Behavior" className={inputCls} /></div>
                    <div className="space-y-2"><label className={labelCls}>Archive Classification</label>
                      <select value={type} onChange={e => setType(e.target.value as any)} className={inputCls}>
                        <option value="Student Research">Student Research Paper</option>
                        <option value="Theory">Classical Theory Framework</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2"><label className={labelCls}>Abstract</label><textarea required rows={4} value={abstract} onChange={e => setAbstract(e.target.value)} placeholder="Provide a brief summary of the study..." className={`${inputCls} resize-none`} /></div>
                  <div className="space-y-2"><label className={labelCls}>Methodology</label><input required type="text" value={methodology} onChange={e => setMethodology(e.target.value)} placeholder="e.g. Case Study, Quantitative Survey..." className={inputCls} /></div>
                  <div className="p-4 sm:p-6 border border-dashed border-indigo-500/30 rounded-2xl sm:rounded-3xl bg-indigo-600/5 space-y-3 text-center">
                    <label className="block text-[10px] font-black uppercase text-indigo-400 tracking-widest">Full Study Document (PDF)</label>
                    <input required type="file" accept=".pdf" className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer" />
                    <p className="text-[9px] text-slate-500">Maximum file size: 10MB</p>
                  </div>
                  <button className="w-full py-4 sm:py-5 bg-white text-slate-950 font-black rounded-2xl sm:rounded-3xl uppercase tracking-widest text-xs hover:bg-indigo-400 hover:text-white transition-all shadow-xl active:scale-[0.98]">
                    {loading ? "Cataloging Entry..." : "Submit for Review"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ── ADMIN PANEL ── */}
          {activeTab === 'admin' && isAdmin && (
            <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tighter">Admin <span className="text-amber-400">Panel</span></h2>
                  <p className="text-amber-500/60 text-[10px] font-black uppercase tracking-[0.4em] mt-1">Full System Access</p>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <span className="px-3 sm:px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-400">{repos.length} Repos</span>
                  <span className="px-3 sm:px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-400">{researchers.length} Researchers</span>
                </div>
              </div>

              {/* Admin Sub-Nav — scrollable on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {(['repos', 'researchers', 'addRepo', 'addResearcher'] as const).map(panel => (
                  <button key={panel} onClick={() => setAdminPanel(panel)}
                    className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${adminPanel === panel ? 'bg-amber-500 border-amber-400 text-slate-950' : 'bg-white/5 border-white/10 text-slate-400 hover:border-amber-500/40'}`}>
                    {panel === 'repos' && '📚 Repos'}{panel === 'researchers' && '👥 Researchers'}{panel === 'addRepo' && '➕ Add Repo'}{panel === 'addResearcher' && '➕ Add Researcher'}
                  </button>
                ))}
              </div>

              {adminPanel === 'repos' && (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 ml-2">All Repository Entries ({repos.length})</p>
                  {repos.map(r => (
                    <div key={r.id} className="bg-slate-900/60 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded-full">{r.type}</span>
                          <span className="text-[9px] text-slate-600">{r.year}</span>
                          <span className="text-[9px] text-slate-600 hidden sm:inline">{r.category}</span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-white leading-tight mb-1 line-clamp-2">{r.title}</h4>
                        <p className="text-xs text-slate-500">By {r.leadAuthor} • {r.institution}</p>
                      </div>
                      <button onClick={() => setRepos(repos.filter(repo => repo.id !== r.id))} className="shrink-0 p-2 sm:p-3 bg-white/5 rounded-xl hover:bg-red-500/20 transition-colors text-slate-400 hover:text-red-400 text-xs font-black uppercase tracking-widest">Del</button>
                    </div>
                  ))}
                </div>
              )}

              {adminPanel === 'researchers' && (
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 ml-2">Registered Researchers ({researchers.length})</p>
                  {researchers.length === 0 ? (
                    <div className="bg-slate-900/40 p-12 rounded-2xl border border-dashed border-white/10 text-center"><p className="text-slate-500 italic text-sm">No researchers registered yet.</p></div>
                  ) : researchers.map(r => (
                    <div key={r.studentId} className="bg-slate-900/60 p-4 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/5 hover:border-amber-500/30 transition-all flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-base sm:text-lg font-black text-white shrink-0">
                          {r.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-white text-sm sm:text-base truncate">{r.fullName}</p>
                          <p className="text-[10px] sm:text-xs text-slate-500 truncate">{r.course} • {r.gradeLevel}</p>
                          <p className="text-[9px] font-mono text-slate-600">ID: {r.studentId}</p>
                        </div>
                      </div>
                      <button onClick={() => setResearchers(researchers.filter(res => res.studentId !== r.studentId))} className="shrink-0 p-2 sm:p-3 bg-white/5 rounded-xl hover:bg-red-500/20 transition-colors text-slate-400 hover:text-red-400 text-xs font-black uppercase tracking-widest">Del</button>
                    </div>
                  ))}
                </div>
              )}

              {adminPanel === 'addRepo' && (
                <div className="bg-white/5 p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-[3.5rem] border border-white/10 backdrop-blur-xl shadow-2xl">
                  <header className="mb-6 sm:mb-10">
                    <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter">Add Repository Entry</h3>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Admin — Direct Submission</p>
                  </header>
                  <form onSubmit={handleAdminAddRepo} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2"><label className={labelCls}>Full Title</label><input required type="text" value={adminTitle} onChange={e => setAdminTitle(e.target.value)} placeholder="Research title..." className={adminInputCls} /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2"><label className={labelCls}>Lead Author</label><input required type="text" value={adminLeadAuthor} onChange={e => setAdminLeadAuthor(e.target.value)} placeholder="Principal author" className={adminInputCls} /></div>
                      <div className="space-y-2"><label className={labelCls}>Co-Authors</label><input type="text" value={adminCoAuthors} onChange={e => setAdminCoAuthors(e.target.value)} placeholder="Separate with commas" className={adminInputCls} /></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2"><label className={labelCls}>Date Published</label><input type="date" value={adminPublishDate} onChange={e => setAdminPublishDate(e.target.value)} className={adminInputCls} /></div>
                      <div className="space-y-2"><label className={labelCls}>Classification</label>
                        <select value={adminType} onChange={e => setAdminType(e.target.value as any)} className={adminInputCls}>
                          <option value="Student Research">Student Research Paper</option>
                          <option value="Theory">Classical Theory Framework</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2"><label className={labelCls}>Keywords</label><input type="text" value={adminKeywords} onChange={e => setAdminKeywords(e.target.value)} placeholder="e.g. Psychology, Behavior" className={adminInputCls} /></div>
                    <div className="space-y-2"><label className={labelCls}>Abstract</label><textarea required rows={4} value={adminAbstract} onChange={e => setAdminAbstract(e.target.value)} placeholder="Brief summary..." className={`${adminInputCls} resize-none`} /></div>
                    <div className="space-y-2"><label className={labelCls}>Methodology</label><input required type="text" value={adminMethodology} onChange={e => setAdminMethodology(e.target.value)} placeholder="e.g. Case Study, Survey..." className={adminInputCls} /></div>
                    <button type="submit" className="w-full py-4 sm:py-5 bg-amber-500 text-slate-950 font-black rounded-2xl sm:rounded-3xl uppercase tracking-widest text-xs hover:bg-amber-400 transition-all shadow-xl">Add to Repository</button>
                  </form>
                </div>
              )}

              {adminPanel === 'addResearcher' && (
                <div className="bg-white/5 p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-[3.5rem] border border-white/10 backdrop-blur-xl shadow-2xl max-w-2xl">
                  <header className="mb-6 sm:mb-10">
                    <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter">Add Researcher</h3>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2">Admin — Manual Registration</p>
                  </header>
                  <form onSubmit={handleAdminAddResearcher} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2"><label className={labelCls}>Full Name</label><input required type="text" value={adminRegName} onChange={e => setAdminRegName(e.target.value)} placeholder="Full Name" className={adminInputCls} /></div>
                    <div className="space-y-2"><label className={labelCls}>Student ID</label><input required type="text" value={adminRegId} onChange={e => setAdminRegId(e.target.value)} placeholder="Student ID" className={adminInputCls} /></div>
                    <div className="space-y-2"><label className={labelCls}>Course</label><input required type="text" value={adminRegCourse} onChange={e => setAdminRegCourse(e.target.value)} placeholder="Course" className={adminInputCls} /></div>
                    <div className="space-y-2"><label className={labelCls}>Grade Level</label><input required type="text" value={adminRegLevel} onChange={e => setAdminRegLevel(e.target.value)} placeholder="Grade Level" className={adminInputCls} /></div>
                    <div className="space-y-2 sm:col-span-2"><label className={labelCls}>University</label><input required type="text" value={adminRegUni} onChange={e => setAdminRegUni(e.target.value)} placeholder="University" className={adminInputCls} /></div>
                    <button type="submit" className="sm:col-span-2 py-4 sm:py-5 bg-amber-500 text-slate-950 font-black rounded-2xl uppercase tracking-widest hover:bg-amber-400 transition-all">Add Researcher</button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ── SIGNUP ── */}
          {activeTab === 'signup' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/5 p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-[3.5rem] border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl sm:text-4xl font-black text-white mb-6 sm:mb-10">Researcher Registry</h2>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="Full Name" className={inputCls} />
                  <input type="text" value={regId} onChange={e => setRegId(e.target.value)} placeholder="Student ID" className={inputCls} />
                  <input type="text" value={regCourse} onChange={e => setRegCourse(e.target.value)} placeholder="Course" className={inputCls} />
                  <input type="text" value={regLevel} onChange={e => setRegLevel(e.target.value)} placeholder="Grade Level" className={inputCls} />
                  <input type="text" value={regUni} onChange={e => setRegUni(e.target.value)} placeholder="University" className={`${inputCls} sm:col-span-2`} />
                  <input type="email" placeholder="Valid Email" className={`${inputCls} sm:col-span-2`} />
                  <button type="button" onClick={handleCompleteRegistration} className="sm:col-span-2 py-4 sm:py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-[0.98]">Complete Registration</button>
                </form>
              </div>
            </div>
          )}

          {/* ── LOGIN ── */}
          {activeTab === 'login' && (
            <div className="max-w-md mx-auto py-6 sm:py-12">
              <div className="bg-white/5 p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-[3.5rem] border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8 text-center">Sign In</h2>
                <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                  <input type="text" value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="Student ID / Username" className={inputCls} />
                  <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Password" className={inputCls} />
                </div>
                {loginError && <p className="text-red-400 text-xs font-bold mb-4 uppercase tracking-widest text-center">{loginError}</p>}
                <button onClick={handleLogin} className="w-full py-4 sm:py-5 bg-indigo-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-2xl shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-[0.98]">Authenticate</button>
                <p className="text-center text-slate-600 text-xs mt-4">
                  No account?{' '}
                  <button onClick={() => navigate('signup')} className="text-indigo-400 font-bold hover:text-indigo-300">Register here</button>
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="py-10 sm:py-16 border-t border-white/5 text-center space-y-3 opacity-50 px-4">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">PsychVault Neural Registry • 2026</p>
          <p className="text-[9px] font-bold italic uppercase tracking-widest">Polytechnic University of the Philippines - Biñan Campus</p>
        </footer>

      </div>{/* end relative content wrapper */}
    </div>
  )
}
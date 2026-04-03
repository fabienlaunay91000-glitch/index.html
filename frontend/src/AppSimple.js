import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

// Stripe payment links
const STRIPE_LINKS = {
  rapide: "https://buy.stripe.com/eVq3cv9C4bGig8N1vT7Vm02",
  complete: "https://buy.stripe.com/5kQfZhdSk9yaf4Jcax7Vm03",
  accompagnement: "https://buy.stripe.com/6oU7sL4hKbGi9Kpcax7Vm04"
};

const CONTACT_EMAIL = "hello@solutionstmf.com";

// Articles SEO
const ARTICLES = [
  { id: "1", slug: "comment-lire-son-releve-de-carriere", title: "Comment lire son relevé de carrière ?", excerpt: "Apprenez à décrypter votre relevé de carrière et comprendre chaque ligne de ce document essentiel.", content: "Le relevé de carrière est un document fondamental pour préparer votre retraite. Il récapitule l'ensemble de vos droits acquis tout au long de votre vie professionnelle.\n\nLe relevé de carrière, aussi appelé relevé individuel de situation (RIS), est un document récapitulatif qui retrace l'ensemble de votre parcours professionnel.\n\nVous pouvez obtenir votre relevé de carrière sur le site info-retraite.fr avec votre numéro de sécurité sociale, par courrier en écrivant à votre caisse de retraite, ou automatiquement à partir de 35 ans.\n\nChaque année, vous pouvez valider jusqu'à 4 trimestres. Pour une retraite à taux plein, vous devez généralement avoir entre 166 et 172 trimestres selon votre année de naissance.\n\nSi vous constatez une erreur ou un oubli, rassemblez vos justificatifs, contactez votre caisse de retraite et faites une demande de régularisation.", read_time: 8, date: "2024-01-15", category: "Guide" },
  { id: "2", slug: "combien-vais-je-toucher-a-la-retraite", title: "Comment savoir combien je vais toucher à la retraite ?", excerpt: "Découvrez les méthodes pour estimer votre future pension de retraite.", content: "La question du montant de sa future retraite préoccupe de nombreux Français.\n\nPour le régime général, on prend en compte vos 25 meilleures années de revenus. Le nombre de trimestres validés détermine si vous aurez droit à une retraite à taux plein (50%).\n\nFormule: Pension = Salaire annuel moyen × Taux × (Trimestres validés / Trimestres requis)\n\nUtilisez le simulateur M@rel sur info-retraite.fr pour une estimation personnalisée.", read_time: 7, date: "2024-01-10", category: "Calcul" },
  { id: "3", slug: "erreurs-frequentes-releves-carriere", title: "Les erreurs fréquentes sur les relevés de carrière", excerpt: "Identifiez les erreurs les plus courantes sur votre relevé de carrière.", content: "Votre relevé de carrière peut contenir des erreurs qui impacteront votre pension.\n\nLes erreurs courantes: périodes d'emploi manquantes, trimestres non validés (service militaire, congé maternité), salaires incorrects, erreurs d'état civil.\n\nSelon nos analyses, 30% des relevés contiennent au moins une anomalie. Les corrections peuvent rapporter jusqu'à 100€/mois supplémentaires.", read_time: 9, date: "2024-01-08", category: "Erreurs" },
  { id: "4", slug: "que-faire-a-la-retraite-bons-plans", title: "Que faire à la retraite : les bons plans", excerpt: "Découvrez comment profiter pleinement de votre retraite.", content: "La retraite est une nouvelle étape de vie riche en possibilités.\n\nVoyager malin avec les cartes de réduction SNCF Senior+. Profitez des activités culturelles avec la Carte Senior. Sport et bien-être avec les associations sportives à tarifs préférentiels.", read_time: 6, date: "2024-01-05", category: "Lifestyle" },
  { id: "5", slug: "age-depart-retraite-france", title: "À quel âge partir à la retraite en France ?", excerpt: "Tout savoir sur l'âge légal de départ à la retraite.", content: "L'âge légal augmente progressivement selon votre année de naissance.\n\nNé avant 1961: 62 ans. Né en 1964: 63 ans. Né à partir de 1968: 64 ans.\n\nÀ 67 ans, vous bénéficiez automatiquement du taux plein.", read_time: 8, date: "2024-01-03", category: "Réglementation" },
  { id: "6", slug: "ne-pas-etre-isole-retraite", title: "Ne pas être isolé à la retraite", excerpt: "Conseils pour maintenir une vie sociale active.", content: "L'isolement est un risque réel à la retraite. Impact sur la santé: dépression, déclin cognitif.\n\nMaintenir le lien social: planifiez des rencontres régulières, utilisez la technologie, rejoignez des associations locales.", read_time: 7, date: "2024-01-01", category: "Bien-être" },
  { id: "7", slug: "recuperer-trimestres-manquants", title: "Comment récupérer ses trimestres manquants ?", excerpt: "Solutions pour compléter vos trimestres.", content: "Rachat de trimestres: années d'études supérieures (jusqu'à 12 trimestres), années incomplètes. Coût: 1000€ à 6500€ par trimestre, déductible des impôts.\n\nRégularisation de carrière: service militaire, congé maternité, périodes de maladie.", read_time: 9, date: "2023-12-28", category: "Optimisation" },
  { id: "8", slug: "demarches-avant-retraite", title: "Retraite : les démarches à faire avant de partir", excerpt: "Checklist des démarches administratives.", content: "6 mois avant: vérifiez votre relevé sur info-retraite.fr, utilisez le simulateur M@rel.\n\n4 mois avant: faites votre demande de retraite en ligne sur lassuranceretraite.fr.", read_time: 8, date: "2023-12-25", category: "Démarches" },
  { id: "9", slug: "retraite-plus-faible-que-prevu", title: "Pourquoi votre retraite pourrait être plus faible que prévu", excerpt: "Les facteurs qui peuvent réduire votre pension.", content: "Trimestres manquants: 1,25% de moins par trimestre manquant, jusqu'à 25% de décote maximale.\n\nLa pension brute est amputée de: CSG 8,3%, CRDS 0,5%, Casa 0,3%. Exemple: 1500€ brut = environ 1350€ net.", read_time: 8, date: "2023-12-20", category: "Alerte" },
  { id: "10", slug: "gestion-psychologique-retraite", title: "Gestion psychologique : stress, burn-out après le travail", excerpt: "Comment gérer la transition psychologique vers la retraite.", content: "La transition vers la retraite est un bouleversement psychologique majeur.\n\nAvant le départ: préparez la transition mentalement, développez des intérêts hors travail.\n\nLes premiers mois: maintenez une structure, évitez l'isolement, trouvez un nouveau sens.", read_time: 9, date: "2023-12-15", category: "Bien-être" },
  { id: "11", slug: "simulateur-retraite-fiabilite", title: "Simulateur retraite : est-ce fiable ?", excerpt: "Analyse critique des simulateurs de retraite en ligne.", content: "Le simulateur M@rel sur info-retraite.fr est le plus fiable car basé sur vos vraies données de carrière.\n\nLes simulateurs simplifiés sont rapides mais peuvent être très imprécis. Prenez les résultats comme indicatifs.", read_time: 7, date: "2023-12-10", category: "Outils" },
  { id: "12", slug: "optimiser-retraite-sans-expert", title: "Comment optimiser sa retraite sans être expert", excerpt: "Des conseils simples pour améliorer votre future pension.", content: "30% des relevés contiennent des erreurs pouvant impacter la pension.\n\nActions immédiates: vérifiez votre relevé sur info-retraite.fr, conservez tous vos bulletins de salaire, signalez les erreurs rapidement.", read_time: 8, date: "2023-12-05", category: "Optimisation" },
  { id: "13", slug: "releve-carriere-incomplet", title: "Relevé de carrière incomplet : que faire ?", excerpt: "Guide pour compléter les périodes manquantes.", content: "Ce qui doit figurer: tous vos emplois, les périodes assimilées (chômage, maladie, maternité), le service militaire, les stages rémunérés.\n\nProcédure: rassemblez les preuves (bulletins de salaire, contrats), faites la demande sur lassuranceretraite.fr.", read_time: 9, date: "2023-12-01", category: "Démarches" }
];

// Simulateur
const simulateRetirement = (age, yearsContributed, averageIncome) => {
  const trimestresAcquired = yearsContributed * 4;
  const trimestresNeeded = 172;
  const trimestresMissing = Math.max(0, trimestresNeeded - trimestresAcquired);
  const decote = Math.min(trimestresMissing * 0.625, 25);
  const taux = 50 - decote;
  const pensionBase = averageIncome * (taux / 100) * (Math.min(trimestresAcquired, trimestresNeeded) / trimestresNeeded);
  const pensionAnnuelle = pensionBase + pensionBase * 0.67;
  const pensionMensuelle = pensionAnnuelle / 12;
  const message = trimestresMissing > 0
    ? `Attention : il vous manque environ ${trimestresMissing} trimestres pour le taux plein.`
    : "Vous semblez avoir suffisamment de trimestres pour une retraite à taux plein !";
  return { estimatedMonthly: Math.round(pensionMensuelle), estimatedYearly: Math.round(pensionAnnuelle), trimestresAcquired, trimestresNeeded, message };
};

// Icons (SVG inline)
const Icon = ({ name, className = "w-6 h-6" }) => {
  const icons = {
    file: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    check: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    alert: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    users: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    arrow: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>,
    mail: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    menu: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>,
    x: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    star: <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    clock: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    shield: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    target: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    eye: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    lightbulb: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    calculator: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    brain: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    home: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    chevron: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
    search: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    help: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    send: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  };
  return icons[name] || null;
};

// Header
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#F9F9F7]/95 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#2C5234] flex items-center justify-center">
              <Icon name="file" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1C1C1A]">Retraite Simplifiée</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/#probleme" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Problème</a>
            <a href="/#solution" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Solution</a>
            <a href="/#simulateur" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Simulateur</a>
            <a href="/#offres" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Offres</a>
            <Link to="/blog" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Blog</Link>
            <a href="/#contact" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Contact</a>
          </nav>

          <a href="/#offres" className="hidden md:block">
            <button className="bg-[#2C5234] hover:bg-[#1F3A24] text-white px-6 py-3 rounded-full font-medium transition-colors">
              Obtenir mon analyse
            </button>
          </a>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Icon name={isMenuOpen ? "x" : "menu"} className="w-6 h-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-lg p-6 mt-2">
            <nav className="flex flex-col gap-4">
              <a href="/#probleme" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Problème</a>
              <a href="/#solution" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Solution</a>
              <a href="/#simulateur" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Simulateur</a>
              <a href="/#offres" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Offres</a>
              <Link to="/blog" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <a href="/#contact" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero
const HeroSection = () => (
  <section className="pt-32 pb-20 px-4 bg-[#F9F9F7]">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Icon name="users" className="w-4 h-4" />
            Plus de 15 000 personnes accompagnées
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-tight mb-6">
            Comprenez enfin votre retraite en <span className="text-[#2C5234]">quelques minutes</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#5B5B56] mb-8 leading-relaxed">
            Recevez une analyse claire et simplifiée de votre situation à partir de vos documents officiels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#offres">
              <button className="w-full sm:w-auto bg-[#2C5234] hover:bg-[#1F3A24] text-white px-8 py-4 rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2">
                Obtenir mon analyse maintenant
                <Icon name="arrow" className="w-5 h-5" />
              </button>
            </a>
            <a href="#simulateur">
              <button className="w-full sm:w-auto border-2 border-[#2C5234] text-[#2C5234] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#EFECE6] transition-colors flex items-center justify-center gap-2">
                <Icon name="calculator" className="w-5 h-5" />
                Simulateur gratuit
              </button>
            </a>
          </div>
          <div className="flex items-center gap-6 mt-8 pt-8 border-t border-[#E0DCD1]">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-[#EFECE6] border-2 border-white flex items-center justify-center">
                  <Icon name="users" className="w-4 h-4 text-[#2C5234]" />
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Icon key={i} name="star" className="w-4 h-4 text-[#C98263]" />
                ))}
              </div>
              <p className="text-sm text-[#5B5B56]">4.9/5 basé sur 2 500 avis</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1599947146406-612486387faf?w=800" alt="Documents" className="rounded-2xl shadow-2xl w-full object-cover" />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2C5234] flex items-center justify-center">
                <Icon name="shield" className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1C1C1A]">100% Sécurisé</p>
                <p className="text-sm text-[#5B5B56]">Conforme RGPD</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Problem
const ProblemSection = () => {
  const problems = [
    { icon: "search", title: "Informations complexes", desc: "Des documents difficiles à comprendre" },
    { icon: "help", title: "Estimation difficile", desc: "Impossible de calculer ses droits" },
    { icon: "alert", title: "Peur des erreurs", desc: "Risque de se tromper" },
    { icon: "eye", title: "Manque de visibilité", desc: "Impossible de vérifier" }
  ];

  return (
    <section id="probleme" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#B0413E]/10 text-[#B0413E] px-4 py-2 rounded-full text-sm font-semibold mb-4">Le Problème</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Comprendre sa retraite est un vrai casse-tête</h2>
          <p className="text-lg text-[#5B5B56] max-w-2xl mx-auto">Résultat : vous avancez dans le flou.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="bg-[#F9F9F7] border border-[#E0DCD1] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#B0413E]/10 flex items-center justify-center mb-4">
                <Icon name={p.icon} className="w-7 h-7 text-[#B0413E]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2">{p.title}</h3>
              <p className="text-[#5B5B56]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solution
const SolutionSection = () => {
  const solutions = [
    { icon: "target", title: "Comprendre votre situation", desc: "Analyse claire de vos droits acquis" },
    { icon: "alert", title: "Identifier les erreurs", desc: "Repérage des oublis et anomalies" },
    { icon: "eye", title: "Points d'attention", desc: "Ce qui mérite votre vigilance" },
    { icon: "lightbulb", title: "Actions à entreprendre", desc: "Recommandations personnalisées" }
  ];

  return (
    <section id="solution" className="py-24 px-4 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-[#2C5234]/10 text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Notre Solution</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-6">Une analyse claire pour reprendre le contrôle</h2>
            <div className="space-y-4">
              {solutions.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#E0DCD1]">
                  <div className="w-12 h-12 rounded-xl bg-[#2C5234]/10 flex items-center justify-center shrink-0">
                    <Icon name={s.icon} className="w-6 h-6 text-[#2C5234]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1A] mb-1">{s.title}</h3>
                    <p className="text-[#5B5B56]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800" alt="Solution" className="rounded-2xl shadow-xl w-full object-cover" />
        </div>
      </div>
    </section>
  );
};

// How It Works
const HowItWorksSection = () => {
  const steps = [
    { n: "1", title: "Importez vos documents", desc: "Envoyez votre relevé de façon sécurisée", icon: "file" },
    { n: "2", title: "Notre système analyse", desc: "Analyse approfondie par nos experts", icon: "brain" },
    { n: "3", title: "Recevez votre synthèse", desc: "Synthèse claire et compréhensible", icon: "check" }
  ];

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Comment ça marche</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">3 étapes simples</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#2C5234] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold">{s.n}</div>
              <div className="w-14 h-14 rounded-xl bg-[#EFECE6] flex items-center justify-center mx-auto mb-4">
                <Icon name={s.icon} className="w-7 h-7 text-[#2C5234]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1C1C1A] mb-2">{s.title}</h3>
              <p className="text-[#5B5B56]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// What You Receive
const WhatYouReceiveSection = () => {
  const items = ["Résumé de votre situation", "Points de vigilance identifiés", "Estimation indicative", "Recommandations générales"];

  return (
    <section className="py-24 px-4 bg-[#2C5234]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">Ce que vous recevez</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6">Une synthèse complète</h2>
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 rounded-xl p-4">
                  <Icon name="check" className="w-6 h-6 text-[#C98263]" />
                  <span className="text-white text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8">
            <div className="space-y-6">
              {[{icon: "file", title: "Rapport personnalisé", desc: "Adapté à votre situation"}, {icon: "clock", title: "Livraison rapide", desc: "Sous 48h ouvrées"}, {icon: "shield", title: "Confidentialité", desc: "Données protégées RGPD"}].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C98263] flex items-center justify-center">
                    <Icon name={item.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-white/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simulator
const SimulatorSection = () => {
  const [age, setAge] = useState(45);
  const [years, setYears] = useState(20);
  const [income, setIncome] = useState(35000);
  const [result, setResult] = useState(null);

  const handleSimulate = () => {
    setResult(simulateRetirement(age, years, income));
  };

  return (
    <section id="simulateur" className="py-24 px-4 bg-[#F9F9F7]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#C98263]/10 text-[#C98263] px-4 py-2 rounded-full text-sm font-semibold mb-4">Outil gratuit</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Simulateur de retraite</h2>
        </div>
        <div className="bg-white border border-[#E0DCD1] rounded-2xl shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[#1C1C1A] font-medium">Votre âge actuel</label>
                <span className="text-[#2C5234] font-bold text-lg">{age} ans</span>
              </div>
              <input type="range" value={age} onChange={(e) => setAge(Number(e.target.value))} min={25} max={67} className="w-full h-2 bg-[#E0DCD1] rounded-lg appearance-none cursor-pointer accent-[#2C5234]" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[#1C1C1A] font-medium">Années de cotisation</label>
                <span className="text-[#2C5234] font-bold text-lg">{years} ans</span>
              </div>
              <input type="range" value={years} onChange={(e) => setYears(Number(e.target.value))} min={0} max={45} className="w-full h-2 bg-[#E0DCD1] rounded-lg appearance-none cursor-pointer accent-[#2C5234]" />
            </div>
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-[#1C1C1A] font-medium">Revenu moyen annuel</label>
                <span className="text-[#2C5234] font-bold text-lg">{income.toLocaleString('fr-FR')} €</span>
              </div>
              <input type="range" value={income} onChange={(e) => setIncome(Number(e.target.value))} min={15000} max={100000} step={1000} className="w-full h-2 bg-[#E0DCD1] rounded-lg appearance-none cursor-pointer accent-[#2C5234]" />
            </div>
            <button onClick={handleSimulate} className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white py-4 rounded-full text-lg font-medium transition-colors flex items-center justify-center gap-2">
              Simuler ma retraite
              <Icon name="calculator" className="w-5 h-5" />
            </button>
            {result && (
              <div className="mt-8 p-6 bg-[#EFECE6] rounded-2xl">
                <h3 className="text-xl font-semibold text-[#1C1C1A] mb-4">Résultat</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-[#5B5B56] text-sm">Estimation mensuelle</p>
                    <p className="text-2xl font-bold text-[#2C5234]">{result.estimatedMonthly.toLocaleString('fr-FR')} €</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <p className="text-[#5B5B56] text-sm">Trimestres acquis / requis</p>
                    <p className="text-2xl font-bold text-[#1C1C1A]">{result.trimestresAcquired} / {result.trimestresNeeded}</p>
                  </div>
                </div>
                <div className="bg-[#C98263]/10 rounded-xl p-4">
                  <p className="text-[#1C1C1A]">{result.message}</p>
                </div>
                <p className="text-sm text-[#5B5B56] mt-4 text-center">⚠️ Estimation indicative uniquement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing
const PricingSection = () => {
  const plans = [
    { name: "Analyse rapide", price: "9", desc: "Première vue d'ensemble", features: ["Synthèse simple", "Lecture rapide", "Livraison 48h"], link: STRIPE_LINKS.rapide, popular: false },
    { name: "Analyse complète", price: "29", desc: "Le plus populaire", features: ["Analyse détaillée", "Points d'optimisation", "Checklist personnalisée", "Recommandations"], link: STRIPE_LINKS.complete, popular: true },
    { name: "Accompagnement", price: "150", desc: "Suivi personnalisé", features: ["Analyse complète", "Échange 30 min", "Questions illimitées", "Suivi démarches"], link: STRIPE_LINKS.accompagnement, popular: false }
  ];

  return (
    <section id="offres" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Nos Offres</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Choisissez l'offre adaptée</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden ${plan.popular ? "bg-[#2C5234] text-white scale-105 shadow-xl" : "bg-white border border-[#E0DCD1]"}`}>
              {plan.popular && <div className="bg-[#C98263] text-white text-center py-2 text-sm font-semibold">Le plus populaire</div>}
              <div className="p-8">
                <h3 className={`text-xl font-semibold ${plan.popular ? "text-white" : "text-[#1C1C1A]"}`}>{plan.name}</h3>
                <p className={plan.popular ? "text-white/80" : "text-[#5B5B56]"}>{plan.desc}</p>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-[#2C5234]"}`}>{plan.price}€</span>
                </div>
                <ul className="space-y-4 my-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Icon name="check" className={`w-5 h-5 shrink-0 ${plan.popular ? "text-[#C98263]" : "text-[#2C5234]"}`} />
                      <span className={plan.popular ? "text-white/90" : "text-[#5B5B56]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={plan.link} target="_blank" rel="noopener noreferrer">
                  <button className={`w-full py-4 rounded-full font-medium transition-colors ${plan.popular ? "bg-white text-[#2C5234] hover:bg-[#EFECE6]" : "bg-[#2C5234] text-white hover:bg-[#1F3A24]"}`}>
                    Choisir cette offre
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials
const TestimonialsSection = () => {
  const testimonials = [
    { name: "Marie D.", role: "Enseignante, 58 ans", content: "J'ai découvert 3 années de cotisation manquantes !" },
    { name: "Pierre L.", role: "Cadre, 62 ans", content: "Le rapport était clair et précis." },
    { name: "Jean-Claude M.", role: "Artisan, 60 ans", content: "Service exceptionnel et très humain." }
  ];

  return (
    <section className="py-24 px-4 bg-[#F9F9F7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Témoignages</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Ils nous font confiance</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-[#E0DCD1] rounded-2xl p-8">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((s) => <Icon key={s} name="star" className="w-5 h-5 text-[#C98263]" />)}
              </div>
              <p className="text-[#5B5B56] mb-6">"{t.content}"</p>
              <div>
                <p className="font-semibold text-[#1C1C1A]">{t.name}</p>
                <p className="text-sm text-[#5B5B56]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact
const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact - ${form.name}`);
    const body = encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Contact</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-6">Une question ?</h2>
            <p className="text-lg text-[#5B5B56] mb-8">Notre équipe est à votre disposition.</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#EFECE6] flex items-center justify-center">
                <Icon name="mail" className="w-6 h-6 text-[#2C5234]" />
              </div>
              <div>
                <p className="text-sm text-[#5B5B56]">Email</p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[#2C5234]">{CONTACT_EMAIL}</a>
              </div>
            </div>
          </div>
          <div className="bg-[#F9F9F7] border border-[#E0DCD1] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#1C1C1A] font-medium mb-2">Nom</label>
                <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full border border-[#E0DCD1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#2C5234]" />
              </div>
              <div>
                <label className="block text-[#1C1C1A] font-medium mb-2">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="w-full border border-[#E0DCD1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#2C5234]" />
              </div>
              <div>
                <label className="block text-[#1C1C1A] font-medium mb-2">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} required rows={4} className="w-full border border-[#E0DCD1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#2C5234]" />
              </div>
              <button type="submit" className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white py-4 rounded-full font-medium transition-colors flex items-center justify-center gap-2">
                Envoyer
                <Icon name="send" className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Disclaimer
const DisclaimerSection = () => (
  <section className="py-12 px-4 bg-[#EFECE6]">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E0DCD1]">
        <Icon name="alert" className="w-8 h-8 text-[#C98263] shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-[#1C1C1A] mb-2">Avertissement important</h3>
          <p className="text-[#5B5B56] text-sm">Ce service fournit une analyse informative. Il ne constitue pas un conseil financier ou juridique. Consultez les organismes officiels pour toute décision.</p>
        </div>
      </div>
    </div>
  </section>
);

// Blog Preview
const BlogPreviewSection = () => (
  <section className="py-24 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">Ressources</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">Nos articles</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {ARTICLES.slice(0, 3).map((a) => (
          <Link key={a.id} to={`/article/${a.slug}`} className="bg-[#F9F9F7] border border-[#E0DCD1] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-[#2C5234]/10 to-[#C98263]/10 flex items-center justify-center">
              <Icon name="file" className="w-16 h-16 text-[#2C5234]/50" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <span className="bg-[#EFECE6] text-[#2C5234] text-xs px-2 py-1 rounded">{a.category}</span>
                <span className="text-xs text-[#5B5B56] flex items-center gap-1"><Icon name="clock" className="w-3 h-3" /> {a.read_time} min</span>
              </div>
              <h3 className="font-semibold text-[#1C1C1A] mb-2">{a.title}</h3>
              <p className="text-sm text-[#5B5B56] line-clamp-2">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center">
        <Link to="/blog">
          <button className="border-2 border-[#2C5234] text-[#2C5234] px-8 py-4 rounded-full font-medium hover:bg-[#EFECE6] transition-colors">
            Voir tous les articles
          </button>
        </Link>
      </div>
    </div>
  </section>
);

// Footer
const Footer = () => (
  <footer className="bg-[#1C1C1A] text-[#F9F9F7] py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#2C5234] flex items-center justify-center">
              <Icon name="file" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Retraite Simplifiée</span>
          </div>
          <p className="text-[#F9F9F7]/70 mb-6">Votre partenaire pour comprendre votre retraite. Plus de 15 000 personnes accompagnées.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-[#F9F9F7]/70">
            <li><a href="/#probleme" className="hover:text-white">Problème</a></li>
            <li><a href="/#solution" className="hover:text-white">Solution</a></li>
            <li><a href="/#simulateur" className="hover:text-white">Simulateur</a></li>
            <li><a href="/#offres" className="hover:text-white">Offres</a></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#F9F9F7]/70 hover:text-white">{CONTACT_EMAIL}</a>
        </div>
      </div>
      <div className="border-t border-[#F9F9F7]/10 pt-8 text-center text-[#F9F9F7]/50 text-sm">
        <p>© {new Date().getFullYear()} Retraite Simplifiée. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

// Pages
const HomePage = () => (
  <>
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <HowItWorksSection />
    <WhatYouReceiveSection />
    <SimulatorSection />
    <PricingSection />
    <TestimonialsSection />
    <BlogPreviewSection />
    <ContactSection />
    <DisclaimerSection />
  </>
);

const BlogPage = () => (
  <div className="pt-24 pb-20 px-4 bg-[#F9F9F7] min-h-screen">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1A] mb-4">Nos articles</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ARTICLES.map((a) => (
          <Link key={a.id} to={`/article/${a.slug}`} className="bg-white border border-[#E0DCD1] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-br from-[#2C5234]/10 to-[#C98263]/10 flex items-center justify-center">
              <Icon name="file" className="w-16 h-16 text-[#2C5234]/50" />
            </div>
            <div className="p-6">
              <span className="bg-[#EFECE6] text-[#2C5234] text-xs px-2 py-1 rounded">{a.category}</span>
              <h3 className="font-semibold text-[#1C1C1A] mt-3 mb-2">{a.title}</h3>
              <p className="text-sm text-[#5B5B56]">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = ARTICLES.find(a => a.slug === slug);
  useEffect(() => { if (!article) navigate("/blog"); }, [article, navigate]);
  if (!article) return null;

  return (
    <div className="pt-24 pb-20 px-4 bg-[#F9F9F7] min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#2C5234] font-medium mb-8 hover:underline">
          <Icon name="home" className="w-4 h-4" /> Retour
        </Link>
        <article className="bg-white rounded-2xl border border-[#E0DCD1] p-8 sm:p-12">
          <span className="bg-[#EFECE6] text-[#2C5234] text-xs px-2 py-1 rounded">{article.category}</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1C1A] mt-4 mb-6">{article.title}</h1>
          <div className="prose max-w-none text-[#5B5B56]" style={{whiteSpace: 'pre-line'}}>{article.content}</div>
        </article>
        <div className="mt-12 p-8 bg-[#2C5234] rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Besoin d'une analyse ?</h3>
          <Link to="/#offres">
            <button className="bg-white text-[#2C5234] px-8 py-4 rounded-full font-medium hover:bg-[#EFECE6]">Découvrir nos offres</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// App
function App() {
  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

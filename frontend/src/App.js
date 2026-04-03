import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  ArrowRight, 
  Phone, 
  Mail, 
  Menu, 
  X, 
  Star,
  Clock,
  ChevronRight,
  Calculator,
  Shield,
  Target,
  Eye,
  Send,
  FileSearch,
  Lightbulb,
  Calendar,
  TrendingUp,
  Heart,
  BookOpen,
  HelpCircle,
  Brain,
  Activity,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Stripe payment links
const STRIPE_LINKS = {
  rapide: "https://buy.stripe.com/eVq3cv9C4bGig8N1vT7Vm02",
  complete: "https://buy.stripe.com/5kQfZhdSk9yaf4Jcax7Vm03",
  accompagnement: "https://buy.stripe.com/6oU7sL4hKbGi9Kpcax7Vm04"
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#F9F9F7]/95 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 rounded-full bg-[#2C5234] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1C1C1A]">Solutions TMF</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            <a href="#probleme" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Problème</a>
            <a href="#solution" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Solution</a>
            <a href="#simulateur" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Simulateur</a>
            <a href="#offres" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Offres</a>
            <Link to="/blog" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Blog</Link>
            <a href="#contact" className="text-[#5B5B56] hover:text-[#2C5234] transition-colors font-medium">Contact</a>
          </nav>

          <div className="hidden md:block">
            <a href="#offres">
              <Button 
                className="bg-[#2C5234] hover:bg-[#1F3A24] text-white px-6 py-3 rounded-full font-medium"
                data-testid="cta-header-btn"
              >
                Obtenir mon analyse
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-lg p-6 mt-2 animate-fadeInUp" data-testid="mobile-nav">
            <nav className="flex flex-col gap-4">
              <a href="#probleme" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Problème</a>
              <a href="#solution" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Solution</a>
              <a href="#simulateur" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Simulateur</a>
              <a href="#offres" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Offres</a>
              <Link to="/blog" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <a href="#contact" className="text-[#5B5B56] hover:text-[#2C5234] font-medium py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <a href="#offres" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white rounded-full mt-4">
                  Obtenir mon analyse
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-[#F9F9F7]" data-testid="hero-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInUp">
            <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-6 badge-shine">
              <Users className="w-4 h-4 mr-2 inline" />
              Plus de 15 000 personnes accompagnées
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-tight mb-6">
              Comprenez enfin votre retraite en{" "}
              <span className="gradient-text">quelques minutes</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#5B5B56] mb-8 leading-relaxed">
              Recevez une analyse claire et simplifiée de votre situation à partir de vos documents officiels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#offres">
                <Button 
                  className="bg-[#2C5234] hover:bg-[#1F3A24] text-white px-8 py-4 rounded-full text-lg font-medium btn-primary"
                  data-testid="hero-cta-btn"
                >
                  Obtenir mon analyse maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <a href="#simulateur">
                <Button 
                  variant="outline" 
                  className="border-[#2C5234] text-[#2C5234] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#EFECE6]"
                  data-testid="hero-simulator-btn"
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  Simulateur gratuit
                </Button>
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-[#E0DCD1]">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-[#EFECE6] border-2 border-white flex items-center justify-center">
                    <Users className="w-4 h-4 text-[#2C5234]" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C98263] text-[#C98263]" />
                  ))}
                </div>
                <p className="text-sm text-[#5B5B56]">4.9/5 basé sur 2 500 avis</p>
              </div>
            </div>
          </div>
          <div className="animate-slideInRight lg:pl-8">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1599947146406-612486387faf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxjbGVhbiUyMGRlc2slMjB3aXRoJTIwZG9jdW1lbnRzJTIwYW5kJTIwZ2xhc3NlcyUyMG1vZGVybnxlbnwwfHx8fDE3NzUyMDM0MTZ8MA&ixlib=rb-4.1.0&q=85"
                alt="Documents de retraite sur un bureau"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2C5234] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
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
      </div>
    </section>
  );
};

// Problem Section
const ProblemSection = () => {
  const problems = [
    { icon: FileSearch, title: "Informations complexes", desc: "Des documents difficiles à comprendre" },
    { icon: HelpCircle, title: "Estimation difficile", desc: "Impossible de calculer ses droits" },
    { icon: AlertTriangle, title: "Peur des erreurs", desc: "Risque de se tromper dans les démarches" },
    { icon: Eye, title: "Manque de visibilité", desc: "Impossible de vérifier si tout est correct" }
  ];

  return (
    <section id="probleme" className="py-24 px-4 bg-white" data-testid="problem-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-[#B0413E]/10 text-[#B0413E] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Le Problème
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">
            Comprendre sa retraite est un vrai casse-tête
          </h2>
          <p className="text-lg text-[#5B5B56] max-w-2xl mx-auto">
            Résultat : vous avancez dans le flou, sans savoir si votre situation est correcte.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <Card 
              key={index} 
              className="bg-[#F9F9F7] border-[#E0DCD1] rounded-2xl p-6 card-hover"
              data-testid={`problem-card-${index}`}
            >
              <CardContent className="p-0">
                <div className="w-14 h-14 rounded-2xl bg-[#B0413E]/10 flex items-center justify-center mb-4">
                  <problem.icon className="w-7 h-7 text-[#B0413E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1C1C1A] mb-2">{problem.title}</h3>
                <p className="text-[#5B5B56]">{problem.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Solution Section
const SolutionSection = () => {
  const solutions = [
    { icon: Target, title: "Comprendre votre situation", desc: "Analyse claire de vos droits acquis" },
    { icon: AlertTriangle, title: "Identifier les erreurs", desc: "Repérage des oublis et anomalies" },
    { icon: Eye, title: "Points d'attention", desc: "Ce qui mérite votre vigilance" },
    { icon: Lightbulb, title: "Actions à entreprendre", desc: "Recommandations personnalisées" }
  ];

  return (
    <section id="solution" className="py-24 px-4 bg-[#F9F9F7]" data-testid="solution-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-[#2C5234]/10 text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Notre Solution
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-6">
              Une analyse claire pour reprendre le contrôle
            </h2>
            <p className="text-lg text-[#5B5B56] mb-8">
              Notre service vous permet enfin de comprendre votre situation et de prendre les bonnes décisions.
            </p>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#E0DCD1] card-hover"
                  data-testid={`solution-item-${index}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2C5234]/10 flex items-center justify-center shrink-0">
                    <solution.icon className="w-6 h-6 text-[#2C5234]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1C1C1A] mb-1">{solution.title}</h3>
                    <p className="text-[#5B5B56]">{solution.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1758523417133-41f21fb9f058?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxyZWxheGVkJTIwbWF0dXJlJTIwY291cGxlJTIwZHJpbmtpbmclMjBjb2ZmZWUlMjBicmlnaHR8ZW58MHx8fHwxNzc1MjAzNDEwfDA&ixlib=rb-4.1.0&q=85"
              alt="Couple serein regardant leurs documents"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    { 
      number: "1", 
      title: "Importez vos documents", 
      desc: "Envoyez votre relevé de carrière de façon sécurisée (conforme RGPD)",
      icon: FileText 
    },
    { 
      number: "2", 
      title: "Notre système analyse", 
      desc: "Analyse approfondie de vos données par nos experts",
      icon: Brain 
    },
    { 
      number: "3", 
      title: "Recevez votre synthèse", 
      desc: "Une synthèse claire et compréhensible de votre situation",
      icon: CheckCircle 
    }
  ];

  return (
    <section className="py-24 px-4 bg-white" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Comment ça marche
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">
            3 étapes simples
          </h2>
          <p className="text-lg text-[#5B5B56] max-w-2xl mx-auto">
            Un processus simple et rapide pour obtenir votre analyse personnalisée.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative text-center"
              data-testid={`step-${index}`}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#2C5234] to-[#E0DCD1]" />
              )}
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#2C5234] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <div className="w-14 h-14 rounded-xl bg-[#EFECE6] flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-[#2C5234]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1C1C1A] mb-2">{step.title}</h3>
                <p className="text-[#5B5B56]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// What You Receive Section
const WhatYouReceiveSection = () => {
  const items = [
    "Résumé de votre situation",
    "Points de vigilance identifiés",
    "Estimation indicative",
    "Recommandations générales"
  ];

  return (
    <section className="py-24 px-4 bg-[#2C5234]" data-testid="what-you-receive-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Ce que vous recevez
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-6">
              Une synthèse complète et actionnable
            </h2>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-white/10 rounded-xl p-4"
                  data-testid={`receive-item-${index}`}
                >
                  <CheckCircle className="w-6 h-6 text-[#C98263] shrink-0" />
                  <span className="text-white text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C98263] flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Rapport personnalisé</h4>
                  <p className="text-white/70">Adapté à votre situation</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C98263] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Livraison rapide</h4>
                  <p className="text-white/70">Sous 48h ouvrées</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C98263] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Confidentialité garantie</h4>
                  <p className="text-white/70">Données protégées RGPD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simulator Section
const SimulatorSection = () => {
  const [age, setAge] = useState([45]);
  const [yearsContributed, setYearsContributed] = useState([20]);
  const [averageIncome, setAverageIncome] = useState([35000]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/simulate`, {
        age: age[0],
        years_contributed: yearsContributed[0],
        average_income: averageIncome[0]
      });
      setResult(response.data);
      toast.success("Simulation terminée !");
    } catch (error) {
      toast.error("Erreur lors de la simulation");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section id="simulateur" className="py-24 px-4 bg-[#F9F9F7]" data-testid="simulator-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-[#C98263]/10 text-[#C98263] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Outil gratuit
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">
            Simulateur de retraite simplifié
          </h2>
          <p className="text-lg text-[#5B5B56]">
            Obtenez une estimation indicative en quelques secondes.
          </p>
        </div>

        <Card className="bg-white border-[#E0DCD1] rounded-2xl shadow-lg" data-testid="simulator-card">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Age */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-[#1C1C1A] font-medium">Votre âge actuel</Label>
                  <span className="text-[#2C5234] font-bold text-lg">{age[0]} ans</span>
                </div>
                <Slider
                  value={age}
                  onValueChange={setAge}
                  min={25}
                  max={67}
                  step={1}
                  className="w-full"
                  data-testid="age-slider"
                />
              </div>

              {/* Years Contributed */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-[#1C1C1A] font-medium">Années de cotisation</Label>
                  <span className="text-[#2C5234] font-bold text-lg">{yearsContributed[0]} ans</span>
                </div>
                <Slider
                  value={yearsContributed}
                  onValueChange={setYearsContributed}
                  min={0}
                  max={45}
                  step={1}
                  className="w-full"
                  data-testid="years-slider"
                />
              </div>

              {/* Average Income */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label className="text-[#1C1C1A] font-medium">Revenu moyen annuel</Label>
                  <span className="text-[#2C5234] font-bold text-lg">{averageIncome[0].toLocaleString('fr-FR')} €</span>
                </div>
                <Slider
                  value={averageIncome}
                  onValueChange={setAverageIncome}
                  min={15000}
                  max={100000}
                  step={1000}
                  className="w-full"
                  data-testid="income-slider"
                />
              </div>

              <Button 
                onClick={handleSimulate}
                className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white py-4 rounded-full text-lg font-medium"
                disabled={loading}
                data-testid="simulate-btn"
              >
                {loading ? "Calcul en cours..." : "Simuler ma retraite"}
                <Calculator className="ml-2 w-5 h-5" />
              </Button>

              {result && (
                <div className="mt-8 p-6 bg-[#EFECE6] rounded-2xl" data-testid="simulation-result">
                  <h3 className="text-xl font-semibold text-[#1C1C1A] mb-4">Résultat de votre simulation</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-[#5B5B56] text-sm">Estimation mensuelle</p>
                      <p className="text-2xl font-bold text-[#2C5234]">{result.estimated_monthly.toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-[#5B5B56] text-sm">Estimation annuelle</p>
                      <p className="text-2xl font-bold text-[#2C5234]">{result.estimated_yearly.toLocaleString('fr-FR')} €</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-[#5B5B56] text-sm">Trimestres acquis</p>
                      <p className="text-xl font-bold text-[#1C1C1A]">{result.trimestres_acquired}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-[#5B5B56] text-sm">Trimestres requis</p>
                      <p className="text-xl font-bold text-[#1C1C1A]">{result.trimestres_needed}</p>
                    </div>
                  </div>
                  <div className="bg-[#C98263]/10 rounded-xl p-4">
                    <p className="text-[#1C1C1A]">{result.message}</p>
                  </div>
                  <p className="text-sm text-[#5B5B56] mt-4 text-center">
                    ⚠️ Cette estimation est purement indicative et ne constitue pas un conseil financier.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Analyse rapide",
      price: "9",
      description: "Pour une première vue d'ensemble",
      features: [
        "Synthèse simple de votre situation",
        "Lecture rapide de vos documents",
        "Livraison sous 48h"
      ],
      link: STRIPE_LINKS.rapide,
      popular: false
    },
    {
      name: "Analyse complète",
      price: "29",
      description: "Notre offre la plus populaire",
      features: [
        "Analyse détaillée et approfondie",
        "Points d'optimisation identifiés",
        "Checklist personnalisée",
        "Recommandations prioritaires"
      ],
      link: STRIPE_LINKS.complete,
      popular: true
    },
    {
      name: "Accompagnement",
      price: "150",
      description: "Pour un suivi personnalisé",
      features: [
        "Analyse complète incluse",
        "Échange personnalisé (30 min)",
        "Questions/réponses illimitées",
        "Suivi de vos démarches"
      ],
      link: STRIPE_LINKS.accompagnement,
      popular: false
    }
  ];

  return (
    <section id="offres" className="py-24 px-4 bg-white" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Nos Offres
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">
            Choisissez l'offre adaptée à vos besoins
          </h2>
          <p className="text-lg text-[#5B5B56] max-w-2xl mx-auto">
            Des solutions claires et accessibles pour comprendre votre retraite.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`rounded-2xl overflow-hidden card-hover ${
                plan.popular 
                  ? "bg-[#2C5234] text-white border-none shadow-xl scale-105" 
                  : "bg-white border-[#E0DCD1]"
              }`}
              data-testid={`pricing-card-${index}`}
            >
              {plan.popular && (
                <div className="bg-[#C98263] text-white text-center py-2 text-sm font-semibold">
                  Le plus populaire
                </div>
              )}
              <CardHeader className="p-8">
                <CardTitle className={`text-xl font-semibold ${plan.popular ? "text-white" : "text-[#1C1C1A]"}`}>
                  {plan.name}
                </CardTitle>
                <CardDescription className={plan.popular ? "text-white/80" : "text-[#5B5B56]"}>
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-[#2C5234]"}`}>
                    {plan.price}€
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 shrink-0 ${plan.popular ? "text-[#C98263]" : "text-[#2C5234]"}`} />
                      <span className={plan.popular ? "text-white/90" : "text-[#5B5B56]"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href={plan.link} target="_blank" rel="noopener noreferrer">
                  <Button 
                    className={`w-full py-4 rounded-full font-medium ${
                      plan.popular 
                        ? "bg-white text-[#2C5234] hover:bg-[#EFECE6]" 
                        : "bg-[#2C5234] text-white hover:bg-[#1F3A24]"
                    }`}
                    data-testid={`pricing-btn-${index}`}
                  >
                    Choisir cette offre
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie D.",
      role: "Enseignante, 58 ans",
      content: "Grâce à leur analyse, j'ai découvert 3 années de cotisation manquantes ! J'ai pu régulariser ma situation avant la retraite.",
      image: "https://images.pexels.com/photos/7971644/pexels-photo-7971644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Pierre L.",
      role: "Cadre, 62 ans",
      content: "Le rapport était clair et précis. J'ai enfin compris ma situation et je sais exactement quoi faire maintenant.",
      image: "https://images.pexels.com/photos/16322150/pexels-photo-16322150.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    },
    {
      name: "Jean-Claude M.",
      role: "Artisan, 60 ans",
      content: "L'accompagnement personnalisé m'a permis de poser toutes mes questions. Service exceptionnel et très humain.",
      image: "https://images.unsplash.com/photo-1738566061883-1b568c74b550?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtYXR1cmUlMjBzbWlsaW5nJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzc1MjAzNDEwfDA&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#F9F9F7]" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Témoignages
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-lg text-[#5B5B56]">
            Découvrez ce que nos clients disent de notre service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-white border-[#E0DCD1] rounded-2xl overflow-hidden card-hover testimonial-card"
              data-testid={`testimonial-${index}`}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-[#C98263] text-[#C98263]" />
                  ))}
                </div>
                <p className="text-[#5B5B56] mb-6 relative z-10">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#1C1C1A]">{testimonial.name}</p>
                    <p className="text-sm text-[#5B5B56]">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message envoyé avec succès !");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Erreur lors de l'envoi");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Contact
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-6">
              Une question ? Contactez-nous
            </h2>
            <p className="text-lg text-[#5B5B56] mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions sur nos services d'analyse retraite.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EFECE6] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#2C5234]" />
                </div>
                <div>
                  <p className="text-sm text-[#5B5B56]">Email</p>
                  <a href="mailto:hello@solutionstmf.com" className="font-medium text-[#2C5234]">
                    hello@solutionstmf.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <Card className="bg-[#F9F9F7] border-[#E0DCD1] rounded-2xl" data-testid="contact-form">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#1C1C1A] font-medium">Nom complet</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Votre nom"
                    required
                    className="mt-2 border-[#E0DCD1] rounded-xl py-3"
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#1C1C1A] font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.com"
                    required
                    className="mt-2 border-[#E0DCD1] rounded-xl py-3"
                    data-testid="contact-email-input"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#1C1C1A] font-medium">Téléphone (optionnel)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 XX XX XX XX"
                    className="mt-2 border-[#E0DCD1] rounded-xl py-3"
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-[#1C1C1A] font-medium">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Comment pouvons-nous vous aider ?"
                    required
                    rows={4}
                    className="mt-2 border-[#E0DCD1] rounded-xl"
                    data-testid="contact-message-input"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-[#2C5234] hover:bg-[#1F3A24] text-white py-4 rounded-full font-medium"
                  disabled={loading}
                  data-testid="contact-submit-btn"
                >
                  {loading ? "Envoi en cours..." : "Envoyer le message"}
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// Disclaimer Section
const DisclaimerSection = () => {
  return (
    <section className="py-12 px-4 bg-[#EFECE6]" data-testid="disclaimer-section">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E0DCD1]">
          <AlertTriangle className="w-8 h-8 text-[#C98263] shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-[#1C1C1A] mb-2">Avertissement important</h3>
            <p className="text-[#5B5B56] text-sm leading-relaxed">
              Ce service fournit une analyse informative et pédagogique basée sur les éléments transmis. 
              Il ne constitue pas un conseil financier, juridique ou réglementé. Les estimations sont 
              purement indicatives. Pour toute décision concernant votre retraite, nous vous recommandons 
              de consulter les organismes officiels (CARSAT, CNAV) ou un conseiller professionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Blog Preview Section (for homepage)
const BlogPreviewSection = () => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API}/articles`);
        setArticles(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      "Guide": BookOpen,
      "Calcul": Calculator,
      "Erreurs": AlertTriangle,
      "Lifestyle": Heart,
      "Réglementation": FileText,
      "Bien-être": Activity,
      "Optimisation": TrendingUp,
      "Démarches": FileSearch,
      "Alerte": AlertTriangle,
      "Outils": Calculator
    };
    return icons[category] || BookOpen;
  };

  return (
    <section className="py-24 px-4 bg-white" data-testid="blog-preview-section">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Ressources
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1C1A] mb-4">
            Nos derniers articles
          </h2>
          <p className="text-lg text-[#5B5B56]">
            Guides et conseils pour mieux comprendre votre retraite.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => {
            const IconComponent = getCategoryIcon(article.category);
            return (
              <Link 
                key={article.id} 
                to={`/article/${article.slug}`}
                className="article-card"
                data-testid={`blog-preview-${index}`}
              >
                <Card className="bg-[#F9F9F7] border-[#E0DCD1] rounded-2xl overflow-hidden h-full">
                  <div className="h-48 bg-gradient-to-br from-[#2C5234]/10 to-[#C98263]/10 flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-[#2C5234]/50" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <Badge className="bg-[#EFECE6] text-[#2C5234] text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-[#5B5B56] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.read_time} min
                      </span>
                    </div>
                    <h3 className="font-semibold text-[#1C1C1A] mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#5B5B56] line-clamp-2">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button 
              variant="outline" 
              className="border-[#2C5234] text-[#2C5234] px-8 py-4 rounded-full font-medium hover:bg-[#EFECE6]"
              data-testid="view-all-articles-btn"
            >
              Voir tous les articles
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-[#1C1C1A] text-[#F9F9F7] py-20 px-4" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#2C5234] flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Solutions TMF</span>
            </div>
            <p className="text-[#F9F9F7]/70 mb-6 max-w-md">
              Votre partenaire pour comprendre et optimiser votre retraite. 
              Plus de 15 000 personnes accompagnées.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2C5234]" />
              <span className="text-sm text-[#F9F9F7]/70">Données protégées - Conforme RGPD</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-[#F9F9F7]/70">
              <li><a href="#probleme" className="hover:text-white transition-colors">Problème</a></li>
              <li><a href="#solution" className="hover:text-white transition-colors">Solution</a></li>
              <li><a href="#simulateur" className="hover:text-white transition-colors">Simulateur</a></li>
              <li><a href="#offres" className="hover:text-white transition-colors">Offres</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-[#F9F9F7]/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@solutionstmf.com" className="hover:text-white transition-colors">
                  hello@solutionstmf.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#F9F9F7]/10 pt-8 text-center text-[#F9F9F7]/50 text-sm">
          <p>© {new Date().getFullYear()} Solutions TMF. Tous droits réservés.</p>
          <p className="mt-2">
            Ce service fournit une analyse informative et pédagogique. Il ne constitue pas un conseil financier ou juridique.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Home Page
const HomePage = () => {
  return (
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
};

// Blog Page
const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API}/articles`);
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      "Guide": BookOpen,
      "Calcul": Calculator,
      "Erreurs": AlertTriangle,
      "Lifestyle": Heart,
      "Réglementation": FileText,
      "Bien-être": Activity,
      "Optimisation": TrendingUp,
      "Démarches": FileSearch,
      "Alerte": AlertTriangle,
      "Outils": Calculator
    };
    return icons[category] || BookOpen;
  };

  return (
    <div className="pt-24 pb-20 px-4 bg-[#F9F9F7] min-h-screen" data-testid="blog-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-[#EFECE6] text-[#2C5234] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Blog
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1C1A] mb-4">
            Nos articles sur la retraite
          </h1>
          <p className="text-lg text-[#5B5B56] max-w-2xl mx-auto">
            Guides, conseils et informations pour mieux comprendre et préparer votre retraite.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-[#2C5234] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => {
              const IconComponent = getCategoryIcon(article.category);
              return (
                <Link 
                  key={article.id} 
                  to={`/article/${article.slug}`}
                  className="article-card"
                  data-testid={`blog-article-${index}`}
                >
                  <Card className="bg-white border-[#E0DCD1] rounded-2xl overflow-hidden h-full">
                    <div className="h-48 bg-gradient-to-br from-[#2C5234]/10 to-[#C98263]/10 flex items-center justify-center">
                      <IconComponent className="w-16 h-16 text-[#2C5234]/50" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <Badge className="bg-[#EFECE6] text-[#2C5234] text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-[#5B5B56] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.read_time} min
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#1C1C1A] mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[#5B5B56] line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-[#2C5234] font-medium text-sm">
                        Lire l'article <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Article Page
const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${API}/articles/${slug}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate("/blog");
      }
      setLoading(false);
    };
    fetchArticle();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4 bg-[#F9F9F7] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#2C5234] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="pt-24 pb-20 px-4 bg-[#F9F9F7] min-h-screen" data-testid="article-page">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-[#2C5234] font-medium mb-8 hover:underline"
          data-testid="back-to-blog-link"
        >
          <Home className="w-4 h-4" />
          Retour au blog
        </Link>
        
        <article className="bg-white rounded-2xl border border-[#E0DCD1] overflow-hidden shadow-sm">
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-[#EFECE6] text-[#2C5234]">
                {article.category}
              </Badge>
              <span className="text-sm text-[#5B5B56] flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {article.date}
              </span>
              <span className="text-sm text-[#5B5B56] flex items-center gap-1">
                <Clock className="w-4 h-4" /> {article.read_time} min de lecture
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1C1C1A] mb-6">
              {article.title}
            </h1>
            
            <p className="text-lg text-[#5B5B56] mb-8 pb-8 border-b border-[#E0DCD1]">
              {article.excerpt}
            </p>
            
            <div 
              className="prose prose-lg max-w-none 
                prose-headings:text-[#1C1C1A] prose-headings:font-semibold
                prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                prose-p:text-[#5B5B56] prose-p:leading-relaxed
                prose-li:text-[#5B5B56]
                prose-strong:text-[#1C1C1A]
                prose-a:text-[#2C5234] prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  .replace(/^# /gm, '<h1>')
                  .replace(/^## /gm, '<h2>')
                  .replace(/^### /gm, '<h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/^- (.*)/gm, '<li>$1</li>')
                  .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                  .replace(/^([^<\n].*)/gm, '<p>$1</p>')
                  .replace(/<\/h1>\n/g, '</h1>')
                  .replace(/<\/h2>\n/g, '</h2>')
                  .replace(/<\/h3>\n/g, '</h3>')
              }}
            />
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-[#2C5234] rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Besoin d'une analyse personnalisée ?
          </h3>
          <p className="text-white/80 mb-6">
            Faites analyser votre relevé de carrière par nos experts.
          </p>
          <Link to="/#offres">
            <Button className="bg-white text-[#2C5234] hover:bg-[#EFECE6] px-8 py-4 rounded-full font-medium">
              Découvrir nos offres
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main App
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
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;

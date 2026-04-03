from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str

class SimulatorInput(BaseModel):
    age: int
    years_contributed: int
    average_income: float

class SimulatorResult(BaseModel):
    estimated_monthly: float
    estimated_yearly: float
    retirement_age: int
    trimestres_acquired: int
    trimestres_needed: int
    message: str

class Article(BaseModel):
    id: str
    slug: str
    title: str
    excerpt: str
    content: str
    read_time: int
    date: str
    category: str

# SEO Articles Data
ARTICLES = [
    {
        "id": "1",
        "slug": "comment-lire-son-releve-de-carriere",
        "title": "Comment lire son relevé de carrière ?",
        "excerpt": "Apprenez à décrypter votre relevé de carrière et comprendre chaque ligne de ce document essentiel pour votre retraite.",
        "content": """
# Comment lire son relevé de carrière ?

Le relevé de carrière est un document fondamental pour préparer votre retraite. Il récapitule l'ensemble de vos droits acquis tout au long de votre vie professionnelle.

## Qu'est-ce qu'un relevé de carrière ?

Le relevé de carrière, aussi appelé relevé individuel de situation (RIS), est un document récapitulatif qui retrace l'ensemble de votre parcours professionnel. Il indique :

- **Les périodes d'activité** : emplois, stages, périodes de chômage indemnisé
- **Les trimestres validés** : par année et par régime
- **Les revenus déclarés** : salaires et autres revenus pris en compte
- **Les points acquis** : pour les régimes complémentaires

## Comment obtenir son relevé de carrière ?

Vous pouvez obtenir votre relevé de carrière de plusieurs manières :

1. **En ligne** : sur le site info-retraite.fr avec votre numéro de sécurité sociale
2. **Par courrier** : en écrivant à votre caisse de retraite
3. **Automatiquement** : à partir de 35 ans, vous recevez un relevé tous les 5 ans

## Les informations clés à vérifier

### 1. Les trimestres validés

Chaque année, vous pouvez valider jusqu'à 4 trimestres. Pour une retraite à taux plein, vous devez généralement avoir entre 166 et 172 trimestres selon votre année de naissance.

### 2. Les périodes manquantes

Vérifiez qu'aucune période n'est absente :
- Service militaire
- Congé maternité
- Périodes de chômage
- Stages rémunérés

### 3. Les revenus déclarés

Assurez-vous que les montants correspondent à vos bulletins de salaire. Des erreurs peuvent impacter le calcul de votre pension.

## Que faire en cas d'erreur ?

Si vous constatez une erreur ou un oubli :

1. Rassemblez vos justificatifs (bulletins de salaire, attestations employeur)
2. Contactez votre caisse de retraite
3. Faites une demande de régularisation

## Conseils pratiques

- **Conservez vos bulletins de salaire** : ils sont la preuve de vos cotisations
- **Vérifiez régulièrement** : n'attendez pas la retraite pour contrôler
- **Faites-vous accompagner** : un expert peut vous aider à identifier les anomalies

---

*Ce contenu est fourni à titre informatif. Pour toute question spécifique, consultez un professionnel.*
        """,
        "read_time": 8,
        "date": "2024-01-15",
        "category": "Guide"
    },
    {
        "id": "2",
        "slug": "combien-vais-je-toucher-a-la-retraite",
        "title": "Comment savoir combien je vais toucher à la retraite ?",
        "excerpt": "Découvrez les méthodes pour estimer votre future pension de retraite et les facteurs qui influencent son montant.",
        "content": """
# Comment savoir combien je vais toucher à la retraite ?

La question du montant de sa future retraite préoccupe de nombreux Français. Voici comment obtenir une estimation fiable.

## Les facteurs qui déterminent votre pension

### 1. Le salaire annuel moyen

Pour le régime général, on prend en compte vos 25 meilleures années de revenus. Ces montants sont revalorisés selon l'inflation.

### 2. Le nombre de trimestres

Le nombre de trimestres validés détermine si vous aurez droit à une retraite à taux plein (50%) ou si une décote sera appliquée.

### 3. L'âge de départ

- **Âge légal** : 64 ans (né après 1968)
- **Âge du taux plein automatique** : 67 ans

## La formule de calcul

**Pension = Salaire annuel moyen × Taux × (Trimestres validés / Trimestres requis)**

Exemple pour une personne née en 1965 :
- Salaire annuel moyen : 30 000€
- Taux plein : 50%
- 168 trimestres validés sur 169 requis

Pension = 30 000 × 0,50 × (168/169) = 14 881€/an soit 1 240€/mois

## Les outils d'estimation

### Simulateurs officiels

- **info-retraite.fr** : simulateur M@rel pour une estimation personnalisée
- **Votre relevé de carrière** : estimation indicative incluse

### Notre service d'analyse

Nous analysons vos documents pour vous fournir :
- Une estimation claire de votre pension
- Les points d'attention
- Des recommandations personnalisées

## N'oubliez pas les complémentaires

La retraite de base représente environ 50% de votre pension totale. Ajoutez :
- **AGIRC-ARRCO** : pour les salariés du privé
- **Retraites supplémentaires** : PER, assurance-vie

## Conseils pour optimiser

1. Vérifiez votre relevé de carrière régulièrement
2. Rachetez des trimestres si nécessaire
3. Anticipez votre date de départ
4. Consultez un expert pour les situations complexes

---

*Estimation fournie à titre indicatif. Consultez votre caisse de retraite pour un calcul officiel.*
        """,
        "read_time": 7,
        "date": "2024-01-10",
        "category": "Calcul"
    },
    {
        "id": "3",
        "slug": "erreurs-frequentes-releves-carriere",
        "title": "Les erreurs fréquentes sur les relevés de carrière",
        "excerpt": "Identifiez les erreurs les plus courantes sur votre relevé de carrière et apprenez comment les corriger.",
        "content": """
# Les erreurs fréquentes sur les relevés de carrière

Votre relevé de carrière peut contenir des erreurs qui impacteront votre pension. Apprenez à les repérer.

## Les erreurs les plus courantes

### 1. Périodes d'emploi manquantes

**Causes fréquentes :**
- Employeur n'ayant pas déclaré vos cotisations
- Changement de numéro de sécurité sociale
- Périodes à l'étranger non prises en compte

**Comment vérifier :**
Comparez votre relevé avec vos contrats de travail et bulletins de salaire.

### 2. Trimestres non validés

**Situations oubliées :**
- Service militaire (1 trimestre par 90 jours)
- Congé maternité
- Périodes de maladie longue durée
- Apprentissage

### 3. Salaires incorrects

Des montants erronés peuvent réduire votre pension de plusieurs dizaines d'euros par mois.

**À vérifier :**
- Cohérence avec vos fiches de paie
- Primes et heures supplémentaires déclarées

### 4. Erreurs d'état civil

- Nom mal orthographié
- Date de naissance incorrecte
- Fusion de dossiers avec un homonyme

## Comment repérer ces erreurs ?

### Méthode systématique

1. **Listez tous vos employeurs** depuis le début de votre carrière
2. **Vérifiez année par année** sur votre relevé
3. **Notez les incohérences** : trimestres manquants, montants suspects

### Documents à conserver

- Bulletins de salaire
- Contrats de travail
- Attestations Pôle Emploi
- Relevés de points complémentaires

## Comment corriger une erreur ?

### Étape 1 : Rassembler les preuves

Tout document prouvant votre activité :
- Bulletins de salaire
- Attestations employeur
- Relevés bancaires (en dernier recours)

### Étape 2 : Contacter votre caisse

- Par courrier recommandé
- Via votre espace personnel en ligne
- En agence avec rendez-vous

### Étape 3 : Suivre votre demande

La régularisation peut prendre plusieurs mois. Relancez si nécessaire.

## Statistiques

Selon nos analyses :
- **30%** des relevés contiennent au moins une anomalie
- **15%** des erreurs impactent significativement la pension
- Les corrections peuvent rapporter **jusqu'à 100€/mois** supplémentaires

## Notre service

Notre analyse complète identifie automatiquement les incohérences et vous guide dans les démarches de correction.

---

*Ce contenu est fourni à titre informatif et pédagogique.*
        """,
        "read_time": 9,
        "date": "2024-01-08",
        "category": "Erreurs"
    },
    {
        "id": "4",
        "slug": "que-faire-a-la-retraite-bons-plans",
        "title": "Que faire à la retraite : les bons plans",
        "excerpt": "Découvrez comment profiter pleinement de votre retraite avec nos conseils et bons plans.",
        "content": """
# Que faire à la retraite : les bons plans

La retraite est une nouvelle étape de vie riche en possibilités. Voici comment en profiter pleinement.

## Activités et loisirs

### Voyager malin

- **Voyages hors saison** : tarifs réduits, moins de monde
- **Cartes de réduction** : SNCF Senior+, Air France Senior
- **Séjours organisés** : clubs et associations de retraités

### Activités culturelles

- **Carte Senior** : réductions musées et spectacles
- **Universités du temps libre** : cours et conférences
- **Bibliothèques** : accès gratuit et animations

### Sport et bien-être

- **Associations sportives** : tarifs préférentiels seniors
- **Aquagym, yoga, marche** : activités adaptées
- **Thermalisme** : cures partiellement remboursées

## Engagement et utilité sociale

### Bénévolat

- **Associations locales** : Restos du Cœur, Secours Populaire
- **Accompagnement scolaire** : aide aux devoirs
- **Visites aux personnes isolées**

### Transmission

- **Mentorat** : partagez votre expertise
- **Grands-parents** : temps privilégié avec les petits-enfants
- **Ateliers et formations** : enseignez votre savoir-faire

## Avantages financiers

### Réductions transports

- **SNCF** : carte Avantage Senior (49€/an, -30% toute l'année)
- **Transports locaux** : tarifs réduits selon communes
- **Avion** : offres seniors régulières

### Aides et allocations

- **ASPA** : minimum vieillesse si revenus faibles
- **APL** : aide au logement possible
- **Réductions fiscales** : demi-part supplémentaire après 74 ans

## Préparer cette transition

### Financièrement

- Anticipez vos revenus et dépenses
- Adaptez votre patrimoine
- Prévoyez les imprévus santé

### Psychologiquement

- Maintenez un rythme de vie
- Cultivez vos relations sociales
- Gardez des projets à court et long terme

## Ressources utiles

- **France Services** : accompagnement administratif
- **CARSAT** : conseils personnalisés
- **Associations de retraités** : entraide et activités

---

*Profitez de cette nouvelle vie en restant actif et connecté !*
        """,
        "read_time": 6,
        "date": "2024-01-05",
        "category": "Lifestyle"
    },
    {
        "id": "5",
        "slug": "age-depart-retraite-france",
        "title": "À quel âge partir à la retraite en France ?",
        "excerpt": "Tout savoir sur l'âge légal de départ à la retraite et les conditions pour partir plus tôt ou plus tard.",
        "content": """
# À quel âge partir à la retraite en France ?

L'âge de départ à la retraite dépend de plusieurs facteurs. Faisons le point sur les règles actuelles.

## Âge légal de départ

### Réforme 2023

L'âge légal augmente progressivement :
- **Né avant 1961** : 62 ans
- **Né en 1962** : 62 ans et 6 mois
- **Né en 1963** : 62 ans et 9 mois
- **Né en 1964** : 63 ans
- **Né en 1965** : 63 ans et 3 mois
- **Né en 1966** : 63 ans et 6 mois
- **Né en 1967** : 63 ans et 9 mois
- **Né à partir de 1968** : 64 ans

### Âge du taux plein automatique

À **67 ans**, vous bénéficiez automatiquement du taux plein, quel que soit votre nombre de trimestres.

## Partir avant l'âge légal

### Carrières longues

Vous pouvez partir plus tôt si :
- Vous avez commencé à travailler avant 16, 18 ou 20 ans
- Vous avez cotisé suffisamment de trimestres

### Handicap

Conditions allégées pour les personnes en situation de handicap avec un taux d'incapacité reconnu.

### Pénibilité

Le compte professionnel de prévention (C2P) permet d'accumuler des points convertibles en trimestres.

### Invalidité et inaptitude

Départ possible à 62 ans avec taux plein en cas d'inaptitude au travail.

## Partir après l'âge légal

### Surcote

Chaque trimestre travaillé après l'âge légal et le nombre de trimestres requis donne droit à une **majoration de 1,25%** par trimestre.

Exemple : 2 ans de surcote = +10% sur votre pension

### Cumul emploi-retraite

Vous pouvez continuer à travailler tout en touchant votre pension, sous certaines conditions.

## Comment choisir ?

### Éléments à considérer

1. **Votre nombre de trimestres** : avez-vous le taux plein ?
2. **Votre santé** : capacité à continuer à travailler
3. **Vos finances** : revenus suffisants ?
4. **Vos projets** : que souhaitez-vous faire ?

### Notre recommandation

Faites analyser votre situation pour :
- Connaître précisément vos droits
- Identifier la date optimale de départ
- Éviter les mauvaises surprises

---

*Les règles évoluent régulièrement. Vérifiez votre situation personnelle auprès des organismes officiels.*
        """,
        "read_time": 8,
        "date": "2024-01-03",
        "category": "Réglementation"
    },
    {
        "id": "6",
        "slug": "ne-pas-etre-isole-retraite",
        "title": "Ne pas être isolé à la retraite",
        "excerpt": "Conseils et ressources pour maintenir une vie sociale active et éviter l'isolement à la retraite.",
        "content": """
# Ne pas être isolé à la retraite

L'isolement est un risque réel à la retraite. Voici comment maintenir une vie sociale épanouissante.

## Les risques de l'isolement

### Impact sur la santé

- **Dépression** : risque multiplié par 2
- **Déclin cognitif** : stimulation sociale essentielle
- **Problèmes cardiovasculaires** : stress chronique

### Signaux d'alerte

- Moins de sorties qu'avant
- Contacts familiaux réduits
- Perte d'intérêt pour les activités
- Sentiment d'inutilité

## Maintenir le lien social

### Famille et amis

- **Planifiez des rencontres** régulières
- **Utilisez la technologie** : appels vidéo, réseaux sociaux
- **Proposez des activités** : repas, sorties

### Nouveaux cercles

- **Associations locales** : sport, culture, bénévolat
- **Clubs seniors** : activités et rencontres
- **Voisinage** : initiatives de quartier

## Activités pour rester connecté

### Physiques et de groupe

- Marche collective
- Aquagym
- Yoga
- Danses de salon

### Intellectuelles

- Universités du temps libre
- Clubs de lecture
- Ateliers créatifs
- Apprentissage de langues

### Engagement

- Bénévolat associatif
- Aide aux devoirs
- Visites aux personnes âgées
- Jardins partagés

## Ressources et aides

### Services publics

- **CCAS** (Centre Communal d'Action Sociale)
- **Maisons France Services**
- **Caisses de retraite** : actions de prévention

### Associations

- **Petits Frères des Pauvres**
- **AGIRC-ARRCO** : actions sociales
- **Monalisa** : lutte contre l'isolement

### Technologies

- Tablettes simplifiées pour seniors
- Applications de mise en relation
- Réseaux sociaux familiaux

## Préparer sa transition

### Avant la retraite

1. Développez des centres d'intérêt hors travail
2. Cultivez vos amitiés non-professionnelles
3. Identifiez des activités à pratiquer

### Dès le départ

1. Inscrivez-vous à des activités rapidement
2. Maintenez une routine sociale
3. Restez ouvert aux nouvelles rencontres

---

*La retraite est l'occasion de tisser de nouveaux liens. N'hésitez pas à faire le premier pas !*
        """,
        "read_time": 7,
        "date": "2024-01-01",
        "category": "Bien-être"
    },
    {
        "id": "7",
        "slug": "recuperer-trimestres-manquants",
        "title": "Comment récupérer ses trimestres manquants ?",
        "excerpt": "Découvrez les solutions pour compléter vos trimestres et optimiser votre retraite.",
        "content": """
# Comment récupérer ses trimestres manquants ?

Des trimestres manquants peuvent réduire significativement votre pension. Voici comment les récupérer.

## Identifier les trimestres manquants

### Sur votre relevé de carrière

Vérifiez :
- Les périodes sans trimestre validé
- Les années avec moins de 4 trimestres
- Les périodes non reportées (étranger, service militaire)

### Causes fréquentes

- Études supérieures
- Années incomplètes de travail
- Périodes à l'étranger
- Congé parental non déclaré

## Solutions pour récupérer des trimestres

### 1. Rachat de trimestres

**Types de rachat :**
- **Années d'études supérieures** : jusqu'à 12 trimestres
- **Années incomplètes** : compléter les années avec moins de 4 trimestres

**Coût :**
- Variable selon l'âge et les revenus
- Entre 1 000€ et 6 500€ par trimestre
- Déductible des impôts

### 2. Régularisation de carrière

**Périodes récupérables :**
- Service militaire
- Congé maternité
- Périodes de maladie
- Apprentissage

**Démarche :**
Contacter votre caisse avec les justificatifs appropriés.

### 3. Majoration de durée d'assurance

**Situations ouvrant droit :**
- Enfants : 8 trimestres par enfant (mère)
- Congé parental : jusqu'à 8 trimestres
- Enfant handicapé : majoration spécifique

### 4. Assurance vieillesse des parents au foyer (AVPF)

Si vous avez interrompu votre activité pour élever vos enfants, des trimestres peuvent être validés gratuitement.

## Calcul de rentabilité

### Quand racheter ?

Le rachat est intéressant si :
- Vous approchez de la retraite (moins de 10 ans)
- La décote serait importante
- Vous êtes dans une tranche d'imposition élevée (déduction fiscale)

### Exemple de calcul

Sans rachat : pension de 1 200€/mois avec décote de 5%
Avec rachat de 4 trimestres : pension de 1 260€/mois

Coût du rachat : 10 000€
Gain sur 20 ans : 60€ × 12 × 20 = 14 400€

**Rentabilité en 14 ans environ.**

## Démarches pratiques

### 1. Demander un devis

- Sur lassuranceretraite.fr
- Gratuit et sans engagement

### 2. Évaluer l'impact

- Simulation avec et sans rachat
- Calcul du retour sur investissement

### 3. Effectuer le rachat

- Paiement en une ou plusieurs fois
- Sur plusieurs années fiscales possibles

---

*Chaque situation est unique. Faites analyser votre relevé pour identifier les meilleures options.*
        """,
        "read_time": 9,
        "date": "2023-12-28",
        "category": "Optimisation"
    },
    {
        "id": "8",
        "slug": "demarches-avant-retraite",
        "title": "Retraite : les démarches à faire avant de partir",
        "excerpt": "Checklist complète des démarches administratives à effectuer avant votre départ à la retraite.",
        "content": """
# Retraite : les démarches à faire avant de partir

Préparez sereinement votre départ avec cette checklist des démarches essentielles.

## 6 mois avant : anticipation

### Vérifier son relevé de carrière

- Téléchargez votre relevé sur info-retraite.fr
- Vérifiez chaque période d'emploi
- Signalez les anomalies immédiatement

### Estimer sa pension

- Utilisez le simulateur M@rel
- Faites une demande d'estimation indicative globale (EIG)
- Identifiez votre date optimale de départ

### Préparer ses documents

Rassemblez :
- Pièce d'identité
- Livret de famille
- Relevés de carrière
- Attestations d'emploi manquantes

## 4 mois avant : démarches officielles

### Informer son employeur

- Respectez le préavis (généralement 2 mois)
- Négociez les conditions de départ
- Demandez votre solde de tout compte

### Faire sa demande de retraite

**Retraite de base :**
- En ligne sur lassuranceretraite.fr
- Ou par formulaire papier (cerfa 10916)

**Retraites complémentaires :**
- Demande unique sur info-retraite.fr
- Ou auprès de chaque caisse séparément

### Documents à fournir

- Pièce d'identité
- RIB
- Dernier avis d'imposition
- Attestation de cessation d'activité

## 2 mois avant : finalisation

### Vérifier l'avancement

- Suivi en ligne des demandes
- Relancer si pas de nouvelle
- Compléter les pièces manquantes

### Préparer la transition

- Organiser le passage de témoin au travail
- Mettre à jour son adresse si déménagement
- Prévoir sa nouvelle routine

## Le jour J et après

### Premiers versements

- Retraite de base : le mois suivant la date d'effet
- Complémentaires : généralement sous 2-3 mois

### Vérifications

- Contrôlez le montant versé
- Signalez toute erreur rapidement
- Conservez tous les documents

## Erreurs à éviter

### Ne pas anticiper

La demande de retraite n'est pas rétroactive. Si vous tardez, vous perdez des mois de pension.

### Oublier les complémentaires

Chaque régime nécessite une demande séparée (sauf via info-retraite.fr).

### Négliger les vérifications

Une erreur non signalée peut être difficile à corriger ensuite.

## Notre accompagnement

Nous vous aidons à :
- Vérifier votre relevé de carrière
- Identifier les anomalies
- Préparer sereinement votre départ

---

*Commencez les démarches tôt pour partir l'esprit tranquille !*
        """,
        "read_time": 8,
        "date": "2023-12-25",
        "category": "Démarches"
    },
    {
        "id": "9",
        "slug": "retraite-plus-faible-que-prevu",
        "title": "Pourquoi votre retraite pourrait être plus faible que prévu",
        "excerpt": "Les facteurs méconnus qui peuvent réduire votre pension et comment les anticiper.",
        "content": """
# Pourquoi votre retraite pourrait être plus faible que prévu

De nombreux Français découvrent avec surprise un montant de pension inférieur à leurs attentes. Voici pourquoi.

## Les principales causes

### 1. Trimestres manquants

**Impact de la décote :**
- 1,25% de moins par trimestre manquant
- Jusqu'à 25% de décote maximale

**Exemple :**
168 trimestres requis, 160 validés = 8 trimestres manquants
Décote : 8 × 1,25% = 10% de pension en moins

### 2. Salaires sous-évalués

**25 meilleures années :**
- Seuls les revenus déclarés comptent
- Travail au noir = trimestres mais pas de revenus
- Temps partiel = revenus réduits

### 3. Carrières hachées

- Chômage non indemnisé
- Congé parental non déclaré
- Périodes à l'étranger perdues

### 4. Erreurs sur le relevé

- Périodes non reportées
- Salaires mal déclarés
- Doublons ou confusions

## Facteurs aggravants méconnus

### La surcotisation non prise en compte

Si vous avez cotisé plus que nécessaire, l'excédent n'augmente pas votre pension de base.

### Les temps partiels

Un mi-temps génère 2 trimestres par an maximum, pas 4.

### L'inflation

Les salaires anciens sont revalorisés, mais parfois insuffisamment.

## Comment anticiper ?

### Vérifiez régulièrement

- Dès 35 ans : contrôle tous les 5 ans
- Dès 50 ans : contrôle annuel
- Dès 55 ans : demande d'estimation officielle

### Corrigez les erreurs

- Signalement rapide = correction plus facile
- Conservez tous vos justificatifs
- Faites une demande de régularisation si nécessaire

### Optimisez si possible

- Rachat de trimestres
- Report de départ
- Cumul emploi-retraite

## Les surprises de dernière minute

### Le montant net

La pension brute est amputée de :
- CSG : 8,3% (ou taux réduit selon revenus)
- CRDS : 0,5%
- Casa : 0,3%

**Exemple :** 1 500€ brut = environ 1 350€ net

### Les régimes différents

Chaque régime calcule sa part séparément. Des règles différentes peuvent s'appliquer.

## Notre solution

Notre analyse permet de :
- Identifier les anomalies cachées
- Estimer votre vraie pension
- Anticiper les mauvaises surprises

---

*Mieux vaut savoir maintenant que découvrir trop tard. Faites vérifier votre situation.*
        """,
        "read_time": 8,
        "date": "2023-12-20",
        "category": "Alerte"
    },
    {
        "id": "10",
        "slug": "gestion-psychologique-retraite",
        "title": "Gestion psychologique : stress, burn-out après le travail",
        "excerpt": "Comment gérer la transition psychologique vers la retraite et maintenir son équilibre mental.",
        "content": """
# Gestion psychologique : stress, burn-out après le travail

La transition vers la retraite est un bouleversement psychologique majeur. Voici comment le traverser sereinement.

## Le paradoxe de la retraite

### Soulagement et perte

Sentiments contradictoires :
- **Liberté** retrouvée
- **Perte d'identité** professionnelle
- **Fin d'une routine** structurante
- **Éloignement** du cercle social du travail

### Le "burn-out" inversé

Certains vivent mal le passage à l'inactivité :
- Sentiment d'inutilité
- Perte de sens
- Ennui chronique
- Dépression réactionnelle

## Signes d'alerte

### À surveiller

- Troubles du sommeil
- Irritabilité inhabituelle
- Repli sur soi
- Perte d'appétit ou de motivation
- Ruminations sur le passé

### Facteurs de risque

- Identité fortement liée au travail
- Départ non choisi (licenciement, maladie)
- Réseau social principalement professionnel
- Absence de projets personnels

## Stratégies d'adaptation

### Avant le départ

1. **Préparez la transition** mentalement
2. **Développez des intérêts** hors travail
3. **Cultivez des amitiés** personnelles
4. **Imaginez votre nouvelle vie** concrètement

### Les premiers mois

1. **Maintenez une structure** : lever régulier, activités planifiées
2. **Évitez l'isolement** : sorties, contacts sociaux
3. **Trouvez un nouveau sens** : bénévolat, transmission, projets
4. **Prenez soin de vous** : sport, alimentation, sommeil

### Sur le long terme

1. **Acceptez cette nouvelle identité**
2. **Valorisez votre expérience** autrement
3. **Restez curieux et ouvert**
4. **Cultivez la gratitude**

## Ressources d'aide

### Professionnels

- **Psychologues** : accompagnement de transition
- **Médecin traitant** : détection et orientation
- **Coachs de vie** : projets et remotivation

### Structures

- **Centres de prévention** des caisses de retraite
- **Associations de retraités**
- **Groupes de parole**

## Témoignages

> "Les 6 premiers mois ont été difficiles. J'ai eu l'impression de ne plus servir à rien. Puis j'ai commencé le bénévolat et tout a changé." — Michel, 66 ans

> "J'ai pris rendez-vous avec une psychologue dès mon départ. Ça m'a beaucoup aidée à faire le deuil de ma carrière." — Françoise, 63 ans

## Notre conseil

La préparation psychologique est aussi importante que la préparation financière. N'hésitez pas à vous faire accompagner.

---

*La retraite est une transition, pas une fin. Donnez-vous le temps de vous réinventer.*
        """,
        "read_time": 9,
        "date": "2023-12-15",
        "category": "Bien-être"
    },
    {
        "id": "11",
        "slug": "simulateur-retraite-fiabilite",
        "title": "Simulateur retraite : est-ce fiable ?",
        "excerpt": "Analyse critique des simulateurs de retraite en ligne : leurs limites et comment les utiliser correctement.",
        "content": """
# Simulateur retraite : est-ce fiable ?

Les simulateurs de retraite se multiplient en ligne. Mais peut-on vraiment s'y fier ?

## Les différents types de simulateurs

### Simulateurs officiels

**M@rel (info-retraite.fr) :**
- Accès à vos vraies données de carrière
- Calcul multi-régimes
- Mise à jour régulière

**Lassuranceretraite.fr :**
- Estimation pour le régime général
- Basé sur votre relevé de carrière réel

### Simulateurs simplifiés

**Avantages :**
- Rapides et accessibles
- Premiers ordres de grandeur
- Sensibilisation au sujet

**Inconvénients :**
- Formules très simplifiées
- Ne tiennent pas compte de votre vraie carrière
- Peuvent être très imprécis

## Limites des simulateurs

### Données incomplètes

- Carrières complexes mal prises en compte
- Périodes à l'étranger souvent ignorées
- Régimes spéciaux mal intégrés

### Hypothèses simplificatrices

- Projection linéaire des revenus
- Non prise en compte des évolutions réglementaires
- Moyenne des 25 meilleures années approximative

### Facteurs non intégrés

- Rachats de trimestres futurs
- Majorations pour enfants
- Surcote potentielle

## Comment bien utiliser un simulateur ?

### Étapes recommandées

1. **Commencez par M@rel** : le plus fiable car basé sur vos vraies données
2. **Vérifiez votre relevé** avant : données correctes = simulation correcte
3. **Testez plusieurs scénarios** : dates de départ, évolutions de salaire
4. **Prenez les résultats comme indicatifs** : pas comme une promesse

### Questions à se poser

- Mon relevé de carrière est-il complet ?
- Mes derniers revenus sont-ils bien intégrés ?
- Ai-je des périodes spéciales (étranger, fonctionnaire, indépendant) ?

## Notre simulateur

Notre outil propose une estimation rapide basée sur 3 paramètres :
- Âge actuel
- Années de cotisation
- Revenu moyen

**Attention :** Il s'agit d'une estimation indicative simplifiée pour sensibiliser. Elle ne remplace pas une analyse complète.

## Pour aller plus loin

### Analyse personnalisée

Notre service analyse vos documents pour :
- Identifier les incohérences
- Estimer précisément votre situation
- Repérer les optimisations possibles

### Consultation officielle

- Rendez-vous avec votre CARSAT
- Demande d'estimation indicative globale (EIG)
- Entretien information retraite (EIR)

---

*Les simulateurs sont des outils, pas des oracles. Faites vérifier votre situation par un expert.*
        """,
        "read_time": 7,
        "date": "2023-12-10",
        "category": "Outils"
    },
    {
        "id": "12",
        "slug": "optimiser-retraite-sans-expert",
        "title": "Comment optimiser sa retraite sans être expert",
        "excerpt": "Des conseils simples et accessibles pour améliorer votre future pension, même sans connaissances techniques.",
        "content": """
# Comment optimiser sa retraite sans être expert

Pas besoin d'être spécialiste pour améliorer sa future pension. Voici les actions concrètes accessibles à tous.

## Actions immédiates

### 1. Vérifier son relevé de carrière

**Pourquoi :**
30% des relevés contiennent des erreurs pouvant impacter la pension.

**Comment :**
- Connectez-vous sur info-retraite.fr
- Téléchargez votre relevé
- Comparez avec vos bulletins de salaire

### 2. Conserver ses documents

**Essentiels :**
- Bulletins de salaire (tous)
- Contrats de travail
- Attestations Pôle Emploi
- Documents service militaire

### 3. Signaler les erreurs rapidement

Plus c'est fait tôt, plus c'est facile à corriger.

## Optimisations selon votre situation

### Si vous avez des enfants

**Vérifiez :**
- Majoration de durée d'assurance (8 trimestres par enfant)
- Majoration de 10% pour 3 enfants et plus
- AVPF si vous avez interrompu votre carrière

### Si vous avez travaillé à l'étranger

**Demandez :**
- Attestation de périodes auprès du pays concerné
- Coordination des régimes européens
- Totalisation des périodes

### Si vous avez fait des études supérieures

**Évaluez :**
- L'intérêt d'un rachat de trimestres
- Le coût selon votre âge
- La rentabilité (retour sur investissement)

## Timing des décisions

### Avant 50 ans

- Commencez à vérifier votre relevé
- Conservez vos documents
- Informez-vous sur vos droits

### Entre 50 et 55 ans

- Faites un point complet
- Identifiez les trimestres manquants
- Évaluez les options de rachat

### Après 55 ans

- Demandez une estimation officielle
- Planifiez votre date de départ
- Optimisez les dernières années

## Erreurs courantes à éviter

### Attendre le dernier moment

- Moins de marge pour corriger les erreurs
- Rachats plus chers
- Stress inutile

### Négliger les complémentaires

- AGIRC-ARRCO : environ 40% de la pension totale
- Vérifiez aussi vos points

### Se fier uniquement aux simulateurs

- Résultats indicatifs seulement
- Ne remplacent pas une analyse

## Notre offre

### Analyse rapide (9€)

- Vérification de base
- Points d'attention principaux

### Analyse complète (29€)

- Examen détaillé
- Optimisations identifiées
- Checklist personnalisée

### Accompagnement (150€)

- Analyse complète
- Échange personnalisé
- Suivi des démarches

---

*L'optimisation de la retraite est accessible à tous. Commencez par vérifier votre relevé !*
        """,
        "read_time": 8,
        "date": "2023-12-05",
        "category": "Optimisation"
    },
    {
        "id": "13",
        "slug": "releve-carriere-incomplet",
        "title": "Relevé de carrière incomplet : que faire ?",
        "excerpt": "Guide pratique pour identifier et compléter les périodes manquantes sur votre relevé de carrière.",
        "content": """
# Relevé de carrière incomplet : que faire ?

Un relevé incomplet peut vous faire perdre des trimestres et réduire votre pension. Voici comment réagir.

## Identifier les lacunes

### Ce qui doit figurer

- **Tous vos emplois** depuis le premier
- **Les périodes assimilées** : chômage, maladie, maternité
- **Le service militaire**
- **Les stages rémunérés**
- **L'apprentissage**

### Comment repérer les manques

1. Listez chronologiquement tous vos emplois
2. Comparez avec votre relevé année par année
3. Notez les écarts

### Cas fréquents d'oubli

- Premier emploi (jobs étudiants)
- Travail saisonnier
- Missions d'intérim
- Périodes à l'étranger
- Changement de statut (salarié → indépendant)

## Procédure de régularisation

### Étape 1 : Rassembler les preuves

**Documents acceptés :**
- Bulletins de salaire
- Contrats de travail
- Certificats de travail
- Attestations employeur
- Relevés bancaires (dernier recours)

**En cas de documents perdus :**
- Demandez des duplicatas aux anciens employeurs
- Contactez les Archives départementales
- Sollicitez l'URSSAF ou les caisses concernées

### Étape 2 : Faire la demande

**Par courrier :**
- Lettre explicative
- Copies des justificatifs
- Relevé de carrière annoté

**En ligne :**
- Espace personnel lassuranceretraite.fr
- Rubrique "signaler une anomalie"

### Étape 3 : Suivre le dossier

- Délai : 2 à 6 mois généralement
- Relancer si pas de nouvelle après 2 mois
- Conserver les accusés de réception

## Cas particuliers

### Service militaire

**Documents :**
- Livret militaire
- État signalétique et des services

**Démarche :**
Demande au Bureau central des archives (Pau)

### Congé maternité

**Vérifier :**
- 1 trimestre par 90 jours d'arrêt
- Inscription automatique si bien déclarée

### Périodes à l'étranger

**Union Européenne :**
- Coordination des régimes
- Formulaire E205

**Hors UE :**
- Conventions bilatérales
- Attestation du pays concerné

## Délais de prescription

### Règle générale

Aucune prescription pour faire valoir des droits réels, mais :
- Plus c'est ancien, plus c'est difficile à prouver
- Certains employeurs n'existent plus

### Conseil

Vérifiez et corrigez dès maintenant, n'attendez pas la retraite.

## Notre accompagnement

Nous analysons votre relevé et identifions :
- Les périodes potentiellement manquantes
- Les démarches à entreprendre
- Les documents à rechercher

---

*Un relevé complet, c'est une retraite optimisée. Vérifiez le vôtre dès aujourd'hui.*
        """,
        "read_time": 9,
        "date": "2023-12-01",
        "category": "Démarches"
    }
]

# Routes

@api_router.get("/")
async def root():
    return {"message": "API Solutions TMF - Analyse Retraite"}

@api_router.post("/contact", response_model=ContactForm)
async def submit_contact(input: ContactFormCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactForm(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactForm])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact['timestamp'], str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    return contacts

@api_router.post("/simulate", response_model=SimulatorResult)
async def simulate_retirement(input: SimulatorInput):
    """
    Simulateur simplifié de retraite
    Formule indicative basée sur le système français
    """
    # Calcul simplifié pour estimation
    age = input.age
    years = input.years_contributed
    income = input.average_income
    
    # Trimestres acquis (approximation: 4 par an)
    trimestres_acquired = years * 4
    
    # Trimestres nécessaires (172 pour les générations récentes)
    trimestres_needed = 172
    
    # Âge légal de départ
    retirement_age = 64
    
    # Calcul du taux (50% max, avec décote si trimestres manquants)
    trimestres_missing = max(0, trimestres_needed - trimestres_acquired)
    decote = min(trimestres_missing * 0.625, 25)  # Max 25% de décote
    taux = 50 - decote
    
    # Salaire annuel moyen (on prend le revenu moyen fourni)
    sam = income
    
    # Pension annuelle de base
    pension_base = sam * (taux / 100) * (min(trimestres_acquired, trimestres_needed) / trimestres_needed)
    
    # Complémentaire estimée (environ 40% de la pension totale)
    pension_complementaire = pension_base * 0.67
    
    # Total
    pension_annuelle = pension_base + pension_complementaire
    pension_mensuelle = pension_annuelle / 12
    
    # Message personnalisé
    if trimestres_missing > 0:
        message = f"Attention : il vous manque environ {trimestres_missing} trimestres pour le taux plein. Envisagez de vérifier votre relevé de carrière."
    else:
        message = "Vous semblez avoir suffisamment de trimestres pour une retraite à taux plein. Félicitations !"
    
    return SimulatorResult(
        estimated_monthly=round(pension_mensuelle, 2),
        estimated_yearly=round(pension_annuelle, 2),
        retirement_age=retirement_age,
        trimestres_acquired=trimestres_acquired,
        trimestres_needed=trimestres_needed,
        message=message
    )

@api_router.get("/articles", response_model=List[Article])
async def get_articles():
    return ARTICLES

@api_router.get("/articles/{slug}")
async def get_article(slug: str):
    for article in ARTICLES:
        if article["slug"] == slug:
            return article
    raise HTTPException(status_code=404, detail="Article not found")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

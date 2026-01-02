// ============================================
// Forschungs-Definitionen für Space Colonies
// ============================================

/**
 * Forschungs-Struktur:
 * - id: Eindeutige ID
 * - name: Anzeigename
 * - description: Beschreibung des Effekts
 * - icon: Emoji
 * - tier: Forschungs-Stufe (1-3)
 * - cost: Forschungspunkte-Kosten
 * - effect: Effekt der Forschung
 * - requires: Voraussetzungen (optional)
 * - category: 'production' | 'efficiency' | 'unlock' | 'global'
 */

const researchDefinitions = [
  
  // ============================================
  // TIER 1: FRÜHE TECHNOLOGIEN
  // ============================================
  
  {
    id: 'basic_energy',
    name: 'Grundlagen Energietechnik',
    icon: '⚡',
    description: 'Erhöht die Energieproduktion aller Generatoren um 20%.',
    tier: 1,
    category: 'efficiency',
    cost: {
      research: 10
    },
    effect: {
      type: 'production_multiplier',
      resource: 'energy',
      multiplier: 1.2
    },
    unlocked: true
  },
  
  {
    id: 'water_conservation',
    name: 'Wasser-Erhaltung',
    icon: '💧',
    description: 'Reduziert Wasserverlust. +25% Wasserproduktion.',
    tier: 1,
    category: 'efficiency',
    cost: {
      research: 15
    },
    effect: {
      type: 'production_multiplier',
      resource: 'water',
      multiplier: 1.25
    },
    unlocked: true
  },
  
  {
    id: 'nutrition_science',
    name: 'Ernährungswissenschaft',
    icon: '🌾',
    description: 'Optimiert Nahrungsproduktion. +30% Nahrung.',
    tier: 1,
    category: 'efficiency',
    cost: {
      research: 20
    },
    effect: {
      type: 'production_multiplier',
      resource: 'food',
      multiplier: 1.3
    },
    unlocked: false,
    requires: {
      research: 'water_conservation',
      completed: true
    }
  },
  
  {
    id: 'colony_management',
    name: 'Kolonieverwaltung',
    icon: '📋',
    description: 'Bessere Organisation. Bevölkerungswachstum +20%.',
    tier: 1,
    category: 'efficiency',
    cost: {
      research: 25
    },
    effect: {
      type: 'production_multiplier',
      resource: 'population',
      multiplier: 1.2
    },
    unlocked: false,
    requires: {
      research: 'nutrition_science',
      completed: true
    }
  },
  
  {
    id: 'mining_techniques',
    name: 'Bergbau-Techniken',
    icon: '⛏️',
    description: 'Effizienterer Abbau. +25% Gestein und Metall.',
    tier: 1,
    category: 'efficiency',
    cost: {
      research: 30
    },
    effect: {
      type: 'production_multiplier',
      resources: ['stone', 'metal'],
      multiplier: 1.25
    },
    unlocked: false,
    requires: {
      resource: 'stone',
      amount: 100
    }
  },
  
  {
    id: 'click_automation',
    name: 'Klick-Automatisierung',
    icon: '🔄',
    description: 'Verdoppelt den Energie-Gewinn pro Klick.',
    tier: 1,
    category: 'global',
    cost: {
      research: 20
    },
    effect: {
      type: 'click_multiplier',
      multiplier: 2
    },
    unlocked: true
  },
  
  // ============================================
  // TIER 2: FORTGESCHRITTENE TECHNOLOGIEN
  // ============================================
  
  {
    id: 'advanced_energy',
    name: 'Fortgeschrittene Energietechnik',
    icon: '⚡',
    description: 'Weitere +30% Energieproduktion (kumulativ).',
    tier: 2,
    category: 'efficiency',
    cost: {
      research: 50
    },
    effect: {
      type: 'production_multiplier',
      resource: 'energy',
      multiplier: 1.3
    },
    unlocked: false,
    requires: {
      research: 'basic_energy',
      completed: true
    }
  },
  
  {
    id: 'hydroponics_advanced',
    name: 'Fortgeschrittene Hydroponik',
    icon: '🌱',
    description: 'Nahrungsproduktion +50%.',
    tier: 2,
    category: 'efficiency',
    cost: {
      research: 60
    },
    effect: {
      type: 'production_multiplier',
      resource: 'food',
      multiplier: 1.5
    },
    unlocked: false,
    requires: {
      research: 'nutrition_science',
      completed: true
    }
  },
  
  {
    id: 'automation_systems',
    name: 'Automatisierungssysteme',
    icon: '🤖',
    description: 'Reduziert Bevölkerungskosten aller Gebäude um 25%.',
    tier: 2,
    category: 'global',
    cost: {
      research: 70
    },
    effect: {
      type: 'cost_reduction',
      resource: 'population',
      reduction: 0.25
    },
    unlocked: false,
    requires: {
      research: 'colony_management',
      completed: true
    }
  },
  
  {
    id: 'crystallography',
    name: 'Kristallographie',
    icon: '💎',
    description: 'Kristallproduktion +40%.',
    tier: 2,
    category: 'efficiency',
    cost: {
      research: 80
    },
    effect: {
      type: 'production_multiplier',
      resource: 'crystals',
      multiplier: 1.4
    },
    unlocked: false,
    requires: {
      resource: 'crystals',
      amount: 50
    }
  },
  
  {
    id: 'metallurgy',
    name: 'Fortgeschrittene Metallurgie',
    icon: '🔩',
    description: 'Metallproduktion +50%, reduziert Gesteinverbrauch um 20%.',
    tier: 2,
    category: 'efficiency',
    cost: {
      research: 75
    },
    effect: {
      type: 'production_multiplier',
      resource: 'metal',
      multiplier: 1.5,
      consumptionReduction: 0.2
    },
    unlocked: false,
    requires: {
      research: 'mining_techniques',
      completed: true
    }
  },
  
  {
    id: 'space_expansion_basics',
    name: 'Grundlagen Raumerweiterung',
    icon: '🚀',
    description: 'Schaltet Treibstoff-Produktion frei. +10 Bauplätze.',
    tier: 2,
    category: 'unlock',
    cost: {
      research: 100
    },
    effect: {
      type: 'unlock',
      unlocks: ['fuel_refinery'],
      spaceIncrease: 10
    },
    unlocked: false,
    requires: {
      resource: 'crystals',
      amount: 100
    }
  },
  
  {
    id: 'research_efficiency',
    name: 'Forschungseffizienz',
    icon: '📚',
    description: 'Forschungspunkte-Generierung +50%.',
    tier: 2,
    category: 'efficiency',
    cost: {
      research: 50
    },
    effect: {
      type: 'production_multiplier',
      resource: 'research',
      multiplier: 1.5
    },
    unlocked: false,
    requires: {
      resource: 'research',
      amount: 20
    }
  },
  
  // ============================================
  // TIER 3: HOCHENTWICKELTE TECHNOLOGIEN
  // ============================================
  
  {
    id: 'quantum_energy',
    name: 'Quantenenergie',
    icon: '✨',
    description: 'Revolutioniert Energiegewinnung. +100% Energie.',
    tier: 3,
    category: 'efficiency',
    cost: {
      research: 200
    },
    effect: {
      type: 'production_multiplier',
      resource: 'energy',
      multiplier: 2
    },
    unlocked: false,
    requires: {
      research: 'advanced_energy',
      completed: true
    }
  },
  
  {
    id: 'nanotechnology',
    name: 'Nanotechnologie',
    icon: '🔬',
    description: 'Alle Ressourcenproduktion +25% (global).',
    tier: 3,
    category: 'global',
    cost: {
      research: 250
    },
    effect: {
      type: 'global_multiplier',
      multiplier: 1.25
    },
    unlocked: false,
    requires: {
      research: 'crystallography',
      completed: true
    }
  },
  
  {
    id: 'ai_optimization',
    name: 'KI-Optimierung',
    icon: '🧠',
    description: 'KI optimiert alle Prozesse. Alle Produktionsgebäude +30%.',
    tier: 3,
    category: 'global',
    cost: {
      research: 300
    },
    effect: {
      type: 'building_multiplier',
      multiplier: 1.3
    },
    unlocked: false,
    requires: {
      research: 'automation_systems',
      completed: true
    }
  },
  
  {
    id: 'fusion_mastery',
    name: 'Fusionsbeherrschung',
    icon: '⚛️',
    description: 'Fusionsreaktoren produzieren +100%. Energiekosten -20%.',
    tier: 3,
    category: 'efficiency',
    cost: {
      research: 350
    },
    effect: {
      type: 'building_specific',
      target: 'fusion_reactor',
      multiplier: 2,
      costReduction: {
        resource: 'energy',
        reduction: 0.2
      }
    },
    unlocked: false,
    requires: {
      research: 'quantum_energy',
      completed: true
    }
  },
  
  {
    id: 'crystal_synthesis',
    name: 'Kristallsynthese-Optimierung',
    icon: '✨',
    description: 'Kristall-Synthesizer +100% Produktion, -50% Energieverbrauch.',
    tier: 3,
    category: 'efficiency',
    cost: {
      research: 400
    },
    effect: {
      type: 'building_specific',
      target: 'crystal_synthesizer',
      multiplier: 2,
      consumptionReduction: 0.5
    },
    unlocked: false,
    requires: {
      research: 'nanotechnology',
      completed: true
    }
  },
  
  {
    id: 'faster_than_light',
    name: 'Überlicht-Antrieb',
    icon: '🛸',
    description: 'Treibstoffproduktion +200%. Bereitet auf Prestige vor.',
    tier: 3,
    category: 'efficiency',
    cost: {
      research: 500
    },
    effect: {
      type: 'production_multiplier',
      resource: 'fuel',
      multiplier: 3,
      prestigeBonus: true
    },
    unlocked: false,
    requires: {
      research: 'space_expansion_basics',
      completed: true
    }
  },
  
  {
    id: 'mega_colony',
    name: 'Mega-Kolonie',
    icon: '🌇',
    description: '+50 Bauplätze. Bevölkerungswachstum +50%.',
    tier: 3,
    category: 'unlock',
    cost: {
      research: 600
    },
    effect: {
      type: 'unlock',
      spaceIncrease: 50,
      productionMultiplier: {
        resource: 'population',
        multiplier: 1.5
      }
    },
    unlocked: false,
    requires: {
      research: 'space_expansion_basics',
      completed: true
    }
  },
  
  {
    id: 'universal_efficiency',
    name: 'Universelle Effizienz',
    icon: '🌠',
    description: 'Alle Ressourcen +50%, alle Kosten -25% (global).',
    tier: 3,
    category: 'global',
    cost: {
      research: 1000
    },
    effect: {
      type: 'global_multiplier',
      multiplier: 1.5,
      costReduction: 0.25
    },
    unlocked: false,
    requires: {
      research: 'nanotechnology',
      completed: true
    }
  },
  
  // ============================================
  // PRESTIGE-VORBEREITUNG
  // ============================================
  
  {
    id: 'interstellar_travel',
    name: 'Interstellares Reisen',
    icon: '🌌',
    description: 'Ermöglicht das Verlassen der Kolonie. Schaltet Prestige-System frei.',
    tier: 3,
    category: 'unlock',
    cost: {
      research: 1500
    },
    effect: {
      type: 'unlock',
      unlocks: ['prestige_system'],
      prestigeMultiplier: 1.2
    },
    unlocked: false,
    requires: {
      research: 'faster_than_light',
      completed: true
    }
  }
];

// ============================================
// HILFSFUNKTIONEN
// ============================================

/**
 * Prüft ob eine Forschung freigeschaltet werden kann
 */
export function checkResearchUnlock(researchId, gameState, completedResearch) {
  const research = researchDefinitions.find(r => r.id === researchId);
  if (!research || research.unlocked) return false;
  
  if (!research.requires) return false;
  
  const req = research.requires;
  
  // Ressourcen-Bedingung
  if (req.resource) {
    const currentAmount = gameState.resources[req.resource] || 0;
    return currentAmount >= req.amount;
  }
  
  // Forschungs-Bedingung
  if (req.research) {
    return completedResearch.includes(req.research);
  }
  
  return false;
}

/**
 * Gibt alle Forschungen einer Stufe zurück
 */
export function getResearchByTier(tier) {
  return researchDefinitions.filter(r => r.tier === tier);
}

/**
 * Gibt alle Forschungen einer Kategorie zurück
 */
export function getResearchByCategory(category) {
  return researchDefinitions.filter(r => r.category === category);
}

/**
 * Gibt eine Forschung anhand der ID zurück
 */
export function getResearchById(id) {
  return researchDefinitions.find(r => r.id === id);
}

/**
 * Schaltet eine Forschung frei
 */
export function unlockResearch(researchId) {
  const research = researchDefinitions.find(r => r.id === researchId);
  if (research && !research.unlocked) {
    research.unlocked = true;
    console.log(`🔓 Forschung freigeschaltet: ${research.icon} ${research.name}`);
    return true;
  }
  return false;
}

/**
 * Prüft ob alle Voraussetzungen für eine Forschung erfüllt sind
 */
export function canResearch(researchId, gameState, completedResearch) {
  const research = researchDefinitions.find(r => r.id === researchId);
  if (!research || !research.unlocked) return false;
  
  // Prüfe Kosten
  const currentResearch = gameState.resources.research || 0;
  const requiredResearch = research.cost.research || 0;
  
  return currentResearch >= requiredResearch;
}

// ============================================
// EXPORT
// ============================================

export default researchDefinitions;

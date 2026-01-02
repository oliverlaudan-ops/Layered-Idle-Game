// ============================================
// Prestige Upgrade-Definitionen für Space Colonies
// ============================================

/**
 * Prestige-Upgrade-Struktur:
 * - id: Eindeutige ID
 * - name: Anzeigename
 * - description: Beschreibung (kann {level} und {effect} enthalten)
 * - icon: Emoji
 * - category: 'production' | 'efficiency' | 'utility' | 'unlock'
 * - maxLevel: Maximales Level (-1 = unbegrenzt)
 * - baseCost: Basis-Kosten in Prestige-Punkten
 * - costScaling: Kosten-Multiplikator pro Level
 * - baseEffect: Basis-Effekt
 * - effectScaling: Effekt-Steigerung pro Level
 * - effectType: Art des Effekts
 */

export class PrestigeUpgrade {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.icon = data.icon || '⭐';
    this.category = data.category || 'production';
    this.maxLevel = data.maxLevel || -1;
    this.baseCost = data.baseCost || 1;
    this.costScaling = data.costScaling || 2;
    this.baseEffect = data.baseEffect || 0.1;
    this.effectScaling = data.effectScaling || 'linear'; // 'linear' oder 'multiplicative'
    this.effectType = data.effectType;
    this.target = data.target; // Optional: Spezifisches Ziel (Ressource, Gebäude, etc.)
    this.level = 0;
  }

  /**
   * Berechnet die Kosten für das nächste Level
   */
  getCost() {
    if (this.maxLevel !== -1 && this.level >= this.maxLevel) {
      return Infinity;
    }
    return Math.floor(this.baseCost * Math.pow(this.costScaling, this.level));
  }

  /**
   * Berechnet den aktuellen Effekt basierend auf dem Level
   */
  getEffect() {
    if (this.level === 0) return 0;
    
    if (this.effectScaling === 'linear') {
      return this.baseEffect * this.level;
    } else if (this.effectScaling === 'multiplicative') {
      return this.baseEffect * this.level;
    }
    
    return this.baseEffect * this.level;
  }

  /**
   * Prüft ob das Upgrade gekauft werden kann
   */
  canBuy(prestigePoints) {
    if (this.maxLevel !== -1 && this.level >= this.maxLevel) {
      return false;
    }
    return prestigePoints >= this.getCost();
  }

  /**
   * Kauft das Upgrade (erhöht Level)
   */
  buy(gameState) {
    const cost = this.getCost();
    const currentPrestige = gameState.resources?.prestige || 0;
    
    if (!this.canBuy(currentPrestige)) {
      return false;
    }
    
    if (gameState.resources) {
      gameState.resources.prestige -= cost;
    }
    
    this.level++;
    console.log(`⭐ Prestige-Upgrade gekauft: ${this.icon} ${this.name} Level ${this.level}`);
    return true;
  }

  /**
   * Gibt eine formatierte Beschreibung mit aktuellen Werten zurück
   */
  getFormattedDescription() {
    const effect = (this.getEffect() * 100).toFixed(0);
    const nextEffect = ((this.getEffect() + this.baseEffect) * 100).toFixed(0);
    
    return this.description
      .replace('{level}', this.level)
      .replace('{effect}', effect)
      .replace('{nextEffect}', nextEffect);
  }
}

// ============================================
// PRESTIGE-UPGRADES DEFINITIONEN
// ============================================

const prestigeUpgradeDefinitions = [
  
  // ============================================
  // GLOBALE PRODUKTIONS-MULTIPLIKATOREN
  // ============================================
  
  {
    id: 'global_production_1',
    name: 'Koloniale Effizienz I',
    icon: '🌍',
    description: 'Erhöht alle Ressourcenproduktion um {effect}%.',
    category: 'production',
    maxLevel: 10,
    baseCost: 1,
    costScaling: 2,
    baseEffect: 0.1, // +10% pro Level
    effectType: 'global_production',
    effectScaling: 'linear'
  },
  
  {
    id: 'global_production_2',
    name: 'Koloniale Effizienz II',
    icon: '🌍',
    description: 'Erhöht alle Ressourcenproduktion um {effect}%.',
    category: 'production',
    maxLevel: 10,
    baseCost: 5,
    costScaling: 2.5,
    baseEffect: 0.15, // +15% pro Level
    effectType: 'global_production',
    effectScaling: 'linear'
  },
  
  {
    id: 'global_production_3',
    name: 'Koloniale Effizienz III',
    icon: '🌍',
    description: 'Erhöht alle Ressourcenproduktion um {effect}%.',
    category: 'production',
    maxLevel: 5,
    baseCost: 20,
    costScaling: 3,
    baseEffect: 0.25, // +25% pro Level
    effectType: 'global_production',
    effectScaling: 'linear'
  },
  
  // ============================================
  // RESSOURCEN-SPEZIFISCHE BONI
  // ============================================
  
  {
    id: 'energy_boost',
    name: 'Energie-Meisterschaft',
    icon: '⚡',
    description: 'Energieproduktion +{effect}%.',
    category: 'production',
    maxLevel: 15,
    baseCost: 1,
    costScaling: 1.8,
    baseEffect: 0.2, // +20% pro Level
    effectType: 'resource_production',
    target: 'energy',
    effectScaling: 'linear'
  },
  
  {
    id: 'population_growth',
    name: 'Beschleunigtes Wachstum',
    icon: '👥',
    description: 'Bevölkerungswachstum +{effect}%.',
    category: 'production',
    maxLevel: 10,
    baseCost: 2,
    costScaling: 2,
    baseEffect: 0.15,
    effectType: 'resource_production',
    target: 'population',
    effectScaling: 'linear'
  },
  
  {
    id: 'research_speed',
    name: 'Forschungsbeschleunigung',
    icon: '🔬',
    description: 'Forschungspunkte-Generierung +{effect}%.',
    category: 'production',
    maxLevel: 10,
    baseCost: 3,
    costScaling: 2.2,
    baseEffect: 0.25,
    effectType: 'resource_production',
    target: 'research',
    effectScaling: 'linear'
  },
  
  {
    id: 'crystal_finder',
    name: 'Kristall-Affinität',
    icon: '💎',
    description: 'Kristallproduktion +{effect}%.',
    category: 'production',
    maxLevel: 8,
    baseCost: 5,
    costScaling: 2.5,
    baseEffect: 0.3,
    effectType: 'resource_production',
    target: 'crystals',
    effectScaling: 'linear'
  },
  
  // ============================================
  // KLICK-POWER
  // ============================================
  
  {
    id: 'click_power_prestige',
    name: 'Permanente Klick-Kraft',
    icon: '👆',
    description: '+{level} Energie pro Klick (permanent).',
    category: 'utility',
    maxLevel: 20,
    baseCost: 1,
    costScaling: 1.5,
    baseEffect: 1, // +1 pro Level
    effectType: 'click_power',
    effectScaling: 'linear'
  },
  
  {
    id: 'click_multiplier',
    name: 'Klick-Multiplikator',
    icon: '✨',
    description: 'Klick-Kraft x{effect}.',
    category: 'utility',
    maxLevel: 5,
    baseCost: 10,
    costScaling: 3,
    baseEffect: 0.5, // x1.5, x2, x2.5, etc.
    effectType: 'click_multiplier',
    effectScaling: 'linear'
  },
  
  // ============================================
  // OFFLINE-PRODUKTION
  // ============================================
  
  {
    id: 'offline_efficiency',
    name: 'Offline-Optimierung',
    icon: '💤',
    description: 'Offline-Produktion +{effect}%.',
    category: 'utility',
    maxLevel: 10,
    baseCost: 2,
    costScaling: 2,
    baseEffect: 0.1, // +10% pro Level
    effectType: 'offline_production',
    effectScaling: 'linear'
  },
  
  {
    id: 'offline_duration',
    name: 'Erweiterte Offline-Zeit',
    icon: '⏰',
    description: 'Maximale Offline-Zeit +{level} Stunden.',
    category: 'utility',
    maxLevel: 8,
    baseCost: 3,
    costScaling: 2.5,
    baseEffect: 1, // +1 Stunde pro Level (Basis 8h)
    effectType: 'offline_duration',
    effectScaling: 'linear'
  },
  
  // ============================================
  // GEBÄUDE-EFFIZIENZ
  // ============================================
  
  {
    id: 'building_efficiency',
    name: 'Gebäude-Optimierung',
    icon: '🏭',
    description: 'Alle Gebäude produzieren +{effect}% mehr.',
    category: 'efficiency',
    maxLevel: 10,
    baseCost: 2,
    costScaling: 2.2,
    baseEffect: 0.15,
    effectType: 'building_production',
    effectScaling: 'linear'
  },
  
  {
    id: 'cost_reduction',
    name: 'Kostenoptimierung',
    icon: '💰',
    description: 'Alle Gebäudekosten -{effect}%.',
    category: 'efficiency',
    maxLevel: 5,
    baseCost: 5,
    costScaling: 3,
    baseEffect: 0.1, // -10% pro Level (max -50%)
    effectType: 'cost_reduction',
    effectScaling: 'linear'
  },
  
  {
    id: 'faster_scaling',
    name: 'Verlangsamte Skalierung',
    icon: '📉',
    description: 'Reduziert Preiserhöhung um {effect}%.',
    category: 'efficiency',
    maxLevel: 5,
    baseCost: 8,
    costScaling: 3.5,
    baseEffect: 0.05, // -5% pro Level
    effectType: 'scaling_reduction',
    effectScaling: 'linear'
  },
  
  // ============================================
  // PLATZ & EXPANSION
  // ============================================
  
  {
    id: 'permanent_space',
    name: 'Permanente Expansion',
    icon: '🏗️',
    description: '+{level} permanente Bauplätze.',
    category: 'utility',
    maxLevel: 20,
    baseCost: 2,
    costScaling: 2,
    baseEffect: 5, // +5 Plätze pro Level
    effectType: 'permanent_space',
    effectScaling: 'linear'
  },
  
  {
    id: 'building_size_reduction',
    name: 'Kompakte Konstruktion',
    icon: '📦',
    description: 'Große Gebäude (Größe 3) benötigen nur noch 2 Plätze.',
    category: 'unlock',
    maxLevel: 1,
    baseCost: 15,
    costScaling: 1,
    baseEffect: 1,
    effectType: 'size_reduction',
    effectScaling: 'linear'
  },
  
  // ============================================
  // START-BONI
  // ============================================
  
  {
    id: 'starting_energy',
    name: 'Energie-Startkapital',
    icon: '⚡',
    description: 'Starte mit +{effect} Energie.',
    category: 'utility',
    maxLevel: 10,
    baseCost: 1,
    costScaling: 1.8,
    baseEffect: 100, // +100 Energie pro Level
    effectType: 'starting_resource',
    target: 'energy',
    effectScaling: 'linear'
  },
  
  {
    id: 'starting_buildings',
    name: 'Vorgefertigte Infrastruktur',
    icon: '🏭',
    description: 'Starte mit {level} Solarpanel(s).',
    category: 'utility',
    maxLevel: 5,
    baseCost: 3,
    costScaling: 2.5,
    baseEffect: 1,
    effectType: 'starting_building',
    target: 'solar_panel',
    effectScaling: 'linear'
  },
  
  // ============================================
  // AUTOMATISIERUNG
  // ============================================
  
  {
    id: 'auto_clicker',
    name: 'Auto-Klicker',
    icon: '🤖',
    description: 'Klickt automatisch {level} Mal pro Sekunde.',
    category: 'unlock',
    maxLevel: 10,
    baseCost: 5,
    costScaling: 2.5,
    baseEffect: 1,
    effectType: 'auto_click',
    effectScaling: 'linear'
  },
  
  {
    id: 'auto_research',
    name: 'Automatische Forschung',
    icon: '🧪',
    description: 'Kauft automatisch verfügbare Forschungen.',
    category: 'unlock',
    maxLevel: 1,
    baseCost: 20,
    costScaling: 1,
    baseEffect: 1,
    effectType: 'auto_research',
    effectScaling: 'linear'
  },
  
  {
    id: 'auto_upgrade',
    name: 'Automatischer Baumeister',
    icon: '🏭',
    description: 'Kauft automatisch billigste verfügbare Gebäude.',
    category: 'unlock',
    maxLevel: 1,
    baseCost: 25,
    costScaling: 1,
    baseEffect: 1,
    effectType: 'auto_upgrade',
    effectScaling: 'linear'
  },
  
  // ============================================
  // PRESTIGE-BESCHLEUNIGUNG
  // ============================================
  
  {
    id: 'prestige_gain',
    name: 'Prestige-Multiplikator',
    icon: '🌟',
    description: 'Erhält +{effect}% mehr Prestige-Punkte beim Reset.',
    category: 'prestige',
    maxLevel: 10,
    baseCost: 5,
    costScaling: 3,
    baseEffect: 0.2, // +20% pro Level
    effectType: 'prestige_multiplier',
    effectScaling: 'linear'
  },
  
  {
    id: 'faster_prestige',
    name: 'Schneller Fortschritt',
    icon: '⏩',
    description: 'Game-Speed +{effect}% (kürzere Zeit bis Prestige).',
    category: 'prestige',
    maxLevel: 5,
    baseCost: 10,
    costScaling: 4,
    baseEffect: 0.25,
    effectType: 'game_speed',
    effectScaling: 'linear'
  },
  
  // ============================================
  // SPEZIELLE UNLOCKS
  // ============================================
  
  {
    id: 'unlock_challenges',
    name: 'Herausforderungs-Modus',
    icon: '🏆',
    description: 'Schaltet spezielle Herausforderungen mit Extra-Belohnungen frei.',
    category: 'unlock',
    maxLevel: 1,
    baseCost: 30,
    costScaling: 1,
    baseEffect: 1,
    effectType: 'unlock_feature',
    target: 'challenges',
    effectScaling: 'linear'
  },
  
  {
    id: 'quantum_storage',
    name: 'Quantenspeicher',
    icon: '📦',
    description: 'Entfernt alle Ressourcen-Limits.',
    category: 'unlock',
    maxLevel: 1,
    baseCost: 50,
    costScaling: 1,
    baseEffect: 1,
    effectType: 'unlock_feature',
    target: 'unlimited_storage',
    effectScaling: 'linear'
  }
];

// ============================================
// HILFSFUNKTIONEN
// ============================================

/**
 * Erstellt Prestige-Upgrade-Instanzen aus Definitionen
 */
export function createPrestigeUpgrades() {
  return prestigeUpgradeDefinitions.map(def => new PrestigeUpgrade(def));
}

/**
 * Gibt Upgrades einer bestimmten Kategorie zurück
 */
export function getPrestigeUpgradesByCategory(upgrades, category) {
  return upgrades.filter(u => u.category === category);
}

/**
 * Berechnet alle aktiven Prestige-Boni
 */
export function calculatePrestigeBonuses(upgrades) {
  const bonuses = {
    globalProduction: 0,
    resourceProduction: {},
    buildingProduction: 0,
    clickPower: 0,
    clickMultiplier: 1,
    offlineProduction: 0,
    offlineDuration: 0,
    costReduction: 0,
    scalingReduction: 0,
    permanentSpace: 0,
    startingResources: {},
    startingBuildings: {},
    prestigeMultiplier: 0,
    gameSpeed: 0,
    autoClick: 0,
    features: []
  };
  
  for (const upgrade of upgrades) {
    if (upgrade.level === 0) continue;
    
    const effect = upgrade.getEffect();
    
    switch (upgrade.effectType) {
      case 'global_production':
        bonuses.globalProduction += effect;
        break;
      case 'resource_production':
        if (!bonuses.resourceProduction[upgrade.target]) {
          bonuses.resourceProduction[upgrade.target] = 0;
        }
        bonuses.resourceProduction[upgrade.target] += effect;
        break;
      case 'building_production':
        bonuses.buildingProduction += effect;
        break;
      case 'click_power':
        bonuses.clickPower += effect;
        break;
      case 'click_multiplier':
        bonuses.clickMultiplier += effect;
        break;
      case 'offline_production':
        bonuses.offlineProduction += effect;
        break;
      case 'offline_duration':
        bonuses.offlineDuration += effect;
        break;
      case 'cost_reduction':
        bonuses.costReduction += effect;
        break;
      case 'scaling_reduction':
        bonuses.scalingReduction += effect;
        break;
      case 'permanent_space':
        bonuses.permanentSpace += effect;
        break;
      case 'starting_resource':
        if (!bonuses.startingResources[upgrade.target]) {
          bonuses.startingResources[upgrade.target] = 0;
        }
        bonuses.startingResources[upgrade.target] += effect;
        break;
      case 'starting_building':
        if (!bonuses.startingBuildings[upgrade.target]) {
          bonuses.startingBuildings[upgrade.target] = 0;
        }
        bonuses.startingBuildings[upgrade.target] += effect;
        break;
      case 'prestige_multiplier':
        bonuses.prestigeMultiplier += effect;
        break;
      case 'game_speed':
        bonuses.gameSpeed += effect;
        break;
      case 'auto_click':
        bonuses.autoClick += effect;
        break;
      case 'unlock_feature':
        if (upgrade.level > 0 && upgrade.target) {
          bonuses.features.push(upgrade.target);
        }
        break;
    }
  }
  
  return bonuses;
}

// ============================================
// EXPORT
// ============================================

// Standard-Export: Array mit Upgrade-Instanzen
const prestigeUpgradesList = createPrestigeUpgrades();
export default prestigeUpgradesList;

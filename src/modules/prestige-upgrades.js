// Prestige Upgrade-Definitionen
// src/modules/prestige-upgrades.js

// Basis-Klasse für Prestige-Upgrades (Platzhalter)
export class PrestigeUpgrade {
  constructor({ id = '', name = '', desc = '', cost = 0, apply = () => {} } = {}) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.cost = cost;
    this.level = 0;
    this.applyFn = apply;
  }

  canBuy(gameState) {
    // prestige-Punkte liegen z.B. in gameState.prestige
    return (gameState.prestige || 0) >= this.cost;
  }

  buy(gameState) {
    if (!this.canBuy(gameState)) return false;
    gameState.prestige = (gameState.prestige || 0) - this.cost;
    this.level++;
    if (typeof this.applyFn === 'function') {
      this.applyFn(gameState);
    }
    return true;
  }
}

// Liste aller Prestige-Upgrades (vorerst leer)
const prestigeUpgradesList = [];

// Standard-Export für core.js
export default prestigeUpgradesList;

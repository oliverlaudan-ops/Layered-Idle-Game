import { CurrencyManager } from './currencies.js'; // ✅ wichtig

export class LayerManager {
  constructor() {
    this.layers = [
      {
        id: 1,
        name: "Points",
        type: "base",
        unlocked: true,
        unlockRequirement: 0,
        get currency() {
          // Layer 1 benutzt den Haupt-CurrencyManager aus game
          return game.currencies;
        }
      },
      {
        id: 2,
        name: "Prestige Coins",
        type: "prestige-layer",
        unlocked: false,
        unlockRequirement: 10, // z.B. 10 Prestige Points
        currency: new CurrencyManager() // eigener CurrencyManager für Layer 2
      }
    ];
  }

  checkUnlocks() {
    const prestigePoints = game.currencies.prestigePoints;
    this.layers.forEach(layer => {
      if (!layer.unlocked && prestigePoints >= layer.unlockRequirement) {
        layer.unlocked = true;
      }
    });
  }

  get unlockedLayers() {
    return this.layers.filter(layer => layer.unlocked);
  }

  getCurrencyForLayer(id) {
    const layer = this.layers.find(l => l.id === id);
    return layer ? layer.currency : null;
  }
}

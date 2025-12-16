export class LayerManager {
  constructor() {
    this.layers = [
      {
        id: 1,
        name: "Points",
        currency: 'points',  // Verweis auf Layer 1 CurrencyManager
        unlocked: true,
        generators: [],
        unlockRequirement: 0
      },
      {
        id: 2,
        name: "Prestige Coins", 
        currency: new CurrencyManager(),  // EIGENE CurrencyManager!
        unlocked: false,
        unlockRequirement: 10,  // 10 Prestige Points
        generators: []
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

  getCurrentLayerCurrency(layerId) {
    const layer = this.layers.find(l => l.id === layerId);
    return layer ? layer.currency : null;
  }
}

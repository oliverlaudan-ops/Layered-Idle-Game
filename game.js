// deployment Test
import { CurrencyManager } from './src/currencies.js';
import { LayerManager } from './src/layers.js';
import { updateUI } from './src/ui.js';
import { startGameLoop } from './src/gameLoop.js';

export const game = {
  currencies: new CurrencyManager(),
  layers: new LayerManager()
};

window.game = game;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
 container.innerHTML = `
  <div id="currency-display">Punkte: 0</div>
  <button id="click-btn" type="button">Klicken (+1)</button>

  <div id="generators-container">
    <div id="generators-info"></div>
    <button id="buy-generator-btn" type="button">Generator kaufen</button>
  </div>

  <div id="upgrades-container">
    <div id="upgrades-info"></div>
    <button id="buy-click-upgrade-btn" type="button">Klick x2</button>
    <button id="buy-generator-upgrade-btn" type="button">Generator x2</button>
  </div>

  <div id="prestige-container">
  <div id="prestige-info"></div>
  <button id="prestige-btn" type="button" disabled>Prestige Reset</button>
  </div>

  <div id="layers-container"></div>
`;


  // Event Handler für ALLE statischen Buttons
document.getElementById('click-btn').onclick = () => game.currencies.click();
document.getElementById('buy-generator-btn').onclick = () => game.currencies.buyGenerator();
document.getElementById('buy-click-upgrade-btn').onclick = () => game.currencies.buyClickUpgrade();
document.getElementById('buy-generator-upgrade-btn').onclick = () => game.currencies.buyGeneratorUpgrade();
document.getElementById('prestige-btn').onclick = () => game.currencies.prestigeReset();


  updateUI(game);
  const gameLoop = startGameLoop(game, updateUI);
  requestAnimationFrame(gameLoop);
});

function saveGame() {
  const data = {
    currencies: {
      value: game.currencies.value,
      generators: game.currencies.generators,
      baseProduction: game.currencies.baseProduction,
      clickPower: game.currencies.clickPower,
      generatorMultiplier: game.currencies.generatorMultiplier,
      prestigePoints: game.currencies.prestigePoints,
      prestigeMultiplier: game.currencies.prestigeMultiplier
    }
    // später: Layer2-Daten etc.
  };

  localStorage.setItem('layeredIdleSave', JSON.stringify(data));
}

function loadGame() {
  const raw = localStorage.getItem('layeredIdleSave');
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    const c = data.currencies;

    if (c) {
      game.currencies.value = c.value ?? 0;
      game.currencies.generators = c.generators ?? 0;
      game.currencies.baseProduction = c.baseProduction ?? 1;
      game.currencies.clickPower = c.clickPower ?? 1;
      game.currencies.generatorMultiplier = c.generatorMultiplier ?? 1;
      game.currencies.prestigePoints = c.prestigePoints ?? 0;
      game.currencies.prestigeMultiplier = c.prestigeMultiplier ?? 1;
    }
  } catch (e) {
    console.error('Savegame konnte nicht geladen werden', e);
  }
}

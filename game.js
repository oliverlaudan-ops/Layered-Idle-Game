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

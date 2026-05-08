import { expect } from '@playwright/test';
/**
 * Recorre una lista de elementos, captura los textos
 * y los guarda en un array
 */
async function captureTextsFromList(locator) {
  const texts = [];

  await locator.first().waitFor();

  const count = await locator.count();

  for (let i = 0; i < count; i++) {
    const text = await locator.nth(i).innerText();
    const cleanText = text.trim();

    texts.push(cleanText);
  }

  console.log('Textos capturados:', texts);

  return texts;
}

/**
 * Valida que los textos capturados coincidan con los esperados
 */
function validateTextsList(actualTexts, expectedTexts) {
  console.log('Esperados:', expectedTexts);
  console.log('Actuales:', actualTexts);

  expect(actualTexts).toEqual(expectedTexts);
}

module.exports = {
  captureTextsFromList,
  validateTextsList
};
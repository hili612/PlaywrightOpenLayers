import { test, expect } from '@playwright/test';

test('לחיצה על מיקום במפה לפי קואורדינטות גיאוגרפיות', async ({ page }) => {
    const longitude = 33; 
    const latitude = 33; 
    
    await page.goto('http://127.0.0.1:5173/');
    await page.waitForTimeout(10000);
  
    await page.locator('.ol-viewport').first().waitFor({ state: 'visible' });
  
    const pixel = await page.evaluate(({ longitude, latitude }) => {
      const wmap = window.map; 
      return wmap.getPixelFromCoordinate([longitude, latitude]);
    }, { longitude, latitude });
  
    const mapCanvas = await page.locator('canvas.ol-layer'); 
    await mapCanvas.click({ position: { x: pixel[0], y: pixel[1] } });
    
    
    console.log( { x: pixel[0], y: pixel[1] })
    await page.waitForTimeout(10000);
  
  });

  test('zoom', async ({ page }) => {
    const longitude = 34.781768; 
    const latitude = 22.085299; 
    
    await page.goto('http://127.0.0.1:5173/');
    await page.waitForTimeout(10000);
  
    await page.locator('.ol-viewport').first().waitFor({ state: 'visible' });
  
    await page.evaluate(() => {
        const mapw = window.map; 
        mapw.getView().setZoom(10);
        console.log("Zoom level set to:", mapw.getView().getZoom())
    });

    await page.waitForTimeout(10000);
    // await page.evaluate(() => {
    //     const mapw = window.map;
    //     console.log("Current Zoom:", mapw.getView().getZoom());
    // });
  
  });
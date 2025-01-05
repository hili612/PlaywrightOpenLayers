import { test, expect } from '@playwright/test';

test('go to', async ({ page }) => {
    const mapCanvas = await page.$('canvas'); 
    await page.goto('https://openlayers.org/en/latest/examples/draw-and-modify-features.html');
    const canvasData = await page.evaluate(() => {
        const canvas = document.querySelector('canvas'); // או לבחור את ה-canvas הספציפי לפי ID או Class
        if (!canvas) {
          throw new Error('Canvas not found on the page');
        }
      
        // שליפת תמונת ה-canvas כ-Data URL (תמונה ב-base64)
        const dataURL = (canvas as HTMLCanvasElement).toDataURL();
        return dataURL;
      });
      
      console.log('Canvas Data URL:', canvasData);

    //   const mapInfo = await page.evaluate(() => {
    //     const map = (window as any).map; // אם המפה משויכת ל-window
    //     if (!map) {
    //       throw new Error('Map object is not available on the page');
    //     }
      
    //     // שליפת מרכז המפה ורמת הזום
    //     const view = map.getView();
    //     return {
    //       center: view.getCenter(),
    //       zoom: view.getZoom(),
    //     };
    //   });
      
    //   console.log('Map Info:', mapInfo);
      
});
test('check zoom by coordinates', async ({ page }) => {
    await page.goto('https://openlayers.org/en/latest/examples/draw-and-modify-features.html');

    // הרץ JavaScript בשפת ה-DOM של הדף כדי לבצע זום על המפה לפי קואורדינטות
  await page.evaluate(() => {
    const lon = 33.33333; // אורך גיאוגרפי
    const lat = 33.33333; // רוחב גיאוגרפי

    // אם המפה מבוססת על Canvas, ייתכן שתוכל לשלוח פקודות ישירות
    const map = document.getElementById('map'); // התאמה לשם האלמנט של המפה
    if (map) {
      // כאן אתה יכול לממש את הפקודות המתאימות כדי למקם את המפה לפי הקואורדינטות
      // כמו לשנות את המיקום או הזום על המפה, תלוי במבנה המפה שלך
    //   map.setCenter([lon, lat]); // דוגמה, אם יש API כזה
    }
  });

  // אכיפת בדיקה אם המפה הגיעה למקום הנכון
  const mapPosition = await page.evaluate(() => {
    const map = document.getElementById('map');
    return map ? map.getBoundingClientRect() : null;
  });

  expect(mapPosition).not.toBeNull();
});









//     // יצירת אובייקט מפה חדש עם OpenLayers
// const map = new ol.Map({
//     target: 'map', // ה-target הוא ה-ID של האלמנט ב-HTML שבו המפה מוצגת
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM(), // מפה מבית OpenStreetMap
//       }),
//     ],
//     view: new ol.View({
//       center: ol.proj.fromLonLat([33.33333, 33.33333]), // הגדרת הקואורדינטות (Longitude, Latitude)
//       zoom: 12, // רמת זום (הגבר את הערך לזום יותר קרוב)
//     }),
//   });
  
      
// });
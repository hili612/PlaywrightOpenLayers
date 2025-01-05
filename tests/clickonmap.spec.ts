import { test, expect } from '@playwright/test';
import * as olCoordinate from 'ol/coordinate';
import * as ol from 'ol';
import { fromLonLat } from 'ol/proj';



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

      const mapInfo = await page.evaluate(() => {
        const map = (window as any).map; // אם המפה משויכת ל-window
        if (!map) {
          throw new Error('Map object is not available on the page');
        }
      
        // שליפת מרכז המפה ורמת הזום
        const view = map.getView();
        return {
          center: view.getCenter(),
          zoom: view.getZoom(),
        };
      });
      
      console.log('Map Info:', mapInfo);


      
});

// test('לחיצה על קורדינטות', async ({ page }) => {
//   await page.goto('https://openlayers.org/en/latest/examples/draw-and-modify-features.html');
//   // הגדר את הקואורדינטות
//   const lat = 33.33333;
//   const lon = 33.33333;

//  // השתמש ב-evaluate כדי לחשב את המיקום הפיקסלי במפה
//  const position = await page.evaluate(({ lat, lon }) => {
//   // חפש את המפה בדף (הנחתנו שהיא ב- window.map)
//   const map = window.map; // גישה ל-OpenLayers map
//   if (!map) {
//     throw new Error("לא נמצאה המפה");
//   }

//   // הוצא את ה-view של המפה בצורה הנכונה
//   const view = map.getView();
//   if (!view) {
//     throw new Error("לא נמצא view במפה");
//   }

//   // המרת קואורדינטות לפיקסלים
//   const pixel = view.getPixelFromCoordinate([lon, lat]); 
//   return pixel; // מחזיר את המיקום הפיקסלי
// }, { lat, lon }); // מעביר את הקואורדינטות כ-אובייקט

// // בדוק אם המיקום הפיקסלי נמצא
// if (!position) {
//   throw new Error("לא נמצא מיקום במפה");
// }

//   // לחיצה על המיקום המחושב
//   await page.mouse.click(position[0], position[1]);
    
// });


// test(' ניסיון זום ', async ({ page }) => {


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


test('לחיצה על קורדינטות', async ({ page }) => {
//   // Geographic coordinates (latitude, longitude)
// var geoCoord = new OpenLayers.LonLat(33.33333, 33.3333);

// // Convert geographic coordinates (EPSG:4326) to Web Mercator (EPSG:900913)
// var coordinate = geoCoord.transform(
//   new OpenLayers.Projection("EPSG:4326"),  // Source projection (WGS84)
//   map.getProjectionObject()               // Target projection (Web Mercator)
// );

// // Now you can use this coordinate to get pixel values
// var pixel = map.getPixelFromLonLat(coordinate);

// console.log(pixel); // Pixel position based on the map's zoom and size

// תוכל גם להמתין עד שהסקריפט של OpenLayers יטען לחלוטין אם יש צורך בכך
  // await page.waitForFunction(() => window.ol !== undefined);

  // עכשיו תוכל לבצע פעולות על המפה
  const pixel = await page.evaluate(() => {
    var geoCoord = [33.33333, 33.3333];
    var coordinate = ol.proj.fromLonLat(geoCoord); // המרה מקואורדינטות גיאוגרפיות ל-EPSG:3857
    var map = window.map; // גישה לאובייקט המפה שנוצר בדף
    var pixel = map.getPixelFromCoordinate(coordinate); // המרת הקואורדינטות לפיקסל
    return pixel;
  });

  console.log(pixel);

});

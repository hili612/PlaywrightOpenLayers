import { test, expect } from '@playwright/test';
// import * as ol from 'ol';
// import 'ol/ol.css';

test('go to', async ({ page }) => {
    const mapCanvas = await page.$('canvas'); 
    await page.goto('http://127.0.0.1:5173/');
    const mapInstanceExists = await page.evaluate(() => {
      return !!document.querySelector('.ol-viewport'); // בודק אם האלמנט של OpenLayers נטען
    });
    console.log('Map instance exists visually:', mapInstanceExists);

    const canvasData = await page.evaluate(() => {
        const canvas = document.querySelector('canvas'); // או לבחור את ה-canvas הספציפי לפי ID או Class
        // if (!canvas) {
        //   throw new Error('Canvas not found on the page');
        // }
      
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

test('לחיצה על מיקום במפה לפי קואורדינטות גיאוגרפיות', async ({ page }) => {
  const longitude = 34.781768; 
  const latitude = 22.085299; 
  
  await page.goto('http://127.0.0.1:5173/');
  await page.waitForTimeout(10000);

  await page.locator('.ol-viewport').first().waitFor({ state: 'visible' });

  const pixel = await page.evaluate(({ longitude, latitude }) => {
    const map = window.map; 
    return map.getPixelFromCoordinate([longitude, latitude]);
  }, { longitude, latitude });

  const mapCanvas = await page.locator('.ol-viewport'); 
  await mapCanvas.click({ position: { x: pixel[0], y: pixel[1] } });
  
  
  console.log( { x: pixel[0], y: pixel[1] })


 
  

  const viewport = await page.evaluate(() => {
    const map = window.map; // גישה לאובייקט המפה
    const view = map.getView(); // החזרת ה-View של המפה (מצלמה)
    
    view.setZoom(60); // קביעת רמת הזום על ה-view
  
    return view.getZoom(); // מחזירים את רמת הזום הנוכחית לצורך אימות
  });
  
  // console.log(viewport); // מדפיס את רמת הזום החדשה

  // await page.evaluate((pixel) => {
  //   const map = window.map;
  //   if (map) {
  //     map.forEachFeatureAtPixel(pixel, function(feature) {
  //       console.log('יש פיצ\'ר על הפיקסל');
  //     });
  //   }
  // }, pixel);


});




  // await page.evaluate(({ longitude, latitude }) => {
  //   const map = window.map;
  //   map.getView().setCenter([longitude, latitude]); // קואורדינטות
  //   map.getView().setZoom(10); // רמת זום
  //   // const view = map.getView();
  //   // const center = [longitude, latitude];
  //   map.zoomTo(center);
  //   // view.setZoom(20);
  //   // view.animate({zoom: 50}, {center: [635,585]});
  // }, { longitude, latitude});




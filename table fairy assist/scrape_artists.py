import csv
import json
import time
import random
from playwright.sync_api import sync_playwright

def scrape_artists():
    results = []
    
    # Read artist list
    with open('artist_list.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        artists = list(reader)
    
    print(f"Found {len(artists)} artists to scrape.")
    
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        )
        page = context.new_page()
        
        for i, artist in enumerate(artists):
            artist_name = artist.get('작가명', 'Unknown')
            url = artist.get('URL', '')
            
            if not url:
                print(f"[{i+1}/{len(artists)}] Skipping {artist_name} (No URL)")
                continue
                
            print(f"[{i+1}/{len(artists)}] Scraping {artist_name}...")
            
            try:
                page.goto(url, timeout=30000)
                page.wait_for_load_state('networkidle')
                
                # Scroll down to trigger lazy loading
                for _ in range(3):
                    page.mouse.wheel(0, 1000)
                    time.sleep(0.5)
                
                # Debug: Take screenshot
                page.screenshot(path=f"debug_{i}.png")
                print(f"Saved screenshot to debug_{i}.png")

                
                # Extract products
                # Selectors might need adjustment based on actual page structure
                # Based on Idus structure, looking for product cards
                products = []
                
                # Use JavaScript to extract data directly from the DOM
                products = page.evaluate("""() => {
                    const items = Array.from(document.querySelectorAll('a[href*="/v2/product/"]'));
                    return items.slice(0, 4).map(el => {
                        // Title: Try to find the text block
                        let title = "No Title";
                        const titleEl = el.querySelector('span + div');
                        if (titleEl) {
                            title = titleEl.innerText.trim();
                        } else {
                            title = el.innerText.split('\\n').sort((a, b) => b.length - a.length)[0] || "No Title";
                        }

                        // Image: Try background image or img tag
                        let imgUrl = "";
                        const imgDiv = el.querySelector('div[class*="CoreImageRatio__image"]');
                        if (imgDiv) {
                            const style = imgDiv.getAttribute('style');
                            if (style && style.includes('url(')) {
                                imgUrl = style.match(/url\\(['"]?(.*?)['"]?\\)/)[1];
                            }
                        }
                        
                        if (!imgUrl) {
                            const img = el.querySelector('img');
                            if (img) imgUrl = img.src || img.dataset.src;
                        }

                        return { title, image: imgUrl };
                    }).filter(p => p.title && p.image);
                }""")
                
                for p in products:
                    print(f"  -> Found product: {p['title'][:20]}...")
                
                results.append({
                    'artist_name': artist_name,
                    'url': url,
                    'products': products
                })
                
                print(f"  -> Found {len(products)} products")
                
                results.append({
                    'artist_name': artist_name,
                    'url': url,
                    'products': products
                })
                
                print(f"  -> Found {len(products)} products")
                
            except Exception as e:
                print(f"  -> Error scraping {artist_name}: {e}")
                results.append({
                    'artist_name': artist_name,
                    'url': url,
                    'products': [],
                    'error': str(e)
                })
            
            # Be polite
            time.sleep(random.uniform(0.5, 1.5))
            break # Debug: Stop after 1 artist
            
        browser.close()
        
    # Save results
    with open('artist_products.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("Scraping completed. Saved to artist_products.json")

if __name__ == "__main__":
    scrape_artists()

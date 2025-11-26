from playwright.sync_api import sync_playwright

def debug_scraper():
    url = "https://www.idus.com/v2/artist/fe23da0c-5fe9-4377-8679-0dc04ee78acd" # 자작나무공방
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        print(f"Navigating to {url}...")
        page.goto(url)
        page.wait_for_load_state('networkidle')
        
        # Scroll a bit
        page.mouse.wheel(0, 1000)
        page.wait_for_timeout(2000)
        
        content = page.content()
        with open('debug.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Saved HTML to debug.html")
        browser.close()

if __name__ == "__main__":
    debug_scraper()

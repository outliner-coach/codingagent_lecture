import re

def analyze_files():
    print("--- PDF Output Analysis ---")
    try:
        with open('table_analysis.txt', 'r', encoding='utf-16') as f:
            content = f.read()
            print(content) # Print all content for analysis
    except Exception as e:
        print(f"Error reading PDF output: {e}")
        # Try utf-8 just in case
        try:
            with open('table_analysis.txt', 'r', encoding='utf-8') as f:
                content = f.read()
                print(content)
        except:
            pass

    print("\n--- HTML Analysis ---")
    try:
        with open('debug.html', 'r', encoding='utf-8') as f:
            html = f.read()
            # Find product links
            links = re.findall(r'<a[^>]*href="[^"]*\/v2\/product\/[^"]*"[^>]*>(.*?)<\/a>', html, re.DOTALL)
            print(f"Found {len(links)} product links.")
            for i, link in enumerate(links[:3]):
                print(f"Link {i+1} Content Snippet:")
                print(link[:500])
                print("-" * 20)
                
            # Check for specific classes
            if 'CoreImageRatio__image' in html:
                print("Found 'CoreImageRatio__image' class.")
            if 'ui_card__title' in html:
                print("Found 'ui_card__title' class.")
                
    except Exception as e:
        print(f"Error reading HTML: {e}")

if __name__ == "__main__":
    analyze_files()

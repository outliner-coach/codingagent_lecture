import pdfplumber

def analyze_layout():
    target_words = ["여누즈", "4", "작가", "테이블", "1"]
    
    print("Analyzing layout of table_list.pdf...")
    
    with pdfplumber.open('table_list.pdf') as pdf:
        page = pdf.pages[0] # Assume page 1 for now
        words = page.extract_words()
        
        found_words = []
        for w in words:
            if w['text'] in target_words or "여누즈" in w['text']:
                found_words.append(w)
        
        print(f"Found {len(found_words)} relevant words.")
        for w in found_words:
            print(f"Text: {w['text']}, X: {w['x0']:.2f}, Y: {w['top']:.2f}, Bottom: {w['bottom']:.2f}")

        # Also print all numbers to see if we can find '4' specifically near '여누즈'
        print("\n--- Numbers near '여누즈' ---")
        # Find '여누즈' y-coordinate
        yeonuz_y = 0
        yeonuz_x = 0
        for w in found_words:
            if "여누즈" in w['text']:
                yeonuz_y = w['top']
                yeonuz_x = w['x0']
                break
        
        if yeonuz_y > 0:
            # Look for numbers above it (smaller Y)
            nearby_numbers = []
            for w in words:
                if w['text'].isdigit():
                    # Check if it's above and roughly aligned or in the same block
                    # Let's just print numbers within some Y range above
                    if w['bottom'] < yeonuz_y and w['bottom'] > yeonuz_y - 100:
                         print(f"Number: {w['text']}, X: {w['x0']:.2f}, Y: {w['top']:.2f}")

if __name__ == "__main__":
    analyze_layout()

import csv
import json
import re
import pdfplumber
import os

def process_data():
    print("--- Starting Data Processing ---")
    
    # 1. Load Artist List (CSV)
    artists = []
    with open('artist_list.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            artists.append(row)
    print(f"Loaded {len(artists)} artists from CSV.")
    
    # 2. Load Scraped Products (JSON)
    products_map = {}
    if os.path.exists('artist_products.json'):
        with open('artist_products.json', 'r', encoding='utf-8') as f:
            scraped_data = json.load(f)
            for item in scraped_data:
                products_map[item['artist_name']] = item.get('products', [])
    else:
        print("Warning: artist_products.json not found. Skipping product data.")
    
    # 3. Parse Table List (PDF)
    # This is the tricky part. We need to map Table Number -> Artist Name.
    # We'll try to extract text and look for patterns like "Table 1" or just sequential numbers.
    # For now, let's assume the PDF contains artist names and we can map them.
    # If we can't find explicit table numbers, we might just list them or use a placeholder.
    
    table_assignments = {}
    
    # 3. Parse Table List (PDF) with Spatial Analysis
    table_assignments = {}
    
    try:
        print("Parsing PDF for table assignments...")
        with pdfplumber.open('table_list.pdf') as pdf:
            for page in pdf.pages:
                words = page.extract_words()
                
                # Find potential table numbers (digits)
                # Filter out small numbers that might be page numbers or other noise if needed
                # For now, assume table numbers are digits.
                table_headers = []
                for w in words:
                    if w['text'].isdigit():
                        table_headers.append(w)
                
                # For each artist, find the closest table header
                for artist in artists:
                    name = artist['작가명']
                    # Find artist word(s) in this page
                    # This is simple matching; might fail if name is split across words
                    # But pdfplumber usually groups text well.
                    artist_word = None
                    for w in words:
                        if name in w['text']:
                            artist_word = w
                            break
                    
                    if artist_word:
                        # Find closest header above and aligned
                        closest_header = None
                        min_dist = float('inf')
                        
                        for header in table_headers:
                            # Check if header is above artist (header.bottom <= artist.top)
                            if header['bottom'] <= artist_word['top']:
                                # Check horizontal alignment (within some threshold, e.g., 200px)
                                if abs(header['x0'] - artist_word['x0']) < 200:
                                    dist = artist_word['top'] - header['bottom']
                                    if dist < min_dist:
                                        min_dist = dist
                                        closest_header = header
                        
                        if closest_header:
                            table_assignments[name] = closest_header['text']
                            # print(f"Assigned {name} to Table {closest_header['text']}")
    
        print(f"Mapped {len(table_assignments)}/{len(artists)} artists to tables.")
        
    except Exception as e:
        print(f"Error parsing PDF: {e}")

    # 4. Load Manual Assignments (if available)
    manual_assignments = {}
    if os.path.exists('manual_assignments.json'):
        print("Loading manual table assignments...")
        with open('manual_assignments.json', 'r', encoding='utf-8') as f:
            manual_assignments = json.load(f)
        print(f"Loaded {len(manual_assignments)} manual assignments.")
        
        # Apply manual assignments (override auto-detected)
        for name, table in manual_assignments.items():
            table_assignments[name] = table
        
        print(f"Total mapped after manual: {len(table_assignments)}/{len(artists)} artists.")

    # 5. Merge Data
    final_data = []
    for artist in artists:
        name = artist['작가명']
        
        # Get products
        artist_products = products_map.get(name, [])
        
        # Get table number
        table_no = table_assignments.get(name, "Unknown")
        
        final_data.append({
            'id': artist['작가 UUID'],
            'name': name,
            'category': artist['분류'],
            'sector': artist['부문'],
            'url': artist['URL'],
            'table': table_no,
            'products': artist_products
        })
        
    # 5. Export to data.js
    js_content = f"const artistData = {json.dumps(final_data, ensure_ascii=False, indent=2)};"
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully exported {len(final_data)} artists to data.js")

if __name__ == "__main__":
    process_data()

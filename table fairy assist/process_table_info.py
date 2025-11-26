import csv
import json
import os

def process_table_info():
    """
    Process table_info.csv to create structured data with:
    - Artist Table Number (작가 테이블 X)
    - Table Fairies (테요1, 테요2)
    - Artists assigned to each table
    """
    print("--- Processing table_info.csv ---")
    
    # Read existing artist data from CSV for additional details
    artist_details = {}
    with open('artist_list.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            uuid = row.get('작가 UUID', '')
            if uuid:
                artist_details[uuid] = {
                    'name': row['작가명'],
                    'category': row['분류'],
                    'sector': row['부문'],
                    'url': row['URL']
                }
    
    # Read table info
    table_data = {}
    with open('table_info.csv', 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        # Strip whitespace from fieldnames
        reader.fieldnames = [name.strip() if name else name for name in reader.fieldnames]
        
        for row in reader:
            # Strip all values
            row = {k.strip() if k else k: v.strip() if v else v for k, v in row.items()}
            
            table_num = row.get('테이블', '')
            if not table_num or table_num == '':
                continue
                
            fairy1 = row.get('테요1', '')
            fairy2 = row.get('테요2', '')
            artist_name = row.get('작가', '')
            artist_uuid = row.get('작가 UUID', '')
            
            # Initialize table if not exists
            if table_num not in table_data:
                table_data[table_num] = {
                    'table_name': table_num,
                    'fairy1': fairy1,
                    'fairy2': fairy2,
                    'artists': []
                }
            
            # Add artist details
            artist_info = artist_details.get(artist_uuid, {
                'name': artist_name,
                'category': '',
                'sector': '',
                'url': ''
            })
            
            table_data[table_num]['artists'].append({
                'uuid': artist_uuid,
                'name': artist_name,
                **artist_info
            })
    
    print(f"Processed {len(table_data)} tables with artists.")
    
    # Convert to list and save
    final_data = list(table_data.values())
    
    # Export to data.js
    js_content = f"const tableData = {json.dumps(final_data, ensure_ascii=False, indent=2)};"
    with open('data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Successfully exported {len(final_data)} tables to data.js")
    
    # Also save as JSON for debugging
    with open('table_data.json', 'w', encoding='utf-8') as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    process_table_info()

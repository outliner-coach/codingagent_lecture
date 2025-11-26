import csv
import json

# Read manual assignments from CSV
manual_assignments = {}
with open('unmatched_artists.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row['작가명']
        table = row['테이블 번호 (입력)'].strip()
        if table and table != '':
            manual_assignments[name] = table

print(f"CSV에서 {len(manual_assignments)}개의 수동 테이블 배정을 읽었습니다.")
for name, table in manual_assignments.items():
    print(f"  {name} -> {table}번 테이블")

# Save as JSON for process_data.py to use
with open('manual_assignments.json', 'w', encoding='utf-8') as f:
    json.dump(manual_assignments, f, ensure_ascii=False, indent=2)

print("\n'manual_assignments.json'에 저장되었습니다.")

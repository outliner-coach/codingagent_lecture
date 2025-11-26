import json
import csv

# Read data.js and find unmatched artists
with open('data.js', 'r', encoding='utf-8') as f:
    content = f.read()
    # Extract JSON array from "const artistData = [...];"
    json_start = content.index('[')
    json_end = content.rindex(']') + 1
    json_str = content[json_start:json_end]
    artists = json.loads(json_str)

unmatched = []
for artist in artists:
    if artist['table'] in ['TBD', 'Unknown', '']:
        unmatched.append({
            'name': artist['name'],
            'category': artist['category'],
            'url': artist['url'],
            'id': artist['id']
        })

print(f"총 {len(artists)}명 중 {len(unmatched)}명의 작가가 테이블 매칭이 안되었습니다.\n")
print("미배정 작가 목록:")
print("-" * 50)
for i, artist in enumerate(unmatched, 1):
    print(f"{i}. {artist['name']} ({artist['category']})")

# Save to TXT file
with open('unmatched_artists.txt', 'w', encoding='utf-8') as f:
    f.write(f"총 {len(artists)}명 중 {len(unmatched)}명의 작가가 테이블 매칭이 안되었습니다.\n\n")
    f.write("미배정 작가 목록:\n")
    f.write("-" * 50 + "\n")
    for i, artist in enumerate(unmatched, 1):
        f.write(f"{i}. {artist['name']} ({artist['category']})\n")

# Save to CSV file
with open('unmatched_artists.csv', 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['작가명', '분류', 'URL', '테이블 번호 (입력)'])
    writer.writeheader()
    for artist in unmatched:
        writer.writerow({
            '작가명': artist['name'],
            '분류': artist['category'],
            'URL': artist['url'],
            '테이블 번호 (입력)': ''
        })

print(f"\n목록이 'unmatched_artists.txt'와 'unmatched_artists.csv'에 저장되었습니다.")

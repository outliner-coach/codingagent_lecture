"""
기존 데이터를 Google Sheets용 CSV로 변환
"""
import pandas as pd
import os

# 상위 디렉토리에서 파일 읽기
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 1. artist_list.csv를 Google Sheets용으로 복사
print("1. artist_list.csv 처리 중...")
artist_df = pd.read_csv(os.path.join(parent_dir, 'artist_list.csv'), encoding='utf-8')

# 컬럼 순서 확인 및 정리 (실제 컬럼명에 맞게 수정)
print(f"원본 컬럼: {list(artist_df.columns)}")
artist_df['작가명'] = artist_df['작가명']
artist_df_clean = artist_df[['구분', '분류', '부문', 'URL', '작가명', '작가 UUID']]

# Google Sheets용 CSV로 저장 (UTF-8 with BOM)
artist_df_clean.to_csv('artist_list_for_sheets.csv', index=False, encoding='utf-8-sig')
print(f"✓ artist_list_for_sheets.csv 생성 완료 ({len(artist_df_clean)} rows)")

# 2. table_info.csv를 Google Sheets용으로 변환
print("\n2. table_info.csv 처리 중...")
table_df = pd.read_csv(os.path.join(parent_dir, 'table_info.csv'), encoding='utf-8-sig')
print(f"원본 컬럼: {list(table_df.columns)}")

# 필요한 컬럼만 선택 (마지막 빈 컬럼 제외)
table_columns = [col for col in table_df.columns if col and not col.startswith('Unnamed')]
print(f"사용할 컬럼: {table_columns}")
table_df_clean = table_df[table_columns]

# 빈 행 제거
table_df_clean = table_df_clean.dropna(subset=['테이블', '작가'])

# Google Sheets용 CSV로 저장
table_df_clean.to_csv('table_info_for_sheets.csv', index=False, encoding='utf-8-sig')
print(f"✓ table_info_for_sheets.csv 생성 완료 ({len(table_df_clean)} rows)")

print("\n" + "="*50)
print("완료! GAS 폴더에 다음 파일들이 생성되었습니다:")
print("  - artist_list_for_sheets.csv")
print("  - table_info_for_sheets.csv")
print("\n이 파일들을 열어서 내용을 복사한 후")
print("Google Sheets에 붙여넣으시면 됩니다.")
print("="*50)

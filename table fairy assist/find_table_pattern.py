import sys
import pdfplumber

def find_table_pattern():
    sys.stdout.reconfigure(encoding='utf-8')
    target_artists = ["여누즈", "다나픽코리아", "고래상점", "gongambox", "아비엥또", "45번길쿠키", "니모", "자작나무공방"]
    
    print(f"Searching for {len(target_artists)} artists in table_list.pdf...")
    
    with pdfplumber.open('table_list.pdf') as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            
            found_on_page = False
            for artist in target_artists:
                if artist in text:
                    found_on_page = True
                    break
            
            if found_on_page:
                print(f"Found matches on Page {i+1}. Saving to pdf_text_full.txt")
                with open('pdf_text_full.txt', 'w', encoding='utf-8') as f:
                    f.write(text)
                return


if __name__ == "__main__":
    find_table_pattern()

import sys
import os

def extract_text_from_pdf(pdf_path):
    print(f"--- Extracting text from: {os.path.basename(pdf_path)} ---")
    try:
        import pdfplumber
        with pdfplumber.open(pdf_path) as pdf:
            # Read all pages
            for i, page in enumerate(pdf.pages):
                print(f"--- Page {i+1} Text ---")
                text = page.extract_text()
                if text:
                    print(text)
                
                print(f"--- Page {i+1} Tables ---")
                tables = page.extract_tables()
                for table in tables:
                    for row in table:
                        print(row)
                    print("-" * 20)
                print("\n")
        return
        return
    except ImportError:
        print("pdfplumber not found, trying pypdf...")

    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if text:
                print(f"--- Page {i+1} ---")
                print(text)
                print("\n")
        return
    except ImportError:
        print("pypdf not found, trying PyPDF2...")

    try:
        import PyPDF2
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    print(f"--- Page {i+1} ---")
                    print(text)
                    print("\n")
        return
    except ImportError:
        print("Error: No suitable PDF library found (pdfplumber, pypdf, PyPDF2). Please install one.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python read_pdf.py <pdf_file_path>")
        sys.exit(1)
    
    pdf_file = sys.argv[1]
    extract_text_from_pdf(pdf_file)

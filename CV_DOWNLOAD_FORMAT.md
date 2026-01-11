# CV Download - Formatted PDF/DOCX Generation

## ✅ Changes Implemented

### 1. Backend Dependencies Added
- **docx** (^8.5.0) - For generating professional DOCX files
- **pdfkit** (^0.14.0) - For generating professional PDF files

### 2. Backend API Endpoint
**POST `/api/generate-cv-file`**
- Accepts CV content and format (PDF or DOCX)
- Generates professionally formatted CV files
- Returns file for download
- Protected with API key authentication

**Request Body:**
```json
{
  "cvContent": "CV text content...",
  "format": "pdf" or "docx",
  "jobTitle": "Software Engineer",
  "fileName": "optional_custom_name"
}
```

**Response:**
- Returns binary file (PDF or DOCX)
- Proper Content-Type headers
- Content-Disposition header for download

### 3. Frontend Updates
- Added format selector dropdown (PDF/DOCX) next to download button
- Updated download button to call backend API
- Shows "Generating..." status during file creation
- Downloads properly formatted files

### 4. Formatting Features

#### DOCX Format:
- Professional section headers (Heading 2 style)
- Proper spacing between sections
- Bullet points formatted correctly
- Job titles and important lines emphasized
- Clean, ATS-friendly formatting

#### PDF Format:
- Professional title "Curriculum Vitae"
- Section headers with underlines
- Proper text flow and page breaks
- Bullet points with indentation
- Job titles in bold
- Clean margins and spacing

## 📋 How It Works

1. **User edits CV** in the CV Editor
2. **Selects format** (PDF or DOCX) from dropdown
3. **Clicks "Download CV"** button
4. **Frontend sends** CV content to backend
5. **Backend generates** formatted file:
   - Parses CV content
   - Detects section headers
   - Formats with proper styling
   - Generates PDF or DOCX
6. **File downloads** automatically with proper filename

## 🎨 Formatting Logic

### Section Detection
The system automatically detects CV sections by looking for:
- All caps lines (EXPERIENCE, EDUCATION, etc.)
- Lines ending with colon (Summary:, Skills:, etc.)
- Common section keywords

### Content Formatting
- **Section Headers**: Bold, larger font, underlined (PDF) or Heading style (DOCX)
- **Job Titles**: Bold formatting
- **Bullet Points**: Proper indentation and bullet symbols
- **Regular Text**: Clean, readable formatting

## 📦 Installation

Backend dependencies are already installed. If needed:
```bash
cd backend
npm install
```

## 🚀 Usage

1. Edit your CV in the CV Editor tab
2. Select format (PDF or DOCX) from dropdown
3. Click "Download CV"
4. File downloads automatically

## 📝 File Naming

Files are automatically named:
- Format: `optimized_cv_{job_title}_{timestamp}.{format}`
- Example: `optimized_cv_Software_Engineer_1703123456789.pdf`

## 🔧 Technical Details

- **DOCX**: Uses `docx` library with proper document structure
- **PDF**: Uses `pdfkit` with text flow (not absolute positioning)
- **Error Handling**: Graceful error messages if generation fails
- **File Size**: Optimized for reasonable file sizes
- **ATS-Friendly**: Formatting designed to be ATS-compatible

## ⚠️ Notes

- PDF generation uses streaming (efficient for large CVs)
- DOCX generation creates buffer in memory
- Both formats maintain proper formatting and structure
- Section detection is automatic but can be improved with structured CV data


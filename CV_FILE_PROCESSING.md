# CV File Processing - Backend Implementation

## ✅ Changes Implemented

### 1. Backend Dependencies Added
Added new npm packages to `package.json`:
- **multer** (^1.4.5-lts.1) - For handling file uploads
- **mammoth** (^1.6.0) - For parsing DOCX/DOC files
- **pdf-parse** (^1.1.1) - For parsing PDF files

### 2. Backend API Endpoint
**POST `/api/process-cv-file`**
- Accepts file uploads via multipart/form-data
- Processes TXT, DOCX, DOC, and PDF files
- Returns extracted text content with metadata
- Protected with API key authentication and rate limiting

**Request:**
- Method: POST
- Headers: `x-api-key: <user_api_key>`
- Body: FormData with field `cvFile` containing the file

**Response:**
```json
{
  "success": true,
  "fileName": "resume.docx",
  "fileType": ".docx",
  "content": "extracted text content...",
  "characterCount": 5000,
  "wordCount": 800
}
```

### 3. Frontend Updates
- Removed mammoth.js CDN dependency (no longer needed)
- Updated file upload to send files to backend
- Added PDF support in file input
- Improved error handling and status messages
- Shows word count after successful processing

## 📦 Installation Instructions

### Backend Setup

1. **Install new dependencies:**
```bash
cd backend
npm install
```

This will install:
- `multer` - File upload middleware
- `mammoth` - DOCX/DOC parser
- `pdf-parse` - PDF text extractor

2. **Restart the backend server:**
```bash
npm start
# or for development
npm run dev
```

### Frontend
No changes needed - the extension will automatically use the backend endpoint.

## 🔄 How It Works

1. **User selects CV file** (TXT, DOCX, DOC, or PDF)
2. **Frontend sends file to backend** via FormData
3. **Backend processes file:**
   - TXT: Direct text extraction
   - DOCX: Uses mammoth.js to extract text
   - DOC: Attempts to parse (may have limitations)
   - PDF: Uses pdf-parse to extract text
4. **Backend returns extracted text** with metadata
5. **Frontend stores content** for CV analysis

## 📋 Supported File Formats

| Format | Extension | Status | Notes |
|--------|-----------|--------|-------|
| Text | .txt | ✅ Full Support | Direct text reading |
| Word Document | .docx | ✅ Full Support | Uses mammoth.js |
| Word Document (Old) | .doc | ⚠️ Limited | May not work for all binary .doc files |
| PDF | .pdf | ✅ Full Support | Uses pdf-parse (requires extractable text) |

## 🎯 Benefits

1. **No CDN Dependencies**: No external script loading issues
2. **Better Security**: Files processed server-side
3. **PDF Support**: Now supports PDF files
4. **Consistent Processing**: All files processed the same way
5. **Better Error Handling**: Server-side validation and error messages
6. **Scalable**: Can add more file formats easily

## ⚠️ Important Notes

### PDF Files
- PDF files must have extractable text (not just images)
- Scanned PDFs (image-based) will not work
- PDFs with text layers will work perfectly

### DOC Files
- Old binary .doc format has limited support
- Users should convert to DOCX for best results
- Some .doc files may fail to parse

### File Size Limit
- Maximum file size: 10MB
- Configured in multer settings

## 🔧 Error Handling

The backend provides detailed error messages:
- Invalid file type
- File too large
- Empty file
- Parsing errors
- Unsupported format

All errors are returned with helpful messages to guide users.

## 🚀 Testing

1. Start the backend server
2. Open the extension
3. Go to Job Application → Analyze Job tab
4. Select "Upload CV File"
5. Choose a DOCX, PDF, or TXT file
6. File should process and show word count
7. Ready for CV analysis!

## 📝 API Usage Example

```javascript
const formData = new FormData();
formData.append('cvFile', fileInput.files[0]);

const response = await fetch('http://localhost:3000/api/process-cv-file', {
    method: 'POST',
    headers: {
        'x-api-key': 'user_api_key_here'
    },
    body: formData
});

const result = await response.json();
console.log(result.content); // Extracted text
```


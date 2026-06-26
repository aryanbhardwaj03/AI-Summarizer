# 📚 AI Summarizer

> **An AI-powered document intelligence platform that transforms PDFs, DOCX, PPT/PPTX, and TXT files into summaries, quizzes, flashcards, and interactive AI conversations.**

AI Summarizer is a modern full-stack web application that leverages Large Language Models (LLMs) and Retrieval-Augmented Generation (RAG) to help users understand, revise, and learn from documents more effectively. Whether you're a student, researcher, educator, or professional, AI Summarizer turns lengthy documents into interactive learning experiences within seconds.

---

## ✨ Features

* 📄 Upload and analyze **PDF**, **DOCX**, **PPT/PPTX**, and **TXT** files
* 🤖 Generate concise, detailed, or bullet-point summaries
* 💬 Chat with your documents using natural language
* 📝 Create AI-generated quizzes with multiple difficulty levels
* 🃏 Generate interactive flashcards for quick revision
* 🔍 Semantic document search using vector embeddings
* 📚 Support multiple document uploads
* 📊 Extract key concepts, insights, and important topics
* 🖼️ Extract figures, tables, and images from supported documents
* ⚡ Fast Retrieval-Augmented Generation (RAG) pipeline
* 🌙 Responsive UI with Light & Dark mode support
* 🔒 Secure local document processing

---

## 🚀 Tech Stack

### Frontend

* Next.js
* React.js
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend

* Python
* Streamlit
* FastAPI

### Artificial Intelligence

* Google Gemini API
* LangChain
* Retrieval-Augmented Generation (RAG)

### Vector Database

* FAISS

### Document Processing

* PyMuPDF
* python-docx
* python-pptx
* pdfplumber

### Machine Learning & NLP

* Sentence Transformers
* Hugging Face Transformers

### Deployment

* Docker
* Docker Compose
* Vercel (Frontend)
* Railway / Render (Backend)

### Development Tools

* Git
* GitHub
* VS Code / Antigravity IDE

---

## 📂 Project Structure

```text
AI-Summarizer/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   └── package.json
│
├── backend/
│   ├── features/
│   ├── ui/
│   ├── utils/
│   ├── app.py
│   └── requirements.txt
│
├── Dockerfile
├── docker-compose.yml
├── README.md
└── LICENSE
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Summarizer.git
cd AI-Summarizer
```

### Install Backend Dependencies

```bash
pip install -r requirements.txt
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root:

```env
GOOGLE_API_KEY=YOUR_API_KEY
```

### Run the Backend

```bash
streamlit run app.py
```

### Run the Frontend

```bash
npm run dev
```

---

## 🧠 How It Works

```text
Upload Document
      │
      ▼
Extract Text & Images
      │
      ▼
Generate Embeddings
      │
      ▼
Store in FAISS Vector Database
      │
      ▼
Retrieve Relevant Context
      │
      ▼
Generate AI Responses
      │
      ├── Summaries
      ├── Quizzes
      ├── Flashcards
      ├── AI Chat
      └── Key Insights
```

---

## 🎯 Use Cases

* 📖 Exam preparation
* 📚 Lecture note revision
* 📑 Research paper summarization
* 💼 Business report analysis
* 🧑‍💻 Technical documentation
* 🎓 Learning from eBooks
* 📋 Interview preparation
* 🏢 Corporate training materials

---

## 🌱 Future Roadmap

* OCR support for scanned documents
* AI-generated mind maps
* Voice-based document interaction
* Multi-language document support
* Cloud storage integration
* Team collaboration
* Mobile application
* Personalized learning analytics

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Aryan Bhardwaj**

---

## ⭐ Show Your Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub. It helps others discover the project and motivates future development.

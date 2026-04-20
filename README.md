# Resumify - AI-Powered Resume Builder

Resumify is a modern, high-performance web application that helps users create professional, AI-optimized resumes in minutes. Leveraging advanced AI models, it provides intelligent suggestions and sleek templates to help job seekers stand out.

## 🚀 Features

- **AI-Powered Assistance**: Generate professional bullet points and summaries using Google Gemini / OpenAI.
- **Modern Templates**: sleek, minimalist, and ATS-friendly resume designs.
- **Real-time Preview**: See your changes instantly as you build your resume.
- **Secure Authentication**: Robust user login and registration system.
- **Cloud Storage**: Save and export your resumes anytime, anywhere.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI API (Gemini 2.0 Flash)
- **External Services**: ImageKit for asset management

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yashpreetg24/Resumify--AI-Resume-Builder.git
   ```
2. Install dependencies for both client and server:
   ```bash
   # Client
   cd client
   npm install

   # Server
   cd ../server
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `server/.env` and `client/.env`.
   - Fill in your API keys and credentials.

4. Run the application:
   ```bash
   # In separate terminals
   npm run dev    # (in client folder)
   npm run start  # (in server folder)
   ```

## 📄 License

This project is licensed under the MIT License.

import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message: 'Missing required fields'})
        }

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system",
                 content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
    ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
       
        const {resumeText, title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message: 'Missing required fields'})
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume."

        const userPrompt = `extract data from this resume: ${resumeText}
        
        Provide data in the following JSON format with no additional text before or after:

        {
        professional_summary: { type: String, default: '' },
        skills: [{ type: String }],
        personal_info: {
            image: {type: String, default: '' },
            full_name: {type: String, default: '' },
            profession: {type: String, default: '' },
            email: {type: String, default: '' },
            phone: {type: String, default: '' },
            location: {type: String, default: '' },
            linkedin: {type: String, default: '' },
            website: {type: String, default: '' },
        },
        experience: [
            {
                company: { type: String },
                position: { type: String },
                start_date: { type: String },
                end_date: { type: String },
                description: { type: String },
                is_current: { type: Boolean },
            }
        ],
        project: [
            {
                name: { type: String },
                type: { type: String },
                description: { type: String },
            }
        ],
        education: [
            {
                institution: { type: String },
                degree: { type: String },
                field: { type: String },
                graduation_date: { type: String },
                gpa: { type: String },
            }
        ],          
        }
        `;

       const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system",
                 content: systemPrompt },
                {
                    role: "user",
                    content: userPrompt,
                },
        ],
        response_format: {type:  'json_object'}
        })

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData)
        const newResume = await Resume.create({userId, title, ...parsedData})

        res.json({resumeId: newResume._id})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for checking ATS score of a resume
// POST: /api/ai/check-ats-score
export const checkAtsScore = async (req, res) => {
    try {
        const { resumeData } = req.body;

        if (!resumeData) {
            return res.status(400).json({ message: 'Missing resume data' });
        }

        // Build a leaner payload — strip internal MongoDB fields the AI doesn't need
        const slimResume = {
            personal_info: resumeData.personal_info || {},
            professional_summary: resumeData.professional_summary || '',
            experience: resumeData.experience || [],
            education: resumeData.education || [],
            project: resumeData.project || [],
            skills: resumeData.skills || [],
        };

        const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyzer and professional resume coach. Analyze the provided resume data and return a comprehensive ATS score report in strict JSON format. Be realistic and consistent — for the same resume always return the same scores. Be critical: most resumes score 40-80; only exceptional ones score above 85.`;

        const userPrompt = `Analyze this resume and return ONLY a valid JSON object — no markdown, no extra text.

Resume:
${JSON.stringify(slimResume, null, 2)}

JSON structure to return:
{
  "overall_score": <integer 0-100>,
  "total_issues": <integer>,
  "summary_message": "<one sentence feedback>",
  "categories": [
    {
      "id": "content",
      "name": "CONTENT",
      "score": <integer 0-100>,
      "checks": [
        { "name": "ATS Parse Rate", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Quantifying Impact", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Repetition", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Spelling & Grammar", "passed": <bool>, "issues": <int>, "detail": "<string>" }
      ]
    },
    {
      "id": "sections",
      "name": "SECTIONS",
      "score": <integer 0-100>,
      "checks": [
        { "name": "Essential Sections", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Contact Information", "passed": <bool>, "issues": <int>, "detail": "<string>" }
      ]
    },
    {
      "id": "ats_essentials",
      "name": "ATS ESSENTIALS",
      "score": <integer 0-100>,
      "checks": [
        { "name": "Email Address", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Professional Title", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "LinkedIn / Website", "passed": <bool>, "issues": <int>, "detail": "<string>" }
      ]
    },
    {
      "id": "keywords",
      "name": "KEYWORDS",
      "score": <integer 0-100>,
      "checks": [
        { "name": "Power Verbs", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Industry Keywords", "passed": <bool>, "issues": <int>, "detail": "<string>" },
        { "name": "Skills Coverage", "passed": <bool>, "issues": <int>, "detail": "<string>" }
      ]
    }
  ]
}`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0,
        });

        let rawContent = response.choices[0].message.content;
        
        // Clean markdown formatting if present
        if (rawContent.startsWith('```')) {
            rawContent = rawContent.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
        }

        try {
            const result = JSON.parse(rawContent);
            return res.status(200).json(result);
        } catch (parseError) {
            console.error('ATS JSON Parse Error:', parseError.message);
            console.error('Raw AI Content:', rawContent);
            return res.status(500).json({ 
                message: 'Failed to parse AI response', 
                error: parseError.message,
                raw: rawContent.substring(0, 100) + '...'
            });
        }
    } catch (error) {
        console.error('ATS Score Error:', error?.message);
        const statusCode = error?.response?.status || 500;
        return res.status(statusCode).json({ 
            message: error?.message || 'AI analysis failed',
            details: error?.response?.data || null
        });
    }
}

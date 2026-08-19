export const projectCategories = ['All', 'AI', 'Machine Learning', 'Hackathon'];

export const projects = [
  {
  id: 1,
  title: 'LearnSmart - AI Repo Analysis Platform',
  category: 'AI',
  tagline: 'Understand, explore, and learn any codebase with AI',
  description:
    'AI-powered platform that analyzes codebases, explains files and technologies, visualizes execution flow, and provides an interactive AI tutor to help developers understand unfamiliar code.',
  overview:
    'An intelligent code learning platform designed to make complex codebases easier to understand. LearnSmart uses large language models, embeddings, and retrieval-augmented generation (RAG) to analyze uploaded projects, provide file-by-file explanations, identify the technologies used, and answer contextual questions about the code. It also helps developers visualize execution flow and extract relevant skills for resumes.',
  problem:
    'Understanding an unfamiliar codebase can be time-consuming, especially for students and developers working with new technologies. Existing AI coding assistants primarily focus on generating or fixing code rather than helping users build a deeper understanding of an entire project, its architecture, and execution flow.',
  solution:
    'Built an AI-powered learning platform that combines LLMs with RAG to provide context-aware explanations of codebases. The system processes uploaded projects, generates embeddings for relevant code and documentation, retrieves the most relevant context, and uses an LLM to provide grounded explanations. It also includes an AI tutor for interactive learning, execution-flow visualization, and resume skill extraction.',
  architecture: null,
  techStack: ['React', 'Node.js', 'Express.js', 'Python', 'FastAPI', 'MongoDB', 'ChromaDB', 'RAG', 'OpenRouter', 'DeepSeek'],
  challenges: [
    'Maintaining accurate and context-aware answers across large multi-file codebases',
    'Designing effective retrieval and chunking strategies for code and documentation',
    'Reducing hallucinations by grounding LLM responses in retrieved project context',
  ],
  impact:
    'Built as an AI-powered learning and code exploration platform to help students and developers understand unfamiliar codebases faster. The platform combines automated code analysis with interactive AI tutoring to turn complex projects into an easier, more structured learning experience.',
  features: [
    'AI-powered file-by-file code and technology explanations',
    'RAG-based contextual question answering over uploaded codebases',
    'Provides learning resources and potential interview questions',
    'Visual execution-flow representation of code',
    'Automatic resume skill extraction from projects',
  ],
    live: 'https://learn-smart-five.vercel.app/',
    github: 'https://github.com/sshreyasingh/LearnSmart',
    caseStudy: '#',
    stats: { stars: 128, forks: 42 },
    gallery: [
      { type: 'emoji', value: '🔍', label: 'Image Scanner', color: 'from-violet-500/30 to-purple-500/20' },
      { type: 'emoji', value: '🌐', label: 'Page Translator', color: 'from-blue-500/30 to-cyan-500/20' },
      { type: 'emoji', value: '🎤', label: 'Voice Navigation', color: 'from-emerald-500/30 to-teal-500/20' },
    ],
  },
  {
     id: 2,
  title: 'CogniVox - AI-Powered Voice Agent',
  category: 'AI',
  tagline: 'Intelligent, grounded voice conversations powered by real-time AI',
  description:
    'Real-time AI voice agent that conducts candidate screening conversations, answers knowledge-grounded questions, evaluates responses, and handles multilingual interactions through natural voice conversations.',
  overview:
    'CogniVox is an AI-powered voice agent designed to automate candidate screening through natural, real-time conversations. It combines Gemini Live for speech-to-speech interaction with a knowledge retrieval system that grounds responses in a predefined knowledge base. The agent can ask screening questions, handle follow-up conversations, respond to candidate queries, identify unsupported questions, and escalate conversations when human intervention is required.',
  problem:
    'Traditional candidate screening is time-consuming and difficult to scale. Recruiters have to conduct repetitive initial conversations, evaluate basic candidate information, and answer recurring questions. Generic voice assistants can also hallucinate answers when they lack relevant context, making reliable grounding and controlled conversations essential for recruitment workflows.',
  solution:
    'Built a real-time voice screening agent using Python and FastAPI with a persistent WebSocket connection for streaming audio and conversation events. Gemini Live handles speech recognition, reasoning, and voice responses, while a hybrid retrieval system using vector search and BM25-based full-text search retrieves relevant knowledge-base information. Reciprocal Rank Fusion combines retrieval results, while prompt-enforced grounding ensures the agent only answers questions supported by retrieved context and gracefully handles unknown queries.',
  architecture: null,
  techStack: [
    'Python',
    'FastAPI',
    'WebSockets',
    'Google Gemini Live',
    'Gemini Embeddings',
    'LanceDB',
    'BM25',
    'RAG',
    'SQLite',
    'PyArrow'
  ],
  challenges: [
    'Maintaining low-latency real-time voice conversations over persistent WebSocket connections',
    'Preventing hallucinations when candidate questions fall outside the knowledge base',
    'Designing hybrid retrieval that combines semantic vector search with keyword-based BM25 search',
    'Handling streaming audio, transcripts, retrieval, and AI responses concurrently'
  ],
  impact:
    'Developed a functional AI voice screening prototype capable of conducting real-time candidate conversations while keeping responses grounded in a controlled knowledge base. The system was designed with a focus on reliability, low-latency interaction, and scalable automated screening.',
  features: [
    'Real-time AI-powered candidate screening through voice',
    'Knowledge-grounded responses using RAG',
    'Hybrid BM25 + vector retrieval with Reciprocal Rank Fusion',
    'Automatic fallback for unsupported questions',
    'Human escalation for conversations requiring recruiter intervention',
    'Multilingual voice interaction prototypes for localized screening',
  ],
    live: '#',
    github: 'https://github.com/sshreyasingh/Cognivox-voice-agent',
    caseStudy: '#',
    stats: { stars: 256, forks: 89 },
    gallery: [
      { type: 'emoji', value: '💻', label: 'Code Editor', color: 'from-emerald-500/30 to-teal-500/20' },
      { type: 'emoji', value: '📹', label: 'Video Chat', color: 'from-blue-500/30 to-indigo-500/20' },
      { type: 'emoji', value: '🖥️', label: 'Terminal', color: 'from-slate-500/30 to-gray-500/20' },
    ],
  },
  {
    id: 3,
  title: 'CodeMentor AI - AI-Powered Collaborative Coding Platform',
  category: 'AI',
  tagline: 'Code, collaborate, and learn together with an AI coding mentor',
  description:
    'Real-time collaborative coding platform that enables developers to write and review code together while using AI to analyze code, identify issues, and provide contextual suggestions.',
  overview:
    'CodeMentor AI is an interactive coding platform built to combine collaborative development with AI-powered code assistance. Multiple users can work together in real time, while an integrated AI mentor reviews code, explains errors, suggests improvements, and helps developers understand programming concepts. The platform uses real-time communication to keep code and interactions synchronized across users.',
  problem:
    'Learning and debugging code often requires switching between coding environments, collaboration tools, and AI assistants. Developers also struggle to get immediate contextual feedback while working with others. Existing solutions may provide AI assistance but lack an integrated real-time collaborative coding experience.',
  solution:
    'Built a real-time collaborative coding environment using React and Socket.io, with a Node.js and Express.js backend for managing users, sessions, and code collaboration. Integrated an LLM through OpenRouter and DeepSeek to provide contextual code reviews, explanations, debugging assistance, and improvement suggestions based on the code being edited.',
  architecture: null,
  techStack: [
    'React',
    'Vite',
    'Material UI',
    'Node.js',
    'Express.js',
    'MongoDB',
    'WebSockets',
    'Socket.io',
    'OpenRouter',
    'DeepSeek'
  ],
  challenges: [
    'Synchronizing code changes and user actions between multiple users in real time',
    'Maintaining consistent session state across concurrent connections',
    'Providing relevant AI feedback based on the current code context',
    'Managing real-time communication alongside asynchronous AI API requests'
  ],
  impact:
    'Created an integrated environment where developers can collaborate on code in real time while receiving AI-powered feedback without leaving the coding workflow. The project combines collaborative development, real-time communication, and LLM-based assistance into a single platform.',
  features: [
    'Real-time collaborative code editing',
    'AI-powered code reviews and suggestions',
    'Contextual debugging and error explanations',
    'Multi-user coding sessions using WebSockets',
    'Interactive AI programming mentor',
    'Modern responsive developer interface',
  ],
    live: 'https://code-mentor-ai-4528.vercel.app',
    github: 'https://github.com/sshreyasingh/CodeMentor-Ai',
    caseStudy: '#',
    stats: { stars: 89, forks: 31 },
    gallery: [
      { type: 'emoji', value: '📊', label: 'Dashboard', color: 'from-orange-500/30 to-rose-500/20' },
      { type: 'emoji', value: '🧠', label: 'ML Pipeline', color: 'from-purple-500/30 to-violet-500/20' },
      { type: 'emoji', value: '📈', label: 'Analytics', color: 'from-cyan-500/30 to-blue-500/20' },
    ],
  },
  {
    id: 4,
  title: 'AgriVision - AI Crop Health Monitoring System',
  category: 'Machine Learning',
  categories: ['Machine Learning', 'Hackathon'],
  tagline: 'Using AI and computer vision to detect crop health issues early',
  description:
    'AI-powered crop monitoring system that uses computer vision and machine learning to detect crop diseases, monitor plant health, and provide actionable insights for smarter agricultural decision-making.',
  overview:
    'AgriVision is an intelligent crop health monitoring platform designed to help farmers identify plant diseases and monitor crop conditions at an early stage. The system combines computer vision, deep learning, and simulated IoT data to analyze crop images and environmental conditions. A web-based interface allows users to monitor crop health and access AI-driven insights in a simple and accessible way.',
  problem:
    'Crop diseases and unhealthy growing conditions can significantly reduce agricultural productivity, while manual inspection is time-consuming and difficult to scale. Farmers often lack access to fast and reliable tools for identifying diseases at an early stage, leading to delayed treatment and crop losses.',
  solution:
    'Built an AI-based monitoring system that uses CNN models for image-based crop disease classification, YOLO for object and affected-area detection, and LSTM models to analyze sequential environmental data. Integrated simulated IoT sensor data to provide additional context about crop conditions and developed a React-based dashboard for visualizing crop health and AI-generated insights.',
  architecture: null,
  techStack: [
    'React',
    'Python',
    'TensorFlow',
    'Keras',
    'CNN',
    'YOLO',
    'LSTM',
    'IoT',
    'Computer Vision'
  ],
  challenges: [
    'Achieving reliable disease detection across different crop and image conditions',
    'Combining image-based predictions with time-series environmental data',
    'Handling variations in lighting, image quality, and crop appearance',
    'Presenting complex AI predictions in a simple interface for end users'
  ],
  impact:
    'Developed as an AI-driven solution for early crop health monitoring and disease detection, helping demonstrate how computer vision, deep learning, and IoT data can be combined to support faster and more informed agricultural decisions.',
  features: [
    'AI-based crop disease classification using CNN',
    'Disease and affected-area detection using YOLO',
    'Environmental trend analysis using LSTM',
    'IoT-based crop condition monitoring simulation',
    'AI-driven crop health insights',
    'Interactive React dashboard for monitoring crop conditions',
  ],
    live: 'https://frontend-taupe-rho-64.vercel.app/',
    github: 'https://github.com/sshreyasingh/AgriVision',
    caseStudy: '#',
    stats: { stars: 312, forks: 145 },
    gallery: [
      { type: 'emoji', value: '🚨', label: 'Emergency Dashboard', color: 'from-red-500/30 to-orange-500/20' },
      { type: 'emoji', value: '🗺️', label: 'Resource Map', color: 'from-amber-500/30 to-yellow-500/20' },
      { type: 'emoji', value: '🤖', label: 'AI Triage', color: 'from-blue-500/30 to-purple-500/20' },
    ],
  },
  // {
  //   id: 6,
  //   title: 'CropGuard — ML Plant Disease Detection',
  //   category: 'Machine Learning',
  //   tagline: 'Helping farmers protect their crops',
  //   description:
  //     'Mobile-friendly web app that uses a CNN model to detect 30+ plant diseases from leaf images with 96% accuracy. Built for rural farmers.',
  //   overview:
  //     'An AI-powered agricultural tool that helps farmers identify crop diseases early by simply taking a photo of a leaf. The CNN model, trained on 50,000+ images across 30+ diseases, achieves 96% accuracy. Built as a Progressive Web App to work offline in rural areas with limited connectivity.',
  //   problem:
  //     'Small-scale farmers in developing countries lose 30-40% of their crops annually to preventable diseases. Expert diagnosis is expensive and inaccessible. Existing solutions require internet connectivity, which is unreliable in rural areas.',
  //   solution:
  //     'Trained a custom CNN using transfer learning on ResNet50 with a dataset of 50k+ labeled leaf images. Deployed as a PWA with offline-first architecture using service workers. Added multilingual support (5 Indian languages) for treatment recommendations. Built a community forum for knowledge sharing.',
  //   architecture: null,
  //   techStack: ['React', 'Python', 'TensorFlow', 'Flask', 'PWA'],
  //   challenges: [
  //     'Building a lightweight model (<10MB) deployable on mobile devices',
  //     'Collecting and labeling 50k+ leaf images across 30 disease categories',
  //     'Designing an intuitive UI for users with limited technical literacy',
  //   ],
  //   impact: 'Being piloted with 200+ farmers across 3 districts. Early results show 45% reduction in crop loss. Won "Best Social Impact" award at AgriTech Hackathon 2024.',
  //   features: [
  //     'CNN model trained on 50k+ leaf images',
  //     'Offline-first PWA for low-connectivity areas',
  //     'Treatment recommendations in 5 Indian languages',
  //     'Community forum for farmers',
  //   ],
  //   live: '#',
  //   github: '#',
  //   caseStudy: '#',
  //   stats: { stars: 432, forks: 198 },
  //   gallery: [
  //     { type: 'emoji', value: '🌿', label: 'Disease Scanner', color: 'from-green-500/30 to-emerald-500/20' },
  //     { type: 'emoji', value: '📱', label: 'Mobile PWA', color: 'from-teal-500/30 to-cyan-500/20' },
  //     { type: 'emoji', value: '🗣️', label: 'Multi-Language', color: 'from-amber-500/30 to-orange-500/20' },
  //   ],
  // },
  // {
  //   id: 7,
  //   title: 'ChatFlow — AI Customer Support',
  //   category: 'AI',
  //   tagline: 'Smart support that actually understands',
  //   description:
  //     'AI-powered customer support platform that uses RAG with custom knowledge bases. Handles 80% of queries autonomously across multiple channels.',
  //   overview:
  //     'An intelligent customer support platform that combines Retrieval-Augmented Generation (RAG) with custom knowledge bases to handle support queries with human-like understanding. Seamlessly integrates across email, chat, and Slack, with intelligent human handoff when needed.',
  //   problem:
  //     'Customer support teams spend 60% of their time answering repetitive questions. Existing chatbots use rigid decision trees that frustrate users. Knowledge base articles are rarely kept up to date, leading to outdated answers.',
  //   solution:
  //     'Implemented a RAG pipeline using LangChain that indexes company documentation, FAQs, and past tickets into Pinecone vector store. Queries are semantically matched to relevant context before being answered by GPT-4. Built a feedback loop that continuously improves response quality based on human agent corrections.',
  //   architecture: null,
  //   techStack: ['Next.js', 'LangChain', 'Pinecone', 'OpenAI API', 'PostgreSQL'],
  //   challenges: [
  //     'Ensuring hallucination-free responses in a customer-facing context',
  //     'Building a vector search pipeline with <500ms response time',
  //     'Designing a seamless human handoff flow with full context transfer',
  //   ],
  //   impact: 'Handles 80% of queries autonomously. Average response time dropped from 4 hours to 30 seconds. Customer satisfaction scores improved by 35%.',
  //   features: [
  //     'RAG pipeline with custom vector embeddings',
  //     'Multi-channel support (email, chat, Slack)',
  //     'Human handoff with full context preservation',
  //     'Analytics dashboard with sentiment tracking',
  //   ],
  //   live: '#',
  //   github: '#',
  //   caseStudy: '#',
  //   stats: { stars: 198, forks: 67 },
  //   gallery: [
  //     { type: 'emoji', value: '💬', label: 'Chat Interface', color: 'from-violet-500/30 to-purple-500/20' },
  //     { type: 'emoji', value: '🧠', label: 'RAG Pipeline', color: 'from-indigo-500/30 to-blue-500/20' },
  //     { type: 'emoji', value: '📊', label: 'Analytics', color: 'from-cyan-500/30 to-teal-500/20' },
  //   ],
  // },
  // {
  //   id: 8,
  //   title: 'EventHub — Campus Event Manager',
  //   category: 'MERN',
  //   tagline: 'One platform for all campus events',
  //   description:
  //     'Full-stack event management system built for IIIT Kota. Handles registrations, ticketing, live updates, and attendance tracking for 2000+ students.',
  //   overview:
  //     'A comprehensive event management platform designed specifically for IIIT Kota. Handles the entire event lifecycle — from registration and ticketing to live updates and attendance tracking. Features role-based dashboards for organizers, attendees, and administrators.',
  //   problem:
  //     'IIIT Kota\'s event management relied on Google Forms, spreadsheets, and WhatsApp groups. Registration data was scattered, attendance tracking was manual, and there was no centralized platform for event discovery and management.',
  //   solution:
  //     'Built a full-stack MERN application with JWT-based authentication and role-based access. QR code check-in system provides real-time attendance stats. Automated certificate generation using Cloudinary for image processing. Integrated SendGrid and Twilio for email/SMS notifications.',
  //   architecture: null,
  //   techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT'],
  //   challenges: [
  //     'Handling concurrent registrations during peak event signup periods',
  //     'Building a reliable QR code check-in system that works in low-light conditions',
  //     'Managing complex role-based permissions across 5 user types',
  //   ],
  //   impact: 'Managing 50+ events per semester for 2000+ students. Reduced registration processing time by 90%. Attendance tracking accuracy improved to 98%.',
  //   features: [
  //     'QR-based check-in system with real-time stats',
  //     'Role-based dashboards for organizers and attendees',
  //     'Automated certificate generation',
  //     'Email/SMS notifications via SendGrid and Twilio',
  //   ],
  //   live: '#',
  //   github: '#',
  //   caseStudy: '#',
  //   stats: { stars: 96, forks: 38 },
  //   gallery: [
  //     { type: 'emoji', value: '🎫', label: 'Event Dashboard', color: 'from-emerald-500/30 to-teal-500/20' },
  //     { type: 'emoji', value: '📱', label: 'QR Check-in', color: 'from-blue-500/30 to-cyan-500/20' },
  //     { type: 'emoji', value: '📜', label: 'Certificates', color: 'from-amber-500/30 to-yellow-500/20' },
  //   ],
  // },
];


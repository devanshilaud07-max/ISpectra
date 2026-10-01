import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { VERIFIED_BIS_STANDARDS } from './src/data/standardsDatabase.js';
import { analyzeSpecification } from './src/services/analyzer.js';
import { generateLocalCopilotResponse } from './src/services/copilotService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Initialize Gemini Client
let geminiClient: GoogleGenAI | null = null;
try {
  geminiClient = new GoogleGenAI();
} catch (e) {
  console.warn('Gemini client initialization notice:', e);
}

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// -------------------------------------------------------------
// REST API ROUTES (/api/*)
// -------------------------------------------------------------

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'ISpectra Standards Intelligence API',
    version: '1.4.0',
    verifiedStandardsCount: VERIFIED_BIS_STANDARDS.length,
    timestamp: new Date().toISOString()
  });
});

// Specification Analysis endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== 'string' || !text.trim()) {
      res.status(400).json({ error: 'Specification text is required for analysis.' });
      return;
    }

    // Call real engine
    const analysis = analyzeSpecification(text);
    res.json(analysis);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze specification. Please try again.' });
  }
});

// File upload analysis endpoint (accepts plain text, json, or simulated multipart payload)
app.post('/api/upload', (req: Request, res: Response) => {
  try {
    const { fileContent, fileName } = req.body;
    if (!fileContent) {
      res.status(400).json({ error: 'No document text found in upload payload.' });
      return;
    }

    const analysis = analyzeSpecification(fileContent);
    res.json({
      ...analysis,
      sourceFileName: fileName || 'tender_document.txt'
    });
  } catch (error: any) {
    console.error('Upload processing error:', error);
    res.status(500).json({ error: 'Unable to process uploaded tender document.' });
  }
});

// AI Copilot Chatbot Endpoint (Powered by Gemini + BIS Knowledge Engine)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const systemPrompt = `You are ISpectra Copilot, an expert AI Standards Intelligence Assistant specializing in:
1. Identifying applicable Indian Standards (IS numbers) for products and procurement specifications under GeM (Government e-Marketplace), Central Public Procurement Portal (CPPP), state PWDs, and PSUs.
2. Explaining mandatory safety standards, component drivers, ingress protection (IP codes under IS/IEC 60529), testing chambers, and performance specs.
3. Gazette status audits (identifying WITHDRAWN standards like IS 1944 and replacing them with current ones like IS 10322 Part 5/Sec 3).
4. Ministry Quality Control Orders (QCOs) by MeitY, DPIIT, MNRE requiring Compulsory Registration Scheme (CRS) or ISI Mark.
5. Verbatim clause citations and audit evidence.

Verified Indian Standards in Knowledge Base:
${VERIFIED_BIS_STANDARDS.map((s) => `- ${s.id}: ${s.title} [Status: ${s.status}, Scheme: ${s.certificationScheme}]`).join('\n')}

Guidelines:
- Answer accurately, professionally, and concisely in 2-3 brief paragraphs or bullet points.
- Always highlight specific standard codes in bold (e.g. **IS 10322**, **IS 15885**, **IS/IEC 60529**).
- Cite statutory gazette requirements and practical procurement advice for tender documents.`;

    if (process.env.GEMINI_API_KEY && geminiClient) {
      try {
        const response = await geminiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }]
            }
          ]
        });

        const reply = response.text || generateLocalCopilotResponse(message);
        res.json({ reply, model: 'gemini-3.8-flash' });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API call error, falling back to local Copilot reasoning:', geminiError?.message);
      }
    }

    // High-performance intelligent domain-specific copilot engine
    const reply = generateLocalCopilotResponse(message);
    res.json({ reply, model: 'ispectra-copilot-engine' });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Failed to process chat message.' });
  }
});

// Standards catalogue endpoint
app.get('/api/standards', (req: Request, res: Response) => {
  const { search, category, status } = req.query;

  let results = [...VERIFIED_BIS_STANDARDS];

  if (category && typeof category === 'string' && category !== 'ALL') {
    results = results.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (status && typeof status === 'string') {
    results = results.filter(
      (s) => s.status.toLowerCase() === status.toLowerCase()
    );
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.whyApplies.toLowerCase().includes(q)
    );
  }

  res.json({
    total: results.length,
    standards: results
  });
});

// Single standard details endpoint
app.get('/api/standards/:id', (req: Request, res: Response) => {
  const targetId = decodeURIComponent(req.params.id);
  const found = VERIFIED_BIS_STANDARDS.find(
    (s) => s.id.toLowerCase() === targetId.toLowerCase() || s.bisCatalogueNumber === targetId
  );

  if (!found) {
    res.status(404).json({ error: `Standard ${targetId} not found in BIS catalogue index.` });
    return;
  }

  res.json(found);
});

// Authentication endpoint
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password credentials are required.' });
    return;
  }

  const roleLabel =
    role === 'supplier'
      ? 'Certified MSME Supplier'
      : role === 'auditor'
      ? 'BIS Standards Auditor'
      : 'Procurement Officer (GeM / PSU)';

  res.json({
    token: 'jwt_mock_ispectra_' + Buffer.from(email).toString('base64'),
    user: {
      email,
      name: email.split('@')[0],
      role: role || 'buyer',
      roleLabel,
      organization: 'Government of India Procurement Network'
    }
  });
});

// -------------------------------------------------------------
// FRONTEND SERVING (Vite Middleware in dev / Static dist in prod)
// -------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const host = '0.0.0.0';
  app.listen(Number(PORT), host, () => {
    console.log(`[ISpectra] Full-stack server running on http://${host}:${PORT}`);
  });
}

startServer();

# Copilot Instructions for Euduka Project

## Project Overview
Euduka is an educational platform for French literature exam preparation. It's a full-stack Node.js/Express application with a vanilla JavaScript frontend. The platform delivers interactive exercises on three literary works (Antigone, Le Dernier Jour d'un Condamné, Bam) with user authentication, progress tracking, and a freemium model.

## Architecture

### Backend Stack
- **Framework**: Express.js with Socket.IO for real-time features
- **Database**: MongoDB (mongoose)
- **Auth**: JWT-based token verification
- **Email**: Nodemailer (hardcoded Gmail credentials - `pookarim@gmail.com`)
- **Key File**: [server/server.js](server/server.js) - configures routes, Socket.IO, and MongoDB connection

### Client Stack
- **Architecture**: Vanilla ES6 modules, no build tool
- **Pattern**: Functional components that dynamically generate and inject HTML
- **State Management**: localStorage for user data, tokens, and exercise results
- **Real-time**: Socket.IO for receiving exercise lists from backend

### Data Flow
1. **User Registration**: [creerCompte()](client/components/misc/utils.js) → POST `/creer-compte` → Email verification token sent
2. **Exercises**: User selects work (Antigone/DJC/Bam) → [listeAct()](client/components/act/listeAct.js) → Loads exercise module
3. **Results**: Exercise functions call [handleResultats()](client/components/misc/utils.js) → POST `/update-resultats` with auth token
4. **Free Trial**: First 2 minutes via [freeMinsMiddleware](server/middlewares/freeMinsMiddleware.js)

## Key Models & Patterns

### User Model
[EleveModel.js](server/models/EleveModel.js) tracks:
- Role states: `'attenteR'` (awaiting email verification) → `'registred'` → `'PREMIUM'`
- `freeMins`: Remaining free trial minutes (default: 2, resets daily)
- `resultats`: Nested scores for 5 exercise types (qcm, vf, remplir, ordrePhrases, ordreEvenements)
- `token`: JWT verification/session token

### Exercise Components
Located in [client/components/act/](client/components/act/):
- **qcm.js**: Multiple choice questions (shuffles 4 questions per session)
- **vf.js**: True/False questions
- **remplirVide.js**: Fill-in-the-blank
- **ordrePhrases.js**: Sentence ordering
- **ordreEvenements.js**: Event ordering
- **lecteur.js**: Text reading with page turning

All follow same pattern: `export function exerciseName(bloc, data, callback)`

### Database Separation by Work
Each literary work has separate data files in [server/bd/](server/bd/):
- `antigone*.js`, `bam*.js`, `djc*.js` (suffix: oeuvre, resume, qcm, vf, ordreev, ordreph, vide)
- Format: Array of objects with exercise content, answers, and metadata

## Critical Workflows

### Start Development
```bash
cd server
npm install  # First time only
npm start    # Runs nodemon, restarts on file changes
```
Port: 3000 (hardcoded in server.js)

### Environment Configuration
- **API Base URL**: Hardcoded as `'http://localhost:3000'` across client files
- **CORS Origins**: [server.js](server/server.js#L23-L35) - add new origins here for deployment
- **MongoDB**: `notesapp` cluster (credentials in server.js#L82)
- **Email Service**: Gmail app password in [utils.js](server/utils.js#L8-L12) - **EXPOSED HARDCODED CREDENTIALS**

### Known Issues (from README)
- Token expiration: After verification token expires, user cannot update results (401 errors)
- Double login: localStorage conflicts when logging in two accounts in same browser
- Premium workflow: Users must logout/login to refresh premium status after admin approval
- Email verification stuck: Sometimes shows "en attente" even after clicking email link

## Code Conventions

### Naming
- French variable names throughout: `nom`, `prenom`, `email`, `tel`, `token`, `role`
- Console debugging: `const l = console.log` used in multiple files
- Component naming: PascalCase functions exported as modules

### Request/Response Pattern
```javascript
// All API responses use this format
{ 
  success: boolean,
  message: string,
  titre?: string (for toast notifications),
  data?: any
}
```

### localStorage Keys
- `role`: Current user state (attenteR, registred, PREMIUM)
- `token`: JWT for authenticated requests (sent as Authorization header)
- `liste`: Cached exercise questions from Socket.IO
- User results stored in nested `resultats` object

### DOM Manipulation Pattern
Components create a root `<div>`, generate HTML via template strings, inject into parent, then attach event listeners:
```javascript
const div = document.createElement('div')
div.innerHTML = codeHtml()  // HTML as string
bloc.appendChild(div)
// Then querySelector for specific elements and add listeners
```

## Testing & Debugging
- **Admin Route**: POST `/admin/euduka/admin` (credentials: email="a", password="a") returns all users
- **Delete All**: DELETE `/delete` - clears entire database
- **Socket.IO Events**: Server emits exercise list every 4 seconds on `'liste'` channel
- **Logs**: Check browser console and server terminal output

## Important Notes for Modifications
1. **Hardcoded Secrets**: SECRET_KEY and email password are exposed in source - needs environment variables
2. **Email Configuration**: Currently sends all emails to `pookarim@gmail.com` regardless of form input
3. **Token Mismatch Issues**: Verification token and session token are different - check [controllerEleve.js](server/controllers/controllerEleve.js#L41-L76)
4. **No Input Validation**: Server lacks sanitization - add validation before production
5. **No Test Suite**: No tests exist; manual testing required

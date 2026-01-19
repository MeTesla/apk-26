const l = console.log;

// ⚠️ DEPRECATED: Firebase client-side code has been moved to backend
// All Firebase operations now go through Express routes in server/routes/firebaseRoutes.js

/**
 * Authenticate user via backend
 * @deprecated Uses backend route instead of direct Firebase
 */
export async function authenticateUser() {
  try {
    const API_URL = 'http://localhost:3000'; // or use from config/env.js

    const response = await fetch(`${API_URL}/api/firebase/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'Hakim' // Hardcoded for now, adjust as needed
      })
    });

    const data = await response.json();

    if (data.success) {
      document.body.style.opacity = '1';
      console.log('✅ Connected:', data.message);
      return true;
    } else {
      console.error('❌ Authentication failed:', data.message);
      location.assign('https://www.google.com');
      return false;
    }
  } catch (error) {
    console.error('❌ Authentication error:', error);
    location.assign('./figures.html');
    return false;
  }
}

/**
 * Submit user suggestions via backend
 * @deprecated Uses backend route instead of direct Firebase
 */
export async function userSuggests(nom, suggest) {
  try {
    if (!nom.value || !suggest.value) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const API_URL = 'http://localhost:3000'; // or use from config/env.js

    const response = await fetch(`${API_URL}/api/firebase/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nom: nom.value,
        suggestion: suggest.value
      })
    });

    const data = await response.json();

    if (data.success) {
      alert('✅ Merci, votre suggestion a été bien envoyée');
      viderchamps();
    } else {
      alert('❌ Erreur: ' + (data.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('❌ Suggestion error:', error);
    alert('❌ Erreur lors de l\'envoi: ' + error.message);
  }
}

/**
 * Clear form fields
 */
const viderchamps = () => {
  const nom = document.getElementById('nom');
  const suggest = document.getElementById('suggest');
  if (nom) nom.value = '';
  if (suggest) suggest.value = '';
};



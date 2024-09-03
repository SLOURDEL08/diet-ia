/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'], // Ajoutez ici le domaine de votre serveur de développement
    // Si vous avez un domaine de production, ajoutez-le aussi, par exemple :
    // domains: ['localhost', 'votre-domaine-de-production.com'],
  },
  // Vous pouvez ajouter d'autres configurations ici si nécessaire
};

export default nextConfig;
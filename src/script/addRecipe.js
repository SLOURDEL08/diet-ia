const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

// Chargez les variables d'environnement depuis .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error('La variable d\'environnement MONGODB_URI n\'est pas définie dans .env.local');
}

const client = new MongoClient(uri);

async function addRecipes() {
  try {
    await client.connect();
    console.log('Connecté à la base de données MongoDB');

    const database = client.db("Diet-IA");
    const recipes = database.collection("recipes");

    const result = await recipes.insertMany([
   {
    title: "Poulet Tikka Massala",
    description: "Un plat indien épicé à base de poulet mariné et de sauce tomate épicée.",
    preparationTime: 30,
    difficulty: "Moyenne",
    rating: 4.7,
    image: "/recipe/tika.png",
    tags: ["Poulet", "Épicé", "Indien"],
    ingredients: [
      "Poulet",
      "Yaourt nature",
      "Gingembre",
      "Ail",
      "Tomates concassées",
      "Crème fraîche",
      "Garam masala",
      "Coriandre"
    ],
    instructions: [
      "Marinez le poulet avec le yaourt, le gingembre, l'ail et les épices.",
      "Faites cuire le poulet mariné au four ou à la poêle.",
      "Préparez la sauce avec les tomates concassées et la crème.",
      "Ajoutez le poulet à la sauce et laissez mijoter."
    ]
  },
      // Ajoutez d'autres recettes ici
    ]);

    console.log(`${result.insertedCount} recettes ont été ajoutées`);
  } catch (error) {
    console.error('Erreur lors de l\'ajout des recettes:', error);
  } finally {
    await client.close();
    console.log('Connexion à la base de données fermée');
  }
}

addRecipes().catch(console.error);
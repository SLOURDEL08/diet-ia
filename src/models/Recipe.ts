import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  rating: { type: Number, required: true },
  ingredients: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  image: { type: String, required: true },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
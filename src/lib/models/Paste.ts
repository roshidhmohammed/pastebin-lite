import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdAt: { type: Number, required: true },
  expiresAt: { type: Number, default: null },
  maxViews: { type: Number, default: null },
  views: { type: Number, default: 0 },
});

export default mongoose.models.Paste || mongoose.model("Paste", PasteSchema);

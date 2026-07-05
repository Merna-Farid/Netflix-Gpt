import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    name: { type: String, 
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [30, "Name must be at most 30 characters"], },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please provide a valid email",
        ], },
    password: { type: String,
         required: true ,
         minlength: [6, "Password must be at least 8 characters"],
        match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character",
      ],},
    image: String,
    favourites: [{ type: Schema.Types.ObjectId, ref: "Movie" }]  
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export default models.User || model("User", UserSchema);
import { Schema, model, models } from "mongoose";


const MovieSchema = new Schema(
    {
        title: { type: String,
            required: true,
            trim: true,
        },
        description: { type: String,
             required: true },


        videoUrl: { type: String,
            required: true },
        
        thumbnailUrl: { type: String,
            required: true },

        rating: { type: Number,
            required: true,
            min: 0,
            max: 5 },

        genre: { type: String,
            required: true,
            trim: true,
        },
        duration:{
            type: String,
            required: true,
        }

    },{ timestamps: true }

)

const Movie = models?.Movie || model("Movie", MovieSchema);
export default Movie;


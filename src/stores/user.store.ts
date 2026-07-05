import axios from "axios";
import { create } from "zustand";

import { IMovie } from "@/types/movie.types";
import { User } from "@/types/user.types";

type IState = {
  user: User | null;
  favourites: IMovie[];
};

type IActions = {
  updateUser: () => Promise<void>;
  updateFavourites: () => Promise<void>;
};

type IUserStoreState = IState & IActions;

const useUser = create<IUserStoreState>((set) => ({
  user: null,
  favourites: [],

  updateUser: async () => {
    const { data } = await axios.get("/api/me");

    set({
      user: data.currentUser,
    });
  },

  updateFavourites: async () => {
    const { data } = await axios.get("/api/favourites");

    set({
      favourites: data.favourites,
    });
  },
}));

export default useUser;
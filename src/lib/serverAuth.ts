import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";

const serverAuth = async () => {
  try {
    await connectToDatabase(); // ← make sure this line exists and is awaited

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("Not signed in");
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      throw new Error("Not signed in");
    }

    return { currentUser };
  } catch (error) {
    console.error("Error in serverAuth:", error);
    throw new Error("Unauthorized");
  }
};

export default serverAuth;
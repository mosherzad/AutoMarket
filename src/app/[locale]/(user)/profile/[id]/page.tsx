import { getUserProfile } from "@/apiCalls/userApiCall";
import Profile from "@/components/Profile";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}
const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { id } = await params;
  const user = await getUserProfile(id);
  console.log(user);
  return (
    <div>
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;

import { getUserProfile } from "@/apiCalls/userApiCall";
import EditProfileForm from "@/components/EditProfileForm";

interface EditProfilePageProps {
  params: Promise<{ id: string }>;
}
const EditProfilePage = async ({ params }: EditProfilePageProps) => {
  const { id } = await params;
  const user = await getUserProfile(id);
  console.log(id);
  return (
    <div>
      <EditProfileForm user={user} />
    </div>
  );
};

export default EditProfilePage;

import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import DisplayUserInfo from '@/components/UserAdmin/displayUserInfo';
import UpdateUserInfo from '@/components/UserAdmin/updateUserInfo';
const Settings = ({}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (!session) {
    typeof window !== 'undefined' && router.replace('/api/auth/signin');
    return <p>Redirecting...</p>;
  }

  return (
  <>
    <DisplayUserInfo/>
    <UpdateUserInfo/>
  </>
  );
};

export default Settings;


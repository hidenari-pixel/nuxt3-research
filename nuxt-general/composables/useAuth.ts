import { User } from "@supabase/gotrue-js";

type Form = {
    email: string;
    password: string;
}

export const useAuth = () => {
  const { auth } = useSupabaseClient();
  const u = useSupabaseUser();
  const loading = useState('loading', () => false)
  const currentUser = useState<User | null>("user", () => u.value)
  const router = useRouter()

  const login = async (form: Form) => {
    try {
        loading.value = true
        const { data: { user }, error } = await auth.signInWithPassword(form)
        if (error) {
            throw error
        }
        currentUser.value = user
        router.push("/")
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
  }

  // TODO: ログアウトできない問題を解決
  const logout = async () => {
    try {
        loading.value = true
        const { error } = await auth.signOut()
        if (error) {
            throw error;
        }
        currentUser.value = null
        router.push("/login")
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}

  return {
    currentUser,
    login,
    logout,
    loading,
  }
}
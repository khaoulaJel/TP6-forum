import { projectAuth } from "@/firebase/Config"
import { ref } from "vue";

const error = ref(null);

const login = async (email, password) => {
    error.value = null;
    try {
        const response = await projectAuth.signInWithEmailAndPassword(email, password);
        error.value = null;
        console.log('Login successful:', response.user);
        return response.user; 
    } catch (err) {
        console.error('Error during login:', err);

        let errorMessage = 'An error occurred. Please try again later.';
        
        try {
            const parsedError = JSON.parse(err.message);
            if (parsedError && parsedError.error && parsedError.error.message) {
                if (parsedError.error.message === 'INVALID_LOGIN_CREDENTIALS') {
                    errorMessage = 'Invalid login credentials. Please check your email and password.';
                }
            }
        } catch (e) {
            console.error('Failed to parse error message:', e);
        }

        error.value = errorMessage;
    }
}

const useLogin = () => {
    return { error, login };
}

export default useLogin;
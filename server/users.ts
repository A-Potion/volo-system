"use server";
import { auth } from "@/lib/auth/auth"
 
export const signIn = async (email: string, password: string) => {
    try { await auth.api.signInEmail({
        body: {
            email,
            password,
        }
        
    })
    console.log('Signed in')
    return {
        success: true,
        message: 'Signed in successfully.',
    }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || 'An unknown error occured.'
        }
    }
}

export const linkIn = async (email: string) => {
    try {await auth.api.signInMagicLink({
    body: {
        email: "user@email.com", // required
        name: "my-name",
        callbackURL: "/dashboard",
        newUserCallbackURL: "/welcome",
        errorCallbackURL: "/error",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});

} catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || 'An unknown error occured.'
        }
    }
}

export const signUp = async (username: string, email: string, password: string) => {
    try { await auth.api.signUpEmail({
        body: {
            name: username,
            email,
            password,
        }
        
    })
    console.log('Signed up')
    return {
        success: true,
        message: 'Signed up successfully.',
    }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || 'An unknown error occured.'
        }
    }
}

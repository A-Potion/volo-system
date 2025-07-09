

import { authClient } from '@/lib/auth/auth-client'

const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard"
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccesss: (ctx) => {
            //redirect
        },
        onError: (ctx) => {
            //show error msg
            alert(ctx.error.message);
        },
});
'use server';

import { axiosPrivateServer } from '@/lib/axios.private.server';
import { getServerToken } from '@/utils/getServerToken';
import { cookies } from 'next/headers';

const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_NAME || "stemrn_auth";

export async function LogoutAction() {
    const cookieStore = await cookies();

    try {
        const token = await getServerToken();

        // Call logout API only if token exists
        if (token) {
            try {
                const axiosInstance = await axiosPrivateServer();
                await axiosInstance.post('/logout/');
            } catch (error) {
                // Log but don't throw - we still want to clear cookie even if API fails
                // $&
            }
        }
    } catch (error) {
        // $&
    } finally {
        cookieStore.delete(ACCESS_TOKEN_KEY);
    }
}
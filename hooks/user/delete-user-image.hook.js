"use client";

import axiosPrivateClient from "@/lib/axios.private.client";
import { DeleteUserImageService } from "@/services/user/delete-user-image.service";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUserImage = () => {
    const axiosInstance = axiosPrivateClient();

    const {
        mutateAsync: deleteUserImage,
        isPending,
        data,
    } = useMutation({
        mutationFn: () => DeleteUserImageService(axiosInstance),
    });

    return {
        deleteUserImage,
        isPending,
        data,
    };
};

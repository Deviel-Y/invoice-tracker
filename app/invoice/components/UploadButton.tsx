"use client";

import { UploadButton } from "@/src/utils/uploadthing";
import { User } from "@prisma/client";
import { Avatar, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  user: User;
}

const ImageUploadButton = ({ user }: Props) => {
  const { update, data: session } = useSession();
  const [imageURL, setImageURL] = useState<string>();

  return (
    <Flex gap="9" align="center" justify="between">
      <Avatar
        src={session?.user?.image || imageURL}
        fallback="?"
        radius="full"
        size="8"
      />
      <UploadButton
        content={{
          button({ ready }) {
            if (ready) return <div>Update Avatar</div>;

            return "Getting ready...";
          },
          allowedContent({ ready, fileTypes, isUploading }) {
            if (!ready) return "Checking what you allow";
            if (isUploading) return "Seems like stuff is uploading";
            return `Stuff you can upload: ${fileTypes.join(", ")}`;
          },
        }}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          axios
            .patch(`/api/user/${user.id}`, { image: res[0].url })
            .then(async () => {
              await update({
                ...session,
                user: {
                  ...session?.user,
                  image: res[0].url,
                },
              });

              setImageURL(res[0].url);

              toast.success("Profile picture updated successfully");
            });
        }}
        onUploadError={(error: Error) => {
          toast.error(error.message);
        }}
      />
      <Toaster />
    </Flex>
  );
};

export default ImageUploadButton;

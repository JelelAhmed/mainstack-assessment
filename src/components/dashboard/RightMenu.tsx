// import { Box, IconButton, Popover, PopoverTrigger } from "@chakra-ui/react";
// import { Bell, MessageSquare } from "lucide-react";
// import ProfileMenu from "../common/ProfileMenu";
// import UserMenuButton from "../icons/UserMenuButton";

// export default function RightMenu() {
//   return (
//     <Box
//       position="absolute"
//       right="12px"
//       top="12px"
//       h="40px"
//       display="flex"
//       alignItems="center"
//       justifyContent="flex-end"
//       gap="8px"
//     >
//       {/* Notification Bell */}
//       <IconButton
//         aria-label="Notifications"
//         icon={<Bell size={20} />}
//         variant="ghost"
//         borderRadius="full"
//         _hover={{ bg: "#E4E7EC" }}
//         w="40px"
//         h="40px"
//       />

//       {/* Messages */}
//       <IconButton
//         aria-label="Messages"
//         icon={<MessageSquare size={20} />}
//         variant="ghost"
//         borderRadius="full"
//         _hover={{ bg: "#E4E7EC" }}
//         w="40px"
//         h="40px"
//       />

//       {/* Custom User Avatar + Menu Icon */}
//       <Popover placement="bottom-end">
//         <PopoverTrigger>
//           <Box>
//             <UserMenuButton name="Jack Paul" />
//           </Box>
//         </PopoverTrigger>

//         <ProfileMenu />
//       </Popover>
//     </Box>
//   );
// }

import { Box, IconButton, Popover, PopoverTrigger } from "@chakra-ui/react";
import { Bell, MessageSquare } from "lucide-react";
import ProfileMenu from "../common/ProfileMenu";
import UserMenuButton from "../icons/UserMenuButton";
import { useUser } from "../../hooks/useUser";

export default function RightMenu() {
  const { data: user, loading, error } = useUser();

  if (loading) return null; // or a small skeleton later
  if (error) return null; // you can log this or show toast

  const fullName = user ? `${user.first_name} ${user.last_name}` : "Loading...";

  return (
    <Box
      position="absolute"
      right="12px"
      top="12px"
      h="40px"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap="8px"
    >
      {/* 🔔 Notification Bell */}
      <IconButton
        aria-label="Notifications"
        icon={<Bell size={20} />}
        variant="ghost"
        borderRadius="full"
        _hover={{ bg: "#E4E7EC" }}
        w="40px"
        h="40px"
      />

      {/* 💬 Messages */}
      <IconButton
        aria-label="Messages"
        icon={<MessageSquare size={20} />}
        variant="ghost"
        borderRadius="full"
        _hover={{ bg: "#E4E7EC" }}
        w="40px"
        h="40px"
      />

      {/* 🧍 User Avatar + Popover */}
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Box>
            <UserMenuButton name={fullName} />
          </Box>
        </PopoverTrigger>

        <ProfileMenu user={user} />
      </Popover>
    </Box>
  );
}

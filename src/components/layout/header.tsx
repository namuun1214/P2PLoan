import React from 'react'
import { Box, CloseButton, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
export const Header = ({
  title = 'P2PLoan',
  isBack = false,
  hasCloseButton = false,
}) => {
  const router = useRouter()
  return (
    <Box
      display="flex"
      w="full"
      h="50px"
      justifyContent="space-between"
      alignItems="center"
    >
      {isBack ? (
        <Box justifySelf="flex-start" onClick={() => router.back()}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_9_2896)">
              <path
                d="M15 6L9 12L15 18"
                stroke="#091B3D"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_9_2896">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      ) : (
        <Text></Text>
      )}
      <Text variant="bodyBold">{title}</Text>
      {hasCloseButton ? (
        <CloseButton onClick={() => router.push('/home')} />
      ) : (
        <Text></Text>
      )}
    </Box>
  )
}

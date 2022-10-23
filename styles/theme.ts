import { extendTheme } from '@chakra-ui/react'
import { theme as base } from '@chakra-ui/react';

export const theme = extendTheme({
    ...base,
    styles: {
        global: () => ({
            body: {
                bg: 'white',
                color: 'black',
            }
        })
    },
    fonts: {
        heading: "Montserrat",
        body: "Montserrat",
        mono: "Montserrat",
        subheading1: "Montserrat",
        caption: "Montserrat",
    },
    components: {
        Button: {
            baseStyle: {
                color: 'white',
                height: '50px'
            },
            variants: {
                solid: {
                    rounded: 'sm',
                    backgroundColor: '#293056',
                }
            }
        },
        Text: {
            variants: {
                heading1: {
                    fontSize: 40,
                    lineHeight: '44px',
                    fontWeight: '600',
                },
                bodyBold: {
                    fontSize: 16,
                    lineHeight: '18px',
                    fontWeight: '700',
                },
                body: {
                    fontSize: 16,
                    lineHeight: '18.75px',
                    fontWeight: '400',
                },
                subheading1: {
                    fontSize: 28,
                    lineHeight: '30.09px',
                    fontWeight: '500',

                },
                caption: {
                    fontSize: 14,
                    lineHeight: '16.41px',
                    fontWeight: '700',
                }
            }
        }
    },
    config: {
        disableTransitionOnChange: true,
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
})


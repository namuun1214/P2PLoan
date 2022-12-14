import { extendTheme } from '@chakra-ui/react'
import { theme as base } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    field: {
        fontFamily: 'Montserrat', // change the font family
        color: 'dark.500 !important', // change the input text color
        height: '50px'
    },


})
const pinInputStyle = definePartsStyle({
    // define the part you're going to style
    field: {
        fontFamily: 'Montserrat', // change the font family
        color: 'dark.500 !important', // change the input text color
        height: '40px',
        backgroundColor: 'red.200 !important'
    },


})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
export const theme = extendTheme({
    ...base,
    styles: {
        global: () => ({

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
        Input: inputTheme,
        // PinInput: pinInputStyle,
        PinInputField: pinInputStyle,
        Button: {
            baseStyle: {
                color: 'white',
                height: '50px'
            },
            variants: {
                solid: {
                    rounded: 'lg',
                    backgroundColor: '#293056',
                    color: 'white',
                    px: 8,
                    py: 3
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
                },
                secondary: {
                    fontSize: 12,
                    lineHeight: '14.41px',
                    fontWeight: '500',
                    color: 'gray'
                }
            }
        },

    },
    config: {
        disableTransitionOnChange: true,
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
})


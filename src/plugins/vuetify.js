import {createVuetify} from 'vuetify'

export default createVuetify({
    theme: {
        defaultTheme: 'myCustomTheme',
        themes: {
            myCustomTheme: {
                dark: true,
                colors: {
                    background: '#F5F5F5',
                    error: '#ff8080'
                },
            },
        },
    },
})
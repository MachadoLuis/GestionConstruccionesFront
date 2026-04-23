import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:"",
            component: () => import('@/pages/index.vue'),
            meta: {
                layout: 'horizontal_navbar_layout'
            }
        },
        {
            path: '/projects',
            component: () => import('@/pages/projects.vue'),
            meta: {
                layout: 'vertical_navbar_layout',
            }
        },
        {
            path: '/project_towers/:id_project',
            component: () => import('@/pages/project_towers.vue'),
            meta: {
                layout: 'vertical_navbar_layout',
                items_list: [
                    {title:'Historial de Proyecto'},
                    {title: 'Gestionar Trabajadores'},
                    {title:'Comunicados de Torre'},
                    {list_group:
                            {
                                title: 'Informes de Progresion',
                                children_list: [
                                    {title: 'HIJO DE PROGRESION1'},
                                    {title: 'HIJO DE PROGRESION2'},
                                    {title: 'HIJO DE PROGRESION3'}
                                ]
                            },
                    }
                ]
            }
        },
        {
            path: '/tower_info/:id_tower',
            component: () => import('@/pages/tower_info.vue'),
            meta: {
                layout: 'vertical_navbar_layout',
                items_list: [
                    {list_group:
                            {
                                title: 'Historial de Torre',
                                children_list: [
                                    {title: 'Etapa 1', stage:'1'},
                                    {title: 'Etapa 2',stage:'2'},
                                    {title: 'Etapa 3',stage:'3'},
                                    {title: 'Etapa 4',stage:'4'}
                                ]
                            }
                    },
                    {title:'Comunicados de Etapas'}
                ]
            }
        }
    ]
})

export default router
import { core_routes } from "../core/routes";
import { queens_routes } from "../features/queens/routes";
import {createRouter, createWebHistory} from "vue-router";


const routes = [
    ...core_routes,
    ...queens_routes,
    {path: '/:pathMatch(.*)*', redirect: '/'}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QueryView from "@/views/QueryView.vue";
import BooksView from "@/views/BooksView.vue";
import WebSocket from "@/components/WebSocket.vue";
import BookView from "@/views/BookView.vue";
import EssayGradingView from "@/views/EssayGradingView.vue";
import TranslateView from "@/views/TranslateView.vue";
import TestView from "@/views/TestView.vue";
import StartTestView from "@/views/StartTestView.vue";
import QueryPhraseView from "@/views/queryPhraseView.vue";
import AlterView from "@/views/AlterView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ResetPasswordView from "@/views/ResetPasswordView.vue";
import EssaySearchView from "@/views/EssaySearchView.vue";

import {
    AddWordPage,
    AddExamplePage,
    UpdateWordPage,
    UpdateExamplePage,
    DeleteWordPage,
    DeleteExamplePage
} from "@/components/alter_word_page/main/menu";
import axios from "axios";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/query',
        name: 'query',
        component: QueryView
    },
    {
        path: '/books',
        name: 'books',
        component: BooksView,
    },
    {
        path: '/book',
        name: 'book',
        component: BookView
    },
    {
        path: '/websocket',
        name: 'websocket',
        component: WebSocket
    },
    {
        path: '/essay_grading',
        name: 'essay_grading',
        component: EssayGradingView
    },
    {
        path: '/translation',
        name: 'translation',
        component: TranslateView
    },
    {
        path: '/test',
        name: 'TestPage',
        component: TestView
    },
    {
        path: '/start_test',
        name: 'StartTestPage',
        component: StartTestView
    },
    {
        path: '/query_phrase',
        name: 'query_phrase',
        component: QueryPhraseView
    },
    {
        path: '/alter',
        name: 'alter',
        component: AlterView,
        children: [
            {
                path: 'add_word',
                name: 'add_word',
                component: AddWordPage
            },
            {
                path: 'add_example',
                name: 'add_example',
                component: AddExamplePage
            },
            {
                path: 'update_word',
                name: 'update_word',
                component: UpdateWordPage
            },
            {
                path: 'update_example',
                name: 'update_example',
                component: UpdateExamplePage
            },
            {
                path: 'delete_word',
                name: 'delete_word',
                component: DeleteWordPage
            },
            {
                path: 'delete_example',
                name: 'delete_example',
                component: DeleteExamplePage
            }
        ],
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/reset_password',
        name: 'reset_password',
        component: ResetPasswordView
    },
    {
        path: '/essay_search',
        name: 'essay_search',
        component: EssaySearchView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        axios.get('/api/auth').then(response => {
            if (response.data.code === 1) {
                next()
            } else {
                next({name: 'login'})
            }
        })
    } else
        next()
})


export default router


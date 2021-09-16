
import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import TeamMember from './components/teams/TeamMembers.vue';
import NotFound from './pages/NotFound.vue';

import TeamFooter from './pages/TeamFooter.vue';
import UserFooter from './pages/UserFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/', component: TeamsList},
        // {path: '/', redirect: '/teams'},
        {
            name: 'teams',
            path: '/teams',
            components: {default: TeamsList, footer: TeamFooter},
            alias: '/',
            meta: { needsAuth: true },
            children: [
                {
                    name: 'team-members',
                    path: ':teamId',
                    component: TeamMember,
                    props: true
                },
            ]
        },
        {
            path: '/users',
            components: {
                default: UsersList,
                footer: UserFooter
            },
            // beforeEnter(to, from, next) {
            //     console.log("Fired Before User Comp Enter");
            //     console.log(to, from);
            //     next();
            // }
        },
        // {path: '/teams/:teamId', component: TeamMember, props: true},
        {path: '/:notFound(.*)', component: NotFound},
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    scrollBehavior(_, _2, savedPosition) {
        // console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { top: 0 }
    }
});

router.beforeEach(function(_, _2, next) {
    // console.log("Before Each Fired");
    // console.log(to, from);
    // if (to.name === 'team-members') {
    //     next()
    // } else {
    //     next({name: 'team-members', params: {teamId: 't2'}});
    // }

    // if (to.meta.needsAuth) {
    //     console.log("Need Auth!");
    //     next();
    // } else {
    //     next();
    // }
    next();
});

// router.afterEach(function(to, from) {
//     //sending analytics data
//     console.log("Global afterEach");
//     console.log(to, from);
// });


export default router;
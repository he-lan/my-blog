import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import First from '@/components/First'
import Music from '@/components/Music'
import Comment from '@/components/Comment'
import Album from '@/components/Album'
import About from '@/components/About'
import User from '@/components/User'
import Blog from '@/components/Blog'
import Back from '@/components/Back'
import AddBlog from '@/components/subcomponents/Back-manage/AddBlog'


Vue.use(Router)

export default new Router({

    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/first',
            name: 'First',
            component: First
        },
        {
            path: '/music',
            name: 'Music',
            component: Music
        },
        {
            path: '/comment',
            name: 'comment',
            component: Comment
        },
        {
            path: '/album',
            name: 'album',
            component: Album
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/user',
            name: 'user',
            component: User
        },
        {
            path: '/blog/:id',
            name: 'blog',
            component: Blog
        }, {
            path: '/back',
            name: 'back',
            component: Back
        }, {
            path: '/addblog',
            name: 'addblog',
            component: AddBlog
        }

    ]
})
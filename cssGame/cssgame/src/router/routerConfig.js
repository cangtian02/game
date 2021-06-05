import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/loading/loading';

const LoadingComponents = ({ isLoading, error }) => {
    if (isLoading) {
        return <Loading />;
    } else if (error) {
        return <div>啊哦，页面加载错误。。。</div>;
    } else {
        return null;
    }
};

const Home = Loadable({
    loader: () => import('../view/home/home'),
    loading: LoadingComponents
});

const Item = Loadable({
    loader: () => import('../view/item/item'),
    loading: LoadingComponents
});

const Detail = Loadable({
    loader: () => import('../view/detail/detail'),
    loading: LoadingComponents
});

const Game = Loadable({
    loader: () => import('../view/game/game'),
    loading: LoadingComponents
});

const User = Loadable({
    loader: () => import('../view/user/user'),
    loading: LoadingComponents
});

export const routes = [
    {
        path: '/home',
        component: Home,
    },
    {
        path: '/item',
        component: Item
    },
    {
        path: '/detail/:id',
        component: Detail
    },
    {
        path: '/game/:id',
        component: Game
    },
    {
        path: '/user',
        component: User
    },
];

export const RouteWithSubRoutes = route => (
    <Route path={route.path} render={props => <route.component {...props} routes={route.routes} />} />
);

import {
  Outlet,
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import Cookies from 'js-cookie';

import LoginForm from '@/forms/LoginForm';
import { SideSection, MainSection } from '@/containers/section/Section';
import BoardListSection from '@/containers/section/BoardListSection/BoardListSection';
import BoardDetailSection from '@/containers/section/BoardDetailSection/BoardDetailSection';
import Header from '@/containers/section/HeaderSection/Header';


const Main = () => {
  return (
    <main>
      <SideSection><BoardListSection /></SideSection>
      <Outlet />
    </main>
  )
}

const isAuthenticated = () => {
  if (Cookies.get('token')) {
    return true;
  }
  return false;
}

const rootRoute = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    )
  }
});

const LoginFormRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  component: LoginForm,
})

const MainRoute = createRoute({
  getParentRoute: () => rootRoute,
  beforeLoad: async ({location}) => {
    if(!isAuthenticated()) {
      throw redirect({
        to:'/login',
        search: {
          redirect: location.href
        }
      })
    }
  },
  path: '/',
  component: Main
})

export const BoardDetailRoute = createRoute({
  getParentRoute: () => MainRoute,
  path: 'board/$boardId',
  loader: ({params}) => params.boardId,
  component: () => {
    return (
      <MainSection>
        <Header />
        <BoardDetailSection />
      </MainSection>
    )
  }
})

const routeTree = rootRoute.addChildren([LoginFormRoute, MainRoute.addChildren([BoardDetailRoute])]);

const router = createRouter({routeTree});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router;
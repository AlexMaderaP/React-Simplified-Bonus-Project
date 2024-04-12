import { Navigate, RouteObject } from "react-router-dom";
import { RootLayout } from "@/layouts/RootLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { TaskListPage } from "@/pages/tasks/TaskListPage";
import { NewTaskPage } from "@/pages/tasks/NewTaskPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LogInPage } from "@/pages/auth/LogInPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import {
  getSessionLoader,
  logInAction,
  logOutAction,
  signupAction,
} from "@/features/authentication";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    loader: getSessionLoader,
    action: logOutAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/tasks" replace />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            path: "login",
            element: <LogInPage />,
            action: logInAction,
          },
          {
            path: "signup",
            element: <SignUpPage />,
            action: signupAction,
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
];


import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventPage from "./pages/EventPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventForm from "./pages/EditEventForm";
import OverOns from "./pages/OverOns";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MijnEventsPage from "./pages/MijnEventsPage";
import AdminEventsPage from "./pages/AdminEventsPage";
import PrivateRoute from "./components/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventPage /> },
      {
        path: "events/add",
        element: (
          <PrivateRoute>
            <AddEventPage />
          </PrivateRoute>
        )
      },
      {
        path: "events/edit/:id",
        element: (
          <PrivateRoute>
            <EditEventForm />
          </PrivateRoute>
        )
      },
      {
        path: "mijn-events",
        element: (
          <PrivateRoute>
            <MijnEventsPage />
          </PrivateRoute>
        )
      },
      {
        path: "admin/events",
        element: (
          <PrivateRoute>
            <AdminEventsPage />
          </PrivateRoute>
        )
      },
      { path: "about", element: <OverOns /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> }
    ]
  }
]);

export default router;

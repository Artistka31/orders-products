import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import OrdersList from "./components/OrdersList";
import OrderDetails from "./components/OrderDetails";
import "animate.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={500} // длительность анимации
        classNames="animate__animated animate__fadeIn"
      >
        <Routes location={location}>
          <Route path="/" element={<OrdersList />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;

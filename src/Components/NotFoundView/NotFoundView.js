import { useLocation, useHistory } from "react-router";

export default function NotFoundView() {
  const history = useHistory();
  const location = useLocation();
  console.log(history);
  setTimeout(() => {
    history.push(location?.state?.from ?? "/");
  }, 1500);

  return <h2>404 It's Route is not possible, please, try again!!!</h2>;
}

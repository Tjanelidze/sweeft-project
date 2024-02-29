import { useMoveBack } from '../hooks/useMoveBack';

function PageNotFound() {
  const moveBack = useMoveBack();

  return <button onClick={moveBack}>&larr; Go back</button>;
}

export default PageNotFound;

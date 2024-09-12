import { ScaleLoader } from 'react-spinners';

function BigLoader() {
  return (
    <div className="w-full py-4 px-2 flex-colo h-screen">
      <ScaleLoader color="#F20000" />
    </div>
  );
}

export default BigLoader;

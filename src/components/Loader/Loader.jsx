import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#3f51b5"
      wrapperStyle={{ justifyContent: 'center' }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#9ba7ea"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

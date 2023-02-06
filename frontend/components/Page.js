import propTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <>
      <h2>I am the page component</h2>
      {children}
    </>
  );
}

Page.propTypes = {
  children: propTypes.any
}
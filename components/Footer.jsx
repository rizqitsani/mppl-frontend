const Footer = () => {
  return (
    <footer aria-labelledby='footer-heading' className='bg-white'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='px-4 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8'>
        <div className='py-10 border-t border-gray-200'>
          <p className='text-sm text-gray-500'>
            Copyright &copy; 2021 PT Aneka Usaha Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
